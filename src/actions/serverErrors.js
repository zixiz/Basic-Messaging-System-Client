import {SERVER_ERROR_CLEAN} from './types';

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