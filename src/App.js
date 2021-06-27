import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import LoyaltyCard from './abis/LoyaltyCard.json';

const loadWeb3 = async () => {
  console.log('Load web3');
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    );
  }
};

function App() {
  const [account, setAccount] = useState();
  const [loyaltyCard, setLoyaltyCard] = useState();

  useEffect(() => {
    loadWeb3();
    setCurrentUserAccount();
    getLoyaltyCard();
  }, []);

  const setCurrentUserAccount = async () => {
    const userAccount = await window.web3.eth.getAccounts();
    setAccount(userAccount);
  };

  const getLoyaltyCard = async () => {
    const networkId = await window.web3.eth.net.getId();
    const networkData = LoyaltyCard.networks[networkId];

    if (networkData) {
      const loyaltyCardContract = new window.web3.eth.Contract(
        LoyaltyCard.abi,
        networkData.address
      );

      setLoyaltyCard(loyaltyCardContract);

      const contractOwner = await loyaltyCardContract.methods.owner().call();
      console.log(contractOwner);
    } else {
      window.alert('Contract not deployed to detected network.');
    }
  };

  return <div>Current User: {account}</div>;
}

export default App;
