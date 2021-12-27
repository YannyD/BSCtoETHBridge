//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockMtcEth is ERC20 {
    address public owner;

    constructor(uint256 initialSupply, address _owner) ERC20("MockMTCEth", "EMTC"){
        owner = _owner;
        _mint(_owner, initialSupply);
    }
}
