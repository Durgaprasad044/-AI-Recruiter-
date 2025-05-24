import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '1rem', marginBottom: '1rem' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/resume-screening">Resume Screening</Link></li>
        <li><Link to="/interview-agent">AI Interview Agent</Link></li>
        <li><Link to="/candidate-messaging">Candidate Messaging</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;