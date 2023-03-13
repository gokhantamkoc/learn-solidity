// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./PriceConvertor.sol";

contract FundMe {

    using PriceConvertor for uint256;

    address[] public funders;
    mapping (address => uint256) public addressAmount;

    uint256 public minimumUSD = 50 * 1e18;

    address public owner;

    /**
     * MODIFIERS
     */

    modifier onlyOwner {
        require(owner == msg.sender, "you are not allowed to execute withdraw");
        _;
    }

    modifier fundAmountLimit {
        require(msg.value.getConversionRate() > minimumUSD, "did not send enough!"); // 1e18 == 1 * 10 ** 18
        _;
    }

    constructor() {
        // this will get executed during the deployment.
        // so the owner of this contract will be the deployer.
        owner = msg.sender;
    }

    function fund() public payable onlyOwner fundAmountLimit {
        // Want to be able to set a minimum fund amount
        // 1. How do we send ETH to this contract
        funders.push(msg.sender);
        addressAmount[msg.sender] += msg.value;
        // msg.value is in wei so we require call oracles to convert the wei to fiat

        // require reverts action done before itself
        // and send remaining gas back
    }

    function withdraw() public {
        uint256 amountToWithdraw = 0;
        for (uint256 idx = 0; idx < funders.length - 1; idx++) {
            amountToWithdraw += addressAmount[funders[idx]];
            addressAmount[funders[idx]] = 0;
        }
        // reset funders array
        funders = new address[](0);
        // withdraw all funds
        // TODO There are 3 different ways to withdraw funds from this contract
        // 1. transfer
        //// msg.sender > type of address
        //// payable(msg.sender) > type of payable_address
        //// transfer method is capped at X gas. If the X is passed, the withdraw will not happen and transfer throws an error.
        // require();
        payable(msg.sender).transfer(address(this).balance);
        // 2. send
        //// msg.sender > type of address
        //// payable(msg.sender) > type of payable_address
        //// transfer method is capped at X gas. If the gas cap X is passed, the withdraw will not happen and send will return boolean false.
        bool result = payable(msg.sender).send(address(this).balance);
        require(result, "could not withdraw the funds, because gas cap reached.");
        // 3. call => this is recommended by solidity community
        //// msg.sender > type of address
        //// payable(msg.sender) > type of payable_address
        //// call method is not capped. 
        //// It will either forward all gas or lets you set the gas.
        //// It will return a false boolean, if the withdraw fails.
        (result,) = payable(msg.sender).call{value: address(this).balance}("");
        require(result, "could not withdraw the funds.");
    }

    // What happens if someone sends this contract ETH or other cryptocurrency 
    // without calling fund()?: 
    // There are two special functions to handle this situation:
    // receive() and fallback()

    // receive() and fallback() special function should have external and payable keywords.
    // receive() and fallback() can only be defined exactly one for each contract.

    //        is msg.data empty?
    //             /       \
    //           yes        no
    //           /           \
    //     has receive()?   fallback()
    //        /        \
    //      yes        no
    //      /           \
    //    receive()     fallback()

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
