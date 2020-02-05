import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  // Inside the browser and metamask is runnings
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/a1b40ab8d9d340199e03534281a4a469'
  );
  web3 = new Web3(provider);
}

export default web3;