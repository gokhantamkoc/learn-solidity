// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConvertor {
    function getPrice() internal view returns (uint256) {
        // In this function we are calling a contract that is outside of our project
        // To call a outside contract we require:
        // 1. Contract ABI
        // 2. Contract Address: (for ETH/USD in Sepolia Test Net: 0x694AA1769357215DE4FAC081bf1f309aDC325306)
        AggregatorV3Interface ethusdPriceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        (, int price, , , ) = ethusdPriceFeed.latestRoundData();
        // price will be XXXX.XXXXXXXX so
        return uint256(price * 1e10);
    }

    function getConversionRate(
        uint256 ethAmount
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }
}
