import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";
import imgCurtir from "../../public/images/notLike.svg";
import imgCurtido from "../../public/images/like.svg";
import imgComentario from "../../public/images/msgCircle.svg";
import imgComentarioAtivo from "../../public/images/imgComentarioAtivo.svg";
import { useState } from "react";
import { FazerComentario, fazerComentario } from "./fazerComentario";
import FeedService from "../../services/FeedService";

const feedService = new FeedService()
const tamanhoLimiteDesc = 93
export default function Postagem({
  id, 
  usuario,
  fotoDoPost,
  descricao,
  comentarios,
  usuarioLogado,
  curtidas
} ) {
    const [comentariosDaPostagem, setComentariosDaPostagem] = useState(comentarios)
    const [deveExibirSecaoComentar, setDeveExibirSecaoComentar] = useState(false)
    const [tamanhoAtualDaDesc, setTamanhoAtualDADesc] = useState(tamanhoLimiteDesc)
    const [curtidaPostagem, setCurtidaPostagem] = useState(curtidas)
 
 

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
   
    const obterImagemComentario = () =>  {
      return deveExibirSecaoComentar
      ? imgComentarioAtivo
      : imgComentario
  }

    const obterImagemCurtida = () =>  {
      return usuarioCurtiuPostagem()
      ? imgCurtido
      : imgCurtir
  }

  const comentar = async (comentario) => {
      try {
        await feedService.adicionarComentario(id, comentario)
        setDeveExibirSecaoComentar(false)
        setComentariosDaPostagem([
          ...comentariosDaPostagem,
          {
            nome: usuarioLogado.nome,
            mensagem: comentario
          }
        ])

      } catch (e) {
          alert("Erro ao fazer comentario! " + e?.response?.data?.erro || "")
      }
  }
  const usuarioCurtiuPostagem = () => {
      return curtidaPostagem.includes(usuarioLogado.id)

  }

  const alterarCurtida = async () => {
    try {


      await feedService.alterarCurtida(id)

      if(usuarioCurtiuPostagem()) {
        setCurtidaPostagem(curtidaPostagem.filter(c => c !== usuarioLogado.id))
      }
      
      else {
        setCurtidaPostagem([
          ...curtidaPostagem, 
          usuarioLogado.id
        ])
      }


    } catch (e) {
      console.log(e)
      alert("Erro ao alterar curtida! " + e?.response?.data?.erro || "")
      
    }
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
                      src={obterImagemCurtida()}
                      alt="icone curtir"
                      width={20}
                      height={20}
                      onClick={alterarCurtida}
                    />

                    <Image 
                      src={obterImagemComentario()}
                      alt="icone comentar"
                      width={20}
                      height={20}
                      onClick={() => setDeveExibirSecaoComentar(!deveExibirSecaoComentar)}
                    />

                    <span className="quantidadeCurtidas">
                      Curtido por <strong>{curtidaPostagem.length == 1? `${curtidaPostagem.length} pessoa` : `${curtidaPostagem.length} pessoas`} </strong> </span>
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
                    {comentariosDaPostagem.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))
                    }
                </div>
        </div>

            {deveExibirSecaoComentar && 
              <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado} />
            }
      </div>
    )
}
