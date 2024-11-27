import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchFeirantes, Feirante } from '../../../../api/user/api';

export default function FeiraPage() {
    const router = useRouter();
    const { id } = router.query;

    const [feirantes, setFeirantes] = useState<Feirante[]>([]);
    const [filteredFeirantes, setFilteredFeirantes] = useState<Feirante[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const feirantesData = await fetchFeirantes();
                setFeirantes(feirantesData);
            } catch (error) {
                setError('Erro ao buscar feirantes. Tente novamente mais tarde.');
                console.error('Erro ao buscar feirantes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!id || !feirantes.length) return;

        // Filtrar feirantes pelo feiraId
        const filtered = feirantes.filter((feirante) => feirante.id === Number(id));
        setFilteredFeirantes(filtered);
    }, [id, feirantes]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Feirantes</h1>

            {filteredFeirantes.length ? (
                <ul>
                    {filteredFeirantes.map((feirante) => (
                        <li key={feirante.id} className="mb-2">
                            <p className="text-gray-800">{feirante.nomeFeirante}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Nenhum feirante encontrado para esta feira.</p>
            )}
        </div>
    );
}
