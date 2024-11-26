'use client';

import Link from 'next/link';
import { logoutUser } from '../../../hooks/authService'; 

export default function Header() {
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className="bg-gray-600 p-4">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li><Link href="/pages/aut/homeLogado" className="text-white">Home</Link></li>
          <li><Link href="/pages/aut/feiras" className="text-white">Feiras</Link></li>
          <li><Link href="/pages/aut/feirantes" className="text-white">Feirantes</Link></li>
          <li><Link href="/pages/aut/eventos" className="text-white">Eventos</Link></li>
        </ul>
        <button 
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
