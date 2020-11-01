import React from 'react'; 
import {connect} from 'react-redux';
import {fetachReciveMessages,clearEmptyMessages} from '../../../actions';
import MessagesTable from '../MessagesTable';
import {Grid, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import EmptyComponent from '../EmptyComponent';
import ScreenLoader from '../../ScreenLoader';
import MessagesSubMenu from '../MessagesSubMenu';

class RecivedMessages extends React.Component {

    componentDidMount(){
        this.props.fetachReciveMessages();
    }

    componentWillUnmount(){
        const {empty_messages} = this.props;
        if(empty_messages) this.props.clearEmptyMessages()
    }


    renderActions(){
        return (
            <React.Fragment>
                <Button as={Link} to={'/compose'}>Compose</Button>
            </React.Fragment>
        )
    }

    renderEmptyOrTable(){
        const {screen_loader_active,empty_messages,messages,serverError} = this.props;
        if(screen_loader_active){
            return null
        }
        if(empty_messages || serverError){
           return <EmptyComponent icon='inbox' content="You don't have any messages in the inbox" actions={this.renderActions()}/>
        }
        return(
            <MessagesTable  tableHeader="Inbox" type="recived" messages={messages} />
        )
    }

    render(){
        const {screen_loader_active,match} = this.props;
        return (
                <Grid stackable padded={true}>
                    <ScreenLoader active={screen_loader_active}/>
                    <Grid.Row>
                    <Grid.Column width={3}>
                       <MessagesSubMenu path={match.path}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {this.renderEmptyOrTable()}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
    }
    
}

const mapStateToProps = (state) =>{
    return {messages:Object.values(state.messages.recived),
        empty_messages:state.messages.empty_messages, 
        screen_loader_active:state.loader.screen_loader_active,
        serverError:state.internalServerError.error
    }
}

export default connect(mapStateToProps,{fetachReciveMessages,clearEmptyMessages})(RecivedMessages);