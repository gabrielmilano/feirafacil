'use client';

import Link from 'next/link';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { fetchPublicFeiras, fetchPublicEventosByFeiraId } from './api/user/api';
import BannerCarousel from './components/BannerCarousel';
import Header from './components/Header';
import Footer from './components/Footer';
import { Feira, Evento } from './api/user/api';

const reviews = [
    { id: '1', name: 'Ana Souza', rating: 5, comment: 'Ótima experiência! A feira tem uma variedade incrível de produtos locais.' },
    { id: '2', name: 'João Oliveira', rating: 4, comment: 'Adorei as opções de alimentos frescos. A organização poderia ser melhor.' },
    { id: '3', name: 'Mariana Silva', rating: 5, comment: 'Excelente! Muito fácil de encontrar o que eu precisava e os produtores são muito simpáticos.' },
    { id: '4', name: 'Carlos Pereira', rating: 3, comment: 'Achei interessante, mas poderia ter mais opções de frutas.' },
    { id: '5', name: 'Fernanda Costa', rating: 4, comment: 'Gostei bastante, especialmente da área de artesanato.' }
];

export default function Home() {
    const [feiras, setFeiras] = useState<Feira[]>([]);
    const [eventos, setEventos] = useState<Evento[][]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const feirasData = await fetchPublicFeiras();
                setFeiras(feirasData);

                const eventosData = await Promise.all(
                    feirasData.map(feira => fetchPublicEventosByFeiraId(feira.id))
                );
                setEventos(eventosData);
            } catch (error) {
                setError('Erro ao buscar feiras e eventos. Tente novamente mais tarde.');
                console.error('Erro ao buscar feiras e eventos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <header className="text-center mb-8">
                        <img
                            src="/banners/logo.png"
                            alt="Logo da Feira Fácil"
                            className="mx-auto w-32 sm:w-48 md:w-64 lg:w-72 h-auto"
                        />
                        <p className="mt-4 text-gray-600">Conecte-se com produtores locais e descubra feiras próximas de você!</p>
                    </header>


                    <section className="mb-8">
                        <BannerCarousel
                            banners={[
                                { id: '1', imageUrl: '/banners/banner1.png', altText: 'Banner 1' },
                                { id: '2', imageUrl: '/banners/banner2.png', altText: 'Banner 2' },
                                { id: '3', imageUrl: '/banners/banner3.png', altText: 'Banner 3' }
                            ]}
                        />
                    </section>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Próximas Feiras</h2>
                            {feiras.map((feira, index) => (
                                <div key={feira.id} className="mb-6 bg-white p-4 rounded shadow">
                                    <h3 className="text-xl font-bold text-gray-700">{feira.nome}</h3>
                                    <p className="text-gray-700">{feira.descricao}</p>
                                    <h4 className="text-lg font-semibold mt-4">Próximos Eventos:</h4>
                                    {eventos[index]?.length ? (
                                        eventos[index]
                                            .filter(evento => new Date(evento.data) >= new Date()) // Filtra eventos passados
                                            .map(evento => (
                                                <p key={evento.id} className="text-gray-600">{new Date(evento.data).toLocaleDateString()}</p>
                                            ))
                                    ) : (
                                        <p className="text-gray-500">Nenhum evento programado.</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    <section className="bg-gray-200 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-black text-center">O que estão dizendo</h2>
                        <Slider {...settings}>
                            {reviews.map((review) => (
                                <div key={review.id} className="text-center p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                                    <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                                    <p className="text-gray-700 italic">{review.comment}</p>
                                </div>
                            ))}
                        </Slider>
                    </section>

                    <section className="text-center mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Acesse sua conta</h2>
                        <div className="space-y-4">
                            <Link href="/pages/public/login" className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 hover:text-gray-100">
                                Login
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
