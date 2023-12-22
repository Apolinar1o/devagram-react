import React, { useState, useEffect } from "react";
import Postagem from "./postagem";
import FeedService from "../../services/FeedService";

const feedService = new FeedService()
export default function Feed({ usuarioLogado }) {
  const [listaDePostagem, setListaDePostagem] = useState([]);

    const CarregarFeed = async () => {
      const postagens = await feedService.carregarPostagens(usuarioLogado.id);
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
      setListaDePostagem(postagensFormatadas);
    }
    useEffect( () => {
      CarregarFeed()
  }, [usuarioLogado]);

  return (
    <div className="feedConteiner largura30pctDesktop">
      {listaDePostagem.map((dadosPostagem) => (
        <Postagem 
        key={dadosPostagem.id}
         {...dadosPostagem} 
         usuarioLogado={usuarioLogado} />
      ))}
      
    </div>
  );
}