import { use, useEffect, useState } from "react";
import Login from "../components/login";
import UsuarioService from "../services/ApiUsuarioService";
import Home from "../components/home/index"


const usuarioService = new UsuarioService()
export default function Index() {
 
  const [estaAutenticado, setEstaAutenticado] = useState(null)
  
  useEffect(() => {
      setEstaAutenticado(
        usuarioService.estaAutenticado()
      )
  }, [])

  if(estaAutenticado) {
    return <Home/>
  }

  return (
    <>
      <Login aposAutenticacao={() => setEstaAutenticado(true)} />
    </>
  )
}
