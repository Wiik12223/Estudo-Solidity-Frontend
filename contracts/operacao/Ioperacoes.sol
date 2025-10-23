// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IOperacoes {
    function armazenar (uint256 valor) external;
    function recuperar () external view returns (uint256);
    function somar (uint256 valor) external returns (uint256);
}