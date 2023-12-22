import Image from "next/image"
import logoHorizontal from "../../public/images/logoDeitado.svg"
import logoLupa from "../../public/images/lupa.svg"
import Navegacao from "./navegacao"
import ResultadoPesquisa  from "./resultadoPesquisa"
import { useState } from "react"
import UsuarioService from "../../services/ApiUsuarioService"
import { useRouter } from "next/router"

const usuarioService = new UsuarioService()

export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([])
    const [termopesquisado, setTermoPesquisado] = useState("")
    const router = useRouter()

    let cabecalhoclassName = ""
    if(window && window.location.pathname !== "/") {
        cabecalhoclassName = "desktop"
    }
    
     const  aoPesquisar = async (e) => {
   
        setTermoPesquisado(e.target.value)
        setResultadoPesquisa([])

        if(termopesquisado.length < 2) {
            return
        }
        try {
            const {data} = await usuarioService.pesquisar(termopesquisado)
            setResultadoPesquisa(data)
        } catch (error) {
            alert("erro ao pesquisar uusuario" + error?.response?.data?.erro)
        }


       
    }
   
    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([])
        setTermoPesquisado()
        router.push(`/perfil/${id}`)
      
    }

    const redirecionarHome = () => {
        router.push("/")
    }

    return (
        <header className={"cabecalhoPrincipal " + cabecalhoclassName}>
            <div className="conteudoCabecalhoPrincipal"> 
                <div className="logoCabecalhoPrincipal" >
                    <Image src={logoHorizontal} alt="logoDevagram" onClick={() => redirecionarHome()} layout="fill"/>
                </div>

                <div className="barraPesquisa">
                    <div className="conteinerImagemLupa">
                        <Image src={logoLupa} alt="icone da lupa " layout="fill"/>
                    </div>
                
                <input 
                type="text" 
                placeholder="Pesquisar" 
                value={termopesquisado}
                onChange={aoPesquisar}>
                </input>
                 </div>

                 <Navegacao className="desktop" />
            </div>

            {resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                    </div>

            )}
          

        </header>
    )
}