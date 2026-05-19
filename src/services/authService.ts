// src/services/authService.ts
import api from './api';

export interface SingInParams {
  codeAccess: string;
  password: string;
}

export const authService = {
  async login(credentials: SingInParams) {
    try {
      // Faz o POST para a rota /singin do seu backend
      const response = await api.post('/singin', credentials);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Usuário ou senha inválidos.');
      }
      throw new Error('Erro ao conectar com o servidor.');
    }
  }
};