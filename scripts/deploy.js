const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Deploy WAR token
  const Token = await hre.ethers.getContractFactory("WarVaultToken");
  const token = await Token.deploy(hre.ethers.utils.parseEther("1000000000")); // 1B tokens
  await token.deployed();
  console.log("WarVaultToken deployed at:", token.address);

  // Deploy Vault
  const Vault = await hre.ethers.getContractFactory("WarVaultVault");
  const vault = await Vault.deploy(token.address);
  await vault.deployed();
  console.log("WarVaultVault deployed at:", vault.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
