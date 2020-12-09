import React, {useEffect} from 'react';
import CustomeModal from '../../customeModal/CustomeModal';
import {fetchMessage,deleteMessage,cleareFailedShowMessage} from '../../../actions/messages';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {PATH} from '../../../helpers/Constants';

const DeleteMessage = ({match}) =>{
    const messageToDelete = useSelector(state => state.messages.s_message);
    const currentUserId = useSelector(state => state.auth.userId);
    const failed_show_message = useSelector(state => state.messages.failed_show_message);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMessage =() =>{
            dispatch(fetchMessage(match.params.id))
        }
        getMessage();

        return () => {
            if(failed_show_message) dispatch(cleareFailedShowMessage())
        }
    },[dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderActions = () =>{
        return (
            <React.Fragment>
                <Button onClick={()=>dispatch(deleteMessage(match.params.id,currentUserId,messageToDelete.sender))} color="red">Delete</Button>
                <Button as={Link} to={currentUserId === messageToDelete.sender ? PATH.SENT : PATH.INBOX}>Cancel</Button>
            </React.Fragment>
        )
    }

    const renderModal = () =>{
        if(failed_show_message){
            return(
                <CustomeModal
                icon='thumbs down'
                closeModalPath = {PATH.INBOX}
                title={messageToDelete.error}
                content=''
                actions={<Button as={Link} to={PATH.INBOX} >Cancel</Button>}
                />
                )
        }else{
            return(
                <CustomeModal
                icon='archive'
                closeModalPath = {currentUserId === messageToDelete.sender ? PATH.SENT : PATH.INBOX}
                title="Delete Message"
                content={`Are you sure you want to delete the message: ${messageToDelete.subject}?`}
                actions={renderActions()}
                />
            )
        }
    }

    return (
        <React.Fragment>
            {renderModal()}
        </React.Fragment>
        )

}

export default DeleteMessage;