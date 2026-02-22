import { ethers } from "hardhat";

async function main() {
  const [deployer, treasury] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Treasury address:", treasury.address);

  const MedicalNFT = await ethers.getContractFactory("MedicalNFT");
  const medicalNFT = await MedicalNFT.deploy();
  await medicalNFT.waitForDeployment();
  const medicalNFTAddress = await medicalNFT.getAddress();

  console.log("MedicalNFT deployed to:", medicalNFTAddress);

  const EscrowMarketplace = await ethers.getContractFactory("EscrowMarketplace");
  const escrowMarketplace = await EscrowMarketplace.deploy(medicalNFTAddress, treasury.address);
  await escrowMarketplace.waitForDeployment();
  const escrowMarketplaceAddress = await escrowMarketplace.getAddress();

  console.log("EscrowMarketplace deployed to:", escrowMarketplaceAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
