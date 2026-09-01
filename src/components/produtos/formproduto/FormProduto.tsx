import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import type Produto from '../../../models/Produto'
import type Categoria from '../../../models/Categoria'
import { atualizar, buscar, cadastrar } from '../../../services/Services'

function FormProduto() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [produto, setProduto] = useState<Produto>({} as Produto)
    const [precoTexto, setPrecoTexto] = useState<string>('')
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [carregandoCategoria, setCarregandoCategoria] = useState<boolean>(false)

    async function buscarCategorias() {
        setCarregandoCategoria(true)
        try {
            await buscar('/categorias', setCategorias)
        } finally {
            setCarregandoCategoria(false)
        }
    }

    async function buscarPorId(id: string) {
        await buscar(`/produtos/${id}`, (dados: Produto) => {
            setProduto(dados)
            setPrecoTexto(dados.preco !== undefined && dados.preco !== null ? String(dados.preco) : '')
        })
    }

    useEffect(() => {
        buscarCategorias()
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value
        })
    }

    // Campo de preço tratado como texto livre enquanto o usuário digita,
    // pra não travar em "0" nem perder o "." no meio da digitação.
    // Só vira número de verdade na hora de enviar pro backend (gerarNovoProduto).
    function atualizarPreco(e: ChangeEvent<HTMLInputElement>) {
        const valor = e.target.value
        if (valor === '' || /^\d*\.?\d{0,2}$/.test(valor)) {
            setPrecoTexto(valor)
        }
    }

    function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {
        const categoriaSelecionada = categorias.find((c) => c.id === Number(e.target.value))
        setProduto({
            ...produto,
            categoria: categoriaSelecionada
        })
    }

    async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const produtoParaEnviar: Produto = {
            ...produto,
            preco: Number(precoTexto)
        }

        try {
            if (id !== undefined) {
                await atualizar('/produtos', produtoParaEnviar, setProduto)
            } else {
                await cadastrar('/produtos', produtoParaEnviar, setProduto)
            }
            navigate('/produtos')
        } catch (error) {
            console.error('Erro ao salvar o produto', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='container mx-auto flex flex-col items-center px-4 py-10 min-h-[70vh]'>
            <h1 className='text-3xl font-extrabold mb-6'>
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className='w-full max-w-md flex flex-col gap-4' onSubmit={gerarNovoProduto}>
                <div className='flex flex-col'>
                    <label htmlFor='nome'>Nome do Produto</label>
                    <input
                        type='text'
                        id='nome'
                        name='nome'
                        placeholder='Nome'
                        className='border-2 border-primary rounded p-2'
                        value={produto.nome ?? ''}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='descricao'>Descrição</label>
                    <input
                        type='text'
                        id='descricao'
                        name='descricao'
                        placeholder='Descrição'
                        className='border-2 border-primary rounded p-2'
                        value={produto.descricao ?? ''}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='preco'>Preço</label>
                    <input
                        type='text'
                        inputMode='decimal'
                        id='preco'
                        name='preco'
                        placeholder='0.00'
                        className='border-2 border-primary rounded p-2'
                        value={precoTexto}
                        onChange={atualizarPreco}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='foto'>URL da imagem</label>
                    <input
                        type='text'
                        id='foto'
                        name='foto'
                        placeholder='https://...'
                        className='border-2 border-primary rounded p-2'
                        value={produto.foto ?? ''}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='categoria'>Categoria</label>
                    <select
                        id='categoria'
                        name='categoria'
                        className='border-2 border-primary rounded p-2 bg-white'
                        value={produto.categoria?.id ?? ''}
                        onChange={atualizarCategoria}
                        required
                        disabled={carregandoCategoria}
                    >
                        <option value='' disabled>Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                </div>

                <button
                    type='submit'
                    className='rounded disabled:bg-slate-300 bg-primary hover:bg-primary-dark text-white font-bold py-2 flex justify-center'
                    disabled={carregandoCategoria}
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

export default FormProduto