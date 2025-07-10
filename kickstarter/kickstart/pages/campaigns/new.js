import React, { Component } from "react";
import Layout from "../../components/layout";
import { Form, Button, Input } from "semantic-ui-react";

class campaignNew extends Component {
    state = {
        minimumcontribution: ''
    };
    render() {
        return (
            <Layout>
                <h3>create a Campaign!</h3>

                <Form>
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
