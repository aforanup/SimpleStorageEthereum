// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint public favouriteNumber;

    function store(uint _number) public {
        favouriteNumber = _number;
    }

    function get() public view returns(uint){
        return favouriteNumber;
    }
}