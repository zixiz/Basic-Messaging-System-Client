import {
    SIGN_IN,
    SIGN_OUT,
    USER_LOADED
} from '../actions/types';

const INITIAL_STATE={
    isLoggedIn:false,
    userId:null,
    email:null,
    full_name:null,
    isLoading:false
}

export default (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case SIGN_IN:
            return {...state,isLoggedIn:action.payload.isLoggedIn, userId:action.payload.id,email:action.payload.email,full_name:action.payload.full_name}
            
        case SIGN_OUT:
            return {...state,isLoggedIn:false,userId:null,email:null,full_name:null};

        case USER_LOADED:
            return {...state,isLoggedIn:action.payload.isLoggedIn, userId:action.payload.id,email:action.payload.email,full_name:action.payload.full_name,isLoading:action.payload.isLoading}

        default:
            return state;
    }
}