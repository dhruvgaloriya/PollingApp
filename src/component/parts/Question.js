import React, {Component} from 'react';

class Question extends Component {
    ask = (question) => {
        this.props.emit('ask',question)
    };
    addQuestion = (question,index) => {
        return(
            <div key={index} className="col-xs-12 col-sm-6 col-md-3">
                <span onClick={() => this.ask(question)}>{question.q}</span>
            </div>
        )

    };
    render() {
        return (
            <div id="questions" className="row">
                <h2>Question</h2>
                {this.props.questions.map(this.addQuestion)}
            </div>

        );
    }
}


export default Question;