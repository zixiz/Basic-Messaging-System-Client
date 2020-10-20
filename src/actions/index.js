import authUrl from '../api/authUrl';
import messagesUrl from '../api/messagesUrl'
import history from '../Helpers/History';
import authHeader from '../Helpers/AuthHeader'
import {
    SIGN_IN,
    SIGN_OUT,
    USER_LOADED,
    FETCH_RECIVEMESSAGES,
    FETCH_SENTMESSAGES,
    FETCH_MESSAGE} from './types';


export const signIn = (formValues) => async (dispatch) =>{
    const response = await authUrl.post('/login',{...formValues});

    if(!response.data.success){
        return alert("didnt success log in");
    }
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({type:SIGN_IN,payload:response.data});
    history.push('/messages');   
}

export const signOut = ()=> async (dispatch) =>{
    localStorage.removeItem("user");
    dispatch({type:SIGN_OUT,payload:{}});
    history.push('/');
}

export const isAuth =() => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        dispatch({type:USER_LOADED,payload:{}})
    }
    dispatch({type:USER_LOADED,payload:{...user}})
}

export const fetachReciveMessages = () => async (dispatch)=> {
    const response = await messagesUrl.get("/message",authHeader());
    if(response.data){
        dispatch({type: FETCH_RECIVEMESSAGES, payload:response.data.response})
    }
    
}

export const fetachSentMessages = () => async (dispatch)=> {
    const response = await messagesUrl.get("/message/?filter=sent",authHeader());

    if(response.data){
        dispatch({type: FETCH_SENTMESSAGES, payload:response.data.response})
    }
    
}

export const fetchMessage = (id) => async (dispatch)=>{
    const response = await messagesUrl.get(`/message/${id}`);

    if(response.data.success){
        dispatch({type:FETCH_MESSAGE,payload:response.data.message})
    }
    
    
}
