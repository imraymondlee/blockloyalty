import React from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

const cellContent = (i, balance) => {
  if (balance >= i) {
    return 'X';
  } else {
    if (i === 10) {
      return 'Free';
    } else {
      return i;
    }
  }
};

const StampCard = (props) => {
  const cells = [];

  for (let i = 1; i <= 10; i++) {
    cells.push(
      <Box
        bg="white"
        rounded="md"
        height="50px"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight={600} color="#9792ab">
          {cellContent(i, props.balance)}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      bgGradient="linear(to-l, #6100e7, #4800a2)"
      p={4}
      rounded="lg"
      boxShadow="lg"
    >
      <Text
        mb={2}
        fontSize="md"
        fontWeight={700}
        color="white"
        textAlign="left"
      >
        Balance
      </Text>
      <SimpleGrid columns={5} spacing={2}>
        {cells}
      </SimpleGrid>
    </Box>
  );
};

export default StampCard;
