// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Fweb3Token is ERC20 {
    constructor() ERC20("Fweb3Token", "FWEB3") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
