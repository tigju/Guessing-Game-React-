import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './Navbar.css'

class Navbar extends Component {
    static propsTypes = {
       onNewGame: PropTypes.func.isRequired
    } 
    render() {
        const {onNewGame} = this.props;
        return (
            <div className="nav-bar">
                <h1 className="header-name">Guessing Game</h1>
                <li onClick={onNewGame}><h2 className="new-game">New Game</h2></li>
            </div>
        )
    }
}

export default Navbar