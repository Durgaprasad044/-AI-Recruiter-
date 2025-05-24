import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ResumeScreening from './pages/ResumeScreening';
import InterviewAgent from './pages/InterviewAgent';
import CandidateMessaging from './pages/CandidateMessaging';
import './App.css'; // Keep or modify as needed

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '1rem' }}> {/* Added padding for content area */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume-screening" element={<ResumeScreening />} />
          <Route path="/interview-agent" element={<InterviewAgent />} />
          <Route path="/candidate-messaging" element={<CandidateMessaging />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
