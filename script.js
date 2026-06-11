document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    window.location.href = "formulario.html";
});

const estudantesForm = document.getElementById("estudantesForm");
const nome = document.getElementById("nome");
const idade = document.getElementById("idade");
const curso = document.getElementById("cursos");
const email = document.getElementById("email");
const tbody = document.getElementById("tbody");
const pesquisa = document.getElementById("pesquisa");
const SemMensagem = document.getElementById("Mensagem");

// Carrega os alunos salvos
const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// MUDANÇA: Só tenta desenhar a tabela ou carregar estatísticas se os elementos existirem na página atual
if (tbody) {
    adicionarTabela();
} else if (document.getElementById('totalAlunos')) {
    calcularEstatisticas();
}

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
        idade: Number(idadeV),
        curso: cursoV,
        email: emailV
    };

    // Adiciona ao array
    alunos.push(aluno);

    // Salva no LocalStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

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

    if (SemMensagem) {
        if (lista.length === 0) {
            SemMensagem.classList.remove('Mensagem');
        } else {
            SemMensagem.classList.add('Mensagem');
        }
    }
}

function excluirAluno(indice) {

    if (confirm("Deseja excluir este aluno?")) {

        alunos.splice(indice, 1);

        localStorage.setItem("alunos", JSON.stringify(alunos));

        adicionarTabela();
    }
}

// MUDANÇA: Só adiciona o evento de digitação se o campo de pesquisa existir na página atual
if (pesquisa) {
    pesquisa.addEventListener("input", pesquisarAluno);
}

function pesquisarAluno() {

    const texto = pesquisa.value.toLowerCase();

    const alunosFiltrados = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(texto)
    );

    adicionarTabela(alunosFiltrados);
}

function salvarDados() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
    adicionarTabela();
    calcularEstatisticas();
}

function calcularEstatisticas() {
    const total = alunos.length;
    let media = 0;

    if (total > 0) {
        const somaIdades = alunos.reduce((acumulador, usuario) => {
            return acumulador + Number(usuario.idade);
        }, 0);

        media = (somaIdades / total).toFixed(1);
    }

    // MUDANÇA: Só atualiza os textos na tela se os elementos existirem na página atual
    const totalAlunosEl = document.getElementById('totalAlunos');
    const mediaIdadeEl = document.getElementById('mediaIdade');

    if (totalAlunosEl) totalAlunosEl.textContent = total;
    if (mediaIdadeEl) mediaIdadeEl.textContent = media;
}
