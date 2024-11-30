// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    struct People {
        uint favouriteNumber;
        string name;
    }

    uint public favouriteNumber;

    People[] public people;

    function store(uint _number) public {
        favouriteNumber = _number;
    }

    function get() public view returns (uint) {
        return favouriteNumber;
    }

    function addPerson(uint _number, string memory _name) public {
        people.push(People(_number, _name));
    }
}
