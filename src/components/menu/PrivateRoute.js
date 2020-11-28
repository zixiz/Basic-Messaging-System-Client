import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {isAuth} from '../../actions/auth';
import Unauthorized from '../public/Unauthorized';
import AppGrid from '../AppGrid';

const PrivateRoute = ({component:Component,path,...rest}) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const checkAuth =() =>{
            dispatch(isAuth)
        }
        checkAuth();
    },[dispatch]);

    return(
        <Route {...rest} render={props=>{
            if(!auth.isLoggedIn){
                return <Unauthorized/>
            }
            return (
                    <AppGrid path={path}>
                        <Component {...props}/>
                    </AppGrid>
            )
        }} />
    )
    

}
    

export default PrivateRoute;