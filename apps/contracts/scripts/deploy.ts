import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const [deployer, treasury] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Treasury address:", treasury.address);

  // Deploy MedicalNFT
  const MedicalNFT = await ethers.getContractFactory("MedicalNFT");
  const medicalNFT = await MedicalNFT.deploy();
  await medicalNFT.waitForDeployment();
  const medicalNFTAddress = await medicalNFT.getAddress();
  console.log("MedicalNFT deployed to:", medicalNFTAddress);

  // Deploy EscrowMarketplace
  const EscrowMarketplace = await ethers.getContractFactory("EscrowMarketplace");
  const escrowMarketplace = await EscrowMarketplace.deploy(medicalNFTAddress, treasury.address);
  await escrowMarketplace.waitForDeployment();
  const escrowMarketplaceAddress = await escrowMarketplace.getAddress();
  console.log("EscrowMarketplace deployed to:", escrowMarketplaceAddress);

  // Output addresses and ABIs for Frontend
  const frontendAbisDir = path.join(__dirname, "../../../apps/frontend/src/abis");
  if (!fs.existsSync(frontendAbisDir)) {
    fs.mkdirSync(frontendAbisDir, { recursive: true });
  }

  const contractsConfig = {
    MedicalNFT: {
      address: medicalNFTAddress,
      abi: JSON.parse(fs.readFileSync(path.join(__dirname, "../artifacts/contracts/MedicalNFT.sol/MedicalNFT.json"), "utf8")).abi,
    },
    EscrowMarketplace: {
      address: escrowMarketplaceAddress,
      abi: JSON.parse(fs.readFileSync(path.join(__dirname, "../artifacts/contracts/EscrowMarketplace.sol/EscrowMarketplace.json"), "utf8")).abi,
    },
  };

  fs.writeFileSync(
    path.join(frontendAbisDir, "contracts-config.json"),
    JSON.stringify(contractsConfig, null, 2)
  );

  console.log("Frontend config written to apps/frontend/src/abis/contracts-config.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
