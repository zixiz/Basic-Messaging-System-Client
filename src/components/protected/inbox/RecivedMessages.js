import React from 'react'; 
import {connect} from 'react-redux';
import {fetachReciveMessages,clearEmptyMessages} from '../../../actions/messages';
import MessagesTable from '../table/MessagesTable';
import { Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import EmptyComponent from '../table/EmptyMessages';
import ScreenLoader from '../../ScreenLoader';

import {PATH} from '../../../helpers/Constants';

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
                <Button as={Link} color="blue" to={PATH.COMPOSE}>Compose</Button>
        )
    }

    renderEmptyOrTable(){
        const {screen_loader_active,empty_messages,messages,serverError} = this.props;
        if(screen_loader_active || serverError){
            return null
        }
        if(empty_messages){
           return <EmptyComponent icon='inbox' content="You don't have any messages in the inbox" actions={this.renderActions()}/>
        }
        return(
            <MessagesTable  tableHeader="Inbox" type="recived" messages={messages} />
        )
    }

    render(){
        const {screen_loader_active} = this.props;
        return (
            <>
                <ScreenLoader active={screen_loader_active}/>
                {this.renderEmptyOrTable()}
            </>
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