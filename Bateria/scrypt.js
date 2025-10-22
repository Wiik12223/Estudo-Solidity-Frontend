const abi = [/* Cole aqui a ABI que você forneceu */];
const contratoEndereco = "0x7e018Ddc53667e75F1801ceD2866C549599E2F87"; // <- substitua pelo endereço real

let web3;
let contrato;
let conta;

async function conectar() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const contas = await web3.eth.getAccounts();
    conta = contas[0];
    contrato = new web3.eth.Contract(abi, contratoEndereco);
  } else {
    alert("Instale o MetaMask.");
  }
}

async function cadastrarBateria() {
  await conectar();

  const tipo = document.getElementById("tipo").value;
  const uso = document.getElementById("uso").value;
  const nr_serie = document.getElementById("nr_serie").value;
  const dataprod = document.getElementById("dataprod").value;
  const lote = document.getElementById("lote").value;

  if (!tipo || !uso || !nr_serie || !dataprod || !lote) {
    return alert("Preencha todos os campos.");
  }

  try {
    await contrato.methods
      .cadastrarBateria(tipo, uso, nr_serie, dataprod, lote)
      .send({ from: conta });
    alert("Bateria registrada com sucesso!");
    listarBaterias();
  } catch (err) {
    console.error(err);
    alert("Erro ao registrar.");
  }
}

async function listarBaterias() {
  await conectar();

  try {
    const baterias = await contrato.methods.listarBaterias().call();
    const lista = document.getElementById("listaBaterias");
    lista.innerHTML = "";

    if (baterias.length === 0) {
      lista.innerHTML = "<li>Nenhuma bateria registrada.</li>";
      return;
    }

    baterias.forEach((bat, index) => {
      const item = document.createElement("li");
      item.textContent = `ID: ${index} | Endereço: ${bat.endereco} | Tipo: ${bat.tipo} | Uso: ${bat.uso} | Série: ${bat.nr_serie} | Data: ${bat.dataprod} | Lote: ${bat.lote}`;
      lista.appendChild(item);
    });
  } catch (err) {
    console.error(err);
    alert("Erro ao listar.");
  }
}

async function removerBateria() {
  await conectar();
  const id = document.getElementById("idRemover").value;
  if (id === "") return alert("Digite o ID.");

  try {
    await contrato.methods.removerBaterias(id).send({ from: conta });
    alert("Removida com sucesso.");
    listarBaterias();
  } catch (err) {
    console.error(err);
    alert("Erro ao remover.");
  }
}
