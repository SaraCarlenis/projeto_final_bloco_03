import { useState } from "react";
import { Link } from "react-router-dom";
import { ListIcon, XIcon, FirstAidKitIcon, MagnifyingGlassIcon, UserIcon, ShoppingCartIcon } from "@phosphor-icons/react";

function Navbar() {

    // Controla a abertura do menu no formato mobile (hambúrguer)
    const [menuAberto, setMenuAberto] = useState(false);

    function fecharMenu() {
        setMenuAberto(false);
    }

    return (
        <div className="w-full flex flex-col items-center bg-primary text-white sticky top-0 z-50 shadow">

            <div className="container flex justify-between items-center gap-4 mx-auto px-4 md:px-8 py-3">

                {/* Logo */}
                <Link to="/" onClick={fecharMenu} className="flex items-center gap-2 text-xl font-extrabold shrink-0">
                <FirstAidKitIcon size={30} weight="fill" className="text-white" />
                    Farmácia Vida+
                </Link>

                {/* Barra de busca — visível a partir do tablet/desktop */}
                <form className="hidden md:flex flex-1 max-w-md">
                    <input
                    type="text"
                    placeholder="Procurar"
                    className="w-full rounded-l px-3 py-1.5 text-black outline-none border border-primary-dark"
                />
                <button type="submit" className="bg-primary-dark hover:bg-primary rounded-r px-3 flex items-center justify-center border border-primary-dark">
                    <MagnifyingGlassIcon size={20} />
                </button>
                </form>

                {/* Links + ícones — desktop */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/categorias" className="hover:underline">Categorias</Link>
                    <Link to="/cadastrarcategoria" className="hover:underline">Cadastrar Categoria</Link>
                    <Link to="/perfil" aria-label="Perfil"><UserIcon size={26} /></Link>
                    <Link to="/carrinho" aria-label="Carrinho"><ShoppingCartIcon size={26} /></Link>
                </div>

                {/* Ícones + hambúrguer — mobile */}
                <div className="flex md:hidden items-center gap-4">
                    <Link to="/perfil" aria-label="Perfil"><UserIcon size={24} /></Link>
                    <Link to="/carrinho" aria-label="Carrinho"><ShoppingCartIcon size={24} /></Link>
                    <button
                        type="button"
                        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        {menuAberto ? <XIcon size={26} /> : <ListIcon size={26} />}
                    </button>
                </div>
            </div>

            {/* Menu suspenso do mobile — links + busca */}
            {menuAberto && (
                <div className="md:hidden w-full flex flex-col items-center gap-4 pb-4 text-lg">
                    <form className="flex w-4/5">
                        <input
                            type="text"
                            placeholder="Procurar"
                            className="w-full rounded-l px-3 py-1.5 text-black outline-none"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-r px-3 flex items-center justify-center">
                            <MagnifyingGlassIcon size={20} />
                        </button>
                    </form>
                    <Link to="/categorias" onClick={fecharMenu} className="hover:underline">Categorias</Link>
                    <Link to="/cadastrarcategoria" onClick={fecharMenu} className="hover:underline">Cadastrar Categoria</Link>
                </div>
            )}

        </div>
    );
}

export default Navbar;