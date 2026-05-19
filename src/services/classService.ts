import api from './api';

export const classService = {
  // GET - Listar todas as turmas (ou turmas vinculadas a um cliente/unidade)
  async getAll() {
    try {
      const response = await api.get('/class');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar turmas:', error);
      throw error;
    }
  },

  // GET - Buscar uma única turma por ID
  async getById(id: string) {
    try {
      const response = await api.get(`/class/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar turma com ID ${id}:`, error);
      throw error;
    }
  },

  // POST - Cadastrar uma nova turma
  async create(classData: any) {
    try {
      const response = await api.post('/class', classData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      throw error;
    }
  },

  // PUT - Atualizar dados da turma
  async update(classId: string, classData: any) {
    try {
      const payload = { ...classData, _id: classId };
      const response = await api.put('/class', payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar turma:', error);
      throw error;
    }
  },

  // DELETE - Remover uma turma
  async delete(id: string) {
    try {
      const response = await api.delete(`/class/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar turma com ID ${id}:`, error);
      throw error;
    }
  }
};