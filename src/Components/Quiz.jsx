import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [timer, setTimer] = useState(30);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/questions')
        .then((res) => res.json())
        .then((data) => setQuestions(data));
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
        else{
            handleNext();
        }
    }, [timer]);

    const handleOptionClick = (index, option) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[index] = option;
        setSelectedAnswers(updatedAnswers);
    };

    const handleNext = () => {
        const currentQuestion = questions[currentIndex];
        const correctAnswers = currentQuestion.answers;
        const isCorrect = selectedAnswers.every((answer, i) => answer === correctAnswers[i]);

        if (isCorrect) setScore(score + 1);

        if (currentIndex < questions.length - 1) {
            setSelectedAnswers([]);
            setTimer(30);
            setCurrentIndex(currentIndex + 1);
        }
        else{
            navigate('/feedback', { state: { score, questions } });
        }
    };

    if (questions.length === 0) return <p>Loding...</p>;

    const currentQuestion = questions[currentIndex];

    return (
        <div className='quiz'>
            <h1 className='text-xl font-bold'>{currentQuestion.sentence}</h1>
            <div className='blanks'>
                {currentQuestion.blanks.map((blank, index) => (
                    <span key={index} className='blank'>
                        {selectedAnswers[index] || '___'}
                    </span>
                ))}
            </div>
            <div className='options flex gap-4'>
                {currentQuestion.options.map((option, index) => (
                    <button
                    key={index}
                    onClick={() => handleOptionClick(index, option)}
                    className='px-4 py-2 bg-blue-500 text-white rounded'
                >
                    {option}
                </button>
                ))}
            </div>
            <div className='controls'>
                <p className='text-sm'>Time remaining: {timer}s</p>
                <button
                onClick={handleNext}
                className='mt-4 px-4 py-2 bg-green-500 text-white rounded'
                disabled={selectedAnswers.includes(undefined)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Quiz;