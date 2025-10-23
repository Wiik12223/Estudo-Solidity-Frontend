// ===== CONFIG =====
const CONTRACT_ADDRESS = "0x4d9a38ee633967F24f8308b4174E2E43C16081DF"; // <-- Troque aqui

const ABI = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[
    {"internalType":"string","name":"_tipo","type":"string"},
    {"internalType":"string","name":"_uso","type":"string"},
    {"internalType":"uint256","name":"_nr_serie","type":"uint256"},
    {"internalType":"uint256","name":"_dataprod","type":"uint256"},
    {"internalType":"uint256","name":"_lote","type":"uint256"}
  ],
  "name":"cadastrarBateria","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"listarBaterias","outputs":[{"components":[
    {"internalType":"address","name":"endereco","type":"address"},
    {"internalType":"string","name":"tipo","type":"string"},
    {"internalType":"string","name":"uso","type":"string"},
    {"internalType":"uint256","name":"nr_serie","type":"uint256"},
    {"internalType":"uint256","name":"dataprod","type":"uint256"},
    {"internalType":"uint256","name":"lote","type":"uint256"}
  ],
  "internalType":"struct CadastroBateria.Cadastro[]","name":"","type":"tuple[]"}],
  "stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],
  "name":"removerBaterias","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

// ===== STATE =====
let web3;
let contract;
let accounts = [];

// ===== DOM =====
const $ = (q) => document.querySelector(q);
const btnConnect = $("#btnConnect");
const connectedBox = $("#connectedBox");
const shortAccount = $("#shortAccount");
const btnCadastrar = $("#btnCadastrar");
const btnLimpar = $("#btnLimpar");
const dotCadastro = $("#dotCadastro");
const msgCadastro = $("#msgCadastro");
const btnListar = $("#btnListar");
const listaWrapper = $("#listaWrapper");

function shortAddr(addr){ return addr ? addr.slice(0,6)+"..."+addr.slice(-4) : ""; }
function setStatus(dot, msg, state, text){
  dot.classList.remove("status-ok","status-bad");
  dot.style.background="#777";
  if(state==="ok") dot.classList.add("status-ok");
  if(state==="bad") dot.classList.add("status-bad");
  if(state==="loading") dot.style.background="linear-gradient(90deg,#999,#aaa,#999)";
  msg.textContent = text;
}
function toEpoch(date){ return Math.floor(Date.parse(date)/1000) || 0; }
function fromEpoch(sec){ return sec ? new Date(sec*1000).toLocaleDateString("pt-BR") : "-"; }

// ===== INIT WEB3 =====
async function initWeb3(){
  if(window.ethereum){
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    return true;
  } else {
    alert("MetaMask não detectada!");
    return false;
  }
}

// ===== CONNECT =====
async function connectWallet(){
  try{
    if(!window.ethereum) return alert("Instale a MetaMask.");
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await initWeb3();
    btnConnect.style.display = "none";
    connectedBox.style.display = "inline-flex";
    shortAccount.textContent = shortAddr(accounts[0]);
  }catch(err){
    console.error(err);
    alert("Erro ao conectar à carteira.");
  }
}

// ===== CADASTRAR =====
async function cadastrar(){
  if(!contract) await initWeb3();
  const tipo = $("#tipo").value.trim();
  const uso = $("#uso").value.trim();
  const nr_serie = $("#nr_serie").value.trim();
  const dataprod = toEpoch($("#dataprod").value);
  const lote = $("#lote").value.trim();

  if(!tipo || !uso || !nr_serie || !dataprod || !lote){
    setStatus(dotCadastro,msgCadastro,"bad","Preencha todos os campos!");
    return;
  }

  try{
    setStatus(dotCadastro,msgCadastro,"loading","Enviando transação...");
    await contract.methods
      .cadastrarBateria(tipo,uso,nr_serie,dataprod,lote)
      .send({ from: accounts[0] });
    setStatus(dotCadastro,msgCadastro,"ok","Bateria cadastrada com sucesso!");
    listar();
  }catch(err){
    console.error(err);
    setStatus(dotCadastro,msgCadastro,"bad","Erro ao cadastrar.");
  }
}

// ===== LISTAR =====
async function listar(){
  if(!contract) await initWeb3();
  try{
    const arr = await contract.methods.listarBaterias().call();
    if(!arr.length){
      listaWrapper.innerHTML = `<div class="empty">Nenhum registro encontrado.</div>`;
      return;
    }

    let html = `<div style="overflow:auto"><table><thead><tr>
      <th>#</th><th>Endereço</th><th>Tipo</th><th>Uso</th>
      <th>Nº Série</th><th>Data Prod.</th><th>Lote</th><th>Ações</th>
      </tr></thead><tbody>`;

    arr.forEach((item,i)=>{
      html += `<tr>
        <td>${i}</td>
        <td><span class="address">${item.endereco}</span></td>
        <td>${item.tipo}</td>
        <td>${item.uso}</td>
        <td>${item.nr_serie}</td>
        <td>${fromEpoch(item.dataprod)}</td>
        <td>${item.lote}</td>
        <td><button class="btn btn-danger" onclick="remover(${i})">Remover</button></td>
      </tr>`;
    });
    html += "</tbody></table></div>";
    listaWrapper.innerHTML = html;
  }catch(err){
    console.error(err);
    listaWrapper.innerHTML = `<div class="empty">Erro ao listar. Veja o console.</div>`;
  }
}

// ===== REMOVER =====
async function remover(id){
  if(!contract) await initWeb3();
  if(!confirm(`Remover item #${id}?`)) return;
  try{
    await contract.methods.removerBaterias(id).send({ from: accounts[0] });
    listar();
  }catch(err){
    console.error(err);
    alert("Erro ao remover. Veja o console.");
  }
}
window.remover = remover;

function limpar(){
  ["tipo","uso","nr_serie","dataprod","lote"].forEach(id => $("#"+id).value="");
  setStatus(dotCadastro,msgCadastro,"idle","Aguardando...");
}

// ===== EVENTOS =====
btnConnect.addEventListener("click", connectWallet);
btnCadastrar.addEventListener("click", cadastrar);
btnLimpar.addEventListener("click", limpar);
btnListar.addEventListener("click", listar);

// ===== AUTOLOAD =====
(async()=>{
  if(window.ethereum){
    const accs = await window.ethereum.request({ method: "eth_accounts" });
    if(accs && accs.length){
      accounts = accs;
      await initWeb3();
      btnConnect.style.display = "none";
      connectedBox.style.display = "inline-flex";
      shortAccount.textContent = shortAddr(accounts[0]);
    }
  }
})();
