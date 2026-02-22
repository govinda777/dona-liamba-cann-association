// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MedicalNFT is ERC721, AccessControl {
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    uint256 private _nextTokenId;

    mapping(uint256 => address[]) public coOwners;
    mapping(uint256 => bytes32) public encryptedDataHash;

    event MedicalRecordMinted(uint256 indexed tokenId, address indexed patient, address indexed doctor);
    event CoOwnershipGranted(uint256 indexed tokenId, address indexed doctor);

    constructor() ERC721("MedicalNFT", "MED") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DOCTOR_ROLE, msg.sender);
    }

    /**
     * @notice Mints a new Medical Record NFT.
     * @param patient The address of the patient receiving the prescription.
     * @param dataHashStr The IPFS hash or encrypted data reference.
     * @param authorizedDoctors List of doctors initially authorized.
     */
    function mintMedicalRecord(
        address patient,
        string memory dataHashStr,
        address[] memory authorizedDoctors
    ) external onlyRole(DOCTOR_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _mint(patient, tokenId);

        coOwners[tokenId] = authorizedDoctors;
        // Store the hash of the encrypted data reference.
        // NOTE: Actual data encryption must happen off-chain before calling this.
        encryptedDataHash[tokenId] = keccak256(abi.encodePacked(dataHashStr));

        emit MedicalRecordMinted(tokenId, patient, msg.sender);
    }

    function grantCoOwnership(uint256 tokenId, address doctor)
        external
    {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        coOwners[tokenId].push(doctor);
        emit CoOwnershipGranted(tokenId, doctor);
    }

    function getCoOwners(uint256 tokenId) external view returns (address[] memory) {
        return coOwners[tokenId];
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

    // Check if a user has access (Owner or Co-owner)
    function hasAccess(uint256 tokenId, address user) external view returns (bool) {
        if (ownerOf(tokenId) == user) return true;
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
