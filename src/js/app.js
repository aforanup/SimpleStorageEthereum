App = {
  web3Provider: null,
  contracts: {},
  accounts: "0x0",

  init: async function() {
    return App.initWeb3();
  },

  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = window.ethereum;
      web3= new Web3(App.web3Provider);
    }else {
      App.web3Provider = new Web3.providers.httpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider)
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('SimpleStorage.json', function(simpleStorage){
      App.contracts.SimpleStorage = TruffleContract(simpleStorage);
      App.contracts.SimpleStorage.setProvider(App.web3Provider);
      return App.render();
    });
  },

  setFavouriteNum: function(){
    var favNumToSet = $("#favNumToSet").val();
    App.contracts.SimpleStorage.deployed().then((instance)=>{
      instance.store(favNumToSet, {from: App.account})}).then(()=>{
        $("#favNumToSet").val("");
      })
  },
  getFavNum: function(){
    App.contracts.SimpleStorage.deployed().then((instance)=>{
      return instance.get();
    }).then((favNum)=>{
      $("#favNumHere").text(favNum);
    });
  },

  setPersonNum: function(){
    App.contracts.SimpleStorage.deployed().then((instance)=>{
      var number = $("#personNumberAdd").val();
      var name = $("#personNameAdd").val();
      instance.addPerson(number, name, {from: App.account})
      $("#personNameAdd").val("");
      $("#personNumberAdd").val("");
    });
  },

  getPersonNum: function(){
    var personName = $("#personName").val();
    App.contracts.SimpleStorage.deployed().then((instance)=>{
      return instance.nameToNum(personName);
    }).then(function(num){
      $("#personNumData").text(num);
      $("#personName").val("")
    });
  },

  render: function(){
    window.ethereum.request({ method: 'eth_requestAccounts' });
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    var storageInstance;
    App.contracts.SimpleStorage.deployed().then(function(instance){
      storageInstance = instance;
      return storageInstance.countNumbers();
    }).then(function(count){
      var listItem = $("#storageList");
      listItem.empty();
      for (var i=0; i<count; i++){
        storageInstance.people(i).then(function(person){
          console.log(person[0])
          console.log(person[1])
          listItem.append(`<li>${person[1]} -> ${person[0]}</li>`)
      //     // console.log("hello world");
          // console.log(person)
        })
      }
    })
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
