
import { useState, useRef  } from "react"
import {UploadImage} from "../components/uploadImagem/index"
export default function Home() {
  const [imagem, setImagem] = useState(null);
  const refenciaInput = useRef(null)


  return (

   <><h1>OLá mundo</h1>

   <img src="/images/user.svg" alt="User" className="userImage" />
   
   <button onClick={() => refenciaInput?.current?.click()}>abrir seletor de arquivos</button>

   <UploadImage 
   setImagem={setImagem} 
   imagemPreview={imagem?.preview} 
   aoSetarArefencia={(ref) => refenciaInput.current = ref}
   />
   <div>
        
    </div>
    </>
 
  )
}
