import {
    FAILED_SIGNIN,
    SIGN_IN,
    SIGN_OUT,
    USER_LOADED,
    CLEAR_ERROR,
    FAILED_SIGNUP
    } from '../actions/types';

const INITIAL_STATE={
    isLoggedIn:false,
    userId:null,
    email:null,
    full_name:null,
    isLoading:false,
    failed_signin_error:null,
    failed_signup_error:null
}

export default (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case SIGN_IN:
            return {...state,isLoggedIn:action.payload.isLoggedIn, userId:action.payload.id,email:action.payload.email,full_name:action.payload.full_name}
            
        case SIGN_OUT:
            return {...state,...INITIAL_STATE};

        case USER_LOADED:
            return {...state,isLoggedIn:action.payload.isLoggedIn, userId:action.payload.id,email:action.payload.email,full_name:action.payload.full_name,isLoading:action.payload.isLoading}

        case FAILED_SIGNIN:
            return {...state,failed_signin_error:action.payload}
            
        case FAILED_SIGNUP:
            return {...state,failed_signup_error:action.payload}
            
        case CLEAR_ERROR:
            return {...state,failed_signin_error:null,failed_signup_error:null }
        default:
            return state;
    }
}