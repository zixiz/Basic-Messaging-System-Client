import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { Table , Button, Segment ,Input} from 'semantic-ui-react'

class MessagesTable extends React.Component{

    state = {
        textValue:''
    };


    handelChange(e){
        this.setState({textValue:e.target.value})

    }


    renderRecivedOrSent(message){
        switch(this.props.type){
            case "recived":
                return `${message.user.email}`;
            case "sent":
                return `${message.senderEmail}`;
            default:
                return "";
        }
    }

    renderTable(){
        const {textValue} = this.state;
        let orderBy = _.orderBy(this.props.messages, ['id'],['desc']);
        
        return orderBy.filter(message=>{
            if (textValue.toLowerCase() === '') return true
            if  (message.subject.includes(textValue.toLowerCase()) || message.message.includes(textValue.toLowerCase()) ){
                return true
            }
        }).map((message)=>{
            return(
                <Table.Row key={message.id}>
                    <Table.Cell width={3}>{this.renderRecivedOrSent(message)}</Table.Cell>
                    <Table.Cell><Link to={`/inbox/${message.id}`}> {message.subject} - {message.message}</Link></Table.Cell>
                    <Table.Cell width={2} textAlign='center'><Button variant="secondary" color='grey' as={Link} to={`/inbox/delete/${message.id}`}>Delete</Button></Table.Cell>
                </Table.Row>
            )
        });
    }



    render(){
        const {tableHeader,messages} = this.props;
        return(
            <Segment>
                {messages.length <= 1 ? null : <Input onChange={(e)=>this.handelChange(e)} icon='search' iconPosition='left' placeholder='Search...' />}
                <Table celled striped >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>{tableHeader}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{this.props.type === 'recived' ? 'From' : 'To'}</Table.HeaderCell>
                            <Table.HeaderCell>Subject and Content</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderTable()}
                    </Table.Body>
                </Table>
            </Segment>
        )
    }
}

export default MessagesTable;