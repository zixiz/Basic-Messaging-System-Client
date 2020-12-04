import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../actions/auth'
import {Redirect} from 'react-router-dom';
import SignInForm from '../forms/SignInForm'
import {Grid} from 'semantic-ui-react';

const SignIn = () =>{
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const serverError = useSelector(state => state.auth.failed_signin_error);
    const screen_loader_active = useSelector(state => state.loader.screen_loader_active);
    const dispatch = useDispatch();

    const onSubmit = (formValues)=>{
        dispatch(signIn(formValues));
    }


    const renderSignInIfAuth =()=>{
        if(!isLoggedIn){
            return(
                <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                            <SignInForm screen_loader_active={screen_loader_active} serverError={serverError} title='Sign In' onSubmit={onSubmit}/>
                    </Grid.Column>
                </Grid>
            )
        }
        return(<Redirect to="/inbox"/>)
    }

    return(
            <React.Fragment>
                {renderSignInIfAuth()}
            </React.Fragment>
        )
}

export default SignIn;