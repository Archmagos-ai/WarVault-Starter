// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WarVaultToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("WarVault Token", "WAR") Ownable(msg.sender) {
    _mint(msg.sender, initialSupply);
}
