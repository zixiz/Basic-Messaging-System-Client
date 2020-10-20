import React from 'react';
import {Button,Table} from 'react-bootstrap';

class MessagesTable extends React.Component{

    renderRecivedOrSent(message){
        switch(this.props.type){
            case "recived":
                return `From: ${message.user.email}`
            case "sent":
                return `To: ${message.senderEmail}`
        }

        
    }

    renderTable(){
        return this.props.messages.map((message)=>{
            return(
                <tr key={message.id}>
                    <td>{this.renderRecivedOrSent(message)}</td>
                    <td>{message.subject} - {message.message}</td>
                    <td>DELETE</td>
                </tr>
            )
        });

    }

    render(){
        console.log(this.props)
        return(
            <Table striped bordered hover>
                <tbody>
                    {this.renderTable()}
                </tbody>
            </Table>
        )
    }
}

export default MessagesTable;