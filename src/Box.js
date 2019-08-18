import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './Box.css';


class Box extends Component {
    
    static propTypes = {
        showing: PropTypes.bool.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }
    
    render(){
        
        let backgroundColor = this.props.showing ? {backgroundColor: this.props.backgroundColor} : {backgroundColor: 'grey'};
        return(
            <div style={backgroundColor} className="box" onClick={this.props.onClick}></div>
        )
    }
}

export default Box;