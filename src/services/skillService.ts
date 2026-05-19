import api from './api';

export const skillService = {
  // GET - Listar todas as habilidades
  async getAll() {
    try {
      const response = await api.get('/skill');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar habilidades:', error);
      throw error;
    }
  },

  // GET - Buscar habilidades que pertencem a uma disciplina específica
  // Nota: De acordo com a rota do seu backend
  async getBySubjectId(subjectId: string) {
    try {
      const response = await api.get(`/skill/skill-by-subject/${subjectId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar habilidades da disciplina ${subjectId}:`, error);
      throw error;
    }
  },

  // GET - Buscar uma única habilidade por ID
  async getById(id: string) {
    try {
      const response = await api.get(`/skill/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar habilidade com ID ${id}:`, error);
      throw error;
    }
  },

  // POST - Cadastrar uma nova habilidade
  async create(skillData: any) {
    try {
      const response = await api.post('/skill', skillData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar habilidade:', error);
      throw error;
    }
  },

  // PUT - Atualizar dados da habilidade
  async update(skillId: string, skillData: any) {
    try {
      // Injeta o ID no corpo conforme padrão do backend
      const payload = { ...skillData, _id: skillId };
      const response = await api.put('/skill', payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar habilidade:', error);
      throw error;
    }
  },

  // DELETE - Remover uma habilidade por ID
  async delete(id: string) {
    try {
      const response = await api.delete(`/skill/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar habilidade com ID ${id}:`, error);
      throw error;
    }
  }
};