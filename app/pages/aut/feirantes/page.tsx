'use client';

import { useEffect, useState } from 'react';
import ModalAdicionarFeirante from '../components/ModalAdicionarFeirante'; 
import { fetchFeirantes, addFeirante } from '../api/user/feiranteservice'; 
import withAuth from '../../../hoc/withAuth';

interface Feirante {
  id: number;
  nomeFeirante: string; 
  nomeEmpresa: string;
  cnpj: string;
  telefone: string; 
  email: string; 
  feiraId: number; 
}

const FeirantesPage = () => {
  const [feirantesData, setFeirantesData] = useState<Feirante[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const feirantes = await fetchFeirantes();
      setFeirantesData(feirantes);
    } catch (error) {
      console.error('Erro ao buscar feirantes:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Chamada inicial para carregar os dados
  }, []);

  const handleAddFeirante = async (feirante: Omit<Feirante, 'id'>) => {
    try {
      await addFeirante(feirante);
      setErrorMessage(''); // Limpa mensagem de erro ao adicionar com sucesso
      fetchData(); // Refetch para garantir que a lista está atualizada
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Define a mensagem de erro para exibir
      } else {
        setErrorMessage('Erro ao adicionar feirante.'); // Mensagem padrão para erros não esperados
      }
      console.error('Erro ao adicionar feirante:', error);
    }
  };

  const handleEdit = (id: number) => {
    // Lógica de edição
  };

  const handleDelete = (id: number) => {
    // Lógica de exclusão
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Feirantes</h1>
  
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Exibe a mensagem de erro */}
  
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-auto"
        >
          Adicionar Feirante
        </button>
      </div>
  
      <ModalAdicionarFeirante
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFeirante}
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome do Feirante</th>
            <th className="border px-4 py-2">Nome da Empresa</th>
            <th className="border px-4 py-2">CNPJ</th>
            <th className="border px-4 py-2">Telefone</th>
            <th className="border px-4 py-2">Email</th> 
            <th className="border px-4 py-2">Feira ID</th>
            <th className="py-2 px-4 border-b">Opções</th>
          </tr>
        </thead>
        <tbody>
          {feirantesData.map((feirante, index) => (
            <tr key={`${feirante.id}-${index}`}>
              <td className="border px-4 py-2">{feirante.nomeFeirante}</td>
              <td className="border px-4 py-2">{feirante.nomeEmpresa}</td>
              <td className="border px-4 py-2">{feirante.cnpj}</td>
              <td className="border px-4 py-2">{feirante.telefone}</td>
              <td className="border px-4 py-2">{feirante.email}</td> 
              <td className="border px-4 py-2">{feirante.feiraId}</td>
              <td className="py-2 px-4 border-b flex justify-center space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleEdit(feirante.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(feirante.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(FeirantesPage);
