// import express from "express";
// import cors from 'cors';

// const app = express();
// // Habilitando outras portas para rodar a aplicacao
// const porta = process.env.PORT || 3000;
// // Permite acesso externo
// app.use(cors());
// // Habilitando express para receber json
// app.use(express.json());
// // Habilitando express para funcionar com dados de inputs
// app.use(express.urlencoded({extended:true}));

// const btnRegister = document.querySelector('.btn-register');

// const registrar = (event) => {
//     event.preventDefault();
//     const email = document.querySelector('#emailRegister').value;
//     const senha = document.querySelector('#senhaRegister').value;
//     const confimaSenha = document.querySelector('#senhaConfirma').value;
//     const jsonBanco = {
//         email,
//         senha,
//     }
//     console.log(jsonBanco);
//     app.post('/registro', (req, res) => {
//         // const novoAluno = req.body;
//         inserir(jsonBanco, res);
//     });
// }

// btnRegister.addEventListener('click', registrar);

// app.listen(porta, () => {
//     console.log(`Servidor rodando na porta ${porta}`);
// });