import React from 'react'; 
import {connect} from 'react-redux';
import {fetachReciveMessages,fetachSentMessages} from '../../actions';
import MessagesTable from './MessagesTable';

class RecivedMessages extends React.Component {

    componentDidMount(){
        this.props.fetachReciveMessages();
    }

    render(){
        return (
                <div>
                    <h1>
                    RecivedMessages
                    </h1>
                    <MessagesTable type="recived" messages={this.props.messages} />
                </div>
            )
    }
    
}

const mapStateToProps = (state) =>{
    return {messages:Object.values(state.messages.recived)}
}

export default connect(mapStateToProps,{fetachReciveMessages,fetachSentMessages})(RecivedMessages);