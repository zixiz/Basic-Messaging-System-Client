import React from 'react'; 
import CustomeModal from '../../customeModal/CustomeModal';
import {fetchMessage,deleteMessage,cleareFailedShowMessage} from '../../../actions/messages';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {PATH} from '../../../helpers/Constants';

class DeleteMessage extends React.Component{

    componentDidMount(){
        this.props.fetchMessage(this.props.match.params.id);
    }

    componentWillUnmount(){
        const {failed_show_message} = this.props;
        if(failed_show_message) this.props.cleareFailedShowMessage();
    }


    renderActions(){
        const {id} = this.props.match.params;
        const {currentUserId,messageToDelete} = this.props;
        return (
            <React.Fragment>
                <Button onClick={()=>this.props.deleteMessage(id,currentUserId,messageToDelete.sender)} color="red">Delete</Button>
                <Button as={Link} to={currentUserId === messageToDelete.sender ? PATH.SENT : PATH.INBOX}>Cancel</Button>
            </React.Fragment>
        )
    }


    renderModal(){
        const {currentUserId,messageToDelete,failed_show_message} = this.props;
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
                actions={this.renderActions()}
                />
            )
        }
    }

    render(){
        return (
            <React.Fragment>
                {this.renderModal()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {messageToDelete: state.messages.s_message,currentUserId:state.auth.userId,
        failed_show_message:state.messages.failed_show_message}
}

export default connect(mapStateToProps,{fetchMessage,deleteMessage,cleareFailedShowMessage})(DeleteMessage);