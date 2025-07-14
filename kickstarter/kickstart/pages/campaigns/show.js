import React, { Component } from "react";
import Layout from "../../components/layout";
import routes from "../../routes";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component{
    static async getInitialProps(props) 
    {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requestCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4]
        };
    }

    renderCards() {
    const {
        minimumContribution,
        balance,
        requestCount,
        approversCount,
        manager
    } = this.props;

    const items = [
        {
            childKey: 'manager',
            header: <div>{manager}</div>,
            meta: 'Address of Manager',
            description: 'The manager created this campaign and can create requests to withdraw money.',
            style: { 
                overflowWrap: 'break-word', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '10px', 
                padding: '10px' 
            }

        },
        {
            childKey: 'minContrib',
            header: <div>{minimumContribution}</div>,
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei to become an approver.',
            style: { 
                overflowWrap: 'break-word', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '10px', 
                padding: '10px' 
            }
        },
        {
            childKey: 'reqCount',
            header: <div>{requestCount}</div>,
            meta: 'Number of Requests',
            description: 'Requests must be approved before money can be withdrawn.',
            style: { 
                overflowWrap: 'break-word', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '10px', 
                padding: '10px' 
            }
        },
        {
            childKey: 'approvers',
            header: <div>{approversCount}</div>,
            meta: 'Number of Approvers',
            description: 'People who have already donated to this campaign.',
            style: { 
                overflowWrap: 'break-word', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '10px', 
                padding: '10px' 
            }
        },
        {
            childKey: 'balance',
            header: <div>{web3.utils.fromWei(balance, 'ether')}</div>,
            meta: 'Campaign Balance (ether)',
            description: 'Amount of money left to spend for the campaign.',
            style: { 
                overflowWrap: 'break-word', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '10px', 
                padding: '10px' 
            }
        }
    ];

    return <Card.Group items={items} />;
    }


    render() {
        return (
            <Layout>
                <h3>CampaignShow</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                    <a>
                                        <Button primary>View Requests</Button>
                                    </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;