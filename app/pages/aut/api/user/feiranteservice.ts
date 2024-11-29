

import { authenticatedFetch } from './apiService';

// Adiciona um novo feirante
export const addFeirante = async (feirante: {
    id: number;
    nomeFeirante: string;
    nomeEmpresa: string;
    cnpj: string;
    telefone: string;
    email: string;  // Novo campo
    feiraId: number;  // Novo campo
}) => {
    try {
        const response = await authenticatedFetch('/feirantes', {
            method: 'POST',
            body: JSON.stringify(feirante),
        });
        return response; // Presumindo que a resposta já traz o novo feirante
    } catch (error: unknown) {  // Use 'unknown' para que o TypeScript não exiba erro
        console.error('Erro ao adicionar feirante:', error);

        // Verifica se o erro possui uma estrutura esperada
        if (error instanceof Error) {
            const errorMessage = error.message || 'Erro desconhecido ao adicionar feirante.';
            if (errorMessage.includes('Validation failed')) {
                throw new Error('CNPJ inválido: Verifique o número e tente novamente.');
            }
            throw new Error(errorMessage); // Re-lança outros erros
        }

        // Se o erro não é uma instância de Error, lança uma mensagem padrão
        throw new Error('Erro desconhecido ao adicionar feirante.');
    }
};


// Busca os feirantes
export const fetchFeirantes = async () => {
    try {
        const response = await authenticatedFetch('/feirantes', {
            method: 'GET',
        });
        return response.content || []; 
    } catch (error) {
        console.error('Erro ao buscar feirantes:', error);
        return []; 
    }
};

export const deleteFeirante = async (id: number) => {
    try {
        await authenticatedFetch(`/feirantes/feirante/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Erro ao excluir o feirante:', error);
        throw error;
    }
};

export const updateFeirante = async (
    feiranteId: number,
    updatedFeirante: {
      nomeFeirante: string;
      nomeEmpresa: string;
      cnpj: string;
      telefone: string;
      email: string;
      feiraId: number;
    }
  ) => {
    try {

      const response = await authenticatedFetch(`/feirantes/feirante`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: feiranteId,
          ...updatedFeirante,
        }),
      });
  
      if (response && typeof response.json === 'function') {
        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || 'Erro ao atualizar feirante.';
          if (errorMessage.includes('Validation failed')) {
            throw new Error('CNPJ inválido: Verifique o número e tente novamente.');
          }
          throw new Error(errorMessage);
        }
        return await response.json(); 
      } else {
        throw new Error('Resposta inválida da API.');
      }
    } catch (error: unknown) {
      console.error('Erro ao atualizar feirante:', error);
  
      if (error instanceof Error) {
        const errorMessage = error.message || 'Erro desconhecido ao atualizar feirante.';
        throw new Error(errorMessage);
      }
  
      throw new Error('Erro desconhecido ao atualizar feirante.');
    }
  };
  
  
