import React from "react";
import factory from "../ethereum/factory.js";

class campaignindex extends React.Component {
    // async componentDidMount() {
    //     const campaigns = await factory.methods.getDeployedCampaigns().call();
    //     console.log(campaigns);
    // }
    static async getInitialProps() 
    {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log("deployed campaigns", campaigns);
        return { campaigns };
    }

    // async componentDidMount() {
    //     try {
    //         const campaigns = await factory.methods.getDeployedCampaigns().call();
    //         console.log("Deployed campaigns:", campaigns);
    //     } catch (err) {
    //         console.error("Error fetching campaigns:", err);
    //     }
    // }

    render() {
        const { campaigns } = this.props;

        if(!campaigns || campaigns.length === 0){
            return <div>no campaigns found</div>
        }

        return <div>first campaign {campaigns[0]}</div>
    }
}

export default campaignindex;