import React from 'react';
import './Answer.css';
import MathJax from 'react-mathjax2'

const Answer = (props) => {

    console.log('AnswerState:' + props.answerState)
    let answers = Object.keys(props.answer)
        .map((qAnswer, i) => (
            <li
            className=

            {
                props.answerState == 0 ?
                   props.checkList(qAnswer) ?
                        'check' : '' :
                        props.checkList(qAnswer) ?
                            props.verifyAnswer(qAnswer) ?
                            'correct' : 'incorrect'
                            : ''
            }


            onClick={() => props.pushAnswer(qAnswer)}
            key={qAnswer}>


                <MathJax.Context
                    input='ascii'
                    onLoad={ () => console.log("Loaded MathJax script!") }
                    onError={ (MathJax, error) => {
                        console.warn(error);
                        console.log("Encountered a MathJax error, re-attempting a typeset!");
                        MathJax.Hub.Queue(
                            MathJax.Hub.Typeset()
                        );
                    } }
                    script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                    options={ {
                        asciimath2jax: {
                            useMathMLspacing: true,
                            delimiters: [["$$","$$"]],
                            preview: "none",
                        }
                    } }
                >
                    <MathJax.Text text={props.answer[qAnswer]}/>
                </MathJax.Context>
            </li>
        ));

        return (
            <>
                <ul
                    disabled={props.answerState != 0 ? true : false}
                    className="Answers">
                    {answers}
                </ul>
                <div>
                    {
                        props.answerState == 1 ?
                        'Correct Answer!' : 
                        props.answerState == -1 ? 'Incorrect Answer!' : ''
                    }
                </div>
            </>
        );
}

export default Answer;