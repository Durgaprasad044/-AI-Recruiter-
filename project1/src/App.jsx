import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ResumeScreening from './pages/ResumeScreening';
import InterviewAgent from './pages/InterviewAgent';
import CandidateMessaging from './pages/CandidateMessaging';
import SupportBot from './pages/SupportBot';
import CodingEvaluator from './pages/CodingEvaluator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resume-screening" element={<ResumeScreening />} />
            <Route path="/interview-agent" element={<InterviewAgent />} />
            <Route path="/candidate-messaging" element={<CandidateMessaging />} />
            <Route path="/support-bot" element={<SupportBot />} />
            <Route path="/coding-evaluator" element={<CodingEvaluator />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600">© 2025 AI Recruiter Agent. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Explore More</span>
                <MoveRight className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;