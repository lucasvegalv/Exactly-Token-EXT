require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const ALCHEMY_API_KEY = "a00m18qMyK0MRqVBMHR3AGfRAph2iR5H";
const ROPSTEN_PRIVATE_KEY = "5f3620727334c7d562e03190e0e323e76029a18730b82fae1924da8719d4da3d";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: { 
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
