
import Feed from "../../components/feed/index";
import comAutorizacao from "../../hoc/comAutorizacao";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "../../components/cabecalhoPerfil";
import UsuarioService from "../../services/ApiUsuarioService";

const usuarioService = new UsuarioService()


function Perfil() {
    const [usuario, setusuario] = useState({})
    const router = useRouter()
    const usuarioLogado = localStorage.getItem("id")
    
    const obterPerfil = async (idUsuario) => {
        try {
        const {data} = await usuarioService.obterPerfil(
            estaNoPerfilPessoal()
                ? usuarioLogado
                : idUsuario

            )
        return data
        } catch (error) {
            alert("Erro ao obter Perfil do usuario " + error )
        }
    }

    const estaNoPerfilPessoal = () => {
        return router.query.id === "eu"
    }

    useEffect( () => {
        const obterDadosPerfil = async () => {
            if(!router.query.id) {
                return
            }  const dadosPerfil = await obterPerfil(    
                
                estaNoPerfilPessoal()
                ? usuarioLogado
                : router.query.id
    )
                setusuario(dadosPerfil)
         
        }
       
        obterDadosPerfil()
    }, [router.query.id])

    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil usuarioLogado={usuarioLogado} usuario={usuario} estaNoPerfilPessoal={estaNoPerfilPessoal()} />
            <Feed usuarioLogado={usuarioLogado} idUsuario={usuario?._id}/>
        </div>
        )
}

export default comAutorizacao(Perfil)