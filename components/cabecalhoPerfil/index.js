import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import HeaderAcoes from "../headerAcoes";
import imgSetaEsquerda from "../..//public/images/setaEsquerda.svg"
import imgLogout from "../../public/images/sair.svg"
import Avatar from "../avatar";
import Botao from "../botão";
import UsuarioService from "../../services/ApiUsuarioService";


const usuarioService = new UsuarioService()

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {

    const [estaSeguindoUsuario, setEstaSeguindoUsuario] = useState(false)
    const [qtdSeguidores, setqQdSeguidores] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if(!usuario) {
            return
        }
        setEstaSeguindoUsuario(usuario.segueEsseUsuario)
        setqQdSeguidores(usuario.seguidores)
    }, [usuario]) 
    
    const obterTextoBotao = () => {
        if(estaNoPerfilPessoal) {
            return "Editar Perfil"
        }
        if(estaSeguindoUsuario) {
            return "Deixar de seguir"
        }
        return "Seguir"
    }

    const obterCorBotao = () => {
        if(estaSeguindoUsuario || estaNoPerfilPessoal) {
            return "invertido"
        }
        return "primaria"
    }

    const manipularCliqueBotao = async () => {
        if(estaNoPerfilPessoal)  {
            return router.push("editar")
        }
        try {
            await usuarioService.alternarSeguir(usuario._id)
            setEstaSeguindoUsuario(!estaSeguindoUsuario)
            setqQdSeguidores(
                
                estaSeguindoUsuario 
                    ? (qtdSeguidores - 1)
                    : (qtdSeguidores + 1)
            )
            console.log(qtdSeguidores + " & " + UsuarioService.seguidores )
        } catch (e) {
            console.log("erro ao seguir/deixar de seguir " + e)
        }
    }

    const aoClicarVoltar = () => {
        router.back()
    }

    const logout = () => {
        usuarioService.logout()
        router.replace("/")
    }

    const obterElementeDireita = () => {
        if(estaNoPerfilPessoal) {
            return (
                
    
                    <Image
                    src={imgLogout}
                    alt="icone logout"
                    onClick={logout}
                    width={25}
                    height={25}
                                />
        
            )
        }
        return null
    }
    return(
        <> 
            <div className="cabecalhoPerfil largura30pctDesktop">
           
            <HeaderAcoes
                iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
                aoClicarAcaoEsquerda={aoClicarVoltar}
                titulo={usuario.nome}
                elementoDireita={obterElementeDireita(     )}
            />
            <hr className="linhaDivisoria"/>
            <div className="statusPerfil">
                <Avatar src={usuario.avatar}/>
                <div className="informacoesPerfil"> 
                    <div className="statusContainer"> 
                        <div className="status">
                            <strong>{usuario.publicacoes}</strong>
                            <span>`Publicacões</span>
                        </div>
                        <div className="status">
                            <strong>{qtdSeguidores}</strong>
                            <span>`seguidores</span>
                        </div>
                        <div className="status">
                            <strong>{usuario.seguindo}</strong>
                            <span>`Seguindo</span>
                        </div>
                  
                    </div>

                    <Botao texto={obterTextoBotao()} cor={obterCorBotao()} manipularClique={manipularCliqueBotao}/>
                </div>
            </div>
            </div>
        
        </>
        
    )
}