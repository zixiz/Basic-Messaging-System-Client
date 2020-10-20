import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {PersonLinesFill} from 'react-bootstrap-icons';
import {connect} from 'react-redux';
import {isAuth,signOut} from '../actions';

class Header extends React.Component{

    componentDidMount(){
        this.props.isAuth();
    }

    renderUserLinks(){
        if(this.props.isLoggedIn){
            return(
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/messages" >Messages</Nav.Link>
                    <Nav.Link as={Link} to="/messages/sent" >Sent</Nav.Link>
                    <Nav.Link as={Link} to="/compose">Compose</Nav.Link>
                    <Nav.Link>
                        <PersonLinesFill color="black" size={20}/>
                    </Nav.Link>
                    <Button size="sm" variant="outline-light" onClick={()=>this.props.signOut()}>Sign Out</Button>
                </Nav>
            )
        }
        return (
            <Nav className="ml-auto">
                <Nav.Link as={Link}to="/" className="nav-link">Sign In</Nav.Link>
                <Nav.Link >Sign Up</Nav.Link>
            </Nav>
        )
    }
    

    render(){
        return(
            <Navbar bg="primary" variant="dark" expand="lg">
                {this.props.isLoggedIn ? <Navbar.Brand as={Link} to="/messages">Messaging Sys</Navbar.Brand>:
                <Navbar.Brand as={Link} to="/">Messaging Sys</Navbar.Brand>}
                <Navbar.Toggle aria-controls="sys-navbar" />
                <Navbar.Collapse id="sys-navbar">
                    {this.renderUserLinks()}
                </Navbar.Collapse>
            </Navbar>
            )
    }
}

const mapStateToProps = (state) =>{
    return {isLoggedIn:state.auth.isLoggedIn,full_name: state.auth.full_name}
}


export default connect(mapStateToProps,{isAuth,signOut})(Header);