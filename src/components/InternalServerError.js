import React from 'react';
import {Message} from 'semantic-ui-react'

const InternalServerError = ({serverErrorMessage,dismiss}) =>{
    
    return (
        <Message negative onDismiss={(e)=>dismiss()} style={{position:'fixed', bottom:0, width:'100%'}}>
            <Message.Header>{serverErrorMessage}</Message.Header>
            <p>Please try again later</p>
        </Message>
    )
}

export default InternalServerError;