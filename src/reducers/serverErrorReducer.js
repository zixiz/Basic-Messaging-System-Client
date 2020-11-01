import {
    SERVER_ERROR_SHOW,
    SERVER_ERROR_CLEAN,
    } from '../actions/types';

const INITIAL_STATE={
    error: null,
    errorMessage:''
}

export default (state=INITIAL_STATE,action) =>{
    switch (action.type){
        case SERVER_ERROR_SHOW:
            return {...state , error: true, errorMessage:action.payload};

        case SERVER_ERROR_CLEAN:
            return {...state , ...INITIAL_STATE};

        default:
            return state;
    }
}