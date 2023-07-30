import { useRouter } from "next/router"
import  UsuarioService from "../services/ApiUsuarioService"
import Header from "../components/layout/header"
import Rodape from "../components/layout/rodape"
export default function comAutorizacao(Componente) {
const usuarioService = new UsuarioService()

    return (props) => {

        const router = useRouter()
        if(typeof window !== "undefined") {
            if (!usuarioService.estaAutenticado()) {
                router.replace("/")
                return null
            }
            return (
                <>
                <Header/>
                <Componente {...props}/>
                <Rodape/>
                </>
            )



        }
        return null
    }
}