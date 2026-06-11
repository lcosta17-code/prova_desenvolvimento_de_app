const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const estudantesForm = document.getElementById("estudantesForm");
    const tbody = document.getElementById("tbody");
    const pesquisa = document.getElementById("pesquisa");
    const loginForm = document.getElementById("loginForm");

    // NOVO: Se estiver na página de Login, escuta o submit e envia para o formulário
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            window.location.href = "formulario.html"; // Redireciona de forma segura
        });
    }

    if (estudantesForm) {
        estudantesForm.addEventListener("submit", function(event) {
            event.preventDefault();
            cadastrarAluno();
        });
    }

    if (tbody) {
        adicionarTabela();
        if (pesquisa) {
            pesquisa.addEventListener("input", pesquisarAluno);
        }
    }

    if (document.getElementById('totalAlunos')) {
        calcularEstatisticas();
    }
});

function cadastrarAluno() {
    const nome = document.getElementById("nome");
    const idade = document.getElementById("idade");
    const curso = document.getElementById("cursos");
    const email = document.getElementById("email");
    const estudantesForm = document.getElementById("estudantesForm");

    if (!nome.value || !idade.value || !curso.value || !email.value) {
        alert("Preencha todos os campos!");
        return;
    }

    const aluno = {
        id: Date.now(),
        nome: nome.value,
        idade: Number(idade.value),
        curso: curso.value,
        email: email.value,
        nota: 0,
        presenca: 100
    };

    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    estudantesForm.reset();
    alert("Cadastro realizado com sucesso!");
}

function adicionarTabela(lista = alunos) {
    const tbody = document.getElementById("tbody");
    const SemMensagem = document.getElementById("Mensagem");

    if (!tbody) return;

    tbody.innerHTML = "";

    lista.forEach((aluno) => {
        tbody.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.email}</td>
                <td>
                    <input type="number" min="0" max="10" step="0.1" value="${aluno.nota || 0}" onchange="atualizarNota(${aluno.id}, this.value)" style="width: 60px;">
                </td>
                <td>
                    <input type="number" min="0" max="100" value="${aluno.presenca || 100}" onchange="atualizarPresenca(${aluno.id}, this.value)" style="width: 60px;">%
                </td>
                <td>
                    <button onclick="excluirAluno(${aluno.id})">
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

function atualizarNota(id, novaNota) {
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
        aluno.nota = Number(novaNota);
        localStorage.setItem("alunos", JSON.stringify(alunos));
    }
}

function atualizarPresenca(id, novaPresenca) {
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
        aluno.presenca = Number(novaPresenca);
        localStorage.setItem("alunos", JSON.stringify(alunos));
    }
}

function excluirAluno(id) {
    if (confirm("Deseja excluir este aluno?")) {
        const indiceReal = alunos.findIndex(aluno => aluno.id === id);

        if (indiceReal !== -1) {
            alunos.splice(indiceReal, 1);
            localStorage.setItem("alunos", JSON.stringify(alunos));
            
            const pesquisa = document.getElementById("pesquisa");
            if (pesquisa && pesquisa.value) {
                pesquisarAluno();
            } else {
                adicionarTabela();
            }
        }
    }
}

function pesquisarAluno() {
    const pesquisa = document.getElementById("pesquisa");
    if (!pesquisa) return;

    const texto = pesquisa.value.toLowerCase();
    const alunosFiltrados = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(texto)
    );

    adicionarTabela(alunosFiltrados);
}

function calcularEstatisticas() {
    const total = alunos.length;
    let mediaIdade = 0;
    let mediaGeralNotas = 0;
    let mediaGeralPresenca = 0;

    if (total > 0) {
        const somaIdades = alunos.reduce((acc, al) => acc + al.idade, 0);
        const somaNotas = alunos.reduce((acc, al) => acc + (al.nota || 0), 0);
        const somaPresenca = alunos.reduce((acc, al) => acc + (al.presenca || 100), 0);
        
        mediaIdade = (somaIdades / total).toFixed(1);
        mediaGeralNotas = (somaNotas / total).toFixed(1);
        mediaGeralPresenca = (somaPresenca / total).toFixed(0);
    }

    const totalAlunosEl = document.getElementById('totalAlunos');
    const mediaIdadeEl = document.getElementById('mediaIdade');
    const mediaNotasEl = document.getElementById('mediaNotas');
    const mediaPresencaEl = document.getElementById('mediaPresenca');

    if (totalAlunosEl) totalAlunosEl.textContent = total;
    if (mediaIdadeEl) mediaIdadeEl.textContent = mediaIdade; 
    if (mediaNotasEl) mediaNotasEl.textContent = mediaGeralNotas;
    if (mediaPresencaEl) mediaPresencaEl.textContent = mediaGeralPresenca + "%";
}

function gerarPDF() {
    window.print();
}
