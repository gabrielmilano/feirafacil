'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../../hooks/authService';  

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginUser({ usuario, senha });
      router.push('/pages/aut/homeLogado');  
    } catch (error) {
      setError('Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-center text-black-600">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-gray-700">Usuário</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-gray-600'} hover:bg-gray-700`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
