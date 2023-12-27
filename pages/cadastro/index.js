import Image from "next/image"
import InputPublico from "../../components/inputPublico/index";
import Botao from "../../components/botão/index";
import imagemEnvelopoe from "../../public/images/envelope.svg"
import imagemUsuario from "../../public/images/user.svg"
import imagemSenha from "../../public/images/senha.svg"
import UsuarioService from "../../services/ApiUsuarioService";
import imagemUsuarioCinza from "../../public/images/usuarioInativo.svg"
import Link from "next/link";
import { useState } from "react";
import UploadImage  from "../../components/uploadImagem";
import {validarSenha, validarEmail, validarNome, confiSenha} from "../../utils/validadores"
import { useRouter } from "next/router";

const usuarioService = new UsuarioService()

export default function Cadastro() {
    const [imagem, setImagem] = useState(null)
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const [confSenha, setConfSenha] = useState("")
    const [estaSubmentendo, setEestaSubmentendo] = useState(false)
    const router = useRouter()
    
    const VerificarForm = () => {
      return (
          validarEmail(email) && validarSenha(senha) && validarNome(nome) && confiSenha(senha, confSenha)
      )
  }   

    const aoSubmeter = async (e) => {
        e.preventDefault()
        if(!VerificarForm()) {
          return 
        } 
        setEestaSubmentendo(true)

        try {
          const corpoReqCadastro = new FormData()
          corpoReqCadastro.append("nome", nome)
          corpoReqCadastro.append("email", email)
          corpoReqCadastro.append("senha", senha)

          if(imagem?.arquivo) {
            corpoReqCadastro.append("file", imagem.arquivo)
          }

          await usuarioService.cadastro(corpoReqCadastro)
          await usuarioService.login({
            login: email, 
            senha
          })
          

          router.push("/")
       
        } catch(error) {
          console.log(error)
          alert(
            "erro ao cadastro usuario " + error?.response?.data?.error
          )
        }
        setEestaSubmentendo(false)
  }

    return (
        <section className="paginaCadastro paginaPublica">
            <div className="LogoConteiner desktop´"> 
            <Image src="images/logo.svg" alt="imagem logo" className="logo" fill/>
            </div> 

            <div className="conteudoPaginaPublica"> 
                <form onSubmit={aoSubmeter}> 
               
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

                <Botao texto="cadastrar" type="submit" desabilitado={!VerificarForm() || estaSubmentendo} />
                </form> 

                <div className="RodapePaginaPublica"> 
                    <p>Já possui uma conta?</p>
                    <Link href="/">faça seu login</Link>
                </div>
             
             </div> 
       </section>
    )
}