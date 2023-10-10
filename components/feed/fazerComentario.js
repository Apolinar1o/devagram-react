import Avatar from "../avatar";

export function FazerComentario({usuarioLogado}) {
    return (
        <div className="containerFazerComentario">

            <Avatar src={usuarioLogado.avatar} />
            <textarea rows={1} placeholder="adiciona um comentario...">
            </textarea>

            <burron type="button" className="btnPublicacao desktop">
                Publicar
            </burron>
        </div>
    )
}