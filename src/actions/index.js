import authUrl from '../api/authUrl';
import messagesUrl from '../api/messagesUrl';
import history from '../helpers/History';
import authHeader from '../helpers/AuthHeader';
import {
    SIGN_IN,
    SIGN_OUT,
    USER_LOADED,
    FETCH_RECIVEMESSAGES,
    FETCH_SENTMESSAGES,
    FETCH_MESSAGE,
    FETCH_USERS,
    CREATE_MESSAGE,
    FAILED_SIGNIN,
    DELETE_MESSAGE,
    CLEAR_ERROR,
    FAILED_SIGNUP,
    EMPTY_MESSAGES,
    CLEAR_EMPTY,
    FAILEDSHOW_MESSAGE,
    CLEAR_FAILEDSHOW_MESSAGE,
    ACTIVE_SCREENLOADER,
    DISABLE_SCREENLOADER,
    SERVER_ERROR_SHOW,
    SERVER_ERROR_CLEAN
    } from './types';

import {PATH} from '../helpers/Constants';


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
        dispatch({type:DISABLE_SCREENLOADER, payload:{}})
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
    localStorage.removeItem("user");
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

export const fetachReciveMessages = () => async (dispatch)=> {
    try{
        dispatch({type:ACTIVE_SCREENLOADER, payload:{}})
        const response = await messagesUrl.get("/message",authHeader());
        if(response.data){
            dispatch({type: FETCH_RECIVEMESSAGES, payload:response.data.response})
            if(response.data.response.length === 0) dispatch(emptyMessages())
            setTimeout(()=>{
                dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            },200)
        }
    }catch(error){
        dispatch({type:DISABLE_SCREENLOADER, payload:{}});
        dispatch(serverErrorActionCreator(SERVER_ERROR_SHOW,error.message));
    }
    
    
}

export const fetachSentMessages = () => async (dispatch)=> {
    try{
        dispatch({type:ACTIVE_SCREENLOADER, payload:{}})
        const response = await messagesUrl.get("/message/?filter=sent",authHeader());
        
        if(response.data){
            dispatch({type: FETCH_SENTMESSAGES, payload:response.data.response})
            if(response.data.response.length === 0) dispatch(emptyMessages())
            setTimeout(()=>{
                dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            },200)
        }   
    }catch(error){
        dispatch({type:DISABLE_SCREENLOADER, payload:{}});
        dispatch(serverErrorActionCreator(SERVER_ERROR_SHOW,error.message));
    }
}

export const emptyMessages = () => (dispatch) =>{
    dispatch({type:EMPTY_MESSAGES})
}


export const clearEmptyMessages = () => dispatch =>{
    dispatch({type:CLEAR_EMPTY})
}

export const fetchMessage = (id) => async (dispatch)=>{
    try{
        dispatch({type:ACTIVE_SCREENLOADER, payload:{}})
        const response = await messagesUrl.get(`/message/${id}`,authHeader());
        if(response.data.success){
            dispatch({type:FETCH_MESSAGE,payload:{message:response.data.message,messageUserData:response.data.messageUserData}})
            setTimeout(()=>{
                dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            },200)
        }else{
            dispatch({type:FAILEDSHOW_MESSAGE,payload:response.data})
            setTimeout(()=>{
                dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            },200)
        }
    }catch(error){
        dispatch({type:DISABLE_SCREENLOADER, payload:{}});
        dispatch(serverErrorActionCreator(SERVER_ERROR_SHOW,error.message));
    }
}

export const cleareFailedShowMessage = () => dispatch =>{
    dispatch({type:CLEAR_FAILEDSHOW_MESSAGE})
}

export const fetchUsers = () => async (dispatch) =>{
    try{
        dispatch({type:ACTIVE_SCREENLOADER, payload:{}})
        const response = await messagesUrl.get('/users',authHeader());
        if(response.data.success){
            dispatch({type:FETCH_USERS,payload:response.data.response});
            setTimeout(()=>{
                dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            },100)
        }else{
            alert(response.data.error)
            setTimeout(()=>{
                dispatch({type:DISABLE_SCREENLOADER, payload:{}})
            },100)
        }
    }catch(error){
        dispatch({type:DISABLE_SCREENLOADER, payload:{}});
        dispatch(serverErrorActionCreator(SERVER_ERROR_SHOW,error.message));
    }
}

export const createMessage = (formValues) => async (dispatch) =>{

    const serverFormat = {
        reciver:parseInt(formValues.reciver),
        message:formValues.message,
        subject:formValues.subject
    }
    const response = await messagesUrl.post('/message',{...serverFormat},authHeader());

    if(response.data.success){
        dispatch({type:CREATE_MESSAGE,payload:response.data.response});
        history.push(PATH.SENT);
    }else{
        history.push(PATH.SENT);
        dispatch(serverErrorActionCreator(SERVER_ERROR_SHOW,response.data.message));
    }
}


export const deleteMessage = (id,currentUserId,sender) => async (dispatch) =>{
    const response = await messagesUrl.delete(`/message/${id}`,authHeader());
    if(response.data.success){
        dispatch({type:DELETE_MESSAGE,payload:id})
        if(currentUserId === sender){
            return history.push(PATH.SENT)
        }
        history.push(PATH.INBOX);
    }else{
        history.push(PATH.INBOX);
        dispatch(serverErrorActionCreator(SERVER_ERROR_SHOW,response.data.error));
    }
}

export const serverErrorActionCreator = (errorType, error) =>{
    return {
        type: errorType,
        payload:error,
        error:true
    }
}

export const serverErrorCleanUp = () => (dispatch)=>{
    return dispatch({type:SERVER_ERROR_CLEAN,payload:{}});
}