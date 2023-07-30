import Image from "next/image"
import logoHorizontal from "../../public/images/logoDeitado.svg"
import logoLupa from "../../public/images/lupa.svg"
import Navegacao from "./navegacao"
import ResultadoPesquisa  from "./resultadoPesquisa"

import { useState, useSyncExternalStore } from "react"
export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([])
    const [termopesquisado, setTermoPesquisado] = useState([])
    
    const aoPesquisar = (e) => {
   
        setTermoPesquisado(e.target.value)
        setResultadoPesquisa([])

        if(termopesquisado.length < 3) {
            return
        }
        setResultadoPesquisa([
            {
                avatar: '',
                nome: 'Douglas',
                email: 'douglas@devagram.com',
                _id: '3242432'
            },
            {
                avatar: '',
                nome: 'Daniel',
                email: 'daniel@devagram.com',
                _id: '8908790879'
            },
            {
                avatar: '',
                nome: 'Rafael',
                email: 'rafael@devagram.com',
                _id: '6567876'
            }
        ])
    }
   
    const aoClicarResultadoPesquisa = (id) => {
        console.log("aoClicarResultadoPesquisa", {id})

      
    }

    return (
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal"> 
                <div className="logoCabecalhoPrincipal">
                    <Image src={logoHorizontal} alt="logoDevagram" layout="fill"/>
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