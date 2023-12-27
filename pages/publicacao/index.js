import { useState } from "react"
import HeaderAcoes from "../../components/headerAcoes"
import UploadImage from "../../components/uploadImagem"
import Botao from "../../components/botão/index"
import comAutorizacao from "../../hoc/comAutorizacao"
import imagemPublicacao from "../../public/images/iamgemPublicacao.svg"
import setaEsquerda from "../../public/images/setaEsquerda.svg"
import FeedService from "../../services/FeedService"
import { useRouter } from "next/router"


const feedService = new FeedService()
const descMinimo = 3
 function Publicacao() {

    const [imagem, setImagem] = useState()
    const [inputImagem, setInputImage] = useState()
    const [etapaAtual, setetapaAtual] = useState(1)
    const [descricao, setDescricao] = useState("")
    const router = useRouter()

    const estaNaetapa = () => etapaAtual === 1;
    const obterTextoEsquerda = () => {
        if(!imagem) {
            return ""
        }
        if(estaNaetapa() && imagem) {
            return "Cancelar"
        }

        return ""
    }

    const obterTextoDireita = () => {
        if(!imagem) {
            return ""
        }
        if(estaNaetapa() && imagem) {
            console.log("1234 + " + estaNaetapa())
            return "Avançar"
        }
        return "Compatilhar"
    }

    const aoClicarAcaoEsquerda = () => { 
        if(estaNaetapa()) {
            inputImagem.value = null
            setImagem(null)
    }
        setetapaAtual(1)

    }
    const aoClicarAcaoDireita = () => {
        if(estaNaetapa()) {
            setetapaAtual(2)
            return
        }

        publicar()
    }
    
    const obterClassname =() => { 
        if (estaNaetapa()) {
            return "primeiraEtapa"
        }
        return "segundaEtapa"
    }  

    const publicar = async () => {
        try {
            if(!validarForm()) {
                alert("A descrição precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada")
                return
            }
            const payload = new FormData()
            payload.append("descricao" ,descricao)
            payload.append("file" , imagem?.arquivo)

            await feedService.fazerPublicacao(payload)
            router.push("/")

        } catch (error) {
            alert("Erro ao salvar publicação!!");
        }
    }

    const validarForm = () => {
        return (
            descricao.length >= descMinimo && imagem?.arquivo
        )
    }

    return(
        <div className="paginaPublicacao largura30pctDesktop">
            <HeaderAcoes
            className={obterClassname}
            textoEsquerda={obterTextoEsquerda()}
            aoClicarAcaoEsquerda={aoClicarAcaoEsquerda}
            AoclicarElementeDireita={aoClicarAcaoDireita}
            elementoDireita={obterTextoDireita()}
            titulo={"Nova publicação"}
            iconeEsquerda={estaNaetapa()? null : setaEsquerda }
            />

        <hr className="linhaDivisoria"/>


            <div className="conteudoPaginaPublicacao ">
                {estaNaetapa() 
                ? 
               ( <div className="primeiraEtapa">
                <UploadImage
                    setImagem={setImagem}
                    aoSetarArefencia={setInputImage}
                    imagemPreviewClassName={!imagem ? "previewImagemPublicacao" : "previewImagemSelecionado"}
                    imagemPreview={imagem?.preview || imagemPublicacao.src}
                />

                <span className="desktop textoDragAndDrop">Arraste sua foto aqui </span>

                <Botao
                texto={"Selecionar Imagem"}
                manipularClique={() => inputImagem?.click()}
                />
            </div>)
            :
            (
                <>
                <div className="segundaEtapa">

                <UploadImage
                    setImagem={setImagem}
                    imagemPreview={imagem?.preview}
                />
                <textarea rows={3}
                value={descricao}
                placeholder="Escreva uma legenda..."
                onChange={e => setDescricao(e.target.value)}
                > 

                </textarea>


                </div>
                <hr className="linhaDivisoria"/>

                </>
            )
            }
              
            </div>

        </div>
    )
}

export default ( comAutorizacao(Publicacao))