'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { fetchPublicFeiras } from '../../api/user/api';
import { Feira } from '../../api/user/api';

const FeiraDetail = () => {
  const { id } = useParams(); 
  const [feira, setFeira] = useState<Feira | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchFeiraData = async () => {
      setLoading(true);
      try {
        const feiras = await fetchPublicFeiras();
        const selectedFeira = feiras.find((f) => f.id === Number(id));
        if (selectedFeira) {
          setFeira(selectedFeira);
        } else {
          setError('Feira não encontrada.');
        }
      } catch (err) {
        console.error('Erro ao buscar feira:', err);
        setError('Erro ao buscar feira. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeiraData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!feira) return <p>Feira não encontrada.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{feira.nome}</h1>
      <p className="mt-4">{feira.descricao}</p>
      <p className="mt-2">Local: {feira.local}</p>
    </div>
  );
};

export default FeiraDetail;
