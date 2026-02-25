// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IMedicalNFT is IERC721 {
    function validatePrescription(uint256 tokenId) external view returns (bool);
}

contract EscrowMarketplace is ReentrancyGuard {
    IMedicalNFT public medicalNFT;
    address public treasury;
    uint256 public constant FEE_PERCENT = 2; // 2% platform fee

    enum OrderStatus { Created, Shipped, Delivered, Disputed, Refunded }

    struct Order {
        uint256 id;
        uint256 prescriptionTokenId;
        uint256 productId;
        address buyer;
        address pharmacy;
        uint256 amount;
        OrderStatus status;
        uint256 createdAt;
    }

    mapping(uint256 => Order) public orders;
    uint256 public nextOrderId;

    event OrderCreated(uint256 indexed orderId, address indexed buyer, address indexed pharmacy, uint256 amount);
    event OrderShipped(uint256 indexed orderId);
    event OrderDelivered(uint256 indexed orderId, uint256 amountReleased);
    event OrderDisputed(uint256 indexed orderId);
    event OrderRefunded(uint256 indexed orderId);

    constructor(address _medicalNFT, address _treasury) {
        medicalNFT = IMedicalNFT(_medicalNFT);
        treasury = _treasury;
    }

    /**
     * @notice Creates a new order for a product using a prescription.
     * @param prescriptionTokenId The ID of the prescription NFT.
     * @param productId The ID of the product being purchased (off-chain ID).
     * @param pharmacy The address of the pharmacy fulfilling the order.
     */
    function createOrder(
        uint256 prescriptionTokenId,
        uint256 productId,
        address pharmacy
    ) external payable nonReentrant {
        require(msg.value > 0, "Amount must be > 0");

        // Verify ownership
        require(medicalNFT.ownerOf(prescriptionTokenId) == msg.sender, "Not prescription owner");

        // Verify validity (active and not expired)
        require(medicalNFT.validatePrescription(prescriptionTokenId), "Prescription invalid or expired");

        uint256 orderId = nextOrderId++;
        orders[orderId] = Order({
            id: orderId,
            prescriptionTokenId: prescriptionTokenId,
            productId: productId,
            buyer: msg.sender,
            pharmacy: pharmacy,
            amount: msg.value,
            status: OrderStatus.Created,
            createdAt: block.timestamp
        });

        emit OrderCreated(orderId, msg.sender, pharmacy, msg.value);
    }

    /**
     * @notice Marks the order as shipped by the pharmacy.
     */
    function markShipped(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(msg.sender == order.pharmacy, "Only pharmacy can mark shipped");
        require(order.status == OrderStatus.Created, "Invalid status");

        order.status = OrderStatus.Shipped;
        emit OrderShipped(orderId);
    }

    /**
     * @notice Confirms delivery by the buyer, releasing funds to the pharmacy.
     */
    function confirmDelivery(uint256 orderId) external nonReentrant {
        Order storage order = orders[orderId];
        require(msg.sender == order.buyer, "Only buyer can confirm delivery");
        require(order.status == OrderStatus.Shipped || order.status == OrderStatus.Created, "Invalid status");

        order.status = OrderStatus.Delivered;

        uint256 fee = (order.amount * FEE_PERCENT) / 100;
        uint256 pharmacyAmount = order.amount - fee;

        // Transfer fee to treasury
        (bool successTreasury, ) = payable(treasury).call{value: fee}("");
        require(successTreasury, "Treasury transfer failed");

        // Transfer remaining amount to pharmacy
        (bool successPharmacy, ) = payable(order.pharmacy).call{value: pharmacyAmount}("");
        require(successPharmacy, "Pharmacy transfer failed");

        emit OrderDelivered(orderId, pharmacyAmount);
    }

    /**
     * @notice Raises a dispute for an order.
     */
    function disputeOrder(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(msg.sender == order.buyer || msg.sender == order.pharmacy, "Only parties can dispute");
        require(order.status == OrderStatus.Created || order.status == OrderStatus.Shipped, "Cannot dispute now");

        order.status = OrderStatus.Disputed;
        emit OrderDisputed(orderId);
    }
}
