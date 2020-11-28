import React from 'react';
import {connect} from 'react-redux';
import {fetchMessage, cleareFailedShowMessage} from '../../../actions/messages'
import MessageView from './MessageView';
import CustomModal from '../../customeModal/CustomeModal';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import ScreenLoader from '../../ScreenLoader';
import {PATH} from '../../../helpers/Constants';

class ShowMessage extends React.Component{

    componentDidMount(){
        const {match} = this.props;
        this.props.fetchMessage(match.params.id)
    }

    componentWillUnmount(){
        const {failed_show_message} = this.props;
        if(failed_show_message) this.props.cleareFailedShowMessage()
    }

    renderMessageView(){

        const {message,mail,user,failed_show_message, match,screen_loader_active} = this.props;
        if(screen_loader_active){
            return null
        }
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


    render(){
        const {screen_loader_active} = this.props;
        return (
            <>
                <ScreenLoader active={screen_loader_active}/>
                {this.renderMessageView()}  
            </>
        );
    } 
};

const mapStateToProps = (state) =>{
    return {message:state.messages.s_message,mail: state.messages.extra_s_message, user: state.auth,
         failed_show_message: state.messages.failed_show_message,screen_loader_active:state.loader.screen_loader_active}
}

export default connect(mapStateToProps,{fetchMessage,cleareFailedShowMessage})(ShowMessage);