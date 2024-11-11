

interface Feira {
    id: string;
    nome: string;
    local: string;
  }
  
  interface FeiraListAutProps {
    feiras: Feira[];
  }
  
  const FeiraListAut: React.FC<FeiraListAutProps> = ({ feiras }) => {
    return (
        <ul>
            {feiras.length > 0 ? (
                feiras.map((feira) => (
                    <li key={feira.id} className="mb-2 p-4 border rounded">
                        <h3 className="text-lg font-semibold">{feira.nome}</h3>
                        <p>{feira.local}</p>
                    </li>
                ))
            ) : (
                <li className="text-gray-500">Nenhuma feira encontrada.</li>
            )}
        </ul>
    );
  };
  
  export default FeiraListAut;
  