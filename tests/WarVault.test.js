const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WarVault", function () {
  let Token, token, Vault, vault, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy WAR token
    Token = await ethers.getContractFactory("WarVaultToken");
    token = await Token.deploy(ethers.utils.parseEther("1000000"));
    await token.deployed();

    // Deploy Vault
    Vault = await ethers.getContractFactory("WarVaultVault");
    vault = await Vault.deploy(token.address);
    await vault.deployed();

    // Mint tokens to user for testing
    await token.transfer(user.address, ethers.utils.parseEther("100"));
  });

  it("should allow deposits", async function () {
    await token.connect(user).approve(vault.address, ethers.utils.parseEther("50"));
    await vault.connect(user).deposit(ethers.utils.parseEther("50"));
    expect(await vault.getBalance(user.address)).to.equal(ethers.utils.parseEther("50"));
  });

  it("should allow withdrawals", async function () {
    await token.connect(user).approve(vault.address, ethers.utils.parseEther("50"));
    await vault.connect(user).deposit(ethers.utils.parseEther("50"));
    await vault.connect(user).withdraw(ethers.utils.parseEther("50"));
    expect(await vault.getBalance(user.address)).to.equal(0);
  });
});
