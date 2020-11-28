import React from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../actions/auth'
import {Redirect} from 'react-router-dom';
import SignInForm from '../forms/SignInForm'
import {Grid} from 'semantic-ui-react';

class SignIn extends React.Component{

    onSubmit = (formValues)=>{
        this.props.signIn(formValues)
    }


    renderSignInIfAuth(){
        if(!this.props.isLoggedIn){
            return(
                <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                            <SignInForm screen_loader_active={this.props.screen_loader_active} serverError={this.props.serverError} title='Sign In' onSubmit={this.onSubmit}/>
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
    return {isLoggedIn:state.auth.isLoggedIn,serverError:state.auth.failed_signin_error,screen_loader_active:state.loader.screen_loader_active}
}

export default connect(mapStateToProps,{signIn})(SignIn);