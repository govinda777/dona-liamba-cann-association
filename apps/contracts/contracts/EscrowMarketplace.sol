// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EscrowMarketplace is ReentrancyGuard {
    IERC721 public medicalNFT;
    address public treasury;
    uint256 public constant FEE_PERCENT = 2;

    struct Order {
        uint256 prescriptionId;
        uint256 quantity;
        address buyer;
        address pharmacy;
        uint256 amount;
        bool fulfilled;
        bool refunded;
    }

    mapping(uint256 => Order) public orders;
    uint256 public nextOrderId;

    event OrderCreated(uint256 indexed orderId, uint256 prescriptionId, address buyer, address pharmacy, uint256 amount);
    event OrderFulfilled(uint256 indexed orderId, address pharmacy, uint256 amount);
    event OrderRefunded(uint256 indexed orderId, address buyer, uint256 amount);

    constructor(address _medicalNFT, address _treasury) {
        medicalNFT = IERC721(_medicalNFT);
        treasury = _treasury;
    }

    function createOrder(uint256 prescriptionId, uint256 quantity, address pharmacy) external payable nonReentrant {
        // Ensure the caller actually owns the prescription NFT
        // Note: This check is valid at the time of calling. Since MedicalNFT is soulbound,
        // the ownership is stable unless burned (which we don't cover here yet).
        require(medicalNFT.ownerOf(prescriptionId) == msg.sender, "Not prescription owner");
        require(msg.value > 0, "Amount must be > 0");

        orders[nextOrderId] = Order({
            prescriptionId: prescriptionId,
            quantity: quantity,
            buyer: msg.sender,
            pharmacy: pharmacy,
            amount: msg.value,
            fulfilled: false,
            refunded: false
        });

        emit OrderCreated(nextOrderId, prescriptionId, msg.sender, pharmacy, msg.value);
        nextOrderId++;
    }

    function confirmDelivery(uint256 orderId) external nonReentrant {
        Order storage order = orders[orderId];
        require(msg.sender == order.pharmacy, "Only pharmacy can confirm");
        require(!order.fulfilled, "Already fulfilled");
        require(!order.refunded, "Already refunded");

        // CEI Pattern: Effects first
        order.fulfilled = true;

        uint256 fee = (order.amount * FEE_PERCENT) / 100;
        uint256 pharmacyAmount = order.amount - fee;

        // Interactions: Use call instead of transfer
        (bool successTreasury, ) = payable(treasury).call{value: fee}("");
        require(successTreasury, "Treasury transfer failed");

        (bool successPharmacy, ) = payable(order.pharmacy).call{value: pharmacyAmount}("");
        require(successPharmacy, "Pharmacy transfer failed");

        emit OrderFulfilled(orderId, order.pharmacy, order.amount);
    }

    // Basic refund mechanism: Only pharmacy can trigger refund if they can't fulfill
    // In a real system, this might need a time-lock or dispute mechanism
    function refundOrder(uint256 orderId) external nonReentrant {
        Order storage order = orders[orderId];
        require(msg.sender == order.pharmacy, "Only pharmacy can refund");
        require(!order.fulfilled, "Already fulfilled");
        require(!order.refunded, "Already refunded");

        order.refunded = true;

        (bool success, ) = payable(order.buyer).call{value: order.amount}("");
        require(success, "Refund transfer failed");

        emit OrderRefunded(orderId, order.buyer, order.amount);
    }
}
