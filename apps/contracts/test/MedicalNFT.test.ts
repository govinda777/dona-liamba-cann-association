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
    it("Should allow a doctor to mint a medical record", async function () {
      await expect(medicalNFT.connect(doctor).mintMedicalRecord(patient.address, "QmHash", []))
        .to.emit(medicalNFT, "MedicalRecordMinted")
        .withArgs(0, patient.address, doctor.address);

      expect(await medicalNFT.ownerOf(0)).to.equal(patient.address);
    });

    it("Should revert if a non-doctor tries to mint", async function () {
      await expect(
        medicalNFT.connect(otherAccount).mintMedicalRecord(patient.address, "QmHash", [])
      ).to.be.reverted; // AccessControl revert message varies
    });
  });

  describe("Soulbound", function () {
    beforeEach(async function () {
      await medicalNFT.connect(doctor).mintMedicalRecord(patient.address, "QmHash", []);
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
