// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MeuNFT is ERC721URIStorage, Ownable{
    uint private _tokenIdCounter;

    constructor() ERC721 ("MeuNFT", "NBFT") Ownable (msg.sender) {

    }

    function mint (address to, string memory uri) public onlyOwner {
        uint tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _mint (to, tokenId);
        _setTokenURI(tokenId, uri);
    }
}