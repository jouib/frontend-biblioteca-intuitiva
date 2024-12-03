async function enviarFormulario() {

    const AlunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "dataNascimento": document.querySelectorAll("input")[2].value,
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "celular": document.querySelectorAll("input")[5].value,
    }


    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/alunos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(AlunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contrate o administrador do sistema");
        }
        alert("Aluno cadastrado com sucesso!");

    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaAluno() {
    try {
        const respostaSevidor = await fetch("http://localhost:3333/lista/alunos");

        if (!respostaSevidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeAluno = await respostaSevidor.json();
        console.log(listaDeAluno);
        criarTabelaAlunos(listaDeAluno);

    } catch (error) {
        console.log('erro ao comunicar com o servidor');
        console.log(error);
    }
}


function criarTabelaAlunos(aluno) {
    const tabela = document.querySelector('tbody');

    aluno.forEach(aluno => {
        const row = document.createElement('tr');
        
        const idAluno = document.createElement('td');
        idAluno.textContent = aluno.idAluno;
        row.appendChild(idAluno);

        const ra = document.createElement('td');
        ra.textContent = aluno.ra;
        row.appendChild(ra);
        
        const nome = document.createElement('td');
        nome.textContent = aluno.nome;
        row.appendChild(nome);

        const sobrenome = document.createElement('td');
        sobrenome.textContent = aluno.sobrenome;
        row.appendChild(sobrenome);

        const dataNascimento = document.createElement('td');
        dataNascimento.textContent = aluno.dataNascimento;
        row.appendChild(dataNascimento);

        const endereco = document.createElement('td');
        endereco.textContent = aluno.endereco;
        row.appendChild(endereco);

        const email = document.createElement('td');
        email.textContent = aluno.email;
        row.appendChild(email);

        const celular = document.createElement('td');
        celular.textContent = aluno.celular;
        row.appendChild(celular);

        const acoesTd = document.createElement('td');

        const atualizarIcon = document.createElement('img');
        atualizarIcon.src = "./assets/icons/pencil-square.svg"
        atualizarIcon.alt = 'icone de editar';
        acoesTd.appendChild(atualizarIcon);

        const excluirIcon = document.createElement('img');
        excluirIcon.src = './assets/icons/trash-fill.svg';
        excluirIcon.alt = 'icone de excluir';
        acoesTd.appendChild(excluirIcon);
        row.appendChild(acoesTd);

        tabela.appendChild(row);

    });
}