import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  campaignFactory.abi,
  '0xa66a9aE30FC09b0A4Dc772bb19fddFcc90657058'
);

//console.log(campaignFactory.abi);

export default instance;