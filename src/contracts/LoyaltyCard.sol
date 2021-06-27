pragma solidity ^0.5.0;

contract LoyaltyCard {
    address public owner;

    struct Customer {
        address account;
        uint256 balance;
    }

    mapping(address => Customer) public customers;

    constructor() public {
        owner = msg.sender;
        addCustomer(0xe04eF06a5652E224Ba2E63507bbf474d396967d4, 10);
    }

    event CustomerAdded(address account, uint256 balance);

    event BalanceIncreased(
        address account,
        uint256 stampIncrement,
        uint256 newBalance
    );

    event StampsRedeemed(address account);

    function addCustomer(address account, uint256 balance) public {
        Customer memory newCustomer = Customer({
            account: account,
            balance: balance
        });
        customers[account] = newCustomer;
        emit CustomerAdded(account, balance);
    }

    function addStamp(address account, uint256 stampIncrement) public {
        Customer memory customer = customers[account];
        customer.balance += stampIncrement;
        customers[account] = customer;
        emit BalanceIncreased(account, stampIncrement, customer.balance);
    }

    function redeemStamps(address account) public {
        Customer memory customer = customers[account];
        customer.balance = 0;
        customers[account] = customer;
        emit StampsRedeemed(account);
    }
}
