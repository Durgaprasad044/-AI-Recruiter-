import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './features/Dashboard/Dashboard';
import ResumeScreening from './features/ResumeScreening/ResumeScreening';
import InterviewAgent from './features/InterviewAgent/InterviewAgent';
import CandidateMessaging from './features/CandidateMessaging/CandidateMessaging';
import SupportBot from './features/SupportBot/SupportBot';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  // Map of page components
  const pages = {
    dashboard: <Dashboard />,
    resumeScreening: <ResumeScreening />,
    interviewAgent: <InterviewAgent />,
    candidateMessaging: <CandidateMessaging />,
    supportBot: <SupportBot />
  };

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-content">
        <Header activePage={activePage} />
        <main className="content-area">
          {pages[activePage]}
        </main>
      </div>
    </div>
  );
}

export default App;