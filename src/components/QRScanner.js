import React from 'react';
import { Box } from '@chakra-ui/react';
import QrReader from 'react-qr-reader';

const QRScanner = (props) => {
  const handleScan = (data) => {
    if (data) {
      console.log(data);
      props.handleQRScan(props.inputName, data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Box p={4} rounded="lg">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </Box>
  );
};

export default QRScanner;
