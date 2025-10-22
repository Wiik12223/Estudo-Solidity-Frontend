// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Cofre{
    address public dono;
    constructor(){
        dono = msg.sender;
    }
    modifier onlyOnwner(){
        require(msg.sender == dono, "Apenas o dono pode transferir");
        _;
    }
    modifier denyZero(){
        require(msg.value <= address(this).balance, "Saldo insuficiente");
        _;
    }
    function depositar() public payable {

    }
    receive() external payable { 

    }
    function saldoDOContrato() public view onlyOnwner returns (uint256){
        return address(this).balance;
    }
    
    function transferirPara (address payable destinatario, uint256 valor) public payable onlyOnwner denyZero{
        destinatario.transfer(valor);
    }

    function Sacartudo (address payable destinatario, uint256 valor) public payable onlyOnwner denyZero{
        uint256 saldo =
        destinatario.transfer(address(this).balance);
    }
}