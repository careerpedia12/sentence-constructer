import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Components/Feedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;