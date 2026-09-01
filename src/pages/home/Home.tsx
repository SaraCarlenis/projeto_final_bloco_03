import { Link } from "react-router-dom";
import { FirstAidKitIcon } from "@phosphor-icons/react";

function Home() {
    return (
        <div className="bg-cream-dark">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 py-20 text-center md:text-left">

                <div className="flex flex-col gap-3 items-center md:items-start">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Seja bem-vindo!
                    </h1>
                    <p className="text-lg text-gray-700">
                        Aqui você encontra Medicamentos e Cosméticos!
                    </p>
                    <Link
                        to="/cadastrarcategoria"
                        className="mt-2 bg-primary hover:bg-primary-dark text-white rounded px-6 py-2 font-bold"
                    >
                        Cadastrar Categoria
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
    );
}

export default Home;