var SimpleStorage = artifacts.require('./SimpleStorage.sol');

contract("SimpleStorage", function(accounts) {
    var storageInstance;
    it("store and get favouriteNumber", function(){
        return SimpleStorage.deployed().then(function(instance){
            storageInstance = instance;
            return storageInstance.store(5, {from: accounts[0]});
        }).then(function(receipt) {
            return storageInstance.get();
        }).then(function(number){
            assert.equal(number, 5);
        })
    });

    it("stores person and his favourite number on array and map and returns it back", function(){
        return SimpleStorage.deployed().then(function(instance){
            storageInstance=instance;
            return storageInstance.addPerson(12, "anup",{from: accounts[0]});
        }).then(function(receipt) {
            return storageInstance.addPerson(99, "randomPerson",{from: accounts[0]});
        }).then(function(receipt){
            return storageInstance.people(0);
        }).then(function(person){
            assert.equal(person[0],12);
            assert.equal(person[1],"anup");
            return storageInstance.people(1);
        }).then(function(person){
            assert.equal(person[0], 99);
            assert.equal(person[1], "randomPerson");
            return storageInstance.nameToNum("anup");
        }).then(function(number){
            assert.equal(number, 12)
            return storageInstance.nameToNum("randomPerson")
        }).then(function(number){
           assert.equal(number, 99) 
        })
    });
})