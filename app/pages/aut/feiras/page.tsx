'use client';

import { useEffect, useState } from 'react';
import { fetchFeiras, addFeira, deleteFeira, updateFeira } from '../api/user/feiraservice';
import ModalAdicionarFeira from '../components/ModalAdicionarFeira';
import withAuth from '../../../hoc/withAuth';

interface Feira {
    id: number; 
    nome: string;
    local: string;
    descricao: string;
}

const FeirasPage = () => {
    const [feirasData, setFeirasData] = useState<Feira[]>([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFeira, setEditingFeira] = useState<Feira | null>(null); // Estado para feira em edição

    useEffect(() => {
        const fetchData = async () => {
            const feiras = await fetchFeiras();
            setFeirasData(feiras);
        };

        fetchData();
    }, []);

    const handleAddFeira = async (feira: Omit<Feira, 'id'>) => {
        try {
            const newFeira = await addFeira(feira);
    
            if (newFeira && newFeira.id && newFeira.nome && newFeira.local && newFeira.descricao) {
                setFeirasData((prevFeiras) => {
                    const exists = prevFeiras.some(item => item.id === newFeira.id);
                    return exists ? prevFeiras : [...prevFeiras, newFeira];
                });
            } else {
                const updatedFeiras = await fetchFeiras();
                setFeirasData(updatedFeiras);
            }
        } catch (error) {
            console.error('Erro ao adicionar feira:', error);
        }
    };

    const handleEdit = (id: number) => {
        const feiraToEdit = feirasData.find((feira) => feira.id === id);
        if (feiraToEdit) {
            setEditingFeira(feiraToEdit);
            setIsModalOpen(true);
        }
    };

    const handleModalSubmit = async (data: any) => {
        if (editingFeira) {
            // Atualiza a feira existente
            await updateFeira(editingFeira.id, data);
            setFeirasData((prevFeiras) =>
                prevFeiras.map((feira) =>
                    feira.id === editingFeira.id ? { ...feira, ...data } : feira
                )
            );
        } else {
            // Adiciona uma nova feira
            await handleAddFeira(data);
        }
        setIsModalOpen(false);
        setEditingFeira(null); // Reseta a feira em edição
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta feira?');
        if (!confirmDelete) return;
    
        try {
            await deleteFeira(id);
            setFeirasData((prevFeiras) => prevFeiras.filter((feira) => feira.id !== id));
        } catch (error) {
            console.error('Erro ao excluir a feira:', error);
            if (error instanceof Error && error.message.includes('400 - Erro de integridade')) {
                alert('Não foi possível deletar a feira pois ela possui eventos ou feirantes relacionados.');
            } else {
                alert('Ocorreu um erro ao tentar deletar a feira.');
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold mb-6">Gerenciar Feiras</h1>

            <div className="mb-4">
                <button
                    onClick={() => {
                        setEditingFeira(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-auto"
                >
                    Adicionar Feira
                </button>
            </div>

            <ModalAdicionarFeira
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                feira={editingFeira ? { nome: editingFeira.nome, local: editingFeira.local, descricao: editingFeira.descricao } : undefined} // Passa os dados corretamente para edição
            />

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Próximas Feiras</h2>

                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">Nome</th>
                            <th className="py-2 px-4 border-b">Local</th>
                            <th className="py-2 px-4 border-b">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feirasData.length > 0 ? (
                            feirasData.map((feira, index) => (
                                <tr key={`${feira.id}-${index}`} className="text-center">
                                    <td className="py-2 px-4 border-b">{feira.nome}</td>
                                    <td className="py-2 px-4 border-b">{feira.local}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEdit(feira.id)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(feira.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-4 text-center">Nenhuma feira cadastrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default withAuth(FeirasPage);
