import React from 'react';
import {connect} from 'react-redux';
import {fetchMessage,cleareFailedShowMessage} from '../../actions'
import MessageView from './MessageView';
import CustomModal from '../Modal';
import {Button, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import ScreenLoader from '../ScreenLoader';


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

        const {message,mail,user,failed_show_message,match,screen_loader_active} = this.props;
        if(screen_loader_active){
            return null
        }
        if(failed_show_message){
            return <CustomModal icon="thumbs down" closeModalPath='/inbox' title={message.error} content="Ho no, it seems like you try to reach a message that you can't view" actions={<Button as={Link} to={'/inbox'} color="blue">Back to inbox</Button>}/>
        }else{
            if(message.sender === user.userId){
                return <MessageView header={`Message ${match.params.id}`} sent={user.email} reciver={mail.email} subject={message.subject} content={message.message}/>
           }else{
               return <MessageView header={`Message ${match.params.id}`} sent={mail.email} reciver={user.email} subject={message.subject} content={message.message}/>
           }
        }   
    }


    render(){
        const {screen_loader_active} = this.props;
        return (
            <Grid stackable centered columns={2}>
                <Grid.Column>
                    <ScreenLoader active={screen_loader_active}/>
                    {this.renderMessageView()}  
                </Grid.Column>
            </Grid>
        );
    } 
};

const mapStateToProps = (state) =>{
    return {message:state.messages.s_message,mail: state.messages.extra_s_message, user: state.auth,
         failed_show_message: state.messages.failed_show_message,screen_loader_active:state.loader.screen_loader_active}
}

export default connect(mapStateToProps,{fetchMessage,cleareFailedShowMessage})(ShowMessage);