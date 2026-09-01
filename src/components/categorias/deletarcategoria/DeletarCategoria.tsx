import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import type Categoria from '../../../models/Categoria'
import { buscar, deletar } from '../../../services/Services'

function DeletarCategoria() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function buscarPorId(id: string) {
        await buscar(`/categorias/${id}`, setCategoria)
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)
        try {
            await deletar(`/categorias/${id}`)
            navigate('/categorias')
        } catch (error) {
            console.error('Erro ao deletar a categoria', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='container mx-auto flex flex-col items-center px-4 py-10 min-h-[70vh]'>
            <h1 className='text-3xl font-extrabold mb-6'>Deletar Categoria</h1>

            <p className='mb-4 text-center'>Tem certeza de que deseja apagar a categoria a seguir?</p>

            <div className='w-full max-w-md border rounded-2xl overflow-hidden mb-6'>
                <div className='p-4 bg-cream-dark'>
                    <p className='text-lg font-bold'>{categoria.nome}</p>
                </div>
            </div>

            <div className='flex gap-4'>
                <button
                    className='rounded bg-gray-400 hover:bg-gray-500 text-white font-bold px-6 py-2'
                    onClick={() => navigate('/categorias')}
                >
                    Cancelar
                </button>
                <button
                    className='rounded bg-danger hover:bg-danger-dark text-white font-bold px-6 py-2 flex items-center justify-center min-w-24'
                    onClick={deletarCategoria}
                >
                    {isLoading ? <ClipLoader color='#ffffff' size={20} /> : <span>Sim, deletar</span>}
                </button>
            </div>
        </div>
    )
}

export default DeletarCategoria