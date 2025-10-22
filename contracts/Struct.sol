// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract CadastroUsuarios {
    struct Cadastro{
        address endereco;
        string nome;
    }
    Cadastro[] private usuarios;

    constructor(){
        usuarios.push(Cadastro({endereco: msg.sender, nome:"Owner"}));
    }
    function cadastroUsuario(string memory _nome) public {
        Cadastro memory cad= Cadastro(msg.sender, _nome);
        usuarios.push(cad);
    }
    function listarUsuarios() public view returns (Cadastro[] memory){
        return usuarios;
    }
    function removerUsuarios(uint256 _id) public {
        delete usuarios[_id];
    }
}