import conexao from "./banco.js";

/* Funcoes para o CRUD */

function inserir(dados, res){
    const sql = `INSERT INTO usuarios SET ?`
    conexao.query(sql, dados, (erro) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(201).json({'status' : 'Dados inserido!'})
        }
    });
}

function atualizar(id, aluno, res){
    const sql = `UPDATE alunos SET ? WHERE id = ?`;
    conexao.query(sql, [aluno, id], (erro, result) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            // res.status(200).json({'status': 'Atualizada com sucesso'});
            res.status(200).json({...aluno, id})
        }
    })
}

export { ler, inserir, lerUm, atualizar, excluir };