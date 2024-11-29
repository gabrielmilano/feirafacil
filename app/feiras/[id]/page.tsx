// app/feiras/[id]/page.tsx

import { fetchPublicFeiras, Feira } from '@/app/api/user/api';
import { notFound } from 'next/navigation';

interface FeiraPageProps {
    params: {
        id: string;
    };
}

export async function getStaticProps({ params }: FeiraPageProps) {
    const feiras = await fetchPublicFeiras();
    const feira = feiras.find((f) => f.id === parseInt(params.id, 10));

    if (!feira) {
        notFound();
    }

    return {
        props: { feira },
    };
}

export default function FeiraPage({ feira }: { feira: Feira }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{feira.nome}</h1>
            <p className="text-lg text-gray-700 mb-4">{feira.descricao}</p>
            <p className="text-gray-600">Local: {feira.local}</p>
            <p className="text-gray-600">Data: {new Date(feira.data).toLocaleDateString()}</p>
            <img
                src={`/images/${feira.imagemId}.jpg`}
                alt={`Imagem da feira ${feira.nome}`}
                className="mt-4 max-w-full rounded"
            />
        </div>
    );
}
