import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

import {PATH} from '../../helpers/Constants';

const NoFound = () => {
    
    return (
            <Segment placeholder>
                <Header icon>
                <Icon name='exclamation' />
                    Ops... we couldn't find the page you're looking for
                </Header>
                <Button as={Link} to={PATH.SIGN_IN} color="blue">Back Home</Button>
            </Segment>     
    )
}

export default NoFound;