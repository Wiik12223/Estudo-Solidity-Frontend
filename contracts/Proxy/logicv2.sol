// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract LogicaV1{
    uint256 public numero;

    function incrementar() public {
        numero += 2;
    }

    function version () public pure returns (string memory){
        return "Versao 2";
    }
}