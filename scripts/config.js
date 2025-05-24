// Configuração da API
const API_CONFIG = {
    // URL base da API - altera baseado no ambiente
    baseURL: window.location.hostname.includes('github.io') 
        ? 'https://projeto-lojaonline-backend.onrender.com' // URL do Render em produção
        : 'http://localhost:5000' // URL local para desenvolvimento
};

export default API_CONFIG; 