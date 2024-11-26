import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-600 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
}
