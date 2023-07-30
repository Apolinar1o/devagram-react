import home from "../../public/images/home.svg"
import user from "../../public/images/user.svg"
import Onuser from "../../public/images/onUser.svg"
import publish from "../../public/images/publish.svg"
import onPublish from "../../public/images/onPublish.svg"
import onHome from "../../public/images/onHome.svg"
import Image from "next/image"

export default function Navegacao({className}) {
    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li>
                    <Image src={home} alt="logo Home" width={20} height={20}/>
                </li>
                <li>
                    <Image src={publish} alt="icome publicacao" width={20} height={20}/>
                </li>
                <li>
                    <Image src={user} alt="logo user" width={20} height={20}/>
                </li>
            </ul>
        </nav>
    )
}