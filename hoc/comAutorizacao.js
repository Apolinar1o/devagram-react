import { useRouter } from "next/router"
import  UsuarioService from "../services/ApiUsuarioService"
import Header from "../components/layout/header"
export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter()
        if(typeof window !== "undefined") {
            if (!UsuarioService.estaAutenticado()) {
                router.replace("/cadastro")
                return null
            }
            return (
                <>
                <Header/>
                <Componente {...props}/>
                </>
            )
             
             
             
        }
        return null
    }
}