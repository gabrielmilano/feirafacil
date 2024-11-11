
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <Link href="/">Home</Link>
      <Link href="/login" className="ml-4">Login</Link>
      <Link href="/register" className="ml-4">Registrar</Link>
    </nav>
  );
};

export default Navbar;
