// MessagePreview.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function MessagePreview() {
  const [candidateName, setCandidateName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState('invite');
  const [email, setEmail] = useState('');

  const handleGenerate = async () => {
    const res = await axios.post('http://localhost:8000/message/email', {
      candidate_name: candidateName,
      status,
      job_title: jobTitle,
    });
    setEmail(res.data.email);
  };

  return (
    <div className="section">
      <input className="input" placeholder="Candidate Name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
      <input className="input" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="invite">Invite</option>
        <option value="reject">Reject</option>
      </select>
      <button className="button red" onClick={handleGenerate}>Generate Email</button>
      <pre className="output">{email}</pre>
    </div>
  );
}