let numPedido = [];

// Essa função aqui, serve pra exibir as mensagens
function displayMessage(message) {
    const output = document.getElementById("output");
    output.innerHTML = `<p>${message}</p>` + output.innerHTML;
}

function validarEntrada(pedido) {
    if (isNaN(pedido)) {
        displayMessage("Por favor, insira um número válido.");
        return false;
    }
    return true;
}

function incluirPedido() {
    const pedidoInput = document.getElementById("pedidoInput");
    const pedido = parseInt(pedidoInput.value);

    if (!validarEntrada(pedido)) return;

    if (numPedido.length >= 10) { // Isso aqui limita os pedidos em 10
        displayMessage("Fila Cheia - Não pode mais incluir pedidos.");
        return;
    }

    if (numPedido.includes(pedido)) {
        displayMessage(`Pedido ${pedido} já está na fila.`);
        return;
    }

    numPedido.push(pedido); // Usei Push pra que os novos pedidos vá pra o fim da fila
    displayMessage(`Pedido ${pedido} incluído com sucesso!`);

    pedidoInput.value = "";
}

function atenderPedido() {
    if (numPedido.length === 0) {
        displayMessage("Lista vazia - Não existem pedidos.");
        return;
    }

    const pedidoAtendido = numPedido.shift(); // Essa constante faz com que os pedidos sejam atendidos por ordem de entrada
    displayMessage(`Pedido ${pedidoAtendido} atendido com sucesso!`);
}

// Aqui na função "listar pedido" se não tiver pedidos inseridos, vai informar que a lista ta vazia
function listarPedidos() {
    if (numPedido.length === 0) {
        displayMessage("Lista vazia - Não existem pedidos.");
        return;
    }

    const pedidos = numPedido.map(pedido => `Pedido ${pedido}`).join("<br>");
    displayMessage(`Pedidos na fila:<br>${pedidos}`);
}

function pesquisarPedido() {
    const pedidoInput = document.getElementById("pedidoInput");
    const pedido = parseInt(pedidoInput.value);

    if (!validarEntrada(pedido)) return;

    const posicao = numPedido.indexOf(pedido);
    if (posicao !== -1) {
        displayMessage(`Pedido ${pedido} encontrado na posição ${posicao + 1} da fila.`);
    } else {
        displayMessage(`Pedido ${pedido} não encontrado.`);
    }

    pedidoInput.value = "";
}

function encerrar() { // CABOSSE, férias pelo amor de Deus
    if (numPedido.length > 0) {
        displayMessage("Ainda existem pedidos na fila! O sistema não pode ser encerrado.");
        return;
    }

    alert("Programa encerrado!");
    location.reload();
}

// Coloquei um evento pra permitir que o pedido seja incluido com enter, porque é super chato ter que ficar apertando o botão todas as vezes
document.getElementById("pedidoInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        incluirPedido();
    }
});
