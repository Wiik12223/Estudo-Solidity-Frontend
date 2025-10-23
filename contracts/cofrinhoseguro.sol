// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract CofrinhoSeguro is ReentrancyGuard{
    mapping (address => uint256) public saldos;

    function depositar() external payable {
        require(msg.value > 0, "Valor deve ser maior que zero.");
        saldos[msg.sender] += msg.value;
    }

    function sacar() external nonReentrant {
      uint256 valor = saldos[msg.sender];
      require (valor > 0, "sem saldo para sacar.");
      bool sucesso = payable (msg.sender) .send(valor);
      require(sucesso, "falha no envio");
    }

    function saldoAtual () external view returns (uint256){
        return saldos[msg.sender];
    }
}