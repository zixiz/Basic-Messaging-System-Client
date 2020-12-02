import React from 'react';
import {Container} from 'semantic-ui-react';
import {Router,Route,Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {PATH} from '../helpers/Constants';
import {serverErrorCleanUp} from '../actions/serverErrors';
import history from '../helpers/History';

import Header from './menu/Header';
import SignIn from './public/SignIn';
import SignUp from './public/SignUp';
import NoFound from './public/NoFound';

import InternalServerError from './InternalServerError';
import RecivedMessages from './protected/inbox/RecivedMessages';
import SentMessages from './protected/sent/sentMessages';
import Compose from './protected/create/Compose';
import PrivateRoute from './menu/PrivateRoute';
import ShowMessage from './protected/message/ShowMessage';
import DeleteMessage from './protected/delete/DeleteMessage';

const App = ()=> {
    const serverError = useSelector(state => state.internalServerError.error);
    const serverErrorMessage = useSelector(state => state.internalServerError.errorMessage);
    const dispatch = useDispatch();

    const cleanServerError = () =>{
        dispatch(serverErrorCleanUp)
    }

    return (
        <Container fluid>
            <Router history={history}>
                <Header/>
                <Switch>
                    <Route path={PATH.SIGN_IN} exact component={SignIn} />
                    <Route path={PATH.SIGN_UP} exact component={SignUp} />
                    <PrivateRoute exact path={PATH.INBOX} component={RecivedMessages}/>
                    <PrivateRoute exact path={PATH.SENT} component={SentMessages}/>
                    <PrivateRoute exact path={PATH.SHOW_MESSAGE} component={ShowMessage}/>
                    <PrivateRoute exact path={PATH.DELETE_MESSAGE} component={DeleteMessage}/>
                    <PrivateRoute path={PATH.COMPOSE} exact component={Compose} />
                    <Route path="*" component={NoFound} />
                </Switch>
                {serverError && <InternalServerError dismiss={cleanServerError} serverErrorMessage={serverErrorMessage} />}
            </Router>
        </Container>
        );
    
};

export default App;