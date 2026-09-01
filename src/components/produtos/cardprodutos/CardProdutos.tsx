import { Link } from 'react-router-dom'
import type Produto from '../../../models/Produto'

interface CardProdutosProps {
    produto: Produto
}

function CardProdutos({ produto }: CardProdutosProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            {produto.foto && (
                <img
                    src={produto.foto}
                    alt={produto.nome}
                    className='w-full h-40 object-cover bg-cream-dark'
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
            )}
            <div className='p-4 bg-cream-dark flex flex-col gap-1 flex-1'>
                <p className='text-lg font-bold'>{produto.nome}</p>
                <p className='text-sm text-gray-600'>{produto.descricao}</p>
                <p className='text-sm font-bold text-primary'>
                    {(() => {
                        const valor = Number(produto.preco)
                        return !isNaN(valor)
                            ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            : ''
                    })()}
                </p>
                {produto.categoria && (
                    <p className='text-xs text-gray-500'>Categoria: {produto.categoria.nome}</p>
                )}
            </div>
            <div className='flex'>
                <Link
                    to={`/editarproduto/${produto.id}`}
                    className='w-full text-white bg-primary hover:bg-primary-dark flex items-center justify-center py-2'
                >
                    Editar
                </Link>
                <Link
                    to={`/deletarproduto/${produto.id}`}
                    className='w-full text-white bg-danger hover:bg-danger-dark flex items-center justify-center py-2'
                >
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardProdutos