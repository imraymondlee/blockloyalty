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

        addCustomer(0xC867e38D89221584c2D7bbE318ba4D4b494D81ef, 0);
        addCustomer(0xEe9dcaA1a9D0C6e09f00625090Faa578B691Ff83, 2);
        addCustomer(0x4C35f67C3C48D55396Df99210b9eF3606b8Dd0f6, 8);
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
