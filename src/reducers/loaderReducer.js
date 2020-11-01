import {
    ACTIVE_SCREENLOADER,
    DISABLE_SCREENLOADER,
    } from '../actions/types';

const INITIAL_STATE={
    screen_loader_active:false
}

export default (state=INITIAL_STATE,action) =>{
    switch (action.type){
        case ACTIVE_SCREENLOADER:
            return {...state , screen_loader_active:true};

        case DISABLE_SCREENLOADER:
            return {...state , screen_loader_active:false};

        default:
            return state;
    }
}