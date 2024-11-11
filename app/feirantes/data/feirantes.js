// data/feirantes.js

export const feirantes = [
    {
      id: '1',
      nome: 'Maria da Silva',
      fotoPerfil: '/images/maria.jpg',
      produtos: [
        {
          id: 'p1',
          nome: 'Queijo Artesanal',
          descricao: 'Queijo feito com técnica tradicional, ideal para tábuas de frios.',
          fotos: ['/images/queijo1.jpg', '/images/queijo2.jpg']
        },
        {
          id: 'p2',
          nome: 'Mel de Abelha',
          descricao: 'Mel puro, colhido diretamente de colmeias locais, perfeito para adoçar sua vida.',
          fotos: ['/images/mel1.jpg', '/images/mel2.jpg']
        }
      ],
      feiras: ['f1', 'f2']
    },
    {
      id: '2',
      nome: 'João Pereira',
      fotoPerfil: '/images/joao.jpg',
      produtos: [
        {
          id: 'p3',
          nome: 'Verduras Orgânicas',
          descricao: 'Produzidas sem agrotóxicos, frescas e cheias de sabor.',
          fotos: ['/images/verdura1.jpg', '/images/verdura2.jpg']
        },
        {
          id: 'p4',
          nome: 'Frutas da Estação',
          descricao: 'Frutas frescas e saborosas, colhidas na hora.',
          fotos: ['/images/fruta1.jpg', '/images/fruta2.jpg']
        }
      ],
      feiras: ['f1']
    },
    {
      id: '3',
      nome: 'Ana Costa',
      fotoPerfil: '/images/ana.jpg',
      produtos: [
        {
          id: 'p5',
          nome: 'Doces Caseiros',
          descricao: 'Uma variedade de doces, todos feitos com amor e ingredientes locais.',
          fotos: ['/images/doce1.jpg', '/images/doce2.jpg']
        }
      ],
      feiras: ['f2']
    }
  ];