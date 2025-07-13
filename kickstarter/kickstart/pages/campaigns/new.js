import React, { Component } from "react";
import Layout from "../../components/layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class campaignNew extends Component {
    state = {
        minimumcontribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minimumcontribution)
            .send({
                from: accounts[0]
            });
        } catch (error){
            this.setState({errorMessage: error.message});
        }

        this.setState({loading: false});
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
                    <Message error header="Ooops!" content={this.state.errorMessage} />
                    <Button loading = {this.state.loading} primary>
                        Create!
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default campaignNew;
