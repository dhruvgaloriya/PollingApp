import express from 'express'
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
//import io from 'socket.io'
import _ from 'underscore';
import questions from './app-question'

const app = express();

let connection = [];
let audience= [];
let speaker={};
let title = 'Untitled Presentation';
let currentQuestion = false;

let results = {
	a:0,
	b:0,
	c:0,
	d:0
};

app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

app.get('/',(req,res) => {
	res.render('index',{
		content:'..'
	});
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

const server = app.listen(8080);
const io = require('socket.io').listen(server);


io.sockets.on('connection',function (socket) {
	socket.once('disconnect',function () {

		const member = _.findWhere(audience,{id:this.id});

		if(member){
			audience.splice(audience.indexOf(member),1);
			io.sockets.emit('audience',audience);
			console.log("Left:%s(%s audience member)",member.name,audience.length);
		}else if(this.id === speaker.id){
			console.log("%s has Left.%s is over",speaker.name,title);
			speaker={};
			title="Untitled Presentation";
			io.sockets.emit('end',speaker.name,title)
		}
		connection.splice(connection.indexOf(socket),1);
		socket.disconnect();
		console.log("The number of socket remaining is %s",connection.length);
    });

	socket.on('join',function(payload) {
		const newMember = {
			id:this.id,
			name:payload.name,
			type:'audience'
		};
		this.emit('joined',newMember);
		audience.push(newMember);
		io.sockets.emit('audience',audience);
		console.log(`Audience Joined ${payload.name}`)
    });

	socket.on('start',function (payload) {
		speaker.name=payload.name;
		speaker.id=this.id;
		speaker.type='speaker';
		title=payload.title;
		this.emit('joined',speaker);
		io.sockets.emit('start',{title:title,speaker:speaker.name});
		console.log(`Presentation started ${title} by ${speaker.name}`);
    });
	
	socket.on('ask',function (question) {
		currentQuestion = question;
		results={a:0,b:0,c:0,d:0};
		io.sockets.emit('ask',currentQuestion);
		console.log(`Question asked ${question.q}`)
    });

    socket.on('answer',function (payload) {
    	results[payload.choice]++;
    	io.sockets.emit('results',results);
    	console.log(`Answer is ${payload.choice} and result is %j`,results)

    });

	socket.emit('welcome',{
		title:title,
		audience:audience,
		speaker:speaker.name,
		questions:questions,
		currentQuestion:currentQuestion,
		results:results
	});

	connection.push(socket);
	console.log("The number of socket connected is %s",connection.length);
});
console.log('Running server on port localhost:8080');