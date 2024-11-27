import React, { useState, useEffect } from 'react';
import { fetchFeiras } from '../api/user/feiraservice';

interface Feira {
  id: number;
  nome: string;
}

interface ModalAdicionarFeiranteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { nomeFeirante: string; nomeEmpresa: string; cnpj: string; telefone: string; email: string; feiraId: number }) => void;
}

const ModalAdicionarFeirante: React.FC<ModalAdicionarFeiranteProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nomeFeirante, setNomeFeirante] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [feiraId, setFeiraId] = useState<number | null>(null);
  const [feiras, setFeiras] = useState<Feira[]>([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try {
            const feirasData = await fetchFeiras();
            setFeiras(feirasData);
        } catch (error) {
            console.error('Erro ao buscar feiras:', error);
        }
    };

  
    if (isOpen) {
        fetchData();
    }
}, [isOpen]);

  const handleClose = () => {
    setNomeFeirante('');
    setNomeEmpresa('');
    setCnpj('');
    setTelefone('');
    setEmail('');
    setFeiraId(null);
    setError('');
    onClose();
  };

  const isCNPJValid = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!nomeFeirante || !nomeEmpresa || !cnpj || !telefone || !email || feiraId === null) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!isCNPJValid(cnpj)) {
      setError('O CNPJ informado é inválido. Por favor, verifique e tente novamente.');
      return;
    }

    setError('');
    onSubmit({ nomeFeirante, nomeEmpresa, cnpj, telefone, email, feiraId });
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Adicionar Feirante</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Nome do Feirante</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={nomeFeirante}
            onChange={(e) => setNomeFeirante(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nome da Empresa</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">CNPJ</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Telefone</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Selecione a Feira</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={feiraId || ''}
            onChange={(e) => setFeiraId(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecione uma feira
            </option>
            {feiras.map((feira) => (
              <option key={feira.id} value={feira.id}>
                {feira.nome}
              </option>
            ))}
          </select>
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
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarFeirante;
