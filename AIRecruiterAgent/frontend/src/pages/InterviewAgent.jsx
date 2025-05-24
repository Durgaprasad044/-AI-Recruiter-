import React, { useState } from 'react';
import axios from 'axios';

function InterviewAgent() {
  const [candidateId, setCandidateId] = useState('');
  const [interviewTranscript, setInterviewTranscript] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setApiResponse(null);

    if (!candidateId || !interviewTranscript) {
      setError('Please provide Candidate ID and Interview Transcript.');
      return;
    }

    try {
      // Replace with your backend API endpoint
      const response = await axios.post('http://localhost:5000/api/interview', {
        candidateId,
        responses: interviewTranscript.split('\\n'), // Assuming transcript is line-separated
      });
      setApiResponse(response.data);
    } catch (err) {
      setError('Failed to process interview data. Please try again. Error: ' + (err.response?.data?.error || err.message));
      console.error("Interview agent error:", err);
    }
  };

  return (
    <div>
      <h1>AI-Powered Interview Agent</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="candidateId">Candidate ID:</label><br />
          <input
            type="text"
            id="candidateId"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="interviewTranscript">Interview Transcript/Responses (one per line):</label><br />
          <textarea
            id="interviewTranscript"
            value={interviewTranscript}
            onChange={(e) => setInterviewTranscript(e.target.value)}
            rows="10"
            cols="50"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Process Interview</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {apiResponse && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default InterviewAgent;