import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetachReciveMessages,clearEmptyMessages} from '../../../actions/messages';
import MessagesTable from '../table/MessagesTable';
import { Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import EmptyComponent from '../table/EmptyMessages';
import ScreenLoader from '../../ScreenLoader';

import {PATH} from '../../../helpers/Constants';

const RecivedMessages = () => {
    const messages = useSelector(state => Object.values(state.messages.recived));
    const empty_messages = useSelector(state => state.messages.empty_messages);
    const screen_loader_active = useSelector(state => state.loader.screen_loader_active);
    const serverError = useSelector(state => state.internalServerError.error); 
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages =() =>{
            dispatch(fetachReciveMessages());
        }
        fetchMessages();

        return () => {
            if(empty_messages) dispatch(clearEmptyMessages());
        }
    },[dispatch]);

    const renderActions = () =>{
        return (
                <Button as={Link} color="blue" to={PATH.COMPOSE}>Compose</Button>
        )
    }

    const renderEmptyOrTable = () =>{

        if(screen_loader_active || serverError){
            return null
        }
        if(empty_messages){
           return <EmptyComponent icon='inbox' content="You don't have any messages in the inbox" actions={renderActions()}/>
        }
        return(
            <MessagesTable  tableHeader="Inbox" type="recived" messages={messages} />
        )
    }

    return (
        <>
            <ScreenLoader active={screen_loader_active}/>
            {renderEmptyOrTable()}
        </>
        )

    
}

export default RecivedMessages;