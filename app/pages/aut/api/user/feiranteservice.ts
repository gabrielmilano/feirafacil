

import { authenticatedFetch } from './apiService';

// Adiciona um novo feirante
export const addFeirante = async (feirante: {
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
        return response.content || []; // Certifique-se de que a estrutura corresponde à resposta real
    } catch (error) {
        console.error('Erro ao buscar feirantes:', error);
        return []; 
    }
};
