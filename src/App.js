import React, { Component } from 'react'
//import ReactDOM from 'react-dom';  ????
//import './assets/style.css';
import quizService from './quizService'
import QuestionBox from './components/QuestionBox'
import Result from './components/Result'

export class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  }
  getQuestions = () => {
    quizService().then(questions => {
      this.setState({
        questionBank: questions
      })
    })
  }

  componentDidMount(){
   this.getQuestions()
  }

  playAgain = () => {
    this.getQuestions()
    this.setState({
      score: 0,
      responses: 0,
    })
  }

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer){
      this.setState({
        score: this.state.score + 1
      })
    }
    this.setState({
      responses: this.state.responses < 5? this.state.responses + 1 : 5
    })
  }


  render() {
    const {questionBank} = this.state
    return (
      <div className='container'>
        <div className='title'>Random Quiz</div>
        {questionBank.length > 0 &&
          this.state.responses < 5 && questionBank.map(({question, answers, correct, questionId}) => (
          <QuestionBox question={question} 
          options={answers} 
          key={questionId} 
          selected={answer => this.computeAnswer(answer, correct)}
          //toggle={text => this.check()}
          />
        ))}

        {this.state.responses === 5 ? (<Result score={this.state.score} 
        playAgain={this.playAgain}/>) : null}
      </div>
    )
  }
}

export default App

