import Image from "next/image" 


export default function HeaderAcoes({
    className,
    iconeEsquerda,
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo,
    elementoDireita
}) {
    return(
        
        <div className={`cabecalhoAcoes ${className}`}>
            {iconeEsquerda ? (
                
                <Image
                    src={iconeEsquerda}
                    alt="icone esquerda"
                    onClick={aoClicarAcaoEsquerda}
                    width={25}
                    height={25}
                />
            ) : (
                textoEsquerda !== null && (
                    <span className="cabecalhoAcoesTextoEsquerda" onClick={aoClicarAcaoEsquerda}>
                        {textoEsquerda}
                        </span>
                )
            ) }

            <h3>{titulo}</h3>
            {elementoDireita && (
                 
            <button 
            type="button"
            >
                {elementoDireita}
            </button>
            )}
        </div>
    )
}