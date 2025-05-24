// App.jsx
import UploadJD from './components/UploadResumeForm';
import RankedList from './components/RankedList';
import InterviewPanel from './components/InterviewPanel';
import MessagePreview from './components/MessagePreview';
import './App.css';

export default function App() {
  return (
    <div className="container">
      <h1 className="title">AI Recruiter Agent</h1>
      <UploadJD />
      <RankedList />
      <InterviewPanel />
      <MessagePreview />
    </div>
  );
}