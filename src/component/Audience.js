import React, {Component} from 'react';
import Join from "./parts/Join";
import Display from "./parts/Display";
import Ask from "./parts/Ask";



class Audience extends Component {
    render() {
        return (
            <div>
                <Display if={this.props.status === 'connected'}>
                    <Display if={this.props.member.name}>

                        <Display if={!this.props.currentQuestion}>
                            <h1>WelCome to {this.props.member.name}</h1>
                            <p>{this.props.audience.length} are user connected.</p>
                            <p>Your question will appear here</p>
                        </Display>

                        <Display if={this.props.currentQuestion}>
                            <Ask question={this.props.currentQuestion} emit={this.props.emit}/>
                        </Display>
                    </Display>
                    <Display if={!this.props.member.name}>
                        <h1>Join the Session</h1>
                        <Join emit={this.props.emit}/>
                    </Display>
                </Display>
            </div>
        );
    }
}

export default Audience;