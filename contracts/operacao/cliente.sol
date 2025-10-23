// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Ioperacoes.sol";

contract cliente{
    address public remoto;
    constructor(address a){
        remoto = a;
    }
    function salvarValor (uint256 valor) external {
        IOperacoes(remoto) .armazenar(valor);
    }
    function lerValor () external view returns (uint256){
        return IOperacoes(remoto).recuperar();
    }
}
