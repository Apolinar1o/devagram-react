import Image from "next/image"
import logoHorizontal from "../../public/images/logoDeitado.svg"
export default function Header() {
    return (
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal"> 
                <div className="logoCabecalhoPrincipal">
                    <h1>OLa mundo</h1>
                    <Image src={logoHorizontal} alt="logoDevagram" layout="fill"/>
                </div>
            </div>
        </header>
    )
}