const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//deleting the build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);   //removeSync deletes everything inside the folder in one command

//compiling the files
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts; 

//creating the build foldrer
fs.ensureDirSync(buildPath); //if the folder does not exits this command creates it for us

for ( let contract in output) {  //this loops over the contract and the outputs 2 files for each contract
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}