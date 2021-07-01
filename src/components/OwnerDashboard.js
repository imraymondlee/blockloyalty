import React from 'react';
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
} from '@chakra-ui/react';

const OwnerDashboard = (props) => {
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
              <Input placeholder="Enter acount address" />
            </FormControl>
            <FormControl id="account-balance">
              <FormLabel>Initial Balance</FormLabel>
              <NumberInput defaultValue={0} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <Button colorScheme="purple" size="md">
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
              <Input placeholder="Enter acount address" />
            </FormControl>
            <FormControl id="account-balance">
              <FormLabel>Stamp Increment</FormLabel>
              <NumberInput defaultValue={1} min={0}>
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
              <Input placeholder="Enter acount address" />
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
