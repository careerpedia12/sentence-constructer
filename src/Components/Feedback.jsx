import React from 'react';
import { useLocation } from 'react-router-dom';

const Feedback = () => {
    const location = useLocation();
    const { score, questions } = location.state;

    return (
        <div className='feedback'>
            <h1 className='text-2xl font-bold'>Your Score: {score} / {questions.length}</h1>
            {questions.map((question, index) => (
                <div key={index} className='mb-4'>
                    <p>{question.sentence}</p>
                    <p>
                        <strong>Your Anwer:</strong> {question.answers.join(', ')}
                    </p>
                    <p>
                        <strong>Correct Answer:</strong> {question.answers.join(', ')}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Feedback;