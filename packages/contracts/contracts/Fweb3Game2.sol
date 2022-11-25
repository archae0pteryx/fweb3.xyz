// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/// @custom:security-contact security@fweb3.xyz
contract Fweb3Game2 is ERC1155, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    ERC20 private _fweb3Token;

    constructor(ERC20 fweb3Token) ERC1155("http://localhost:3000") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _fweb3Token = fweb3Token;
    }

    function setURI(string memory newuri) public onlyRole(ADMIN_ROLE) {
        _setURI(newuri);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
