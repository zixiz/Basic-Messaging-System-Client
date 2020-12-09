import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMessage, cleareFailedShowMessage} from '../../../actions/messages';
import MessageView from './MessageView';
import CustomModal from '../../customeModal/CustomeModal';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import ScreenLoader from '../../ScreenLoader';
import {PATH} from '../../../helpers/Constants';

const ShowMessage = ({match}) =>{
    const message = useSelector(state => state.messages.s_message);
    const mail = useSelector(state => state.messages.extra_s_message);
    const user = useSelector(state => state.auth);
    const failed_show_message = useSelector(state => state.messages.failed_show_message);
    const screen_loader_active = useSelector(state => state.loader.screen_loader_active);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMessage =() =>{
            dispatch(fetchMessage(match.params.id))
        }
        getMessage();

        return () => {
            if(failed_show_message) dispatch(cleareFailedShowMessage())
        }
    },[dispatch]);  // eslint-disable-line react-hooks/exhaustive-deps


    const renderMessageView = () =>{
        if(screen_loader_active ){
            return null
        }else{
            if(failed_show_message){
                return <CustomModal icon="thumbs down" closeModalPath={PATH.INBOX} 
                                    title={message.error} 
                                    content="Oh no, it seems like you're trying to reach a message that you can't view." 
                                    actions={<Button as={Link} to={PATH.INBOX} color="blue">Back to inbox</Button>}/>
            }else{
                if(message.sender === user.userId){
                    return <MessageView header={`${message.subject}`} sent={user.email} 
                            reciver={mail.email} subject={message.subject} 
                            content={message.message} deleteId={match.params.id}/>
               }else{
                   return <MessageView header={`${message.subject}`} sent={mail.email} 
                            reciver={user.email} subject={message.subject} 
                            content={message.message} deleteId={match.params.id}/>
               }
            }   
        }
    }


    return (
        <>
            <ScreenLoader active={screen_loader_active}/>
            {renderMessageView()}  
        </>
        );

};

export default ShowMessage;