import React from 'react';
import {connect} from 'react-redux';
import {signUp} from '../../actions';
import {Redirect} from 'react-router-dom';
import SignUpForm from '../forms/SignUpForm';
import {Grid} from 'semantic-ui-react';

class SignUp extends React.Component{



    onSubmit = (formValues)=>{
        this.props.signUp(formValues)
    }


    renderSignInIfAuth(){
        if(!this.props.isLoggedIn){
            return(
                    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <SignUpForm validate={this.validate} screen_loader_active={this.props.screen_loader_active} serverError={this.props.serverError} title='Sign Up' onSubmit={this.onSubmit} />
                        </Grid.Column>
                    </Grid>
            )
        }
        return(<Redirect to="/inbox"/>)
    }

    render(){
        return(
            <React.Fragment>
                {this.renderSignInIfAuth()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {isLoggedIn:state.auth.isLoggedIn ,serverError:state.auth.failed_signup_error, screen_loader_active:state.loader.screen_loader_active}
}

export default connect(mapStateToProps,{signUp})(SignUp);