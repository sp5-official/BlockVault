require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: ["1385ce6fa0163ad7332ad04e304eae71ea47de5ea41d772f41e923a7ee901319"]
    }
  }
};