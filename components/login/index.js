import InputPublico from "../inputPublico";
import Botao from "../botão/index";
import imagemEnvelopoe from "../../public/images/envelope.svg"
import imagemSenha from "../../public/images/senha.svg"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState(" ")

    return (
    
       
        <> 

      
       <section className="paginaLogin paginaPublica">
            <div className="LogoConteiner"> 
            <Image src="images/logo.svg" alt="imagem logo" className="logo" fill/>
            </div> 

            <div className="conteudoPaginaPublica"> 
                <form> 
                <InputPublico 
                   imagem={imagemEnvelopoe}
                   texto="e-mail"
                   tipo="email"
                   valor={email}
                   aoAlterarValor={e => setEmail(e.target.value)}
                   
                  />
                <InputPublico 
                   imagem={imagemSenha}
                   texto="senha"
                   tipo="password"
                   valor={senha}
                   aoAlterarValor={(e) => setSenha(e.target.value)}
                  />

                <Botao texto="login" type="submit" desabilitado="false"/>
                </form>

                <div className="RodapePaginaPublica"> 
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">faça seu cadastro</Link>
                </div>
             
            </div>
       </section>
       </>
    )
}
