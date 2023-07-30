import Avatar from "../avatar/index"
export default function ResultadoPesquisa(avatar, nome,  email, id, onClick) {
    return (
        <div className="resultadoPesquisa" onClick={() => onClick(id)}>
            <Avatar src={avatar} />
            <div className="informacoesUsuario">
                <strong>{nome} </strong>
                <span>{email} </span>
            </div>
        </div>
    )
}