import Image from "next/image"
export default function InputPublico({
    imagem,
    tipo, 
    texto,
    valor="text",
    exibirMesagemValida = false,
    MensagemValidação ="",
    aoAlterarValor
}) {
   
    


    return (

        <div className="InputPublicoConteiner">
            <div className="InputPublico">
            
                <Image
                    src={imagem}
                    alt="iamgem de campo"
                    className="IconeInputPublico"
                    width={20}
                    height={20}
                 
                />
                  <input 
                    type={tipo}
                    placeholder={texto}
                    // value={valor}
                    onChange={aoAlterarValor}
                    
                  /> 
                  

            </div>

          {exibirMesagemValida && <P className="mensagemValidacao">{MensagemValidação} </P>}
        </div>
        
    )
}