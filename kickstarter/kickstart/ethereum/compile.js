const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

// Clean up old build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read Campaign.sol
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// Standard JSON input format for solc
const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// Compile
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check for errors
if (output.errors) {
  output.errors.forEach((err) => {
    console.log(err.formattedMessage);
  });
}

// Write each contract to /build
fs.ensureDirSync(buildPath);
const contracts = output.contracts['Campaign.sol'];

for (let contractName in contracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contractName}.json`),
    contracts[contractName]
  );
}

console.log("✅ Compilation complete!");
