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
  const [isOwner, setIsOwner] = useState(false);
  const [balance, setBalance] = useState();

  useEffect(() => {
    loadWeb3();
    getLoyaltyCard();
  }, []);

  const getLoyaltyCard = async () => {
    //account
    const userAccount = await window.web3.eth.getAccounts();
    setAccount(userAccount[0]);
    debugger;

    //network
    const networkId = await window.web3.eth.net.getId();
    const networkData = LoyaltyCard.networks[networkId];

    if (networkData) {
      const loyaltyCardContract = new window.web3.eth.Contract(
        LoyaltyCard.abi,
        networkData.address
      );
      setLoyaltyCard(loyaltyCardContract);

      //check if account is contract owner
      const contractOwner = await loyaltyCardContract.methods.owner().call();
      if (contractOwner === userAccount[0]) {
        setIsOwner(true);
      }

      //get balance
      // const balance = await loyaltyCardContract.methods
      //   .customers(userAccount[0])
      //   .call();
      // setBalance(balance);
    } else {
      window.alert('Contract not deployed to detected network.');
    }
  };

  return (
    <div>
      <p>Current User: {account}</p>
      <p>Owner: {isOwner ? 'yes' : 'no'}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default App;
