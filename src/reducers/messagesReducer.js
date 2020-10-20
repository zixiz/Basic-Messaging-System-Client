import _ from 'lodash';
import {
    FETCH_RECIVEMESSAGES,
    FETCH_SENTMESSAGES,
    FETCH_MESSAGE
} from '../actions/types';

const INITIAL_STATE={
    recived:{},
    sent:{},
    s_message:{}
}

export default (state=INITIAL_STATE,action) =>{
    switch (action.type){
        case FETCH_RECIVEMESSAGES:
            return {...state , recived:_.mapKeys(action.payload,'id')};
        case FETCH_SENTMESSAGES:
            return {...state , sent:_.mapKeys(action.payload,'id')};
        case FETCH_MESSAGE :
            return {...state, s_message:action.payload}
        
        default:
            return state;
    }
}