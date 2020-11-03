import React from 'react';
import {Grid} from 'semantic-ui-react';
import MessagesSubMenu from './protected/MessagesSubMenu';

const AppGrid = ({children,path}) =>{

    return (
            <Grid stackable padded={true}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MessagesSubMenu path={path}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    );
}

export default AppGrid;