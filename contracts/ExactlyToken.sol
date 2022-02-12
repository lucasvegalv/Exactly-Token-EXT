//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExactlyToken is ERC20 {
    constructor() ERC20("Exactly Token", "EXT") {
        _mint(msg.sender, 100 * (10 ** 18));
    }
}
