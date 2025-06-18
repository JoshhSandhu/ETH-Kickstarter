const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//deleting the build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);   
const contractFilePath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(contractFilePath, 'utf8');

//Create proper compiler input
const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = solc.compile(JSON.stringify(input)); // don't JSON.parse this
//const contracts = output.contracts[contractFileName];
//const output = solc.compile(source, 1).contracts; 

//creating the build foldrer
fs.ensureDirSync(buildPath); //if the folder does not exits this command creates it for us

console.log(output);
//this loops over the contract and the outputs 2 files for each contract
// for ( let contract in output) {  //a 'for' 'in' loop ittertes over the keys of an object
//     fs.outputJsonSync(
//         path.resolve(buildPath, contract + '.json'),
//         output[contract]
//     );
// }

// for (let contract in contracts) {
//   if (contracts.hasOwnProperty(contract)) {
//     fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), contracts[contract]);
//   }
// }
for (let contractName in output.contracts['Campaign.sol']) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contractName}.json`),
    output.contracts['Campaign.sol'][contractName]
  );
}
console.log("Compilation complete!");