import { authenticatedFetch } from './apiService';

export const fetchFeiras = async () => {
    try {
        const data = await authenticatedFetch('/feiras');
        return data.content || [];
    } catch (error) {
        console.error('Erro ao buscar as feiras:', error);
        return []; 
    }
};

export const addFeira = async (feira: { nome: string; local: string; descricao: string }) => {
    try {
        const newFeira = await authenticatedFetch('/feiras', {
            method: 'POST',
            body: JSON.stringify(feira),
        });
        return newFeira;
    } catch (error) {
        console.error('Erro ao enviar dados da feira:', error);
        throw error;
    }
};

export const deleteFeira = async (id: number) => {
    try {
        await authenticatedFetch(`/feiras/feira/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Erro ao excluir a feira:', error);
        throw error;
    }
};

export const updateFeira = async (
    id: number,
    updatedData: {
      nome: string;
      local: string;
      descricao: string;
      data: string;
    }
  ) => {
    try {
      const updatedFeira = await authenticatedFetch(`/feiras/feira`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Adicionado para garantir o tipo correto
        },
        body: JSON.stringify({
          id, // Inclui o id como parte do payload
          ...updatedData, // Inclui os outros campos
        }),
      });
      return updatedFeira;
    } catch (error) {
      console.error('Erro ao atualizar a feira:', error);
      throw error;
    }
  };
  