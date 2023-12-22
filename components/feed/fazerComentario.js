import { useState } from "react";
import Avatar from "../avatar";

export function FazerComentario({usuarioLogado, comentar}) {

    const [linhas, setLinhas] = useState(1)
    const [comentario, setComentario] = useState("")

    const aoDigitarComentário = (e) => {
        const valorInput = e.target.value
        setComentario(valorInput)
        setLinhas(valorInput.length > 0 ? 2 : 1 )
    }

    const aoPressionarTecla = (e) => {
        if(e.key === "Enter" )  {
            manipularComentario()
        }
    }

    const manipularComentario =  () => {
        if(comentario.trim().length === 0 || !comentar) {
            return

        }
         comentar(comentario)
     
    }

    

    return (
        <div className="containerFazerComentario">

            <Avatar src={usuarioLogado.avatar} />
            <textarea rows={linhas} onKeyDown={aoPressionarTecla} value={comentario} onChange={aoDigitarComentário} placeholder="adiciona um comentario...">
            </textarea>

            <button type="button" onClick={manipularComentario} className="btnPublicacao desktop">
                Publicar
            </button>
        </div>
    )
}