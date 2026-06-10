const AlertaMensagem = document.getElementById('AlertaMensagem');
const estudantesForm = document.getElementById('estudantesForm');
const nome = document.getElementById('nome');
const idade = document.getElementById('idade');
const curso = document.getElementById('curso');
const email = document.getElementById('email');
const alunosCadastrados = document.getElementById('alunosCadastrados');
const tbody = document.getElementById('tbody');
const formGrupo = document.querySelectorAll('formGrupo');

//Armazenando todos os alunos em um array
const alunos = [];

function cadastrarAluno(){
    const nome = nome.value
    const idade = idade.value
    const curso = curso.value

    const aluno = {
        nome: nome,
        idade: idade,
        curso: curso,
        email: email
    };
    alunos.push(aluno);

    adicionarTabela();
    alert("1212")
};


function adicionarTabela(){
    tbody.innerHTML = "";
    alunos.forEach(aluno => {
        tbody.innerHTML += `
    <tr>
     <td>${aluno.nome}</td>
     <td>${aluno.idade}</td>
     <td>${aluno.curso}</td>
     <td>${aluno.email }</td>
    </tr>
    `
    });
}