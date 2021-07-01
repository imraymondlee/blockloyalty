import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import QRCode from 'qrcode.react';

const QRCard = (props) => {
  return (
    <Box
      textAlign="center"
      bg="white"
      px={4}
      py={6}
      rounded="lg"
      boxShadow="lg"
    >
      <QRCode
        value={props.account ? props.account : ''}
        size={175}
        style={{ margin: 'auto' }}
      />
      <Text fontSize="10px" fontWeight={700} mt={4}>
        {props.account}
      </Text>
    </Box>
  );
};

export default QRCard;
