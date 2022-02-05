// SPDX-License-Identifier: GPLv3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Story is ERC721URIStorage {
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokens;

    constructor() ERC721("Fingers", "reSMF") {}

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        
        _tokens.increment();

        uint256 _id = _tokens.current();
        _mint(recipient, _id);
        _setTokenURI(_id, tokenURI);

        return _id;
    }
}