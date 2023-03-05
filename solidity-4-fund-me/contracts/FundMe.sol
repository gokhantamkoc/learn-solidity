// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {

    // AggregatorV3Interface internal priceFeed;

    // /**
    //  * Network: Sepolia
    //  * Aggregator: ETH/USD
    //  * Address: 0xcf4be57aa078dc7568c631be7a73adc1cda992f8
    //  */
    // constructor() {
    //     priceFeed = AggregatorV3Interface(
    //         0xcf4be57aa078dc7568c631be7a73adc1cda992f8
    //     );
    // }

    uint256 public minimumUSD = 50;

    function fund() public payable {
        // Want to be able to set a minimum fund amount
        // 1. How do we send ETH to this contract
        require(getConversionRate(msg.value) > minimumUSD, "Did not send enough!"); // 1e18 == 1 * 10 ** 18
        // msg.value is in wei so we require call oracles to convert the wei to fiat

        // require reverts action done before itself
        // and send remaining gas back
    }

    function getPrice() public view returns (uint256) {
        // In this function we are calling a contract that is outside of our project
        // To call a outside contract we require:
        // 1. Contract ABI
        // 2. Contract Address: (for ETH/USD in Sepolia Test Net: 0x694AA1769357215DE4FAC081bf1f309aDC325306)
        AggregatorV3Interface ethusdPriceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (
            ,
            int price,
            ,
            ,
        ) = ethusdPriceFeed.latestRoundData();
        // price will be XXXX.XXXXXXXX so 
        return uint256(price * 1e10);
    }

    function getConversionRate(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUSD = ethPrice * ethAmount / 1e18;
        return ethAmountInUSD;
    }

}
