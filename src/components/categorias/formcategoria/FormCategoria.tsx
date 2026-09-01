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
    const [avisoDuplicada, setAvisoDuplicada] = useState<string>('')

    async function buscarPorId(id: string) {
        await buscar(`/categorias/${id}`, setCategoria)
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setAvisoDuplicada('')
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    // Verifica se já existe uma categoria com o mesmo nome (ignorando maiúsculas/espaços)
    async function buscarCategoriaExistente(nome: string): Promise<Categoria | undefined> {
        let encontradas: Categoria[] = []
        try {
            await buscar(`/categorias/nome/${nome}`, (dados: Categoria[]) => { encontradas = dados ?? [] })
        } catch {
            // Se a rota não encontrar nada, tratamos como "não existe"
            return undefined
        }
        return encontradas.find(
            (c) => c.nome.trim().toLowerCase() === nome.trim().toLowerCase()
        )
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setAvisoDuplicada('')

        try {
            if (id !== undefined) {
                // Edição: atualiza normalmente, sem checar duplicidade
                await atualizar('/categorias', categoria, setCategoria)
                navigate('/categorias')
                return
            }

            // Cadastro novo: só cria se ainda não existir uma categoria com esse nome
            const existente = await buscarCategoriaExistente(categoria.nome)

            if (existente) {
                setAvisoDuplicada(
                    `A categoria "${existente.nome}" já existe — nenhuma categoria nova foi criada.`
                )
                setIsLoading(false)
                return
            }

            await cadastrar('/categorias', categoria, setCategoria)
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
                    <label htmlFor='nome'>Nome da Categoria</label>
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

                {avisoDuplicada && (
                    <p className='text-danger text-sm text-center'>{avisoDuplicada}</p>
                )}

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