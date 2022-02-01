// import { inserir } from "./usuario";

const btnRegister = document.querySelector('.btn-register');

const registrar = (event) => {
    event.preventDefault();
    const email = document.querySelector('#emailRegister').value;
    const senha = document.querySelector('#senhaRegister').value;
    const confimaSenha = document.querySelector('#senhaConfirma').value;
    const jsonBanco = {
        email,
        senha,
    }
    console.log(jsonBanco);
}

btnRegister.addEventListener('click', registrar);
