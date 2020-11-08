import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment, Grid } from 'semantic-ui-react';

import {PATH} from '../../helpers/Constants';

const NoFound = () => {
    
    return (
        <Grid centered stackable padded={true} columns={2}>
            <Grid.Column>
                <Segment placeholder>
                    <Header icon>
                    <Icon name='exclamation' color="red"/>
                        Oops... we couldn't find the page you're looking for.
                    </Header>
                    <Button as={Link} to={PATH.SIGN_IN} color="grey">Back To Home</Button>
                </Segment>
            </Grid.Column>
        </Grid>     
    )
}

export default NoFound;