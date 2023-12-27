import { useEffect, useRef } from "react"

export default function UploadImage({
    className = "",
    setImagem,
    imagemPreview,
    imagemPreviewClassName = "",
    aoSetarArefencia
}) {

    const refenciaInput = useRef(null)


    useEffect(() => {
        if(!aoSetarArefencia) {
            return
        }

        aoSetarArefencia(refenciaInput?.current)
    }, [refenciaInput?.current])
    const aoAlterarImagem =  () => {

        if (!refenciaInput?.current?.files?.length) {
            return
        }
        const arquivo = refenciaInput?.current?.files[0]
        obterUrlDaImagemEAtualizarEstadoo(arquivo)
    }

    const abrirSelecaoArquivos = () => {
        refenciaInput?.current?.click()
    }
    const aoSoltarImagem = (e) => {
        e.preventDefault()
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const arquivo = e.dataTransfer.files[0]
            obterUrlDaImagemEAtualizarEstadoo(arquivo)

        }
    }

    const obterUrlDaImagemEAtualizarEstadoo = (arquivo) => {
       
        const filereader = new FileReader()
        filereader.readAsDataURL(arquivo)
        filereader.onloadend = () => {
   
            setImagem({
                preview:  filereader.result,
                arquivo
            })
        }
    }
  

    return (
        <div className= {` uploadImagemConteiner ${className} `}  
        onDragOver={e => e.preventDefault()}
        onDrop={aoSoltarImagem}
        onClick={abrirSelecaoArquivos}> 
        {imagemPreview && (
            <div className="imagemPreviewContainer">
                <img
                src={imagemPreview}
                alt= "imagem preview"
                className={imagemPreviewClassName}
                />
             
            </div>
        )}
        <input 
        type="file" 
        className="oculto" 
        accept="image/*"
        ref={refenciaInput} 
        onChange={aoAlterarImagem}
        />
   
        </div>
    )
}