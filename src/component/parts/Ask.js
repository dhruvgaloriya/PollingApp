import React, {Component} from 'react';
import Display from './Display'


class Ask extends Component {

	state={
		choices:[],
		answer:undefined
	}

	componentWillMount(){
		this.setUpChoices();
	}

	componentWillReceiveProps(){
		this.setUpChoices();
	}

	setUpChoices = () => {
		let choices = Object.keys(this.props.question)
		choices.shift();
		this.setState({
			choices:choices,
			answer:sessionStorage.answer
		})
	}

	addChoiceButton = (choice,index) => {
		let buttonTypes = ['primary','success','warning','danger'];
		return(
			<button key={index} onClick = {() => this.select(choice)} className={"col-xs-12 col-sm-6 btn btn-" + buttonTypes[index]}>
				{choice}:{this.props.question[choice]}
			</button>
		)
	}

	select = (choice) => {
		this.setState({
			answer:choice,
		});
		sessionStorage.answer = choice;
		this.props.emit('answer',{
			question:this.props.question,
			choice:choice
		});
	};

	render() {
		return (
			<div id="currentQuestion">
				<Display if={this.state.answer}>
					<h3>You answered:{this.state.answer}</h3>
					<p>{this.props.question[this.state.answer]}</p>
				</Display>
				<Display if={!this.state.answer}>
					<h2>{this.props.question.q}</h2>
					<div className="row">
						{this.state.choices.map(this.addChoiceButton)}
					</div>
				</Display>
				
			</div>
		)
	}

}


export default Ask