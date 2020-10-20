import React from 'react';
import {connect} from 'react-redux';


class ShowMessage extends React.Component{

    componentDidMount(){
        console.log(this.props.match.params.id)
    }

    render(){
        
        return (
            <div>

            </div>
        );
    } 
};



export default ShowMessage;