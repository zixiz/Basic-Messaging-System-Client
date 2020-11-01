import React from 'react';
import { Container} from 'semantic-ui-react';
import history from '../Helpers/History';
import {Router,Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {serverErrorCleanUp} from '../actions'

import Header from './Header';
import SignIn from './public/SignIn';
import SignUp from './public/SignUp';
import NoFound from './public/NoFound';

import InternalServerError from './InternalServerError';
import RecivedMessages from './protected/inbox/RecivedMessages';
import sentMessages from './protected/sent/sentMessages';
import Compose from './protected/Compose'
import PrivateRoute from './PrivateRoute';
import ShowMessage from './protected/ShowMessage';
import DeleteMessage from './protected/DeleteMessage';

class App extends React.Component{

    cleanServerError = () =>{
        this.props.serverErrorCleanUp()
    }

    render(){
        const {serverError,serverErrorMessage} = this.props;
        return (
            <Container fluid>
                <Router history={history}>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={SignIn} />
                        <Route path="/signup" exact component={SignUp} />
                        <PrivateRoute exact path="/inbox" component={RecivedMessages}/>
                        <PrivateRoute exact path="/inbox/sent" component={sentMessages}/>
                        <PrivateRoute exact path="/inbox/:id" component={ShowMessage}/>
                        <PrivateRoute exact path="/inbox/delete/:id" component={DeleteMessage}/>
                        <PrivateRoute path="/compose" exact component={Compose} />
                        <Route path="*" component={NoFound} />
                    </Switch>
                {serverError && <InternalServerError dismiss={this.cleanServerError} serverErrorMessage={serverErrorMessage} />}
                </Router>
            </Container>
        );
    }
    
};

const mapStateToProps = (state) =>{
    return {serverError:state.internalServerError.error, 
        serverErrorMessage:state.internalServerError.errorMessage}
}

export default connect(mapStateToProps,{serverErrorCleanUp})(App);