import api from './api';

export const adminService = {
  

  async getAll() {
    try {
      const response = await api.get('/admin');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar administradores:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const response = await api.get(`/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar administrador com ID ${id}:`, error);
      throw error;
    }
  },

  async create(adminData: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(adminData).forEach((key) => {
      if (adminData[key] !== undefined && adminData[key] !== null) {
        formData.append(key, adminData[key]);
      }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await api.post('/admin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar administrador:', error);
      throw error;
    }
  },

  async update(adminId: string, adminData: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(adminData).forEach((key) => {
      if (adminData[key] !== undefined && adminData[key] !== null) {
        formData.append(key, adminData[key]);
      }
    });
    
    formData.append('_id', adminId); 

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await api.put('/admin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar administrador:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const response = await api.delete(`/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar administrador com ID ${id}:`, error);
      throw error;
    }
  },


  async getDashboardStats() {
    try {
      const response = await api.get('/administrator/dashboard-stats');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  },

  async getRecentClients() {
    try {
      const response = await api.get('/client'); 
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes reais do banco:', error);
      throw error;
    }
  },

  
  async createAdmin(adminData: any, imageFile?: File) {
    return this.create(adminData, imageFile);
  },

  async createClient(clientData: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(clientData).forEach((key) => {
      if (clientData[key] !== undefined && clientData[key] !== null) {
        formData.append(key, clientData[key]);
      }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await api.post('/client', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  },

  async updateClient(clientId: string, clientData: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(clientData).forEach((key) => {
      if (clientData[key] !== undefined && clientData[key] !== null) {
        formData.append(key, clientData[key]);
      }
    });
    
    formData.append('_id', clientId); 

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await api.put('/client', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  },
};