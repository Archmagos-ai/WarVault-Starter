const { expect } = require("chai");
const hre = require("hardhat");

describe("WarVault", function () {
  let token, vault, owner, user;

  beforeEach(async function () {
    [owner, user] = await hre.ethers.getSigners();

    // Deploy WAR token
    const Token = await hre.ethers.getContractFactory("WarVaultToken");
    token = await Token.deploy(hre.ethers.parseEther("1000000"));
    await token.waitForDeployment();

    // Deploy Vault
    const Vault = await hre.ethers.getContractFactory("WarVaultVault");
    vault = await Vault.deploy(await token.getAddress());
    await vault.waitForDeployment();

    // Transfer tokens to user
    await token.transfer(user.address, hre.ethers.parseEther("100"));
  });

  it("should allow deposits", async function () {
    await token.connect(user).approve(await vault.getAddress(), hre.ethers.parseEther("50"));
    await vault.connect(user).deposit(hre.ethers.parseEther("50"));
    expect(await vault.getBalance(user.address)).to.equal(hre.ethers.parseEther("50"));
  });

  it("should allow withdrawals", async function () {
    await token.connect(user).approve(await vault.getAddress(), hre.ethers.parseEther("50"));
    await vault.connect(user).deposit(hre.ethers.parseEther("50"));
    await vault.connect(user).withdraw(hre.ethers.parseEther("50"));
    expect(await vault.getBalance(user.address)).to.equal(0);
  });
});
