import React,{ Component} from "react";

class RequestRow extends Component{
    render(){
        return(
            <Table.Row>
                <Table.Cell>
                    {this.props.id}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;

