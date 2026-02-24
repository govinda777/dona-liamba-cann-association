import { expect } from "chai";
import { ethers } from "hardhat";
import { EscrowMarketplace, MedicalNFT } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("EscrowMarketplace", function () {
  let marketplace: EscrowMarketplace;
  let medicalNFT: MedicalNFT;
  let owner: SignerWithAddress;
  let treasury: SignerWithAddress;
  let doctor: SignerWithAddress;
  let patient: SignerWithAddress;
  let pharmacy: SignerWithAddress;

  beforeEach(async function () {
    [owner, treasury, doctor, patient, pharmacy] = await ethers.getSigners();

    // Deploy NFT
    const MedicalNFTFactory = await ethers.getContractFactory("MedicalNFT");
    medicalNFT = await MedicalNFTFactory.deploy();
    await medicalNFT.waitForDeployment();
    const DOCTOR_ROLE = await medicalNFT.DOCTOR_ROLE();
    await medicalNFT.grantRole(DOCTOR_ROLE, doctor.address);

    // Mint NFT to patient
    // mintPrescription(patient, ipfsHash, validityDays)
    await medicalNFT.connect(doctor).mintPrescription(patient.address, "QmHash", 30);

    // Deploy Marketplace
    const MarketplaceFactory = await ethers.getContractFactory("EscrowMarketplace");
    marketplace = await MarketplaceFactory.deploy(await medicalNFT.getAddress(), treasury.address);
    await marketplace.waitForDeployment();
  });

  it("Should create an order successfully", async function () {
    const price = ethers.parseEther("1.0");
    // createOrder(prescriptionTokenId, productId, pharmacy)
    await expect(
      marketplace.connect(patient).createOrder(0, 1, pharmacy.address, { value: price })
    )
      .to.emit(marketplace, "OrderCreated")
      .withArgs(0, patient.address, pharmacy.address, price);
  });

  it("Should confirm delivery by buyer and distribute fees", async function () {
    const price = ethers.parseEther("100"); // Easy math
    await marketplace.connect(patient).createOrder(0, 1, pharmacy.address, { value: price });

    // Mark as shipped by pharmacy
    await marketplace.connect(pharmacy).markShipped(0);

    const initialTreasuryBalance = await ethers.provider.getBalance(treasury.address);
    const initialPharmacyBalance = await ethers.provider.getBalance(pharmacy.address);

    // Buyer confirms delivery
    await expect(marketplace.connect(patient).confirmDelivery(0))
      .to.emit(marketplace, "OrderDelivered");

    const finalTreasuryBalance = await ethers.provider.getBalance(treasury.address);
    const finalPharmacyBalance = await ethers.provider.getBalance(pharmacy.address);

    // Fee is 2%
    const expectedFee = (price * 2n) / 100n;
    const expectedPharmacyAmount = price - expectedFee;

    // Check Treasury balance change
    expect(finalTreasuryBalance - initialTreasuryBalance).to.equal(expectedFee);

    // Check Pharmacy balance change (Pharmacy didn't pay gas for confirmation, Buyer did)
    expect(finalPharmacyBalance - initialPharmacyBalance).to.equal(expectedPharmacyAmount);

    // Contract should be empty
    expect(await ethers.provider.getBalance(await marketplace.getAddress())).to.equal(0);
  });

  it("Should allow dispute by buyer or pharmacy", async function () {
    const price = ethers.parseEther("1.0");
    await marketplace.connect(patient).createOrder(0, 1, pharmacy.address, { value: price });

    await expect(marketplace.connect(patient).disputeOrder(0))
        .to.emit(marketplace, "OrderDisputed")
        .withArgs(0);

    const order = await marketplace.orders(0);
    expect(order.status).to.equal(3); // OrderStatus.Disputed = 3
  });
});
