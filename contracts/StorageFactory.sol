// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorage() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint _index, uint _num) public {
        SimpleStorage sfAddress = simpleStorageArray[_index];
        sfAddress.store(_num);
    }

    function sfGet(uint _index) public view returns (uint) {
        SimpleStorage sfAddress = simpleStorageArray[_index];
        return sfAddress.get();
    }
}
