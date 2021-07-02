import React, { useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Button,
  StackDivider,
  useToast,
} from '@chakra-ui/react';

const OwnerDashboard = (props) => {
  const [inputs, setInputs] = useState({
    newCustomerAddress: '',
    newCustomerInitialBalance: 0,
    addStampCustomerAddress: '',
    addStampCustomerIncrement: 1,
    redeemStampsCustomerAddress: '',
  });

  const toast = useToast();

  const handleInputChange = (name, value) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const createNewCustomer = () => {
    props.loyaltyCard.methods
      .addCustomer(inputs.newCustomerAddress, inputs.newCustomerInitialBalance)
      .send({ from: props.currentAccount }, function (error, transactionHash) {
        if (!error) {
          console.log('Succcess: ', transactionHash);
          toast({
            title: 'Customer has been created',
            status: 'success',
            isClosable: true,
          });
        } else {
          console.log('Error: ', error);
          toast({
            title: 'Error adding customer',
            status: 'error',
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box
      textAlign="center"
      bg="white"
      px={4}
      py={6}
      rounded="lg"
      boxShadow="lg"
    >
      <VStack
        spacing={8}
        align="left"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Box>
          <Text mb={2} fontSize="lg" fontWeight={700} textAlign="center">
            New Customer
          </Text>
          <VStack spacing={4} align="left">
            <FormControl id="account-address">
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Enter acount address"
                onChange={(e) => {
                  handleInputChange('newCustomerAddress', e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="account-balance">
              <FormLabel>Initial Balance</FormLabel>
              <NumberInput
                defaultValue={0}
                min={0}
                onChange={(e) => {
                  handleInputChange('newCustomerInitialBalance', e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <Button colorScheme="purple" size="md" onClick={createNewCustomer}>
              Create
            </Button>
          </VStack>
        </Box>
        <Box>
          <Text mb={2} fontSize="lg" fontWeight={700} textAlign="center">
            Add Stamp
          </Text>
          <VStack spacing={4} align="left">
            <FormControl id="account-address">
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Enter acount address"
                onChange={(e) => {
                  handleInputChange('addStampCustomerAddress', e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="account-balance">
              <FormLabel>Stamp Increment</FormLabel>
              <NumberInput
                defaultValue={1}
                min={0}
                onChange={(e) => {
                  handleInputChange('addStampCustomerIncrement', e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <Button colorScheme="purple" size="md">
              Add
            </Button>
          </VStack>
        </Box>

        <Box>
          <Text mb={2} fontSize="lg" fontWeight={700} textAlign="center">
            Redeem Stamps
          </Text>
          <VStack spacing={4} align="left">
            <FormControl id="account-address">
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Enter acount address"
                onChange={(e) => {
                  handleInputChange(
                    'redeemStampsCustomerAddress',
                    e.target.value
                  );
                }}
              />
            </FormControl>
            <Button colorScheme="purple" size="md">
              Redeem
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OwnerDashboard;
