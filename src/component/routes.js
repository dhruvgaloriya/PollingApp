import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Audience from "./Audience";
import Speaker from "./Speaker";
import Board from "./Board";

export class Routes extends Component{
    render(){
        const {status,emit,member,audience,questions,currentQuestion,results} = this.props;
        return(
            <Switch>
                <Route path = "/audience" render={() => <Audience status={status}
                                                                  emit={emit}
                                                                  member={member}
                                                                  audience={audience}
                                                                  currentQuestion={currentQuestion}/>}/>
                <Route path="/speaker" render={() => <Speaker status={status}
                                                              emit={emit}
                                                              member={member}
                                                              audience={audience}
                                                              questions={questions}/>}/>
                <Route path="/board" render={() => <Board status={status}
                                                          emit={emit}
                                                          currentQuestion={currentQuestion}
                                                          results={results}/>}/>
            </Switch>
        )
    }
}


