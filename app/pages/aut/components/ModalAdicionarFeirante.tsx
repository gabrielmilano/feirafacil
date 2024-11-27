import React, { useState, useEffect } from 'react';

interface ModalAdicionarFeiranteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { nomeFeirante: string; nomeEmpresa: string; cnpj: string; telefone: string; email: string; feiraId: number }) => void;
  feirante?: { nomeFeirante: string; nomeEmpresa: string; cnpj: string; telefone: string; email: string; feiraId: number }; // Prop para edição
}

const ModalAdicionarFeirante: React.FC<ModalAdicionarFeiranteProps> = ({ isOpen, onClose, onSubmit, feirante }) => {
  const [nomeFeirante, setNomeFeirante] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [feiraId, setFeiraId] = useState(0);

  useEffect(() => {
    if (isOpen && feirante) {
      setNomeFeirante(feirante.nomeFeirante);
      setNomeEmpresa(feirante.nomeEmpresa);
      setCnpj(feirante.cnpj);
      setTelefone(feirante.telefone);
      setEmail(feirante.email);
      setFeiraId(feirante.feiraId);
    } else {
      setNomeFeirante('');
      setNomeEmpresa('');
      setCnpj('');
      setTelefone('');
      setEmail('');
      setFeiraId(0);
    }
  }, [isOpen, feirante]);

  const handleSubmit = () => {
    if (nomeFeirante && nomeEmpresa && cnpj && telefone && email && feiraId) {
      onSubmit({
        nomeFeirante,
        nomeEmpresa,
        cnpj,
        telefone,
        email,
        feiraId
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">{feirante ? 'Editar Feirante' : 'Adicionar Feirante'}</h2>
        <div className="mb-4">
          <label className="block mb-1">Nome Feirante</label>
          <input
            type="text"
            value={nomeFeirante}
            onChange={(e) => setNomeFeirante(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Nome Empresa</label>
          <input
            type="text"
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">CNPJ</label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Telefone</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Feira ID</label>
          <input
            type="number"
            value={feiraId}
            onChange={(e) => setFeiraId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancelar</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {feirante ? 'Salvar alterações' : 'Adicionar feirante'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarFeirante;
