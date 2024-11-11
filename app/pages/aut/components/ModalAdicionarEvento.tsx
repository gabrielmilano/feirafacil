import React, { useState } from 'react';

interface ModalAdicionarEventoProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Date) => void;
}

const ModalAdicionarEvento: React.FC<ModalAdicionarEventoProps> = ({ isOpen, onClose, onSubmit }) => {
    const [data, setData] = useState<Date | null>(null);

    const handleClose = () => {
        setData(null);
        onClose();
    };

    const handleSubmit = () => {
        if (!data) {
            alert('Por favor, preencha a data do evento.');
            return;
        }
        onSubmit(data);
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Adicionar Evento</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Data do Evento</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border rounded"
                        onChange={(e) => setData(new Date(e.target.value))}
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
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAdicionarEvento;
