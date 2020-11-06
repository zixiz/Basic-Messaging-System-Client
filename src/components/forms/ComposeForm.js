import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { Button, Form, Header, Message, Segment, TextArea} from 'semantic-ui-react';

class ComposeForm extends React.Component{

    renderError({error,touched}){
        if(touched && error){
            return(
                <Message negative>
                    <p>{error}</p>
                </Message>
            )
        }
    }

    renderText = ({input,label,type,meta}) =>{
        if(type ===  "text-area"){
            return (
                    <React.Fragment>
                            <Form.Input control={TextArea} placeholder={label} {...input} type={type} />
                            {this.renderError(meta)}
                    </React.Fragment>
                    )
        }
        return (
            <React.Fragment>
                <Form.Input placeholder={label} {...input} type={type} />
                {this.renderError(meta)}
            </React.Fragment>
        )
    }

    renderSelectField = ({ input, meta, children }) =>{
        
        return (
            <React.Fragment>
                <Form.Field  {...input} control='select' >
                    <option></option>
                    {children}
                </Form.Field>
                {this.renderError(meta)}
            </React.Fragment>
            
        )
    }

    onSubmit =(formValues) =>{
        this.props.onSubmit(formValues);
    }



    render(){
        const {handleSubmit, pristine, submitting,error,header,screen_loader_active} = this.props;
        return(
            <Form size='big' onSubmit={handleSubmit(this.onSubmit)} loading={screen_loader_active} >
                <Segment stacked>
                    <Header as='h2' color='grey' textAlign='center'>
                         {header}
                    </Header>
                    <Field name="reciver" validate={required} type="select"  component={this.renderSelectField}>
                        {this.props.users.map(option =>{
                            return(
                                <option key={option.id} value={option.id}>{option.email}</option>
                            )
                        })}
                    </Field>
                    <Field name="subject" validate={required} type="text" component={this.renderText} label="Enter Subject"/>
                    <Field name="message" validate={required} type="text-area" component={this.renderText} label="Enter Message"/>
                    {error && <strong>{error}</strong>}
                    <Button color='blue' disabled={pristine || submitting}>
                        Send
                    </Button>
                </Segment>
            </Form>
        )
    }
}

const required = value => value ? undefined : 'Required';

export default reduxForm({
    form:'compose'
})(ComposeForm);