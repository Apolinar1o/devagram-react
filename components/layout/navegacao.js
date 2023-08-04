import home from "../../public/images/home.svg"
import user from "../../public/images/user.svg"
import Onuser from "../../public/images/onUser.svg"
import publish from "../../public/images/publish.svg"
import onPublish from "../../public/images/onPublish.svg"
import onHome from "../../public/images/onHome.svg"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const mapaDeRotas = {
    home: {
        imagemAtivo:onHome,
        rotasAtivacao: ["/"],
        imgPadrao: home
    },
    publicacao:{
        imagemAtivo: onPublish,
        rotasAtivacao: ["publicacao"],
        imgPadrao: publish
    },
        
    perfil:{
        imagemAtivo: Onuser,
        rotasAtivacao: ["/perfil/eu", "/perfil/eu/editar"], 
        imgPadrao: user
    }
}
export default function Navegacao({className}) {

    const [rotaAtiva, setRotaAtiva] = useState("home")
    const router = useRouter()

    useEffect(() => {
        definirRotaAtiva()
    }, [router.asPath])

    const definirRotaAtiva = () => {
        console.log("definar rota ativa")
        const chaveDoMapaDeRotas = Object.keys(mapaDeRotas)
        const indiceAtivo = chaveDoMapaDeRotas.findIndex(chave => {
            return mapaDeRotas[chave].rotasAtivacao.includes(
                window.location.pathname
            )
        })

        if(indiceAtivo === -1) {
            setRotaAtiva("home")
        } else {
            setRotaAtiva(chaveDoMapaDeRotas[indiceAtivo])
        }
        console.log(rotaAtiva)
    }

    const obterImagem = (nomeRota) => {
        const rotaAtivada = mapaDeRotas[nomeRota]
   
        if(rotaAtiva === nomeRota) {
            return rotaAtivada.imagemAtivo
        }
        else {
            return rotaAtivada.imgPadrao
        }
    }

    const aoClicarNoIcone = (nomeRota) => {
        setRotaAtiva(nomeRota)
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0])
    }
    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li onClick={() => aoClicarNoIcone("home")}>
                    <Image src={obterImagem("home")} alt="logo Home" width={20} height={20}/>
                </li>
                <li onClick={() => aoClicarNoIcone("publicacao")}>
                    <Image src={publish} alt="icome publicacao" width={20} height={20}/>
                </li>
                <li onClick={() => aoClicarNoIcone("perfil")}>
                    <Image src={obterImagem("perfil")} alt="logo user" width={20} height={20}/>
                </li>
            </ul>
        </nav>
    )
}