const hre = require("hardhat");

async function main() {
  const FileStorage = await hre.ethers.getContractFactory("FileStorage");
  const contract = await FileStorage.deploy();

  await contract.deployed();

  console.log("🚀 Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});