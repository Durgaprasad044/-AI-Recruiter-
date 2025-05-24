// RankedList.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function RankedList() {
  const [candidates, setCandidates] = useState([]);

  const fetchRanked = async () => {
    const res = await axios.get('http://localhost:8000/screen/ranked');
    setCandidates(res.data.ranked_candidates);
  };

  return (
    <div className="section">
      <button className="button purple" onClick={fetchRanked}>Get Ranked Candidates</button>
      <ul className="list">
        {candidates.map((c, idx) => (
          <li key={idx}>{c.name} - Score: {c.score}</li>
        ))}
      </ul>
    </div>
  );
}
