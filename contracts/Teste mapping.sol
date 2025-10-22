// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract ExemploMapping{

    mapping(address=>string) nomes; //mapeia endereços e nomes

    function registrarNome(string memory nm) external {
        nomes[msg.sender] = nm; //associa o nome ao endereço do remetente
    }

    function consultarNome(address a) external view returns(string memory) {
        return nomes[a]; //retorna o nome associado ao endereço
    }

}