import React from 'react';
import {Container} from 'react-bootstrap';
import history from '../Helpers/History';
import {Router,Route,Switch} from 'react-router-dom';
import Header from './Header';
import SignIn from './public/SignIn';
import RecivedMessages from './protected/RecivedMessages';
import sentMessages from './protected/sentMessages';
import Compose from './protected/Compose'
import PrivateRoute from './PrivateRoute';
import ShowMessage from './protected/ShowMessage';

class App extends React.Component{

    render(){
        return (
            <Container>
                <Router history={history}>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={SignIn} />
                        <PrivateRoute exact path="/messages" component={RecivedMessages}/>
                        <PrivateRoute exact path="/messages/sent" component={sentMessages}/>
                        <PrivateRoute exact path="/messages/:id" component={ShowMessage}/>
                        <PrivateRoute path="/compose" exact component={Compose} />
                    </Switch>
                </Router>
            </Container>
        );
    }
    
};



export default App;