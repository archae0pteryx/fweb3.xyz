// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";

contract WrappedFweb3Token is ERC20, ERC20Permit, ERC20Votes, ERC20Wrapper {
    constructor(IERC20 wrappedToken)
        ERC20("Wrapped Fweb3", "wFWEB3")
        ERC20Permit("Wrapped Fweb3")
        ERC20Wrapper(wrappedToken)
    {}

    function decimals() public view virtual override(ERC20, ERC20Wrapper) returns (uint8) {
        return 18;
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
