import Web3 from "web3";

let web3;


//in this if statement the code is being exicuted in the browser and meta mask is avaliable
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    //we are in the browser
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}
else
{
    //we are on the server and/or the user is not running meta mask
    const provider = new Web3.providers.HttpProvider(
        "https://sepolia.infura.io/v3/a783691c9e0449b697d5236a80763666"
    );
    web3 = new Web3(provider);
}

export default web3;
