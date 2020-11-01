import React from 'react'; 
import {connect} from 'react-redux';
import {fetchUsers,createMessage} from '../../actions';
import ComposeForm from '../forms/ComposeForm';
import {Grid} from 'semantic-ui-react';

class Compose extends React.Component {
    
    componentDidMount(){
        this.props.fetchUsers()
    }

    onSubmit =(formValues) =>{
        this.props.createMessage(formValues);
    }

    render(){
        const {screen_loader_active} = this.props;
        return (
        <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 550 }}>
                <ComposeForm screen_loader_active={screen_loader_active} header='Compose' onSubmit={this.onSubmit} users={this.props.users} />
            </Grid.Column>
        </Grid >
        )
    }
    
}

const mapStateToProps = (state) =>{
    return {users:Object.values(state.messages.users),screen_loader_active:state.loader.screen_loader_active}
}

export default connect(mapStateToProps,{fetchUsers,createMessage})(Compose);