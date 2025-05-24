// InterviewPanel.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function InterviewPanel() {
  const [questions, setQuestions] = useState([]);

  const handleGenerate = async () => {
    const res = await axios.post('http://localhost:8000/interview/questions');
    setQuestions(res.data.questions);
  };

  return (
    <div className="section">
      <button className="button yellow" onClick={handleGenerate}>Generate Interview Questions</button>
      <ol className="list">
        {questions.map((q, idx) => (
          <li key={idx}>{q}</li>
        ))}
      </ol>
    </div>
  );
}