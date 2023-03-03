// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FundMe {
    function fund() public payable {
        // Want to be able to set a minimum fund amount
        // 1. How do we send ETH to this contract
        require(msg.value > 1e18, "Did not send enough!"); // 1e18 == 1 * 10 ** 18
    }
}


