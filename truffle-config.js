module.exports = {
  networks: {
    development: {
      host: '192.168.2.18',
      port: 7545,
      network_id: '*', // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
