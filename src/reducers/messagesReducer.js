import _ from 'lodash';
import {
    FETCH_RECIVEMESSAGES,
    FETCH_SENTMESSAGES,
    FETCH_MESSAGE,
    FETCH_USERS,
    CREATE_MESSAGE,
    DELETE_MESSAGE,
    SIGN_OUT,
    EMPTY_MESSAGES,
    CLEAR_EMPTY,
    FAILEDSHOW_MESSAGE,
    CLEAR_FAILEDSHOW_MESSAGE
    } from '../actions/types';

const INITIAL_STATE={
    recived:{},
    sent:{},
    s_message:{},
    extra_s_message:{},
    users:{},
    empty_messages:false,
    failed_show_message:false
}

export default (state=INITIAL_STATE,action) =>{
    switch (action.type){
        case FETCH_RECIVEMESSAGES:
            return {...state , recived:_.mapKeys(action.payload,'id'),empty_messages:false};

        case FETCH_SENTMESSAGES:
            return {...state , sent:_.mapKeys(action.payload,'id'),empty_messages:false};

        case FETCH_MESSAGE :
            return {...state, s_message:action.payload.message,extra_s_message:action.payload.messageUserData,failed_show_message:false};

        case FAILEDSHOW_MESSAGE:
            return {...state, failed_show_message:true,s_message:action.payload};

        case CLEAR_FAILEDSHOW_MESSAGE:
            return {...state, failed_show_message:false,s_message:{},extra_s_message:{}};

        case FETCH_USERS :
            return {...state,users:_.mapKeys(action.payload,'id')};

        case CREATE_MESSAGE:
            return {...state,sent:{[action.payload.id]:action.payload}};

        case DELETE_MESSAGE:
            return {...state,s_message:{},extra_s_message:{}};

        case SIGN_OUT:
            return {...state, ...INITIAL_STATE};

        case EMPTY_MESSAGES:
            return {...state,empty_messages:true};

        case CLEAR_EMPTY:
            return {...state, empty_messages:false};
            
        default:
            return state;
    }
}