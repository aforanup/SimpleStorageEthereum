App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return App.initWeb3();
  },

  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = window.ethreum;
      web3= new Web3(App.web3Provider)
    }else {
      App.web3Provider = new Web3.providers.httpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider)
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('SimpleStorage.json', function(simpleStorage){
      App.contracts.SimpleStorage = TruffleContract(simpleStorage);


    });

    return App.render();
  },

  render: function() {},

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
