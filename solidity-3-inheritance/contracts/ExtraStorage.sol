//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    // override example
	// The overriden method should have same signature with parent contract method.
	// Also the overriden method should have override modifier
    function addPerson(string memory _name, uint256 _favoriteNumber) public override {
		people.push(Person(_favoriteNumber + 5, _name));
		nameToFavoriteNumber[_name] = _favoriteNumber + 5;
	}
}
