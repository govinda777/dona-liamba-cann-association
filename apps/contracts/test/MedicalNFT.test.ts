import { expect } from "chai";
import { ethers } from "hardhat";
import { MedicalNFT, MedicalNFT__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("MedicalNFT", function () {
  let medicalNFT: MedicalNFT;
  let owner: SignerWithAddress;
  let doctor: SignerWithAddress;
  let patient: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  beforeEach(async function () {
    [owner, doctor, patient, otherAccount] = await ethers.getSigners();

    const MedicalNFTFactory = (await ethers.getContractFactory("MedicalNFT")) as MedicalNFT__factory;
    medicalNFT = await MedicalNFTFactory.deploy();
    await medicalNFT.waitForDeployment();

    const DOCTOR_ROLE = await medicalNFT.DOCTOR_ROLE();
    await medicalNFT.grantRole(DOCTOR_ROLE, doctor.address);
  });

  describe("Minting", function () {
    it("Should allow a doctor to mint a prescription", async function () {
      // mintPrescription(patient, ipfsHash, validityDays)
      const validityDays = 30;
      await expect(medicalNFT.connect(doctor).mintPrescription(patient.address, "QmHash", validityDays))
        .to.emit(medicalNFT, "PrescriptionMinted")
        .withArgs(0, patient.address, doctor.address, (val: any) => val > 0); // Expiration date check

      expect(await medicalNFT.ownerOf(0)).to.equal(patient.address);

      const prescription = await medicalNFT.prescriptions(0);
      expect(prescription.isActive).to.be.true;
      expect(prescription.doctor).to.equal(doctor.address);
    });

    it("Should revert if a non-doctor tries to mint", async function () {
      await expect(
        medicalNFT.connect(otherAccount).mintPrescription(patient.address, "QmHash", 30)
      ).to.be.reverted;
    });
  });

  describe("Validation", function () {
    it("Should return true for valid prescription", async function () {
        await medicalNFT.connect(doctor).mintPrescription(patient.address, "QmHash", 30);
        expect(await medicalNFT.validatePrescription(0)).to.be.true;
    });

    it("Should return false for expired prescription", async function () {
        // Mint with 0 days validity
        await medicalNFT.connect(doctor).mintPrescription(patient.address, "QmHash", 0);

        // Increase time by 1 day (86400 seconds)
        await ethers.provider.send("evm_increaseTime", [86400]);
        await ethers.provider.send("evm_mine");

        expect(await medicalNFT.validatePrescription(0)).to.be.false;
    });
  });

  describe("Soulbound", function () {
    beforeEach(async function () {
      await medicalNFT.connect(doctor).mintPrescription(patient.address, "QmHash", 30);
    });

    it("Should revert on transfer", async function () {
      await expect(
        medicalNFT.connect(patient).transferFrom(patient.address, otherAccount.address, 0)
      ).to.be.revertedWith("MedicalNFT: Soulbound token, cannot transfer");
    });

    it("Should revert on approve", async function () {
      await expect(
        medicalNFT.connect(patient).approve(otherAccount.address, 0)
      ).to.be.revertedWith("MedicalNFT: Soulbound token, cannot approve");
    });
  });
});
