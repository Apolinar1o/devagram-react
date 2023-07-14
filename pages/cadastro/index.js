import Image from "next/image"
import InputPublico from "../../components/inputPublico/index";
import Botao from "../../components/botão/index";
import imagemEnvelopoe from "../../public/images/envelope.svg"
import imagemUsuario from "../../public/images/user.svg"
import imagemSenha from "../../public/images/senha.svg"
import imagemUsuarioCinza from "../../public/images/usuarioInativo.svg"
import Link from "next/link";
import { useState } from "react";
import UploadImage  from "../../components/uploadImagem";

export default function cadastro() {
    const [imagem, setImagem] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const [confSenha, setConfSenha] = useState("")

    return (
        <section className="paginaCadastro paginaPublica">
            <div className="LogoConteiner desktop´"> 
            <Image src="images/logo.svg" alt="imagem logo" className="logo" fill/>
            </div> 

            <div className="conteudoPaginaPublica"> 
                <form> 
               
               <UploadImage
                   imagemPreviewClassName = "avatar avatarPreview"
                   setImagem={setImagem}
                   imagemPreview={imagem?.preview || imagemUsuarioCinza.src} 
                
               />

                  
                <InputPublico 
                   imagem={imagemUsuario}
                   texto="Nome completo"
                   tipo="text"
                   valor={nome}
                   aoAlterarValor={(e) => setNome(e.target.value)}
                   
                  />

                <InputPublico 
                   imagem={imagemEnvelopoe}
                   texto="e-mail"
                   tipo="email"
                   valor={email}
                   aoAlterarValor={(e) => setEmail(e.target.value)}
                   
                  />
                <InputPublico 
                   imagem={imagemSenha}
                   texto="senha"
                   tipo="password"
                   valor={senha}
                   aoAlterarValor={(e) => setSenha(e.target.value)}
                  />               

                <InputPublico 
                   imagem={imagemSenha}
                   texto="Confirmar senha"
                   tipo="password"
                   valor={confSenha}
                   aoAlterarValor={(e) => setConfSenha(e.target.value)}
                  />               

                <Botao texto="login" type="submit" desabilitado="false"/>
                </form> 

                <div className="RodapePaginaPublica"> 
                    <p>Já possui uma conta?</p>
                    <Link href="/">faça seu login</Link>
                </div>
             
             </div> 
       </section>
    )
}