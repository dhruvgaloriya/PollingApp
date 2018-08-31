import React, {Component} from 'react';
import Display from "./parts/Display";
import JoinSpeaker from "./parts/JoinSpeaker";
import Attendance from "./parts/Attendance";
import Question from "./parts/Question";

class Speaker extends Component {
    render() {
        return (
            <div>
                <Display if={this.props.status ==='connected'}>
                    <Display if={this.props.member.name && this.props.member.type === 'speaker'}>
                        <Question questions={this.props.questions} emit={this.props.emit}/>
                        <Attendance audience={this.props.audience}/>
                    </Display>

                    <Display if={!this.props.member.name}>
                        <h2>Start the presentation</h2>
                        <JoinSpeaker emit={this.props.emit}/>
                    </Display>
                </Display>
            </div>
        );
    }
}

export default Speaker;