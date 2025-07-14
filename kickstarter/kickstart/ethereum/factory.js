import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  campaignFactory.abi,
  '0x1eF41E4CDDa0428f65d5Aa3f553F77AfC025f44C'
);

//console.log(campaignFactory.abi);

export default instance;