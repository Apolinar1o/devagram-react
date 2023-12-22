
import Feed from "../../../components/feed/index";
import comAutorizacao from "../../../hoc/comAutorizacao";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "../../../components/cabecalhoPerfil";

function Perfil({usuarioLogado}) {
    const [usuario, setusuario] = useState({})
    const router = useRouter()

    useEffect(() => {
        setusuario({
            nome: "Antonio neto"
        })
    }, [router.query.id])
   
    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil usuarioLogado={usuarioLogado} usuario={usuario}/>
            <Feed usuarioLogado={usuarioLogado} />
        </div>
        )
}

export default comAutorizacao(Perfil)