import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-600 p-4">
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-white">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
}
