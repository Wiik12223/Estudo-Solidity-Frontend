// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Ioperacoes.sol";

contract Cofre is IOperacoes{
    uint256 private dado;

    function armazenar (uint256 valor) external override {
        dado = valor;
    }
    function recuperar() external view override returns (uint256){
        return dado;
    }

    function somar (uint256 valor) external override returns (uint256){
        dado += valor;
        return dado;
    }
}