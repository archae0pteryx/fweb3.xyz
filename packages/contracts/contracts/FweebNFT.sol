// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "./Alphabet.sol";

contract FweebNFT is ERC721, Ownable, Alphabet {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Player {
        address addr;
        string username;
    }
    mapping(string => bool) private _takenUserNames;
    mapping(uint => Player) private _players;

    modifier validPlayer(uint tokenId, string memory _username) {
        bytes memory _usernameBytes = bytes(_username);
        require(_usernameBytes.length > 3, "Username must be at least 3 characters");
        require(_usernameBytes.length < 15, "Username must be less than 15 characters");
        require(_players[tokenId].addr == address(0), "Player already exists");
        require(!_takenUserNames[_username], "Username already taken");
        _;
    }

    constructor() ERC721("Fweeb", "FWEEB") {}

    function safeMint(
        address to,
        string calldata _username
    ) public onlyOwner validPlayer(_tokenIdCounter.current(), _username) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _players[tokenId] = Player(to, _username);
        _takenUserNames[_username] = true;
    }

    function encodeJson(uint256 tokenId, string memory _username) private view returns (string memory) {
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "Fweeb #',
                Strings.toString(tokenId),
                '", "description": "Official Fweeb!", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(super.createNFT(_username))),
                '"}'
            )
        );
        return json;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        require(keccak256(bytes(_players[tokenId].username)) != keccak256(""), "Player does not exist");
        string memory _username = _players[tokenId].username;
        string memory json = encodeJson(tokenId, _username);
        return json;
    }
}
