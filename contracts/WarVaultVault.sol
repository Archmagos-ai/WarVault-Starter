// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WarVaultVault is Ownable {
    IERC20 public depositToken;
    mapping(address => uint256) public balances;

    constructor(address _depositToken) Ownable(msg.sender) {
    depositToken = IERC20(_depositToken);
}


    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        depositToken.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        depositToken.transfer(msg.sender, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
