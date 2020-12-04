import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers,createMessage} from '../../../actions/messages';
import ComposeForm from '../../forms/ComposeForm';
import {Grid} from 'semantic-ui-react';

const Compose = () => {
    const users = useSelector(state => Object.values(state.messages.users));
    const screen_loader_active = useSelector(state => state.loader.screen_loader_active);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUsers =() =>{
            dispatch(fetchUsers())
        }
        getUsers();

    },[dispatch]);

    const onSubmit =(formValues) =>{
        dispatch(createMessage(formValues));
    }

    return (
        <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 750 }}>
                <ComposeForm screen_loader_active={screen_loader_active} header='Compose' onSubmit={onSubmit} users={users} />
            </Grid.Column>
        </Grid >
        )
    
}

export default Compose;