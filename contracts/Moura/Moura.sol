// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CadastroBateria {
    struct Cadastro {
        address endereco;
        string tipo;
        string uso;
        uint256 nr_serie;
        uint256 dataprod;
        uint256 lote;
    }

    Cadastro[] private baterias;

    constructor() {
        baterias.push(Cadastro({
            endereco: msg.sender,
            tipo: "Owner",
            uso: "Carro",
            nr_serie: 123456,
            dataprod: 2024,
            lote: 1
        }));
    }

    function cadastrarBateria(
        string memory _tipo,
        string memory _uso,
        uint256 _nr_serie,
        uint256 _dataprod,
        uint256 _lote
    ) public {
        Cadastro memory cad = Cadastro(
            msg.sender,
            _tipo,
            _uso,
            _nr_serie,
            _dataprod,
            _lote
        );
        baterias.push(cad);
    }

    function listarBaterias() public view returns (Cadastro[] memory) {
        return baterias;
    }

    function removerBaterias(uint256 _id) public {
        delete baterias[_id];
    }
}
