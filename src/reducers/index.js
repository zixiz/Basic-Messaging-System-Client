import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import messagesReducer from './messagesReducer';
import loaderReducer from './loaderReducer';
import serverErrorReducer from './serverErrorReducer';

export default combineReducers({
    auth:authReducer,
    form:formReducer,
    messages:messagesReducer,
    loader:loaderReducer,
    internalServerError:serverErrorReducer
})