import React from "react";
import { Card, Button } from 'semantic-ui-react';
import factory from "../ethereum/factory.js";
import Layout from "../components/layout.js";
import { Link } from "../routes.js";


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
                description: (
                    <Link route = {`/campaigns/${address}`}>
                        <a>veiw campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    render() {
        return (
        <Layout> 
            <div>
                <h3>Open Campaigns</h3>
                <Link route = "/campaigns/new">
                    <a>
                        <Button
                            content = "create campaign"
                            icon = "add circle"
                            primary
                            floated = "right"
                        />
                    </a>
                </Link>
                {this.renderCampaigns()}
            </div>
        </Layout>
        );
    }
}

export default campaignindex;