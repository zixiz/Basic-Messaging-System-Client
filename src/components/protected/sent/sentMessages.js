import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetachSentMessages,clearEmptyMessages} from '../../../actions/messages';
import MessagesTable from '../table/MessagesTable';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import EmptyComponent from '../table/EmptyMessages';
import ScreenLoader from '../../ScreenLoader';

import {PATH} from '../../../helpers/Constants';

const SentMessages = () => {

    const messages = useSelector(state => Object.values(state.messages.sent));
    const empty_messages = useSelector(state => state.messages.empty_messages);
    const screen_loader_active = useSelector(state => state.loader.screen_loader_active);
    const serverError = useSelector(state => state.internalServerError.error);   
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages =() =>{
            dispatch(fetachSentMessages());
        }
        fetchMessages();

        return () => {
            if(empty_messages) dispatch(clearEmptyMessages())
        }
    },[dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderActions = () =>{
        return (
                <Button as={Link} to={PATH.COMPOSE}>Compose</Button>
        )
    }

    const renderEmptyOrTable =() =>{
        if(screen_loader_active || serverError){
            return null
        }
        if(empty_messages){
           return <EmptyComponent icon='send' content="You don't have any sent messages" actions={renderActions()}/>
        }
        return(
            <MessagesTable tableHeader="Sent" type="sent" messages={messages} />
        )
    }

    return (
        <>
            <ScreenLoader active={screen_loader_active}/>
            {renderEmptyOrTable()}
        </>
        )    
}

export default SentMessages;