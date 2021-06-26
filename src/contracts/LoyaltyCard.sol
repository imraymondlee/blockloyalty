pragma solidity ^0.5.0;

contract LoyaltyCard {
    address public owner;

    struct Customer {
        uint256 id;
        address account;
        uint256 balance;
    }

    mapping(uint256 => Customer) public customers;

    constructor() public {
        owner = msg.sender;
        addCustomer(4, 0xe04eF06a5652E224Ba2E63507bbf474d396967d4, 10);
    }

    event CustomerAdded(uint256 id, address account, uint256 balance);

    function addCustomer(
        uint256 id,
        address account,
        uint256 balance
    ) public {
        Customer memory newCustomer = Customer({
            id: id,
            account: account,
            balance: balance
        });
        customers[id] = newCustomer;
        emit CustomerAdded(id, account, balance);
    }
}
