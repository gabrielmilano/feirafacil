// api/user/api.ts

export interface Feira { 
    id: number;
    nome: string;
    local: string;
    data: Date;
    descricao: string;
    imagemId: number;
}

export interface Evento { 
    id: number;
    data: Date;
}

export interface Feirante {
    id: number;
    nomeFeirante: string;
}

interface ApiResponse<T> { 
    success: boolean;
    message: string;
    total: number;
    hasNext: boolean;
    content: T[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://feira.mateuslh.com/api";

export const fetchPublicFeiras = async (): Promise<Feira[]> => { 
    try {
        const response = await fetch(`${API_BASE_URL}/feiras`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data: ApiResponse<Feira> = await response.json(); 

        if (!data.success) {
            throw new Error(`Erro ao buscar feiras: ${data.message}`);
        }

        return data.content.map((feira) => ({
            ...feira,
            data: new Date(feira.data),
        }));
    } catch (error) {
        console.error("Erro ao buscar feiras públicas:", error);
        throw error;
    }
};

export const fetchPublicEventosByFeiraId = async (feiraId: number): Promise<Evento[]> => { 
    try {
        const response = await fetch(`${API_BASE_URL}/feiras/${feiraId}/eventos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data: ApiResponse<Evento> = await response.json(); 

        if (!data.success) {
            throw new Error(`Erro ao buscar eventos da feira ${feiraId}: ${data.message}`);
        }

        return data.content.map((evento) => ({
            ...evento,
            data: new Date(evento.data),
        }));
    } catch (error) {
        console.error(`Erro ao buscar eventos para a feira ${feiraId}:`, error);
        throw error;
    }
};



export const fetchFeirantes = async (): Promise<Feirante[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/feirantes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data: ApiResponse<Feirante> = await response.json();

        if (!data.success) {
            throw new Error(`Erro ao buscar feirantes: ${data.message}`);
        }

        return data.content;
    } catch (error) {
        console.error(`Erro ao buscar feirantes:`, error);
        throw error;
    }
};
