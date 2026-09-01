import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from '@phosphor-icons/react'
import { ClipLoader } from 'react-spinners'
import CardProdutos from '../cardprodutos/CardProdutos'
import type Produto from '../../../models/Produto'
import { buscar } from '../../../services/Services'

function ListaProdutos() {

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [carregando, setCarregando] = useState<boolean>(false)

    async function buscarProdutos() {
        setCarregando(true)
        try {
            await buscar('/produtos', setProdutos)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarProdutos()
    }, [])

    return (
        <div className='container mx-auto px-4 py-8 min-h-[70vh]'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl font-extrabold'>Produtos</h1>
                <Link
                    to='/cadastrarproduto'
                    className='flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold rounded px-4 py-2'
                >
                    <PlusIcon size={20} weight='bold' />
                    Novo Produto
                </Link>
            </div>

            {carregando && (
                <div className='flex justify-center py-10'>
                    <ClipLoader color='#0f766e' size={48} />
                </div>
            )}

            {!carregando && produtos.length === 0 && (
                <p className='text-center text-gray-600'>Nenhum produto cadastrado ainda.</p>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {produtos.map((produto) => (
                    <CardProdutos key={produto.id} produto={produto} />
                ))}
            </div>
        </div>
    )
}

export default ListaProdutos