import React, { useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Button,
  StackDivider,
  useToast,
  useDisclosure,
  Collapse,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import QRScanner from './QRScanner';

const initialInputs = {
  newCustomerAddress: '',
  newCustomerInitialBalance: 0,
  addStampCustomerAddress: '',
  addStampCustomerIncrement: 1,
  redeemStampsCustomerAddress: '',
};

const OwnerDashboard = (props) => {
  const [inputs, setInputs] = useState(initialInputs);

  const {
    isOpen: isNewCustomerQROpen,
    onToggle: toggleNewCustomerQR,
    onClose: closeNewCustomerQR,
  } = useDisclosure();

  const {
    isOpen: isAddStampQROpen,
    onToggle: toggleAddStampQR,
    onClose: closeAddStampQR,
  } = useDisclosure();

  const {
    isOpen: isRedeemStampsQROpen,
    onToggle: toggleRedeemStampsQR,
    onClose: closeRedeemStampsQR,
  } = useDisclosure();

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
            title: 'Customer has been created.',
            status: 'success',
            isClosable: true,
          });
        } else {
          console.log('Error: ', error);
          toast({
            title: 'Error adding customer.',
            status: 'error',
            isClosable: true,
          });
        }
        //Reset inputs
        setInputs(initialInputs);
      });
  };

  const addStamp = () => {
    props.loyaltyCard.methods
      .addStamp(
        inputs.addStampCustomerAddress,
        inputs.addStampCustomerIncrement
      )
      .send({ from: props.currentAccount }, function (error, transactionHash) {
        if (!error) {
          console.log('Succcess: ', transactionHash);
          toast({
            title: 'Stamp has been added.',
            status: 'success',
            isClosable: true,
          });
        } else {
          console.log('Error: ', error);
          toast({
            title: 'Error adding stamp.',
            status: 'error',
            isClosable: true,
          });
        }
        //Reset inputs
        setInputs(initialInputs);
      });
  };

  const redeemStamps = () => {
    props.loyaltyCard.methods
      .redeemStamps(inputs.redeemStampsCustomerAddress)
      .send({ from: props.currentAccount }, function (error, transactionHash) {
        if (!error) {
          console.log('Succcess: ', transactionHash);
          toast({
            title: 'Stamps have been redeemed.',
            status: 'success',
            isClosable: true,
          });
        } else {
          console.log('Error: ', error);
          toast({
            title: 'Error redeeming stamps.',
            status: 'error',
            isClosable: true,
          });
        }
        //Reset inputs
        setInputs(initialInputs);
      });
  };

  const handleQRScanClick = (inputName) => {
    switch (inputName) {
      case 'newCustomerAddress':
        toggleNewCustomerQR();
        break;
      case 'addStampCustomerAddress':
        toggleAddStampQR();
        break;
      case 'redeemStampsCustomerAddress':
        toggleRedeemStampsQR();
        break;
      default:
    }
  };

  const handleQRScan = (inputName, data) => {
    //update state with value from QR scan
    setInputs((prevState) => ({ ...prevState, [inputName]: data }));

    //close QR code scanner
    switch (inputName) {
      case 'newCustomerAddress':
        closeNewCustomerQR();
        break;
      case 'addStampCustomerAddress':
        closeAddStampQR();
        break;
      case 'redeemStampsCustomerAddress':
        closeRedeemStampsQR();
        break;
      default:
    }
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
            <FormControl>
              <FormLabel>Address</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter acount address"
                  value={inputs.newCustomerAddress}
                  onChange={(e) => {
                    handleInputChange('newCustomerAddress', e.target.value);
                  }}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    borderRadius="md"
                    size="sm"
                    aria-label="Scan QR Code"
                    icon={
                      <Icon
                        as={FaCamera}
                        onClick={() => handleQRScanClick('newCustomerAddress')}
                      />
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <Collapse in={isNewCustomerQROpen} unmountOnExit>
                <QRScanner
                  handleQRScan={handleQRScan}
                  inputName="newCustomerAddress"
                />
              </Collapse>
            </FormControl>
            <FormControl>
              <FormLabel>Initial Balance</FormLabel>
              <NumberInput
                min={0}
                value={inputs.newCustomerInitialBalance}
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
            <FormControl>
              <FormLabel>Address</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter acount address"
                  value={inputs.addStampCustomerAddress}
                  onChange={(e) => {
                    handleInputChange(
                      'addStampCustomerAddress',
                      e.target.value
                    );
                  }}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    borderRadius="md"
                    size="sm"
                    aria-label="Scan QR Code"
                    icon={
                      <Icon
                        as={FaCamera}
                        onClick={() =>
                          handleQRScanClick('addStampCustomerAddress')
                        }
                      />
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <Collapse in={isAddStampQROpen} unmountOnExit>
                <QRScanner
                  handleQRScan={handleQRScan}
                  inputName="addStampCustomerAddress"
                />
              </Collapse>
            </FormControl>
            <FormControl>
              <FormLabel>Stamp Increment</FormLabel>
              <NumberInput
                value={inputs.addStampCustomerIncrement}
                min={1}
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
            <Button colorScheme="purple" size="md" onClick={addStamp}>
              Add
            </Button>
          </VStack>
        </Box>
        <Box>
          <Text mb={2} fontSize="lg" fontWeight={700} textAlign="center">
            Redeem Stamps
          </Text>
          <VStack spacing={4} align="left">
            <FormControl>
              <FormLabel>Address</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter acount address"
                  value={inputs.redeemStampsCustomerAddress}
                  onChange={(e) => {
                    handleInputChange(
                      'redeemStampsCustomerAddress',
                      e.target.value
                    );
                  }}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    borderRadius="md"
                    size="sm"
                    aria-label="Scan QR Code"
                    icon={
                      <Icon
                        as={FaCamera}
                        onClick={() =>
                          handleQRScanClick('redeemStampsCustomerAddress')
                        }
                      />
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <Collapse in={isRedeemStampsQROpen} unmountOnExit>
                <QRScanner
                  handleQRScan={handleQRScan}
                  inputName="redeemStampsCustomerAddress"
                />
              </Collapse>
            </FormControl>
            <Button colorScheme="purple" size="md" onClick={redeemStamps}>
              Redeem
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OwnerDashboard;
