import React from 'react'; 
import {connect} from 'react-redux';
import {fetachSentMessages} from '../../actions';
import MessagesTable from './MessagesTable';

class sentMessages extends React.Component {

    componentDidMount(){
        this.props.fetachSentMessages();
    }

    render(){
        console.log(this.props.messages)
        return (
                <div>
                    <h1>
                        sentMessages
                    </h1>
                    <MessagesTable type="sent" messages={this.props.messages} />
                </div>
            )
    }
    
}

const mapStateToProps = (state) =>{
    return {messages:Object.values(state.messages.sent)}
}

export default connect(mapStateToProps,{fetachSentMessages})(sentMessages);