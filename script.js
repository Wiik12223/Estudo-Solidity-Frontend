const proxyAddress = "0x93cBBf49f97e6b3307C33b70854BC29061A9fA74";
const abi = [[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nova",
				"type": "address"
			}
		],
		"name": "atualizarImplementacao",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_implementation",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "implementation",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];
let contract;

async function conectarContrato() {
    if (typeof window.ethereum === "undefined") {
        alert("Metamask não detectada.");
        return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(proxyAddress, abi, signer);

    const valor = await contract.numero();
    document.getElementById("numero").textContent = valor.toString();
}

async function incrementar() {
    if (!contract) return;
    const tx = await contract.incrementar();
    await tx.wait();
    conectarContrato();
}

conectarContrato();
