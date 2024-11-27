"use client";

import React, { useEffect, useState } from 'react';
import { fetchEventos, addEvento, deleteEvento } from '../api/user/eventoservice'; 
import { fetchFeiras } from '../api/user/feiraservice';
import ModalAdicionarEvento from '../components/ModalAdicionarEvento';
import withAuth from '../../../hoc/withAuth';

interface Feira {
    id: number;
    nome: string;
    descricao: string;
}

interface Evento {
    id: number;
    data: Date;
    feiraId: number;
}

const EventosPage = () => {
    const [eventosData, setEventosData] = useState<Evento[]>([]);
    const [feiras, setFeiras] = useState<Feira[]>([]);
    const [selectedFeira, setSelectedFeira] = useState<Feira | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const feirasData = await fetchFeiras();
                setFeiras(feirasData);
            } catch (error) {
                console.error('Erro ao buscar feiras:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedFeira) {
            const fetchEventosForFeira = async () => {
                try {
                    const eventos = await fetchEventos(selectedFeira.id);
                    setEventosData(eventos.map(evento => ({ 
                        ...evento,
                        data: new Date(evento.data), 
                    })));
                } catch (error) {
                    console.error('Erro ao buscar eventos:', error);
                }
            };

            fetchEventosForFeira();
        }
    }, [selectedFeira]);

    const handleAddEvento = async (data: Date) => {
        if (selectedFeira) {
            try {
                const newEvento = await addEvento({ data, feiraId: selectedFeira.id });
                
                const eventoFormatado = {
                    id: newEvento.id, 
                    data: new Date(newEvento.data), 
                    feiraId: selectedFeira.id
                };

                setEventosData((prevEventos) => [...prevEventos, eventoFormatado]); 
                setIsModalOpen(false);
            } catch (error) {
                console.error('Erro ao adicionar evento:', error);
            }
        }
    };

    const handleDeleteEvento = async (eventoId: number) => {
        if (!selectedFeira) return; 

        const confirmDelete = window.confirm('Tem certeza que deseja excluir este evento?');
        if (!confirmDelete) return;

        try {
            await deleteEvento(selectedFeira.id, eventoId); 
            setEventosData((prevEventos) => prevEventos.filter((evento) => evento.id !== eventoId));
        } catch (error) {
            console.error('Erro ao excluir o evento:', error);
            if (error instanceof Error && error.message.includes('400 - Erro de integridade')) {
                alert('Não foi possível deletar o evento pois ele possui referências de feiras.');
            } else {
                alert('Ocorreu um erro ao tentar deletar o evento.');
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold mb-6">Gerenciar Eventos</h1>

            <div className="mb-4 flex items-center">
                <select
                    className="px-4 py-2 border rounded mr-2"
                    value={selectedFeira?.id || ''}
                    onChange={(e) => {
                        const feiraId = Number(e.target.value);
                        const feira = feiras.find(f => f.id === feiraId) || null;
                        setSelectedFeira(feira);
                    }}
                >
                    <option value="" disabled>Selecione uma feira</option>
                    {feiras.map((feira) => (
                        <option key={feira.id} value={feira.id}>{feira.nome}</option>
                    ))}
                </select>
                <button
                    onClick={() => selectedFeira && console.log(`Feira ${selectedFeira.nome} selecionada`)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-auto"
                >
                    Selecionar Feira
                </button>
            </div>

            {selectedFeira && (
                <>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold">{selectedFeira.nome}</h2>
                        <p className="text-gray-700">{selectedFeira.descricao}</p>
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-auto"
                        >
                            Adicionar Evento
                        </button>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Próximos Eventos</h2>

                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b">Data</th>
                                    <th className="py-2 px-4 border-b">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventosData.length > 0 ? (
                                    eventosData.map((evento) => (
                                        <tr key={evento.id} className="text-center">
                                            <td className="py-2 px-4 border-b">{evento.data.toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                    onClick={() => handleDeleteEvento(evento.id)} 
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="py-4 text-center text-gray-500">
                                            Nenhum evento encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </>
            )}

            <ModalAdicionarEvento
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(data) => handleAddEvento(data)}
            />
        </div>
    );
};

export default withAuth(EventosPage);
