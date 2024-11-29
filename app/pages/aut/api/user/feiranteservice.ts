import { authenticatedFetch } from './apiService';

// Define a interface Feirante para tipagem
export interface Feirante {
  id: number;
  nomeFeirante: string;
  nomeEmpresa: string;
  cnpj: string;
  telefone: string;
  email: string;
  feiraId: number;
}

// Adiciona um novo feirante
export const addFeirante = async (feirante: Feirante): Promise<Feirante> => {
  try {
    const response = await authenticatedFetch('/feirantes', {
      method: 'POST',
      body: JSON.stringify(feirante),
    });
    return response as Feirante; // Presumindo que a API retorna o objeto criado
  } catch (error: unknown) {
    console.error('Erro ao adicionar feirante:', error);

    if (error instanceof Error) {
      const errorMessage = error.message || 'Erro desconhecido ao adicionar feirante.';
      if (errorMessage.includes('Validation failed')) {
        throw new Error('CNPJ inválido: Verifique o número e tente novamente.');
      }
      throw new Error(errorMessage);
    }

    throw new Error('Erro desconhecido ao adicionar feirante.');
  }
};

// Busca os feirantes
export const fetchFeirantes = async (): Promise<Feirante[]> => {
  try {
    const response = await authenticatedFetch('/feirantes', {
      method: 'GET',
    });
    return response.content || []; // Assumindo que response.content contém os feirantes
  } catch (error) {
    console.error('Erro ao buscar feirantes:', error);
    return []; // Retorna uma lista vazia em caso de erro
  }
};

// Exclui um feirante
export const deleteFeirante = async (id: number): Promise<void> => {
  try {
    await authenticatedFetch(`/feirantes/feirante/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Erro ao excluir o feirante:', error);
    throw error;
  }
};

// Atualiza um feirante existente
export const updateFeirante = async (
  feiranteId: number,
  updatedFeirante: Omit<Feirante, 'id'>
): Promise<Feirante> => {
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
      return await response.json(); // Retorna o objeto atualizado
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
