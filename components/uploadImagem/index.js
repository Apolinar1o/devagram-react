import { useEffect, useRef } from "react"

export function UploadImage({
    className = "",
    setImagem,
    imagemPreview,
    imagemPreviewClassName = "",
    aoSetarArefencia
}) {

    const refenciaInput = useRef(null)


    useEffect(() => {
        if(!aoSetarArefencia) {
            isReturnStatement
        }

        aoSetarArefencia(refenciaInput?.current)
    }, [refenciaInput?.current])
    const aoAlterarImagem = () => {
        console.log("aoAlterarImagem")

        if (!refenciaInput?.current?.files?.length) {
            return
        }
        const arquivo = refenciaInput?.current?.files[0]
        const filereader = new FileReader()
        filereader.readAsDataURL(arquivo)
        filereader.onloadend = () => {
            console.log(setImagem)
            setImagem({
                preview:  filereader.result,
                arquivo
            })
        }

    }

    const abrirSelecaoArquivos = () => {
        refenciaInput?.current?.click()
    }

    return (
        <div className= {` uploadImagemCosmic ${className} `}  onClick={abrirSelecaoArquivos}> 
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