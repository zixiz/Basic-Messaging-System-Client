import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {isAuth} from '../../actions';
import Unauthorized from '../public/Unauthorized';
import AppGrid from '../AppGrid';

class PrivateRoute extends React.Component {

    componentDidMount(){
        this.props.isAuth();
    }

    render(){
        const {component:Component,auth,path,...rest} = this.props;
        
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

}
    


const mapStateToProps = (state) =>{
    return {auth:state.auth}
}

export default connect(mapStateToProps,{isAuth})(PrivateRoute);