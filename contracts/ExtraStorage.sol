// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    function store(uint _num) public override {
        favouriteNumber = _num + 5;
    }
}
