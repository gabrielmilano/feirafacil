import React, { useState, useEffect } from 'react';

interface ModalAdicionarFeiraProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { nome: string; local: string; descricao: string }) => void;
    feira?: { nome: string; local: string; descricao: string }; // Prop para edição
}

const ModalAdicionarFeira: React.FC<ModalAdicionarFeiraProps> = ({ isOpen, onClose, onSubmit, feira }) => {
    const [nome, setNome] = useState('');
    const [local, setLocal] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        if (isOpen && feira) {
            setNome(feira.nome);
            setLocal(feira.local);
            setDescricao(feira.descricao);
        } else {
            setNome('');
            setLocal('');
            setDescricao('');
        }
    }, [isOpen, feira]);

    const handleClose = () => {
        setNome('');
        setLocal('');
        setDescricao('');
        onClose();
    };

    const handleSubmit = () => {
        if (!nome || !local || !descricao) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        onSubmit({ nome, local, descricao });
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">
                    {feira ? 'Editar Feira: ' + feira.nome : 'Adicionar Nova Feira'}
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Nome da Feira</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome da feira"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Local</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                        placeholder="Digite o local da feira"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Descrição</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded h-24 resize-none"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descreva a feira"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        {feira ? 'Atualizar Feira' : 'Adicionar Feira'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAdicionarFeira;
