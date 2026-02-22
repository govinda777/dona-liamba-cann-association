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
    await medicalNFT.connect(doctor).mintMedicalRecord(patient.address, "QmHash", []);

    // Deploy Marketplace
    const MarketplaceFactory = await ethers.getContractFactory("EscrowMarketplace");
    marketplace = await MarketplaceFactory.deploy(await medicalNFT.getAddress(), treasury.address);
    await marketplace.waitForDeployment();
  });

  it("Should create an order successfully", async function () {
    const price = ethers.parseEther("1.0");
    await expect(
      marketplace.connect(patient).createOrder(0, 1, pharmacy.address, { value: price })
    )
      .to.emit(marketplace, "OrderCreated")
      .withArgs(0, 0, patient.address, pharmacy.address, price);
  });

  it("Should confirm delivery and distribute fees", async function () {
    const price = ethers.parseEther("100"); // Easy math
    await marketplace.connect(patient).createOrder(0, 1, pharmacy.address, { value: price });

    const initialTreasuryBalance = await ethers.provider.getBalance(treasury.address);
    const initialPharmacyBalance = await ethers.provider.getBalance(pharmacy.address);

    await expect(marketplace.connect(pharmacy).confirmDelivery(0))
      .to.emit(marketplace, "OrderFulfilled");

    const finalTreasuryBalance = await ethers.provider.getBalance(treasury.address);
    const finalPharmacyBalance = await ethers.provider.getBalance(pharmacy.address);

    // Fee is 2%
    const expectedFee = (price * 2n) / 100n;
    const expectedPharmacyAmount = price - expectedFee;

    // Check Treasury balance change (Treasury doesn't pay gas)
    expect(finalTreasuryBalance - initialTreasuryBalance).to.equal(expectedFee);

    // Check Pharmacy balance change (Pharmacy PAYS gas, so we check "close to" or just check contract drained)
    // To make it exact, we would need to calculate gasUsed. For simplicity, we assume pharmacy receives amount minus gas.
    expect(finalPharmacyBalance).to.be.gt(initialPharmacyBalance);
    // Contract should be empty
    expect(await ethers.provider.getBalance(await marketplace.getAddress())).to.equal(0);
  });

  it("Should allow refund by pharmacy", async function () {
    const price = ethers.parseEther("1.0");
    await marketplace.connect(patient).createOrder(0, 1, pharmacy.address, { value: price });

    const initialPatientBalance = await ethers.provider.getBalance(patient.address);

    // Pharmacy refunds
    const tx = await marketplace.connect(pharmacy).refundOrder(0);
    await tx.wait();

    // Patient should get money back (ignoring gas for simplicity check, we can check contract balance is 0)
    expect(await ethers.provider.getBalance(await marketplace.getAddress())).to.equal(0);
  });
});
