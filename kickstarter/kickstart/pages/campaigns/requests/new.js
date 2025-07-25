import React,{ Component } from "react";
import Layout from "../../../components/layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";


class CreateRequest extends Component{
    
    static async getInitialProps({query}){
        const { address } = query;
        return { address };
    }

    state = {
        value:'',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: ''});
        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        }catch (error){
            this.setState({errorMessage: error.message});
        }
        this.setState({loading: false});
    }



    render(){
        return (
            <Layout>
                <Button primary>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>Back</a>
                    </Link>
                </Button>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>
                            Description
                        </label>
                        <Input 
                            value = {this.state.description}
                            onChange = {event => this.setState({description: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Value in Ether
                        </label>
                        <Input
                            value = {this.state.value}
                            onChange = {event => this.setState({value: event.target.value})}
                            label = "ether"
                            labelPosition = "right"
                         />
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Recipient
                        </label>
                        <Input 
                            value = {this.state.recipient}
                            onChange = {event => this.setState({recipient: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Ooops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CreateRequest;