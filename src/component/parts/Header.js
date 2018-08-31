import React,{Component} from 'react'

import {Link} from 'react-router-dom'
class Header extends Component{
    static defaultProps(){
        return{
            status:'disconnected'
        }
    }

    render(){
        return(
            <div>
            <header className="row">
                <div className="col-xs-10">
                    <h1>{this.props.title}</h1>
                    <h4>{this.props.speaker}</h4>
                </div>
                <div className="col-xs-2">
                    <span id="connection-status" className={this.props.status}></span>
                </div>
            </header>
                <Link to="/board">Board</Link> |
                <Link to="/audience">Audience</Link> |
                <Link to="/speaker"> Speaker</Link>
            </div>
        )
    }
}

export default Header
