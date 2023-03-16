//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person[] public people;

    mapping(string => uint256) nameToFavoriteNumber;

    address owner;

    constructor() {
        owner = msg.sender;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(Person(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    function updatePerson(string memory _name, uint256 _favoriteNumber) public {
        uint numOfPeople = people.length;
        for (uint idx = 0; idx < numOfPeople; idx++) {
            Person memory person = people[idx];
            if (
                keccak256(abi.encodePacked(person.name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                person.favoriteNumber = _favoriteNumber;
                people[idx] = person;
                break;
            }
        }
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    function getFavoriteNumberByName(
        string memory _name
    ) public view returns (uint256) {
        return nameToFavoriteNumber[_name];
    }
}
