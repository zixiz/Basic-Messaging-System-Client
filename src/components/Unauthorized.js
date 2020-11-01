import React from 'react';
import CustomeModal from '../components/Modal';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Unauthorized = () =>{
    
    return(
        <CustomeModal 
        closeModalPath={'/'} 
        title="You Unauthorized"
        icon="lock"
        content="Please Sign In Before!"
        actions={<Button as={Link} to={'/'} color="blue">SignIn</Button>}/>
    )
}

export default Unauthorized;