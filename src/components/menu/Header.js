import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Icon} from "semantic-ui-react";
import {connect} from 'react-redux';
import {isAuth,signOut} from '../../actions';
import {PATH} from '../../helpers/Constants';
import UserDataMenu from './UserDataMenu';

class Header extends React.Component{

    componentDidMount(){
        this.props.isAuth();
    }

    renderUserLinks(){
        const {full_name,isLoggedIn, email} = this.props;
        
        if(isLoggedIn){
            return(
                <React.Fragment>
                    <Menu.Item >
                        <UserDataMenu full_name={full_name} email={email}/>
                    </Menu.Item> 
                    <Menu.Item onClick={()=>this.props.signOut()}>
                        <Icon name='sign out alternate' circular />
                        Sign Out
                    </Menu.Item>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <Menu.Item as={Link} to={PATH.SIGN_IN} className="nav-link">Sign In</Menu.Item>
                <Menu.Item as={Link} to={PATH.SIGN_UP} className="nav-link">Sign Up</Menu.Item>
            </React.Fragment>
        )
    }
    

    render(){
        const {isLoggedIn} = this.props;
        return(
            <Menu pointing fluid inverted>
                {isLoggedIn ? <Menu.Item  as={Link} to={PATH.INBOX}>Home</Menu.Item>:
                <Menu.Item as={Link} to={PATH.SIGN_IN}>Messaging Sys</Menu.Item>}
                <Menu.Menu position="right" id="sys-navbar">
                    {this.renderUserLinks()}
                </Menu.Menu>
            </Menu>
            )
    }
}

const mapStateToProps = (state) =>{
    return {isLoggedIn:state.auth.isLoggedIn,full_name: state.auth.full_name ,email: state.auth.email}
}


export default connect(mapStateToProps,{isAuth,signOut})(Header);