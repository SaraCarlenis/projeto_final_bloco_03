import { FirstAidKitIcon, HeartIcon, UsersIcon } from "@phosphor-icons/react";

function Sobre() {
    return (
        <div className='container mx-auto px-6 py-16 min-h-[70vh]'>
            <h1 className='text-4xl font-extrabold text-center mb-6'>Sobre Nós</h1>
            <p className='max-w-2xl mx-auto text-center text-gray-700 text-lg mb-12'>
                A Farmácia Vida+ nasceu com o propósito de aproximar cuidado e confiança
                da vida das pessoas. Trabalhamos todos os dias para oferecer medicamentos,
                cosméticos e produtos de bem-estar com qualidade, preços justos e um
                atendimento que trata cada cliente como parte da nossa família.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 text-center'>
                <div className='flex flex-col items-center gap-2'>
                    <FirstAidKitIcon size={48} weight='duotone' className='text-primary' />
                    <p className='font-bold text-lg'>Nossa missão</p>
                    <p className='text-sm text-gray-600'>Cuidar da saúde de quem confia em nós, com responsabilidade e carinho.</p>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <HeartIcon size={48} weight='duotone' className='text-primary' />
                    <p className='font-bold text-lg'>Nossos valores</p>
                    <p className='text-sm text-gray-600'>Ética, transparência e respeito em cada atendimento.</p>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <UsersIcon size={48} weight='duotone' className='text-primary' />
                    <p className='font-bold text-lg'>Nossa equipe</p>
                    <p className='text-sm text-gray-600'>Profissionais qualificados, prontos pra te orientar da melhor forma.</p>
                </div>
            </div>
        </div>
    )
}

export default Sobre