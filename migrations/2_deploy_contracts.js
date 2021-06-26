const LoyaltyCard = artifacts.require('LoyaltyCard');

module.exports = function (deployer) {
  deployer.deploy(LoyaltyCard);
};
