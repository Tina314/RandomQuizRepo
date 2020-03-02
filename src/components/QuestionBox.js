import React, {useState} from 'react'

const QuestionBox = ({question, options, selected}) => {

    const [answer, setAnswer] = useState(options)
    let x = 0
    console.log(question)
    return (
        
        <div className='questionBox'>
            <div className='question'>
                {question}
                <br/>
                {answer.map((text, index) => (
                    <button key={x++} className='answerBtn' onClick={() => {
                        
                        setAnswer([text])
                        selected(text)
                    }}>{text}</button>
                ))}
            </div>
        </div>
    )
}

export default QuestionBox