import React from 'react';
import {Button} from 'react-bootstrap';
import history from '../Helpers/History';


const Unauthorized = () =>{

    return(
        <div>
            Unauthorized, Please Sign In First
            <br />
            <Button variant="primary" onClick={()=>history.push("/")}>Sign In</Button>
        </div>
    )
}

export default Unauthorized;