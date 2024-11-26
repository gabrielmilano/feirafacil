'use client';

import Link from 'next/link';
import withAuth from '../../../hoc/withAuth';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">Portal do Administrador</h1>
        <p className="mt-2">Bem-vindo de volta, Admin!</p>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Card de Feirantes */}
          <Link href="/pages/aut/feirantes">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300">
              <div className="bg-blue-500 p-6 text-white text-center">
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
              <div className="bg-green-500 p-6 text-white text-center">
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
              <div className="bg-purple-500 p-6 text-white text-center">
                <h2 className="text-xl font-semibold">Eventos</h2>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-700">Gerencie os eventos programados.</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
