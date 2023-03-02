//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {

	struct Person {
		uint256 favoriteNumber;
		string name;
	}

	Person[] public people;

	mapping (string => uint256) nameToFavoriteNumber;

	// If a child contract wants to override a method, the method should have a virtual modifier.
	function addPerson(string memory _name, uint256 _favoriteNumber) public virtual {
		people.push(Person(_favoriteNumber, _name));
		nameToFavoriteNumber[_name] = _favoriteNumber;
	}

	function updatePerson(string memory _name, uint256 _favoriteNumber) public {
		uint numOfPeople = people.length;
		for (uint idx = 0; idx < numOfPeople; idx++) {
			Person memory person = people[idx];
			if (keccak256(abi.encodePacked(person.name)) == keccak256(abi.encodePacked(_name))) {
				person.favoriteNumber = _favoriteNumber;
				people[idx] = person;
				break;
			}
		}
		nameToFavoriteNumber[_name] = _favoriteNumber;
	}

	function getFavoriteNumberByName(string memory _name) public view returns (uint256) {
		return nameToFavoriteNumber[_name];	
	}
}