import React, { useState } from 'react';
import axios from 'axios';

function CandidateMessaging() {
  const [candidateId, setCandidateId] = useState('');
  const [messageType, setMessageType] = useState('invite'); // 'invite', 'rejection', 'feedback'
  const [customContent, setCustomContent] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setApiResponse(null);

    if (!candidateId || !messageType) {
      setError('Please provide Candidate ID and select a Message Type.');
      return;
    }

    try {
      // Replace with your backend API endpoint
      const response = await axios.post('http://localhost:5000/api/send_message', {
        candidateId,
        messageType,
        customContent,
      });
      setApiResponse(response.data);
    } catch (err) {
      setError('Failed to send message. Please try again. Error: ' + (err.response?.data?.error || err.message));
      console.error("Messaging error:", err);
    }
  };

  return (
    <div>
      <h1>Smart Candidate Messaging</h1>
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
          <label htmlFor="messageType">Message Type:</label><br />
          <select
            id="messageType"
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            required
          >
            <option value="invite">Interview Invite</option>
            <option value="rejection">Rejection</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="customContent">Custom Content (Optional):</label><br />
          <textarea
            id="customContent"
            value={customContent}
            onChange={(e) => setCustomContent(e.target.value)}
            rows="5"
            cols="50"
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Send Message</button>
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

export default CandidateMessaging;