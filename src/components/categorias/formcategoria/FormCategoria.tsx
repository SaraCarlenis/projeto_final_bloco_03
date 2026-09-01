import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import type Categoria from '../../../models/Categoria'
import { atualizar, buscar, cadastrar } from '../../../services/Services'

function FormCategoria() {

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (id !== undefined) {
                await atualizar('/categorias', categoria, setCategoria)
            } else {
                await cadastrar('/categorias', categoria, setCategoria)
            }
            navigate('/categorias')
        } catch (error) {
            console.error('Erro ao salvar a categoria', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='container mx-auto flex flex-col items-center px-4 py-10 min-h-[70vh]'>
            <h1 className='text-3xl font-extrabold mb-6'>
                {id !== undefined ? 'Editar Categoria' : 'Cadastrar Categoria'}
            </h1>

            <form className='w-full max-w-md flex flex-col gap-4' onSubmit={gerarNovaCategoria}>
                <div className='flex flex-col'>
                    <label htmlFor='nome'>Categoria</label>
                    <input
                        type='text'
                        id='nome'
                        name='nome'
                        placeholder='Nome'
                        className='border-2 border-primary rounded p-2'
                        value={categoria.nome ?? ''}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='rounded bg-primary hover:bg-primary-dark text-white font-bold py-2 flex justify-center'
                >
                    {isLoading
                        ? <ClipLoader color='#ffffff' size={24} />
                        : <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    )
}

export default FormCategoria