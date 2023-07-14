export default function Botao({ 
    type = "button", 
    texto, 
    cor = "primaria", 
    desabilitado = false, 
    manipularClique 
  }) {

    return (
        <button 
        type={type}
        className={`btn ${cor}`}
        disabled={desabilitado}
        onClick={manipularClique}
        > 
        {texto}
        </button>
    )
}