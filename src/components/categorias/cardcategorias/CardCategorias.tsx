import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'

interface CardCategoriasProps {
    categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriasProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <div className='p-4 bg-cream-dark flex flex-col gap-2'>
                <p className='text-lg font-bold'>{categoria.nome}</p>
                <p className='text-sm text-gray-600'>
                    {categoria.produtos?.length ?? 0} produto(s) associado(s)
                </p>
            </div>
            <div className='flex'>
                <Link
                    to={`/editarcategoria/${categoria.id}`}
                    className='w-full text-white bg-primary hover:bg-primary-dark flex items-center justify-center py-2'
                >
                    Editar
                </Link>
                <Link
                    to={`/deletarcategoria/${categoria.id}`}
                    className='w-full text-white bg-danger hover:bg-danger-dark flex items-center justify-center py-2'
                >
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardCategorias