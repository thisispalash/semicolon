// SPDX-License-Identifier: GPLv3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Story.sol";

contract SemicolonFingers is ERC721URIStorage {

    using Counters for Counters.Counter;

    struct StoryStruct {
        uint256 tokenID;
        address creator;
        Story story;
        bool exists;
    }
    mapping(uint256 => StoryStruct) _storyMap;

    StoryStruct[] private _stories;
    Counters.Counter private _tokens;

    constructor() public ERC721("Semicolon", "SMF") {}

    function mintStory(address _creator, string memory tokenURI) public returns (uint256) {

        _tokens.increment();
        
        StoryStruct memory tempStory;
        Story s = new Story();
        uint256 _id = _tokens.current();
        
        tempStory.tokenID = _id;
        tempStory.creator = _creator;
        tempStory.story = s;
        tempStory.exists = true;
        _stories.push(tempStory);
        _storyMap[_id] = tempStory;

        _mint(_creator, _id);
        _setTokenURI(_id, tokenURI);

        return _id;
    }

    function getStory(uint256 _id) public returns (address) {
        if(!_storyMap[_id].exists) revert();
        return address(_storyMap[_id].story);
    }
}