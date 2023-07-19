const validarNome = (nome) => {
    return nome?.toString().length > 2
}

const validarEmail = (email) => {
    email = email.toString()
    return email?.length >= 5 && email.includes("@") && email.includes(".")
}

const validarSenha = (senha) => {
    senha = senha.toString()
    return senha?.length > 3
}
const confiSenha = (senha, confirmação) => {
    return validarSenha(senha) && senha === confirmação
}

export {
    validarEmail,
    validarNome,
    validarSenha,
    confiSenha
}