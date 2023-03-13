// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorldContract {
    string private name;
    address private owner;

    constructor() {
        owner = msg.sender;
        name = "solidity";
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function changeName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return string.concat("Hello ", name);
    }

    function destroyContract() public payable onlyOwner {
        address payable payableAddr = payable(address(this));
        selfdestruct(payableAddr);
    }
}
