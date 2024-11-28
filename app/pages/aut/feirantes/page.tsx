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
  const [editingFeirante, setEditingFeirante] = useState<Feirante | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Carrega os dados dos feirantes
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
      setErrorMessage('');
      await fetchData(); // Atualiza os dados após adicionar
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao adicionar feirante.');
      console.error('Erro ao adicionar feirante:', error);
    }
  };

  const handleEdit = (feiranteId: number) => {
    const feiranteToEdit = feirantesData.find((feirante) => feirante.id === feiranteId);
    if (feiranteToEdit) {
      setEditingFeirante(feiranteToEdit);
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = async (data: Omit<Feirante, 'id'>) => {
    try {
      if (editingFeirante) {
        await updateFeirante(editingFeirante.id, data);
      } else {
        await handleAddFeirante(data);
      }
      await fetchData(); // Atualiza os dados após edição ou adição
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    } finally {
      setIsModalOpen(false);
      setEditingFeirante(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este feirante?');
    if (!confirmDelete) return;

    try {
      await deleteFeirante(id);
      await fetchData(); // Atualiza os dados após exclusão
    } catch (error) {
      console.error('Erro ao excluir feirante:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Feirantes</h1>

      <div className="mb-4">
        <button
          onClick={() => {
            setEditingFeirante(null);
            setIsModalOpen(true);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-auto"
        >
          Adicionar Feirante
        </button>
      </div>

      <ModalAdicionarFeirante
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        feirante={editingFeirante ? { ...editingFeirante } : undefined}
      />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Feirantes Cadastrados</h2>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nome Feirante</th>
              <th className="py-2 px-4 border-b">Nome da Empresa</th>
              <th className="py-2 px-4 border-b">CNPJ</th>
              <th className="py-2 px-4 border-b">Opções</th>
            </tr>
          </thead>
          <tbody>
            {feirantesData.length > 0 ? (
              feirantesData.map((feirante) => (
                <tr key={feirante.id} className="text-center">
                  <td className="py-2 px-4 border-b">{feirante.nomeFeirante}</td>
                  <td className="py-2 px-4 border-b">{feirante.nomeEmpresa}</td>
                  <td className="py-2 px-4 border-b">{feirante.cnpj}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(feirante.id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(feirante.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center">Nenhum feirante cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default withAuth(FeirantesPage);
