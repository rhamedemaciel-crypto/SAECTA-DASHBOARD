import api from './api';

export const subjectService = {
  // GET - Listar todas as disciplinas
  async getAll() {
    try {
      const response = await api.get('/subject');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar disciplinas:', error);
      throw error;
    }
  },

  // GET - Buscar uma única disciplina por ID
  async getById(id: string) {
    try {
      const response = await api.get(`/subject/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar disciplina com ID ${id}:`, error);
      throw error;
    }
  },

  // POST - Cadastrar uma nova disciplina
  async create(subjectData: any) {
    try {
      const response = await api.post('/subject', subjectData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar disciplina:', error);
      throw error;
    }
  },

  // PUT - Atualizar dados da disciplina
  async update(subjectId: string, subjectData: any) {
    try {
      // Seguindo o padrão de segurança do seu backend de injetar o _id no corpo
      const payload = { ...subjectData, _id: subjectId };
      const response = await api.put('/subject', payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
      throw error;
    }
  },

  // DELETE - Remover uma disciplina por ID
  async delete(id: string) {
    try {
      const response = await api.delete(`/subject/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar disciplina com ID ${id}:`, error);
      throw error;
    }
  }
};