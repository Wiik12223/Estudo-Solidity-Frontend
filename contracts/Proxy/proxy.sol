// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Proxy{
    address public implementation;
    address public admin;
    constructor(address _implementation){
        implementation = _implementation;
        admin = msg.sender;
    }
    function atualizarImplementacao(address nova) public {
        require(msg.sender == admin, "Apenas admin pode atualizar");
        implementation = nova;
    }
    fallback() external payable {
        address impl = implementation;
        require(impl != address(0), "implementacao nao definida");
        assembly{
            calldatacopy (0,0, calldatasize())
            let result := delegatecall(gas(),impl,0,calldatasize(),0,0)
            returndatacopy(0,0,returndatasize())
            switch result
            case 0 {revert (0, returndatasize())}
            default  {return (0, returndatasize())}
        }
     }
    receive() external payable { }
}