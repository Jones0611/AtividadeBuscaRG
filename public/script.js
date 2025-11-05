//post
function enviarDados() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const rg = document.getElementById('rg').value;

    fetch('pessoas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sobrenome, idade, email, telefone, rua, bairro, cidade, estado, rg })
    })
    .then(response => response.json())
    .then(() => {
        // Limpa apenas os campos de texto, número e email
        document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"]')
          .forEach(input => input.value = '');
        alert("Cadastro realizado com sucesso!");
    })
    .catch(err => alert("Erro ao cadastrar: " + err));
}

//get+put
function buscarDados() {
    const rg = document.getElementById('rgAtualizar').value;

    fetch('pessoas')
        .then(response => response.json())
        .then(data => {
            const pessoaEncontrada = data.find(pessoa => pessoa.rg === rg);

            if (pessoaEncontrada) {
                document.getElementById('id').value = pessoaEncontrada.id;
                document.getElementById('nomeAtualizar').value = pessoaEncontrada.nome;
                document.getElementById('sobrenomeAtualizar').value = pessoaEncontrada.sobrenome;
                document.getElementById('idadeAtualizar').value = pessoaEncontrada.idade;
                document.getElementById('emailAtualizar').value = pessoaEncontrada.email;
                document.getElementById('telefoneAtualizar').value = pessoaEncontrada.telefone;
                document.getElementById('ruaAtualizar').value = pessoaEncontrada.rua;
                document.getElementById('bairroAtualizar').value = pessoaEncontrada.bairro;
                document.getElementById('cidadeAtualizar').value = pessoaEncontrada.cidade;
                document.getElementById('estadoAtualizar').value = pessoaEncontrada.estado;
                document.getElementById('rgAtualizar').value = pessoaEncontrada.rg;
            } else {
                alert('Pessoa não encontrada!');
            }
        })
        .catch(err => alert("Erro ao buscar dados: " + err));
}

//put
function atualizarDados() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeAtualizar').value;
    const sobrenome = document.getElementById('sobrenomeAtualizar').value;
    const idade = document.getElementById('idadeAtualizar').value;
    const email = document.getElementById('emailAtualizar').value;
    const telefone = document.getElementById('telefoneAtualizar').value;
    const rua = document.getElementById('ruaAtualizar').value;
    const bairro = document.getElementById('bairroAtualizar').value;
    const cidade = document.getElementById('cidadeAtualizar').value;
    const estado = document.getElementById('estadoAtualizar').value;
    const rg = document.getElementById('rgAtualizar').value;

    fetch(`pessoas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sobrenome, idade, email, telefone, rua, bairro, cidade, estado, rg })
    })
    .then(response => response.json())
    .then(() => {
        // Limpa apenas os campos de texto, número e email
        document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"]')
          .forEach(input => input.value = '');
        alert("Dados atualizados com sucesso!");
    })
    .catch(err => alert("Erro ao atualizar: " + err));
}

//delete
function deletarDados() {
    const rg = document.getElementById('rg').value;

    fetch('pessoas')
        .then(response => response.json())
        .then(data => {
            const pessoa = data.find(obj => obj.rg === rg);
            document.getElementById('rg').value = '';

            if (pessoa) {
                fetch(`pessoas/${pessoa.id}`, { method: 'DELETE' })
                    .then(() => alert("Pessoa excluída com sucesso!"))
                    .catch(err => alert("Erro ao excluir: " + err));
            } else {
                alert('RG não encontrado!');
            }
        })
        .catch(err => alert("Erro ao buscar RG: " + err));
}

//get
fetch('pessoas')
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById('tabela-corpo');
        if (!tabela) return; // evita erro se a tabela não existir

        tabela.innerHTML = '';
        data.forEach(objeto => {
            const linha = `
                <tr>
                    <td>${objeto.id}</td>
                    <td>${objeto.nome}</td>
                    <td>${objeto.sobrenome}</td>
                    <td>${objeto.email}</td>
                    <td>${objeto.idade}</td>
                    <td>${objeto.telefone}</td>
                    <td>${objeto.rua}</td>
                    <td>${objeto.bairro}</td>
                    <td>${objeto.cidade}</td>
                    <td>${objeto.estado}</td>
                    <td>${objeto.rg}</td>
                </tr>`;
            tabela.innerHTML += linha;
        });
    })
    .catch(err => console.error("Erro ao carregar lista: " + err));
