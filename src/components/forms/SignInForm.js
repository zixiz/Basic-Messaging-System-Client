import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form,Button,Alert } from 'react-bootstrap';

class SignInForm extends React.Component{

    renderError({error,touched}){
        if(touched && error){
            return(
                <div>
                    <Alert variant="danger ">
                        {error}
                    </Alert>
                </div>
            )
        }
    }

    renderInput = ({input,label, meta,type}) =>{
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} type={type} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit =(formValues) =>{
        this.props.onSubmit(formValues);
    }

    render(){
        const {handleSubmit, pristine, submitting,error} = this.props;
        return(
            <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Form.Group>
                    <Field name="email" validate={email} type="text" component={this.renderInput} label="Enter Email"/>
                </Form.Group>
                <Form.Group>
                    <Field name="password" validate={required} type="password" component={this.renderInput} label="Enter Password"/>
                </Form.Group>
                {error && <strong>{error}</strong>}
                <Button variant="primary" type="submit" disabled={pristine || submitting}>
                    Sign In
                </Button>
            </Form>
        )
    }
}

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
 const required = value => value ? undefined : 'Required'

export default reduxForm({
    form:'signIn'
})(SignInForm);