import React from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../actions'
import {Redirect} from 'react-router-dom';
import SignInForm from '../forms/SignInForm'

class SignIn extends React.Component{

    onSubmit = (formValues)=>{
        this.props.signIn(formValues)
    }


    renderSignInIfAuth(){
        if(!this.props.isLoggedIn){
            return(
                <React.Fragment>
                <h2>Sign In</h2>
                    <SignInForm onSubmit={this.onSubmit}/>
                </React.Fragment>
            )
        }
        return(<Redirect to="/messages"/>)
    }

    render(){
        return(
            <div>
                {this.renderSignInIfAuth()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {isLoggedIn:state.auth.isLoggedIn}
}

export default connect(mapStateToProps,{signIn})(SignIn);