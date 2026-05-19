import api from './api';

export const clientService = {
  // GET - Listar todos os clientes
  async getAll() {
    try {
      const response = await api.get('/client');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      throw error;
    }
  },

  // GET - Buscar um único cliente por ID
  async getById(id: string) {
    try {
      const response = await api.get(`/client/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar cliente com ID ${id}:`, error);
      throw error;
    }
  },

  // POST - Cadastrar um novo cliente
  async create(clientData: any) {
    try {
      const response = await api.post('/client', clientData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      throw error;
    }
  },

  // PUT - Atualizar dados do cliente
  // Nota: No backend, a rota mapeada é '/client' sem o ID na URL. O ID deve ir dentro do objeto 'clientData'.
  async update(clientData: any) {
    try {
      const response = await api.put('/client', clientData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  },

  // DELETE - Remover um cliente por ID
  async delete(id: string) {
    try {
      const response = await api.delete(`/client/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar cliente com ID ${id}:`, error);
      throw error;
    }
  },

  // Métodos que já existiam no seu arquivo base
  async getDashboardData() {
    try {
      const response = await api.get('/client/dashboard');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard do cliente:', error);
      throw error; 
    }
  },

  async getUnits() { 
    try {
      const response = await api.get('/unit');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar unidades:', error);
      throw error;
    }
  }
};