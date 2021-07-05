import React, { useEffect, useState } from 'react';
import { Box, Stack, Heading, Spinner, Text } from '@chakra-ui/react';
import Web3 from 'web3';
import LoyaltyCard from './abis/LoyaltyCard.json';
import OwnerDashboard from './components/OwnerDashboard';
import StampCard from './components/StampCard';
import QRCard from './components/QRCard';

const loadWeb3 = async () => {
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    loadWeb3();
    if (window.web3) {
      getLoyaltyCard();
    } else {
      setError('There was an error loading the blockchain.');
    }
  }, []);

  const getLoyaltyCard = async () => {
    //account of user in the app
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
      setIsLoaded(true);
    } else {
      window.alert('Contract not deployed to detected network.');
    }
  };

  return (
    <React.Fragment>
      <Box
        textAlign="center"
        bg="#6100e7"
        height={isLoaded ? '250px' : '100vh'}
        p={6}
      >
        <Heading as="h2" size="md" color="white" mb={3}>
          BlockLoyalty
        </Heading>
        {!isLoaded && (
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={-18}
          >
            {error ? (
              <Text fontSize="md" color="white" fontWeight={600}>
                <strong>Oops!</strong> <br />
                {error}
              </Text>
            ) : (
              <Spinner size="xl" color="white" speed="0.8s" />
            )}
          </Box>
        )}
      </Box>
      <Box textAlign="center" mx="auto" mt="-180px" mb={6} px={4} maxW="md">
        {isLoaded && (
          <Stack spacing={6}>
            {isOwner ? (
              <OwnerDashboard
                loyaltyCard={loyaltyCard}
                currentAccount={account}
              />
            ) : (
              <React.Fragment>
                <QRCard account={account} />
                <StampCard balance={balance} />
              </React.Fragment>
            )}
          </Stack>
        )}
      </Box>
    </React.Fragment>
  );
};

export default App;
