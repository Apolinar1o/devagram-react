import React, { useState, useEffect } from "react";
import Postagem from "./postagem";
import FeedService from "../../services/FeedService";

const feedService = new FeedService()
export default function Feed({ usuarioLogado, idUsuario}) {
  const [listaDePostagens, setListaDePostagens] = useState([]);
    const CarregarFeed = async () => {
      setListaDePostagens([])
      const postagens = await feedService.carregarPostagens(idUsuario?._id);
      const postagensFormatadas = postagens?.data?.map((postagem) => (
          {
              id: postagem._id,
              usuario: {
                  id: postagem?.idUsuario,
                  nome: postagem?.usuario?.nome, 
                  avatar: postagem?.usuario?.avatar
              },
              fotoDoPost: postagem.foto,
              descricao: postagem.descricao,
              curtidas: postagem.likes,
              comentarios: postagem.comentarios.map(c => ({
                  nome: c.nome,
                  mensagem: c.comentario
              }))
          }
      ));
      setListaDePostagens(postagensFormatadas);
    }
    useEffect( () => {
      CarregarFeed()
  }, [usuarioLogado, idUsuario]);

  if(!listaDePostagens.length) {
    return null
  }

  return (
    <div className="feedConteiner largura30pctDesktop">
      
         {listaDePostagens.map((dadosPostagem) => (
          <Postagem 
              key={dadosPostagem.id}
              {...dadosPostagem} 
              usuarioLogado={usuarioLogado} />
      ))}
     
      
    </div>
  );
}