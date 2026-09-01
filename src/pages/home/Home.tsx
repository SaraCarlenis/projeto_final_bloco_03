import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FirstAidKitIcon } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import CardProdutos from "../../components/produtos/cardprodutos/CardProdutos";
import type Produto from "../../models/Produto";
import { buscar } from "../../services/Services";

function Home() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);

    async function buscarProdutos() {
        setCarregando(true);
        try {
            await buscar('/produtos', setProdutos);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <>
            <div className="bg-cream-dark">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 py-20 text-center md:text-left">

                    <div className="flex flex-col gap-3 items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            Seja bem-vinde!
                        </h1>
                        <p className="text-lg text-gray-700">
                            Aqui você encontra Medicamentos e Cosméticos!
                        </p>
                        <Link
                            to="/cadastrarproduto"
                            className="mt-2 bg-primary hover:bg-primary-dark text-white rounded px-6 py-2 font-bold"
                        >
                            Cadastrar Produto
                        </Link>
                    </div>

                    {/* Ilustração decorativa */}
                    <div className="flex justify-center">
                        <div className="bg-secondary/40 rounded-full w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                            <FirstAidKitIcon size={140} weight="duotone" className="text-primary" />
                        </div>
                    </div>

                </div>
            </div>

            {/* Produtos em destaque */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-extrabold text-center mb-8">Nossos Produtos</h2>

                {carregando && (
                    <div className="flex justify-center py-10">
                        <ClipLoader color="#0f766e" size={48} />
                    </div>
                )}

                {!carregando && produtos.length === 0 && (
                    <p className="text-center text-gray-600">Nenhum produto cadastrado ainda.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produtos.map((produto) => (
                        <CardProdutos key={produto.id} produto={produto} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;