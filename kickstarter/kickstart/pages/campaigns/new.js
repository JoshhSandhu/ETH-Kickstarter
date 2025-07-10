import React, { Component } from "react";
import Layout from "../../components/layout";
import { Form, Button, Input } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class campaignNew extends Component {
    state = {
        minimumcontribution: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await factory.methods
        .createCampaign(this.state.minimumcontribution)
        .send({
            from: accounts[0]
        });
    }

    render() {
        return (
            <Layout>
                <h3>create a Campaign!</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input label="wei" labelPosition="right" placeholder ='enter amount of wei u want to contibute'
                            value = {this.state.minimumcontribution}
                            onChange={event => this.setState({minimumcontribution: event.target.value})}
                        />
                    </Form.Field>
                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default campaignNew;
