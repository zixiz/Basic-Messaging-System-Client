import React from 'react';
import CustomeModal from '../modal/Modal';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {PATH} from '../../helpers/Constants';

const Unauthorized = () =>{
    
    return(
        <CustomeModal 
        closeModalPath={PATH.SIGN_IN} 
        title="Unauthorized"
        icon="lock"
        content="Please Sign In First!"
        actions={<Button as={Link} to={PATH.SIGN_IN} color="blue">SignIn</Button>}/>
    )
}

export default Unauthorized;