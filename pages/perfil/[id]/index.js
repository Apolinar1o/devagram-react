import { headers } from "next/dist/client/components/headers";
import Image from "next/image";
import Header from "../../../components/layout/header";
import comAutorizacao from "../../../hoc/comAutorizacao";

function Perfil(avatar) {
   
    return (
        <div>
            <h1>Perfil</h1>
            <Image src={avatar}/>
        </div>
        )
}

export default comAutorizacao(Perfil)