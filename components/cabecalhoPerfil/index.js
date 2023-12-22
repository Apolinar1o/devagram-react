import HeaderAcoes from "../headerAcoes";
import imgSetaEsquerda from "../..//public/images/setaEsquerda.svg"
import Avatar from "../avatar";
import Botao from "../botão";

export default function CabecalhoPerfil({
    usuario
}) {
    
    return(
        <> 
            <div className="cabecalhoPerfil largura30pctDesktop">
            <HeaderAcoes
                iconeEsquerda={imgSetaEsquerda}
                titulo={usuario.nome}
            />

            <div className="statusPerfil">
                <Avatar src={usuario.avatar}/>
                <div className="informacoesPerfil"> 
                    <div className="statusContainer"> 
                        <div className="status">
                            <strong>15</strong>
                            <span>`Publicacões</span>
                        </div>
                        <div className="status">
                            <strong>150</strong>
                            <span>`seguidores</span>
                        </div>
                        <div className="status">
                            <strong>135</strong>
                            <span>`Seguindo</span>
                        </div>
                  
                    </div>

                    <Botao texto={"Seguir"} cor="primaria"/>
                </div>
            </div>
            </div>
        
        </>
        
    )
}