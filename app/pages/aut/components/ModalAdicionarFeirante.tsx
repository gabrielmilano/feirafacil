import React, { useState } from 'react';

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
  const [feiraId, setFeiraId] = useState(0);
  const [error, setError] = useState('');

  const handleClose = () => {
    // Limpa os campos e o erro ao fechar o modal
    setNomeFeirante('');
    setNomeEmpresa('');
    setCnpj('');
    setTelefone('');
    setEmail('');
    setFeiraId(0);
    setError(''); // Limpa a mensagem de erro
    onClose();
  };

  const isCNPJValid = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cnpj.length !== 14) return false;

    // Aqui você pode adicionar uma validação mais robusta, se necessário
    return true;
  };

  const handleSubmit = () => {
    if (!nomeFeirante || !nomeEmpresa || !cnpj || !telefone || !email || !feiraId) {
      setError('Por favor, preencha todos os campos.'); // Usa setError em vez de alert
      return;
    }

    // Validação do CNPJ
    if (!isCNPJValid(cnpj)) {
      setError('O CNPJ informado é inválido. Por favor, verifique e tente novamente.'); // Atualiza a mensagem de erro
      return; // Não fecha o modal
    }

    // Limpa a mensagem de erro antes de enviar
    setError('');
    onSubmit({ nomeFeirante, nomeEmpresa, cnpj, telefone, email, feiraId });
    handleClose(); // Fecha o modal apenas se a submissão foi bem-sucedida
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Adicionar Feirante</h2>
        
        {error && <p className="text-red-600 mb-4">{error}</p>} {/* Exibição de erros */}

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
          <label className="block text-gray-700">Feira ID</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded"
            value={feiraId}
            onChange={(e) => setFeiraId(Number(e.target.value))}
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
            className="bg-gray,0-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarFeirante;
