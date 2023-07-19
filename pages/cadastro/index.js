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
import {validarSenha, validarEmail, validarNome, confiSenha} from "../../utils/validadores"

export default function cadastro() {
    const [imagem, setImagem] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const [confSenha, setConfSenha] = useState("")
   
    const VerificarForm = () => {
      return (
          validarEmail(email) && validarSenha(senha) && validarNome(nome) && confiSenha(senha, confSenha)
      )
  }   
  console.log(VerificarForm())
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
                   MensagemValidação ="No minimo 2 caracteres"
                   exibirMesagemValida = {nome && !validarNome(nome)}
                   
                  />

                <InputPublico 
                   imagem={imagemEnvelopoe}
                   texto="e-mail"
                   tipo="email"
                   valor={email}
                   aoAlterarValor={(e) => setEmail(e.target.value)}
                   MensagemValidação ="e-mail inválido"
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
      
                <InputPublico 
                   imagem={imagemSenha}
                   texto="Confirmar senha"
                   tipo="password"
                   valor={confSenha}
                   aoAlterarValor={(e) => setConfSenha(e.target.value)}
                   MensagemValidação ="senhas precisam ser iguais"
                   exibirMesagemValida = {confSenha && !confiSenha(senha, confSenha)}
                  />               

                <Botao texto="login" type="submit" desabilitado={!VerificarForm()} />
                </form> 

                <div className="RodapePaginaPublica"> 
                    <p>Já possui uma conta?</p>
                    <Link href="/">faça seu login</Link>
                </div>
             
             </div> 
       </section>
    )
}