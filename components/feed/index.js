import React, { useState, useEffect } from "react";
import Postagem from "./postagem";
import FeedService from "../../services/FeedService";

const feedService = new FeedService()
export function Feed({ usuarioLogado }) {
  const [listaDePostagem, setListaDePostagem] = useState([]);

    const CarregarFeed = async () => {
      console.log("112312311")
      const  {data} = await feedService.carregarPostagens(usuarioLogado.id);
      console.log("123" + postagens.data)
      const postagensFormatadas = data?.map((postagem) => (
          {
              id: postagem._id,
              usuario: {
                  id: postagem.userId,
                  nome: postagem.usuario.nome,
                  avatar: postagem.usuario.avatar
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