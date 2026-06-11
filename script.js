const estudantesForm = document.getElementById("estudantesForm");
const nome = document.getElementById("nome");
const idade = document.getElementById("idade");
const curso = document.getElementById("cursos");
const email = document.getElementById("email");
const tbody = document.getElementById("tbody");
const pesquisa = document.getElementById("pesquisa");

// Carrega os alunos salvos
const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// Mostra os alunos ao abrir a página
adicionarTabela();

function cadastrarAluno() {

    const nomeV = nome.value;
    const idadeV = idade.value;
    const cursoV = curso.value;
    const emailV = email.value;

    if (!nomeV || !idadeV || !cursoV || !emailV) {
        alert("Preencha todos os campos!");
        return;
    }

    const aluno = {
        nome: nomeV,
        idade: idadeV,
        curso: cursoV,
        email: emailV
    };

    // Adiciona ao array
    alunos.push(aluno);

    // Salva no LocalStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Atualiza tabela
    adicionarTabela();

    // Limpa formulário
    estudantesForm.reset();

    alert("Cadastro realizado com sucesso!");
}

function adicionarTabela(lista = alunos) {

    tbody.innerHTML = "";

    lista.forEach((aluno, indice) => {

        tbody.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.email}</td>
                <td>
                    <button onclick="excluirAluno(${indice})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;

    });
}

function excluirAluno(indice) {

    if (confirm("Deseja excluir este aluno?")) {

        alunos.splice(indice, 1);

        localStorage.setItem("alunos", JSON.stringify(alunos));

        adicionarTabela();
    }
}

pesquisa.addEventListener("input", pesquisarAluno);

function pesquisarAluno() {

    const texto = pesquisa.value.toLowerCase();

    const alunosFiltrados = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(texto)
    );

    adicionarTabela(alunosFiltrados);
}