// Load environment variables.
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const {Web3}= require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const network = process.env.SEPOLIA_ENDPOINT;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: network
});

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
      .send({ 
        from: accounts[0],
        gas: '3000000'
       });

    console.log("Contract deployed to", result.options.address);
  } catch (err) {
    console.error("Error during deployment:", err);
  } finally {
    provider.engine.stop(); // always stop the provider
  }
};

deploy().catch((err) => {
  console.error("Unhandled error in deploy():", err);
});
