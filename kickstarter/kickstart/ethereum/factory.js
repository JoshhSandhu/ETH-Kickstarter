import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0xf61d92207Ae39413ba11bAc1d192496752F5fDF1'
);

export default instance;