'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPublicFeiras } from '../../api/user/api';
import { fetchFeirantes } from '../../pages/aut/api/user/feiranteservice';
import { fetchEventos } from '../../pages/aut/api/user/eventoservice';
import { Feira } from '../../api/user/api';

interface Feirante {
  id: number;
  nomeFeirante: string;
  nomeEmpresa: string;
  telefone: string;
  email: string;
}

interface Evento {
  id: number;
  data: Date;
}

const FeiraDetail = () => {
  const { id } = useParams();
  const [feira, setFeira] = useState<Feira | null>(null);
  const [feirantes, setFeirantes] = useState<Feirante[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
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

          // Fetch feirantes relacionados à feira
          const feirantesData = await fetchFeirantes();
          setFeirantes(feirantesData.filter((feirante) => feirante.feiraId === Number(id)));

          // Fetch eventos relacionados à feira
          const eventosData = await fetchEventos(Number(id));
          setEventos(eventosData);
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

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Feirantes</h2>
        {feirantes.length > 0 ? (
          <ul className="mt-4">
            {feirantes.map((feirante: Feirante) => (
                <li key={feirante.id} className="mb-2">
                    <p>
                    <strong>Nome:</strong> {feirante.nomeFeirante} ({feirante.nomeEmpresa})
                    </p>
                    <p>
                    <strong>Telefone:</strong> {feirante.telefone} | <strong>Email:</strong> {feirante.email}
                    </p>
                </li>
                ))}
          </ul>
        ) : (
          <p>Nenhum feirante cadastrado.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Próximos Eventos</h2>
        {eventos.length > 0 ? (
          <ul className="mt-4">
            {eventos.map((evento) => (
              <li key={evento.id} className="mb-2">
                <p>
                  <strong>Data:</strong> {evento.data.toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há eventos programados.</p>
        )}
      </section>
    </div>
  );
};

export default FeiraDetail;
