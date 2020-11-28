import authUrl from '../api/authUrl';
import history from '../helpers/History';
import {PATH} from '../helpers/Constants';
import {
    SIGN_IN,
    SIGN_OUT,
    USER_LOADED,
    FAILED_SIGNIN,
    CLEAR_ERROR,
    FAILED_SIGNUP,
    ACTIVE_SCREENLOADER,
    DISABLE_SCREENLOADER
    } from './types';

export const signIn = (formValues) => async (dispatch) =>{
    dispatch({type:ACTIVE_SCREENLOADER, payload:{}})
    try{
        const response = await authUrl.post('/login',{...formValues});
        if(!response.data.success){
            dispatch({type:FAILED_SIGNIN,payload:response.data.error})
            dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            return setTimeout(() => {
                return dispatch({type:CLEAR_ERROR,payload:{}})
            }, 4000);
        }

        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({type:SIGN_IN,payload:response.data});
        history.push(PATH.INBOX);
    }catch(error){
        dispatch({type:FAILED_SIGNIN,payload:error.message})
        dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            return setTimeout(() => {
                    return dispatch({type:CLEAR_ERROR,payload:{}})
            }, 4000);
    }
    
}


export const signUp = (formValues) => async (dispatch) =>{
    dispatch({type:ACTIVE_SCREENLOADER, payload:{}})
    try{
        const response = await authUrl.post('/register',{...formValues});
        if(!response.data.success){
            dispatch({type:FAILED_SIGNUP,payload:response.data.error});
            dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            return setTimeout(() => {
                return dispatch({type:CLEAR_ERROR,payload:response.data.error})
            }, 4000);
        }
        dispatch({type:DISABLE_SCREENLOADER, payload:{}})
        history.push(PATH.SIGN_IN);
    }catch(error){
        dispatch({type:FAILED_SIGNUP,payload:error.message})
        dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            return setTimeout(() => {
                    dispatch({type:CLEAR_ERROR,payload:{}})
            }, 4000);
    }
    
}


export const signOut = () => async (dispatch) =>{
    localStorage.clear()
    dispatch({type:SIGN_OUT,payload:{}});
    history.push(PATH.SIGN_IN);
}

export const isAuth =() => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        dispatch({type:USER_LOADED,payload:{}})
    }
    dispatch({type:USER_LOADED,payload:{...user}})
}