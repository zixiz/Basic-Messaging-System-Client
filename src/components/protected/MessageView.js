import React from 'react'
import { Link } from 'react-router-dom';
import { Segment,Header,Button} from 'semantic-ui-react'

const MessageView = ({header,sent,reciver,subject,content}) => (
    <Segment placeholder>
        <Segment.Group>
            <Segment textAlign='center'>
                <Header>
                    {header}
                </Header>
            </Segment>
            <Segment.Group>
                <Segment textAlign='center'>From: {sent}</Segment>
                <Segment textAlign='center'>To: {reciver}</Segment>
                <Segment textAlign='center'>Subject: {subject}</Segment>
                <Segment textAlign='center'>Message content: {content}</Segment>
            </Segment.Group>
            <Segment>
                <Button as={Link} to="/inbox">Back To Inbox</Button>
            </Segment>
        </Segment.Group>
    </Segment>
  )
  
  export default MessageView;