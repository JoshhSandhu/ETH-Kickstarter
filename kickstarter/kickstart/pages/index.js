import React from "react";
import { Card, Button } from 'semantic-ui-react';
import factory from "../ethereum/factory.js";

class campaignindex extends React.Component {
    static async getInitialProps() 
    {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log("deployed campaigns", campaigns);
        return { campaigns };
    }

    renderCampaigns(){
        //this is going to give us the list of objects where each object represents a single card
        const items = this.props.campaigns.map(address => {
            return{
                header: address,
                description: <a>veiw campaign</a>,
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    render() {
        const { campaigns } = this.props;

        if(!campaigns || campaigns.length === 0){
            return <div>no campaigns found</div>
        }

        return <div>
            <body>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
            </body>
            {this.renderCampaigns()}
            <Button
                content = "create campaign"
                icon = "add circle"
                primary
                floated = "right"
            />
        </div>
    }
}

export default campaignindex;