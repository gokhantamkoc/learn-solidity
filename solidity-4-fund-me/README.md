# Cryptocurrency Transactions

Transactions - Fields

**Nonce:** tx count for the account
**Gas Price:** price per unit of gas (in wei)
**Gas Limit:** max gas that this tx can use
**To:** address that the tx is sent to
**Value:** amount of wei to send
**Data:** what to send to the To address
**v, r, s:** components of tx signature

To receive cryptocurrency from a function you should use payable modifier:
```solidity
contract FundMe {
    function fund() public payable {
        // Want to be able to set a minimum fund amount
        // 1. How do we send ETH to this contract
    }
}
```
