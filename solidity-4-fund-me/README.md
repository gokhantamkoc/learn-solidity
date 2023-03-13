# Cryptocurrency Transactions

## Transactions on ETH Blockchain

**Fields:** 
- **Nonce:** tx count for the account
- **Gas Price:** price per unit of gas (in wei)
- **Gas Limit:** max gas that this tx can use
- **To:** address that the tx is sent to
- **Value:** amount of wei to send
- **Data:** what to send to the To address
- **v, r, s:** components of tx signature

To receive cryptocurrency from a function you should use payable modifier:
```solidity
contract FundMe {
    function fund() public payable {
        // Want to be able to set a minimum fund amount
        // 1. How do we send ETH to this contract
    }
}
```

## Tricks to Make the Contract Gas Efficient

1. In [FundMe](./contracts/FundMe.sol) contract, there are two `public` variables `owner` and `minimumUSD`. We can make them either `immutable` or `constant`. This will make them *once-initialized-they-can-never-be-changed*:

change below line:
```
address public owner;
```
to:
```
address public immutable i_owner;
```

change below line:
```
uint256 public minimumUSD;
```
to:
```
uint256 public constant MINIMUM_USD;
```

2. In [FundMe](./contracts/FundMe.sol) contract, there require statements which holds error messages which is a string data. As of solidity-v0.8.4, you can write if statements to handle errors like this:
```
error NotOwner();

contract FundMe {
    ...
    modifier onlyOwner {
        if (msg.sender == i_owner) {revert NotOwner();}
        _;
    }
    ...
}
```
