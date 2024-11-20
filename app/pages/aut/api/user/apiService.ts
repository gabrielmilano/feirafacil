const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://feira.mateuslh.com/api';

// Função para obter o token armazenado nos cookies
const getToken = () => {
  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const parts = decodedCookie.split(';');

  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(name)) {
      return part.substring(name.length);
    }
  }

  return null;
};

// Função para realizar requisições autenticadas
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.');
    }

    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    // Verifica se a resposta da API é bem-sucedida
    if (!response.ok) {
      const responseText = await response.text();
      let errorData;

      try {
        errorData = responseText ? JSON.parse(responseText) : {};
      } catch (error) {
        errorData = { message: 'Erro desconhecido ao processar a resposta' };
      }

      throw new Error(`Erro na requisição: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      throw new Error('Resposta não é JSON.');
    }
  } catch (error) {
    console.error('Erro ao realizar authenticatedFetch:', error);
    throw error;
  }
};
