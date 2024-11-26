'use client';

import Link from 'next/link';
import withAuth from '../../../hoc/withAuth';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#f3f4f6] text-black py-4 text-center">
        <h1 className="text-4xl font-bold">Portal do Administrador</h1>
        <p className="mt-2">Bem-vindo de volta!</p>
      </header>
      <main className="flex-grow flex flex-col items-center p-6 bg-gray-100">
        {/* Ajuste para os cards ficarem mais acima */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
          {/* Card de Feirantes */}
          <Link href="/pages/aut/feirantes">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300">
              <div className="bg-[#6fcf97] p-6 text-white text-center">
                <h2 className="text-xl font-semibold">Feirantes</h2>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-700">Gerenciar feirantes cadastrados.</p>
              </div>
            </div>
          </Link>

          {/* Card de Feiras */}
          <Link href="/pages/aut/feiras">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300">
              <div className="bg-[#6fcf97] p-6 text-white text-center">
                <h2 className="text-xl font-semibold">Feiras</h2>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-700">Administre as feiras cadastradas.</p>
              </div>
            </div>
          </Link>

          {/* Card de Eventos */}
          <Link href="/pages/aut/eventos">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300">
              <div className="bg-[#6fcf97] p-6 text-white text-center">
                <h2 className="text-xl font-semibold">Eventos</h2>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-700">Gerencie os eventos programados.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Seção abaixo dos cards */}
        <div className="text-center mb-12 px-4">
          <p className="text-lg text-gray-700 mb-4">
            Aqui você pode gerenciar feirantes, feiras e eventos de forma rápida e eficiente. Acesse as seções acima para realizar todas as suas atividades administrativas, como adicionar feirantes, criar novas feiras e editar os eventos das respectivas feiras.
          </p>
          <div className="flex justify-center">
            {/* Espaço para o vídeo do YouTube */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/arxlQTqLURg"  // Substitua pelo link do vídeo
              title="Vídeo explicativo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
