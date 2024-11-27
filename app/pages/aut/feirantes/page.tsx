'use client';

import { useEffect, useState } from 'react';
import ModalAdicionarFeirante from '../components/ModalAdicionarFeirante'; 
import { fetchFeirantes, addFeirante, deleteFeirante, updateFeirante } from '../api/user/feiranteservice'; 
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

  const handleEdit = async (feiranteId: number, updatedData: Omit<Feirante, 'id'>) => {
    try {
      const updatedFeirante = await updateFeirante(feiranteId, updatedData);
      setFeirantesData((prevData) =>
        prevData.map((feirante) =>
          feirante.id === feiranteId ? updatedFeirante : feirante
        )
      );
      setErrorMessage('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro ao atualizar feirante.');
      }
    }
  };
  

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta feira?');
    if (!confirmDelete) return;

    try {
        await deleteFeirante(id);
        setFeirantesData((prevFeirantes) => prevFeirantes.filter((feirantes) => feirantes.id !== id));
    } catch (error) {
        console.error('Erro ao excluir feirante:', error);
    }
};

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Feirantes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar Feirante
        </button>
      </div>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nome Feirante</th>
              <th className="px-4 py-2 border">Nome da Empresa</th>
              <th className="px-4 py-2 border">CNPJ</th>
              <th className="px-4 py-2 border">Telefone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {feirantesData.map((feirante) => (
              <tr key={feirante.id}>
                <td className="px-4 py-2 border">{feirante.nomeFeirante}</td>
                <td className="px-4 py-2 border">{feirante.nomeEmpresa}</td>
                <td className="px-4 py-2 border">{feirante.cnpj}</td>
                <td className="px-4 py-2 border">{feirante.telefone}</td>
                <td className="px-4 py-2 border">{feirante.email}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(feirante.id, {
                      nomeFeirante: feirante.nomeFeirante,
                      nomeEmpresa: feirante.nomeEmpresa,
                      cnpj: feirante.cnpj,
                      telefone: feirante.telefone,
                      email: feirante.email,
                      feiraId: feirante.feiraId
                    })}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(feirante.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalAdicionarFeirante
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFeirante}
      />
    </div>
  );
};

export default withAuth(FeirantesPage);