import { Router, useRouter } from "next/router"
import HeaderAcoes from "../../components/headerAcoes"
import comAutorizacao from "../../hoc/comAutorizacao"
import UploadImage  from "../../components/uploadImagem";
import { useEffect, useState } from "react";
import imagemUsuarioCinza from "../../public/images/usuarioInativo.svg"
import imgLimpar from "../../public/images/cancelar.svg"
import Image from "next/image"
import UserService from "../../services/ApiUsuarioService"
import validadores, { validarNome } from "../../utils/validadores"
import UsuarioService from "../../services/ApiUsuarioService";

const usuarioService = new UserService()

function EditarPerfil({usuarioLogado}) {
    const [avatar, setAvatar] = useState()
    const [nome, setNome] = useState("")
    const [inputAvatar, setInputAvatar] = useState()
    const router = useRouter()

    useEffect(() => {
        if(!usuarioLogado) {
            return
        }

        setNome(usuarioLogado.nome)
        setAvatar({
            preview: usuarioLogado.avatar
        })
    }, [])

    const aoClicarElementeEsquerda = () => {
        router.push("/perfil/eu")
    }

    const atualizarPerfil = async () => {

        try {

            if(!validarNome(nome)) {
                alert("nome precisa de pelo menos 2 caracteres")
                return
            }
            console.log("1111111111111111")
            const payload = new FormData();
            console.log("22222222222222")

            payload.append("nome", nome)
            console.log("333333333333333333333")

            if(avatar.arquivo) {
                payload.append("file", avatar.arquivo)
                console.log("44444444444444444444444444444")
            }
           
            await usuarioService.atualizarPerfil(payload)
            localStorage.setItem("nome", nome)
            console.log("55555555555555555555555")

            if(avatar.arquivo) {
             localStorage.setItem("avatar", avatar.preview)
            }
            router.push("/perfil/eu")

        } catch (e) 
        {   console.log("deu erro: " +e)
            alert("Erro ao editar perfil!")
        }
    }

    const abrirSeletorDeArquivos = () => {
        inputAvatar.click()
    }

    return (
        <div className="paginaEditarPerfil largura30pctDesktop">
            <div className="conteudoPaginaEditarPerfil">
                <HeaderAcoes 
                titulo={"Editar perfil"}
                aoClicarAcaoEsquerda={aoClicarElementeEsquerda}
                textoEsquerda={"Cancelar"}
                elementoDireita={"Concluir"}
                AoclicarElementeDireita={atualizarPerfil}
                />

<hr className="linhaDivisoria"></hr>


<div className="edicaoAvatar">
    <UploadImage
    setImagem={setAvatar}
    imagemPreview={avatar?.preview || imagemUsuarioCinza.src}
    aoSetarArefencia={setInputAvatar}
    imagemPreviewClassName="avatar"
    />

    <span onClick={abrirSeletorDeArquivos}>Alterar foto do perfil </span>
</div>

<hr className="linhaDivisoria"></hr>

<div className="edicaoNome">
    <label>Nome</label>
    <input
        type="text"
        value={nome}
        onChange={e => setNome(e.target.value)}
    >

    </input>
    <Image
    src={imgLimpar}
    alt="icone limpar"
    width={16}
    height={16}
    onClick={() => setNome("")}
    />
</div>

<hr className="linhaDivisoria"></hr>
            </div>

        </div>

    )
}

export default comAutorizacao(EditarPerfil)