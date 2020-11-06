import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {PATH} from "../../helpers/Constants";

class SignInForm extends React.Component{

    renderError({error,touched}){
        if(touched && error){
            return(
                <Message negative>
                    <p>{error}</p>
                </Message>
            )
        }
    }

    renderInput = ({input,label, meta,type,icon}) =>{
        return (
            <React.Fragment>
                <Form.Input fluid icon={icon} iconPosition='left' placeholder={label} {...input} type={type} />
                {this.renderError(meta)}
            </React.Fragment>
        )
    }

    onSubmit =(formValues) =>{
        this.props.onSubmit(formValues);
    }

    render(){
        const {handleSubmit, pristine, submitting,title,serverError,screen_loader_active} = this.props;
        return(
            <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
                <Segment stacked>
                    <Header as='h2' color='teal' textAlign='center'>
                         {title}
                    </Header>
                    <Field icon='mail' name="email" type="text" component={this.renderInput} label="Enter Email"/>
                    <Field icon='lock' name="password"  type="password" component={this.renderInput} label="Enter Password"/>
                    <Button loading={screen_loader_active} color='teal' fluid size='large' type="submit" disabled={pristine || submitting}>
                        Sign In
                    </Button>
                    {serverError && (
                        <Message negative>{serverError}</Message>
                    )}
                    <Message>
                        New to us? <Link to={PATH.SIGN_UP}>Sign Up</Link>
                    </Message>
                </Segment>                
            </Form>
        )
    }
}


  const validate= (formValue) =>{
    const errors={};

    if(formValue.email){
        const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
        errors.email = email(formValue.email)
    }

    if(!formValue.email){
        errors.email = 'You must enter an Email'
    }

    if(!formValue.password){
        errors.password = 'You must enter a Password'
    }


    return errors;
}

export default reduxForm({
    form:'signIn',
    validate
})(SignInForm);