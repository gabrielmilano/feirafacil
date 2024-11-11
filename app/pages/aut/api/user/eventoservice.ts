import { authenticatedFetch } from "./apiService";

interface Evento {
    id: number;
    data: Date;
    feiraId: number;
}

export const addEvento = async (evento: { data: Date; feiraId: number }): Promise<Evento> => {
    try {
        const response = await authenticatedFetch(`/feiras/${evento.feiraId}/eventos`, {
            method: 'POST',
            body: JSON.stringify({ data: evento.data.toISOString().split('T')[0] }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Retorne os dados do evento que foi adicionado
        return {
            id: Date.now(), // Substitua isso pelo método que você usa para gerar IDs
            data: evento.data,
            feiraId: evento.feiraId,
        };
    } catch (error) {
        console.error('Erro ao adicionar evento:', error);
        throw error; // Propaga o erro para ser tratado em outro lugar
    }
};

export const fetchEventos = async (
    feiraId: number,
    page: number = 0,   // Número da página (default é 0)
    size: number = 1,    // Número de eventos por página (default é 1)
    sort: string = 'id'   // Critério de ordenação (pode ser alterado conforme necessário)
): Promise<Evento[]> => {
    try {
        const data = await authenticatedFetch(`/feiras/${feiraId}/eventos?page=${page}&size=${size}&sort=${sort}`, {
            method: 'GET',
        });

        // Verifica se data é nulo ou indefinido
        if (!data || typeof data !== 'object') {
            throw new Error(`Resposta inválida da API: não é um objeto. Resposta completa: ${JSON.stringify(data)}`);
        }

        // Verifica se data.content existe e é um array
        if (!Array.isArray(data.content)) {
            throw new Error(`Resposta inválida da API: content não é um array. Resposta completa: ${JSON.stringify(data)}`);
        }

        return data.content.map((evento: { id: number; data: string }) => ({
            id: evento.id,
            data: new Date(evento.data),
            feiraId,
        })) || [];
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        return [];
    }
};

export const deleteEvento = async (feiraId: number, eventoId: number) => {
    try {
        await authenticatedFetch(`/feiras/${feiraId}/eventos/evento/${eventoId}`, {
            method: 'DELETE',
        });
        console.log("Evento excluído com sucesso.");
    } catch (error) {
        console.error('Erro ao excluir evento:', error);
        throw error;
    }
};

