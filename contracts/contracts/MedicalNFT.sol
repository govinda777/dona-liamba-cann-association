// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MedicalNFT is ERC721, AccessControl {
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    uint256 private _nextTokenId;

    struct Prescription {
        address doctor;
        address patient;
        string ipfsHash;
        uint256 issueDate;
        uint256 expirationDate;
        bool isActive;
    }

    mapping(uint256 => Prescription) public prescriptions;
    mapping(uint256 => address[]) public coOwners;

    event PrescriptionMinted(uint256 indexed tokenId, address indexed patient, address indexed doctor, uint256 expirationDate);
    event CoOwnershipGranted(uint256 indexed tokenId, address indexed association);
    event PrescriptionStatusChanged(uint256 indexed tokenId, bool isActive);

    constructor() ERC721("MedicalNFT", "MED") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DOCTOR_ROLE, msg.sender);
    }

    /**
     * @notice Mints a new Medical Prescription NFT.
     * @param patient The address of the patient receiving the prescription.
     * @param ipfsHash The IPFS hash of the encrypted prescription.
     * @param validityDays Validity of the prescription in days.
     */
    function mintPrescription(
        address patient,
        string memory ipfsHash,
        uint256 validityDays
    ) external onlyRole(DOCTOR_ROLE) returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(patient, tokenId);

        uint256 expirationDate = block.timestamp + (validityDays * 1 days);

        prescriptions[tokenId] = Prescription({
            doctor: msg.sender,
            patient: patient,
            ipfsHash: ipfsHash,
            issueDate: block.timestamp,
            expirationDate: expirationDate,
            isActive: true
        });

        emit PrescriptionMinted(tokenId, patient, msg.sender, expirationDate);
        return tokenId;
    }

    /**
     * @notice Checks if a prescription is valid (active and not expired).
     * @param tokenId The ID of the prescription to check.
     */
    function validatePrescription(uint256 tokenId) external view returns (bool) {
        // Check existence by checking if owner is not 0x0 (implicit in ownerOf but safer to check struct if we rely on it)
        // ERC721.ownerOf throws if token doesn't exist.
        // We can just check the struct if token exists.
        if (_ownerOf(tokenId) == address(0)) {
            return false;
        }

        Prescription memory p = prescriptions[tokenId];
        return p.isActive && block.timestamp <= p.expirationDate;
    }

    /**
     * @notice Adds a co-owner (e.g., an association) to the prescription.
     * @param tokenId The ID of the prescription.
     * @param association The address of the association to authorize.
     */
    function addCoOwner(uint256 tokenId, address association) external {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        coOwners[tokenId].push(association);
        emit CoOwnershipGranted(tokenId, association);
    }

    function getCoOwners(uint256 tokenId) external view returns (address[] memory) {
        return coOwners[tokenId];
    }

    function deactivatePrescription(uint256 tokenId) external onlyRole(DOCTOR_ROLE) {
        require(prescriptions[tokenId].doctor == msg.sender, "Not the prescribing doctor");
        prescriptions[tokenId].isActive = false;
        emit PrescriptionStatusChanged(tokenId, false);
    }

    // Soulbound: Block transfers and approvals
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("MedicalNFT: Soulbound token, cannot transfer");
        }
        return super._update(to, tokenId, auth);
    }

    function approve(address, uint256) public virtual override {
        revert("MedicalNFT: Soulbound token, cannot approve");
    }

    function setApprovalForAll(address, bool) public virtual override {
        revert("MedicalNFT: Soulbound token, cannot approve for all");
    }

    // Check if a user has access (Owner, Doctor or Co-owner)
    function hasAccess(uint256 tokenId, address user) external view returns (bool) {
        if (ownerOf(tokenId) == user) return true;
        if (prescriptions[tokenId].doctor == user) return true;

        address[] memory owners = coOwners[tokenId];
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == user) return true;
        }
        return false;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
