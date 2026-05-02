import axios from 'axios';

// Aqui configuramos a base da comunicação com o backend em Python
const api = axios.create({
  // Substitua pela porta/URL real do seu backend quando for testar
  baseURL: 'http://localhost:8000/api', 
  
  // Muito importante: isso diz ao navegador para enviar os cookies 
  // automaticamente para o backend ler
  withCredentials: true, 
});

export default api;