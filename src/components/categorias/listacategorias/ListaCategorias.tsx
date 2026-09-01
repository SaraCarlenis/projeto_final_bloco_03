import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import CardCategorias from '../cardcategorias/CardCategorias'
import type Categoria from '../../../models/Categoria'
import { buscar } from '../../../services/Services'

function ListaCategorias() {

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [carregando, setCarregando] = useState<boolean>(false)
    const [searchParams] = useSearchParams()

    // Termo de busca vindo da barra "Procurar" da Navbar (?nome=...)
    const termoBusca = searchParams.get('nome') ?? ''

    async function buscarCategorias() {
        setCarregando(true)
        try {
            if (termoBusca) {
                await buscar(`/categorias/nome/${termoBusca}`, setCategorias)
            } else {
                await buscar('/categorias', setCategorias)
            }
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarCategorias()
    }, [termoBusca])

    return (
        <div className='container mx-auto px-4 py-8 min-h-[70vh]'>
            <h1 className='text-3xl font-extrabold text-center mb-2'>Categorias</h1>

            {termoBusca && (
                <p className='text-center text-gray-600 mb-6'>
                    Resultados para "{termoBusca}" —{' '}
                    <Link to='/categorias' className='text-primary underline'>limpar busca</Link>
                </p>
            )}

            {carregando && (
                <div className='flex justify-center py-10'>
                    <ClipLoader color='#0f766e' size={48} />
                </div>
            )}

            {!carregando && categorias.length === 0 && (
                <p className='text-center text-gray-600 mt-6'>
                    {termoBusca
                        ? `Nenhuma categoria encontrada para "${termoBusca}".`
                        : 'Nenhuma categoria cadastrada ainda.'}
                </p>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {categorias.map((categoria) => (
                    <CardCategorias key={categoria.id} categoria={categoria} />
                ))}
            </div>
        </div>
    )
}

export default ListaCategorias