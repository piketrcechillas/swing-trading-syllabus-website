import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';
import '../global/functions'


const equations = {
    1: ''
}


export default class Quiz extends Component {


    state = {
        questions: {
            1: 'What is the phenomenon when the 50-day SMA crosses above the 200-day SMA called?',
            2: 'What is the formula for calculating the EMA?',
            3: 'Select all correct statements. '
        },
        answers: {
            1: {
                1: 'a.  Death cross',
                2: 'b.  Death crossover',
                3: 'c.  Golden cross',
                4: 'd.  Golden crossover'
            },
            2: {
                1: 'a.    $$(A_1+A_2+⋯+A_n)/n$$, with $$A_n$$ being the price of an asset at period n, and n being the number of periods.',
                2: 'b.    $$(〖(A〗_n×W_1)+(A_(n-1)×W_2)+⋯+(A_1×W_n))/(∑W)$$, with $$A_n$$ being the price of an asset at period n, n being the most recent period, and W being the assigned weight for each period such that the most recent period has the highest weight.',
                3: 'c.    $$A_n×W+〖EMA〗_(n-1)×(1-W)$$, with $$A_n$$ being the price of an asset at period n, n being the current period, and W being the smoothing multiplier.'
            },
            3: {
                1: 'a.SMA puts more weight to more current data, whereas EMA weighs every data point equally.',
                2: 'b.EMA reacts to changes in market condition more quickly than SMA.',
                3: 'c.EMA is more prone to generating false signal than SMA.',
                4: 'd.SMA is more suitable for intraday trading than EMA. ',
                5: 'e.Both SMA and EMA works well in sideway markets. ',
                6: 'f.Both SMA and EMA are lagging indicators. '
            }
        },
        correctAnswers: {
            1: ['3'],
            2: ['3'],
            3: ['2', '3', '6']
        },
        correctAnswer: 0,
        clickedAnswer: [],
        step: 1,
        score: 0,
        answerState: 0
    }

    pushAnswer = answer => {

        if(this.state.clickedAnswer.includes(answer)) {

            let newState = this.state.clickedAnswer.remove(answer)

            this.setState({
               clickedAnswer: newState
            });
        }

        else {
            this.setState({
                clickedAnswer: [...this.state.clickedAnswer, answer]
            });
        }
    }

    checkList = answer => {

        if(this.state.clickedAnswer.includes(answer)) {
            return true;
        }
        else {
            return false;
        }
    }

    verifyAnswer = answer => {
        if(this.state.correctAnswers[this.state.step].includes(answer)) {
            return true;
        }
        else {
            return false;
        }
    }

    checkAnswer = answer => {

        const { correctAnswers, step, score, answerState } = this.state;

        let add = 1;
        let aResult = 1;

        console.log(answer[0])
        console.log(correctAnswers[step].includes(answer[0]))


        let length = answer.length;

        if(length === 0) {
            add = 0;
            aResult = -1;
        }
        else {
            for (let i = 0; i < length; i++) {
                if (!correctAnswers[step].includes(answer[i])) {
                    add = 0;
                    aResult = -1;
                    break;
                }
            }
        }

        this.setState({
            score: score + add,
            correctAnswer: correctAnswers[step],
            answerState: answerState + aResult,
        }, () =>  console.log(this.state.answerState));
    }

    nextStep = (step) => {
        this.setState({
            answerState: 0,
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: [],
        });
    }

    render(){
        let { questions, answers, correctAnswer, clickedAnswer, step, score, answerState } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(questions).length ?
                    (<>
                        <Question
                            question={questions[step]}
                        />
                        <Answer
                            answerState={answerState}
                            answer={answers[step]}
                            step={step}
                            pushAnswer={this.pushAnswer}
                            checkAnswer={this.checkAnswer}
                            checkList={this.checkList}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                            verifyAnswer={this.verifyAnswer}
                        />
                        <button
                            className="CheckAnswer"
                            onClick={() => this.checkAnswer(clickedAnswer)}> Check Result
                        </button>
                        <button
                        className="NextStep"
                        disabled={
                            answerState != 0 ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(questions).length}</p>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        );
    }
}