import InputPublico from "../inputPublico";
import Botao from "../botão/index";
import imagemEnvelopoe from "../../public/images/envelope.svg"
import imagemSenha from "../../public/images/senha.svg"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import UsuarioService from "../../services/ApiUsuarioService";
import {validarEmail, validarSenha} from "../../utils/validadores"

const usuarioService = new UsuarioService()

export default function login({aposAutenticacao}) {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [estaSubmentedo, setestaSubmentedo] = useState(false)
    

    const VerificarForm = () => {
        return (
            validarEmail(email) && validarSenha(senha)
        )
    }
    const aoSubmeter = async (e) => {
        e.preventDefault()

        if(!VerificarForm) {
            return 
        }

        setestaSubmentedo(true)

        try {
            await usuarioService.login({
                login: email,
                senha
            })

            if(aposAutenticacao) {
                aposAutenticacao()
            }

        } catch (error) {
            alert(
                "Erro ao realizar o login " + error?.response.data?.error
            )
        }

        setestaSubmentedo(false)
    }
    return (
    
       
        <> 

      
       <section className="paginaLogin paginaPublica">
            <div className="LogoConteiner"> 
            <Image src="images/logo.svg" alt="imagem logo" className="logo" fill/>
            </div> 

            <div className="conteudoPaginaPublica"> 
                <form onSubmit={aoSubmeter}> 
                <InputPublico 
                   imagem={imagemEnvelopoe}
                   texto="e-mail"
                   tipo="email"
                   valor={email}
                   aoAlterarValor={e => setEmail(e.target.value)}
                   MensagemValidação ="O endereço informado é inválido"
                   exibirMesagemValida = {email && !validarEmail(email)}
                   
                  />
                <InputPublico 
                   imagem={imagemSenha}
                   texto="senha"
                   tipo="password"
                   valor={senha}
                   aoAlterarValor={(e) => setSenha(e.target.value)}
                   MensagemValidação ="No minimo 3 caracteres"
                   exibirMesagemValida = {senha && !validarSenha(senha)}
                  />

                <Botao texto="login" type="submit" desabilitado={!VerificarForm() || estaSubmentedo} />
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
