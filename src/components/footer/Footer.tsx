import { InstagramLogoIcon, FacebookLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

function Footer() {

    const data = new Date().getFullYear();

    return (
        <div className="flex justify-center bg-primary text-white">
            <div className="container flex flex-col items-center py-6 pb-10 md:py-6 gap-4">

                <p className="text-lg font-bold">Farmácia Vida+</p>

                <div className="flex gap-4">
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <InstagramLogoIcon size={36} weight="bold" />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <FacebookLogoIcon size={36} weight="bold" />
                    </a>
                    <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
                        <WhatsappLogoIcon size={36} weight="bold" />
                    </a>
                </div>

                <p className="text-sm text-center">
                    &copy; {data} Farmácia Vida+ — Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}

export default Footer;