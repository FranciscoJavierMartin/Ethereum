const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'echo avocado base artist height toss audit doll horse initial night box',
  'https://rinkeby.infura.io/v3/a1b40ab8d9d340199e03534281a4a469'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    }).send({
      gas: '1000000',
      from: accounts[0]
    });

  console.log('Contract deployed to', result.options.address);
};

deploy();