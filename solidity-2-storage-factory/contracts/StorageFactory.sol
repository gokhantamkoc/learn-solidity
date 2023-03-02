//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "./SimpleStorage.sol";

contract StorageFactory {

    mapping (address => uint256) simpleStorageIndices;
    SimpleStorage[] public simpleStorages;

    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorages.push(simpleStorage);
        uint256 lastIndex = simpleStorages.length - 1;
        simpleStorageIndices[address(simpleStorage)] = lastIndex;
    }

    function getSSContractAddress(uint256 _ssIdx) public view returns (address) {
        address contractAddress = address(simpleStorages[_ssIdx]);
        return contractAddress;
    }

    function ssAddPerson(address _ssAddress, string memory _name, uint256 _favNumber) public {
        SimpleStorage ss = SimpleStorage(simpleStorages[simpleStorageIndices[_ssAddress]]);
        ss.addPerson(_name, _favNumber);
    }

    function ssGetFavoriteNumberByName(address _ssAddress, string memory _name) public view returns(uint256) {
        SimpleStorage ss = SimpleStorage(simpleStorages[simpleStorageIndices[_ssAddress]]);
        uint256 favNum = ss.getFavoriteNumberByName(_name);
        return favNum;
    }
}