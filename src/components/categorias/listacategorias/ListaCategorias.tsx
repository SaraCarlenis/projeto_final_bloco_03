import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import CardCategorias from '../cardcategorias/CardCategorias'
import type Categoria from '../../../models/Categoria'
import { buscar } from '../../../services/Services'

function ListaCategorias() {

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [carregando, setCarregando] = useState<boolean>(false)

    async function buscarCategorias() {
        setCarregando(true)
        try {
            await buscar('/categorias', setCategorias)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarCategorias()
    }, [])

    return (
        <div className='container mx-auto px-4 py-8 min-h-[70vh]'>
            <h1 className='text-3xl font-extrabold text-center mb-8'>Categorias</h1>

            {carregando && (
                <div className='flex justify-center py-10'>
                    <ClipLoader color='#0f766e' size={48} />
                </div>
            )}

            {!carregando && categorias.length === 0 && (
                <p className='text-center text-gray-600'>Nenhuma categoria cadastrada ainda.</p>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categorias.map((categoria) => (
                    <CardCategorias key={categoria.id} categoria={categoria} />
                ))}
            </div>
        </div>
    )
}

export default ListaCategorias