import React from 'react'
import { Header, Popup, Grid , Icon} from 'semantic-ui-react'

const UserDataMenu = ({full_name,email}) => {
  return (
    <Popup trigger={<Icon name='user' />} flowing hoverable>
      <Grid centered>
        <Grid.Column textAlign='center'>
        <Header as='h4'>Hello: {full_name}</Header>
          <p>
            {email}
          </p>
        </Grid.Column>
      </Grid>
    </Popup>
  )
}  


export default UserDataMenu;

