'use client';

import Link from 'next/link';
import withAuth from '../../../hoc/withAuth';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 mt-12">Portal do Administrador</h1>

        <div className="flex space-x-4">
          <Link href="/pages/aut/feirantes">
            <button className="bg-gray-500 text-white px-8 py-5 rounded hover:bg-gray-600">
              Feirantes
            </button>
          </Link>

          <Link href="/pages/aut/feiras">
            <button className="bg-gray-500 text-white px-8 py-5 rounded hover:bg-gray-600">
              Feiras
            </button>
          </Link>
          <Link href="/pages/aut/eventos">
            <button className="bg-gray-500 text-white px-8 py-5 rounded hover:bg-gray-600">
              Eventos
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
