// this is just a testing file might delete later

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

const compiled = solc.compile(JSON.stringify(input));
//here i removed json.parse because solc.compile is returning object andd not string which causes it to crash

//creating the build foldrer
fs.ensureDirSync(buildPath); //if the folder does not exits this command creates it for us


//this loops over the contract and the outputs 2 files for each contract
for (let contractName in compiled.contracts['Campaign.sol']) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contractName}.json`),
    compiled.contracts['Campaign.sol'][contractName]
  );
}
console.log("Compilation complete!");