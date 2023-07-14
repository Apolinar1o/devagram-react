import Image from "next/image"
import InputPublico from "../../components/inputPublico/index";
import Botao from "../../components/botão/index";
import imagemEnvelopoe from "../../public/images/envelope.svg"
import imagemUsuario from "../../public/images/user.svg"
import imagemSenha from "../../public/images/senha.svg"
import Link from "next/link";
import { useState } from "react";

export default function cadastro() {
    return (
        <section className="paginaLogin paginaPublica">
            <div className="LogoConteiner desktop"> 
            <Image src="images/logo.svg" alt="imagem logo" className="logo" fill/>
            </div> 

            <div className="conteudoPaginaPublica"> 
                <form> 

                <InputPublico 
                   imagem={imagemUsuario}
                   texto="Nome completo"
                   tipo="text"
                //    valor={senha}
                   aoAlterarValor={(e) => console.log(e.target.value)}
                   
                  />

                <InputPublico 
                   imagem={imagemEnvelopoe}
                   texto="e-mail"
                   tipo="email"
                //    valor={senha}
                   aoAlterarValor={(e) => console.log(e.target.value)}
                   
                  />
                <InputPublico 
                   imagem={imagemSenha}
                   texto="senha"
                   tipo="password"
                //    valor={senha}
                   aoAlterarValor={(e) => console.log(e.target.value)}
                  />               

                <InputPublico 
                   imagem={imagemSenha}
                   texto="Confirmar senha"
                   tipo="password"
                //    valor={senha}
                   aoAlterarValor={(e) => console.log(e.target.value)}
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