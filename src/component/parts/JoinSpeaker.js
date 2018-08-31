import React, {Component} from 'react';

class JoinSpeaker extends Component {
    start = (e) =>{
        e.preventDefault();
        const speakerName = this.refs.name.value;
        const title = this.refs.title.value;
        this.props.emit('start',{name:speakerName,title:title})
    };
    render(){
        return(
            <form onSubmit={this.start}>
                <label>FullName</label>
                <input ref="name" className="form-control" placeholder="Enter your name" required/>

                <label>Title</label>
                <input ref="title" className="form-control" placeholder="Enter title for presentation" required/>
                <button className ="btn btn-primary">Join</button>
            </form>
        )
    }
}
export default JoinSpeaker;