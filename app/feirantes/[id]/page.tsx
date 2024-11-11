import { feirantes } from '../data/feirantes'; // Ajuste conforme necessário
import { feiras } from '../data/feiras'; // Ajuste conforme necessário
import Image from 'next/image';

type Produto = {
  id: string;
  nome: string;
  descricao: string;
  fotos: string[];
};

type Feirante = {
  id: string;
  nome: string;
  fotoPerfil: string;
  produtos: Produto[];
  feiras: string[];
};

type Feira = {
  id: string;
  nome: string;
};

// Função para buscar um feirante pelo ID
const getFeiranteById = (id: string): Feirante | undefined => {
  return feirantes.find((feirante) => feirante.id === id);
};

// Função para buscar uma feira pelo ID
const getFeiraById = (id: string): Feira | undefined => {
  return feiras.find((feira) => feira.id === id);
};

// Componente da página
export default async function FeirantePage({ params }: any) {
  const feirante = getFeiranteById(params.id);
  
  if (!feirante) {
    return <div>Feirante não encontrado.</div>;
  }

  const feirasParticipantes = await Promise.all(
    feirante.feiras.map((feiraId) => getFeiraById(feiraId))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <Image src={feirante.fotoPerfil} alt={feirante.nome} width={150} height={150} className="rounded-full mx-auto" />
        <h1 className="text-3xl font-bold mt-4">{feirante.nome}</h1>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        <ul className="space-y-4">
          {feirante.produtos.map((produto) => (
            <li key={produto.id} className="border p-4 rounded">
              <h3 className="text-xl font-semibold">{produto.nome}</h3>
              <p className="text-gray-600 mb-2">{produto.descricao}</p>
              <div className="flex space-x-2">
                {produto.fotos.map((foto, index) => (
                  <Image key={index} src={foto} alt={produto.nome} width={100} height={100} className="rounded" />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feiras Participantes</h2>
        <ul className="space-y-2">
          {feirasParticipantes.map((feira) => (
            <li key={feira?.id} className="border-b py-2">
              <p>
                <strong>{feira?.nome}</strong>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
