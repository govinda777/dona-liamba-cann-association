// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract EscrowMarketplace {
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
    }

    mapping(uint256 => Order) public orders;
    uint256 public nextOrderId;

    event OrderCreated(uint256 indexed orderId, uint256 prescriptionId, address buyer, address pharmacy, uint256 amount);
    event OrderFulfilled(uint256 indexed orderId, address pharmacy, uint256 amount);

    constructor(address _medicalNFT, address _treasury) {
        medicalNFT = IERC721(_medicalNFT);
        treasury = _treasury;
    }

    function createOrder(uint256 prescriptionId, uint256 quantity, address pharmacy) external payable {
        require(medicalNFT.ownerOf(prescriptionId) == msg.sender, "Not prescription owner");
        require(msg.value > 0, "Amount must be > 0");

        orders[nextOrderId] = Order({
            prescriptionId: prescriptionId,
            quantity: quantity,
            buyer: msg.sender,
            pharmacy: pharmacy,
            amount: msg.value,
            fulfilled: false
        });

        emit OrderCreated(nextOrderId, prescriptionId, msg.sender, pharmacy, msg.value);
        nextOrderId++;
    }

    function confirmDelivery(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(msg.sender == order.pharmacy, "Only pharmacy can confirm");
        require(!order.fulfilled, "Already fulfilled");

        order.fulfilled = true;

        uint256 fee = (order.amount * FEE_PERCENT) / 100;
        uint256 pharmacyAmount = order.amount - fee;

        payable(treasury).transfer(fee);
        payable(order.pharmacy).transfer(pharmacyAmount);

        emit OrderFulfilled(orderId, order.pharmacy, order.amount);
    }
}
