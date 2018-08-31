import React,{Component} from 'react';
import io from "socket.io-client";
import Header from './parts/Header';
import {Routes} from './routes'

class App extends Component{
    state = {
        status:'disconnected',
        title:'',
        member:{},
        audience:[],
        speaker:'',
        questions:[],
        currentQuestion:false,
        results:{}
    };

    componentWillMount() {
        this.socket = io('http://localhost:8080');
        this.socket.on('connect',this.connect);
        this.socket.on('disconnect',this.disconnected);
        this.socket.on('welcome',this.updateState);
        this.socket.on('joined',this.joined);
        this.socket.on('audience',this.updateAudience);
        this.socket.on('start',this.start);
        this.socket.on('end',this.updateState);
        this.socket.on('ask',this.ask);
        this.socket.on('results',this.updateResults);
    }
    connect = () => {
        let member = (sessionStorage.member)?JSON.parse(sessionStorage.member):null;

        if(member && member.type === 'audience'){
            this.emit('join',member)
        }else if(member && member.type === 'speaker'){
            this.emit('start',{name:member.name,title:sessionStorage.title})
        }

        this.setState({
            status:'connected'
        })
    };
    disconnected = () => {
        this.setState({
            status:'disconnected',
            title:'disconnected',
            speaker:''
        })
    };

    updateState = (serverState) => {
        this.setState(serverState)
    };

    emit = (eventName,payload) => {
        this.socket.emit(eventName,payload)
    };

    joined = (member) => {
        sessionStorage.member = JSON.stringify(member);
        this.setState({
            member:member
        })
    };

    start = (presentation) => {
        if(this.state.member.type === 'speaker'){
            sessionStorage.title = presentation.title;
        }
        this.setState(presentation)
    };

    ask = (question) =>{
        sessionStorage.answer = '';
        this.setState({
            currentQuestion:question,
            results:{a:0,b:0,c:0,d:0}
        })
    };

    updateAudience = (newAudience) => {
        this.setState({
            audience:newAudience
        })
    };

    updateResults = (data) => {
        this.setState({
            results:data
        })

    };

    render(){
        return(
            <div>
                <Header {...this.state}/>
                <Routes emit={this.emit} {...this.state}/>
            </div>
        )
    }

}

export default App;