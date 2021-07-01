import React, { useEffect, useState } from 'react';
import { Box, Stack, Heading, Text, Skeleton } from '@chakra-ui/react';
import Web3 from 'web3';
import LoyaltyCard from './abis/LoyaltyCard.json';
import OwnerDashboard from './components/OwnerDashboard';
import StampCard from './components/StampCard';

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

const App = () => {
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
      const balance = await loyaltyCardContract.methods
        .customers(userAccount[0])
        .call();
      setBalance(balance.balance);
    } else {
      window.alert('Contract not deployed to detected network.');
    }
  };

  return (
    <React.Fragment>
      <Box textAlign="center" bg="#6100e7" height="250px" p={6}>
        <Heading as="h2" size="md" color="white" mb={3}>
          BlockLoyalty
        </Heading>
      </Box>
      <Box textAlign="center" mx={4} mt="-160px">
        <Stack spacing={3}>
          <Box bg="white" p={4} rounded="lg" boxShadow="lg">
            <Skeleton height="200px" />
            <Text fontSize="10px" fontWeight={700} my={2}>
              {account}
            </Text>
          </Box>
          <Text fontSize="md">Owner: {isOwner ? 'yes' : 'no'}</Text>

          <StampCard balance={balance} />
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default App;
