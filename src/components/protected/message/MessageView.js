import React from 'react';
import { Link } from 'react-router-dom';
import { Segment,Header,Button} from 'semantic-ui-react';
import {PATH} from '../../../helpers/Constants';

const MessageView = ({header,sent,reciver,subject,content,deleteId}) => (
    <Segment placeholder>
        <Segment.Group>
            <Segment textAlign='center'>
                <Header>
                    {header}
                </Header>
            </Segment>
            <Segment.Group>
                <Segment>From: {sent}</Segment>
                <Segment>To: {reciver}</Segment>
                <Segment>Subject: {subject}</Segment>
                <Segment>Message content: {content}</Segment>
            </Segment.Group>
            <Segment textAlign='center'>
                <Button.Group>
                    <Button as={Link} color="grey" to={PATH.INBOX}>Back To Inbox</Button>
                    <Button.Or text={''}/>
                    <Button negative as={Link} to={`/inbox/delete/${deleteId}`}>Delete</Button>
                </Button.Group>
            </Segment>
        </Segment.Group>
    </Segment>
  )
  
  export default MessageView;