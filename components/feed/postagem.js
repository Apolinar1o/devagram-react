import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";
import imgCurtir from "../../public/images/notLike.svg";
import imgCurtido from "../../public/images/like.svg";
import imgComentario from "../../public/images/msgCircle.svg";
import { useState } from "react";
import { FazerComentario, fazerComentario } from "./fazerComentario";


const tamanhoLimiteDesc = 93
export default function Postagem({
  usuario,
  fotoDoPost,
  descricao,
  comentarios,
  usuarioLogado
} ) {
    const [deveExibirSecaoComentar, setDeveExibirSecaoComentar] = useState(false)
    const [tamanhoAtualDaDesc, setTamanhoAtualDADesc] = useState(tamanhoLimiteDesc)

    const exibitDescricaoCompleta = () => {
        setTamanhoAtualDADesc(Number.MAX_SAFE_INTEGER)
    }

    const descricaoMaiorLimite = () => {
        return descricao.length > tamanhoAtualDaDesc
    }

    const obterDescrição = () => {
      let mensagem = descricao.substring(0, tamanhoAtualDaDesc)
      if(descricaoMaiorLimite()) {
         mensagem+= "..."
      }
      return mensagem
    }
    return (

       <div className="postagem"> 
        <Link href={`/perfil/${usuario.id}`}>
              <section className="cabecalhoPostagem">
                <Avatar src={usuario.avatar}/>
                <strong>{usuario.nome}</strong>
              </section>
             </Link>

             <div className="fotoDePostagem">
              <img src={fotoDoPost} alt="fotoDaPostagem"/>
             </div>

             <div className="rodapeDaPostagem">
                <div className="acoesDoRodapeDaPostagem">
                    <Image 
                      src={imgCurtir}
                      alt="icone curtir"
                      width={20}
                      height={20}
                      onClick={() => console.log("curtir")}
                    />

                    <Image 
                      src={imgComentario}
                      alt="icone comentar"
                      width={20}
                      height={20}
                      onClick={() => setDeveExibirSecaoComentar(!deveExibirSecaoComentar)}
                    />

                    <span className="quantidadeCurtidas">
                      Curtido por <strong>32 pessoas</strong> </span>
                 </div>

                
                <div className="descricaoDaPostagem">
                  <strong className="nomeUsuario" >{usuario.nome} </strong>
                  <p className="descricao">  
                    {obterDescrição()}
                    {descricaoMaiorLimite() && (
                      <span
                      onClick={exibitDescricaoCompleta}
                      className="exibirDescricaoCompleta"
                      > 
                      mais
                      </span>
                    )}
                  </p>
             </div>
                    
             <div className="comentariosDaPublicacao">
                    {comentarios.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))
                    }
                </div>
        </div>

            {deveExibirSecaoComentar && 
              <FazerComentario usuarioLogado={usuarioLogado} />
            }
      </div>
    )
}
