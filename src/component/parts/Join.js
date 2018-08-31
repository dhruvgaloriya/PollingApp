import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Join extends Component {
    join = (e) =>{
        e.preventDefault();
        const name = this.refs.name.value;
        this.props.emit('join',{name:name})
    };
    render(){
        return(
            <form onSubmit={this.join}>
                <label>FullName</label>
                <input ref="name" className="form-control" placeholder="Enter your name" required/>
                <button className ="btn btn-primary">Join</button>
                <Link to="/speaker">Join as Speaker</Link>
                <Link to="/board">Go to the board</Link>
            </form>
        )
    }
}

export default Join;