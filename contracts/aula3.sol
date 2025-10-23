// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VerificadorSimples{
    uint public contador;
    function incrementar (uint valor) public {
        contador += valor;
    }

    function decrementar (uint valor) public {
        if (valor > contador) {
            revert("valor excede o contador atual");
        }
        contador -= valor;
    }

    function verificarInvariavel() public view returns (bool){
        assert (contador >= 0);
        return true;
    }
}
