import { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

function InterviewAgent() {
  const [activeTab, setActiveTab] = useState('newInterview');
  const [position, setPosition] = useState('');
  const [interviewType, setInterviewType] = useState('technical');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interview, setInterview] = useState(null);
  
  const interviewTypes = [
    { id: 'technical', name: 'Technical Interview' },
    { id: 'behavioral', name: 'Behavioral Interview' },
    { id: 'culture', name: 'Cultural Fit Interview' },
    { id: 'case', name: 'Case Study Interview' }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !candidateName || !candidateEmail) {
      alert('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setInterview({
        id: Math.random().toString(36).substr(2, 9),
        position,
        type: interviewType,
        candidateName,
        candidateEmail,
        status: 'scheduled',
        questions: generateQuestions(interviewType, position),
        createdAt: new Date().toISOString()
      });
      
      setIsLoading(false);
      setActiveTab('activeInterview');
    }, 1500);
  };
  
  const generateQuestions = (type, jobTitle) => {
    const questions = {
      technical: [
        "Explain how you would design a scalable API for a high-traffic application.",
        "Describe your experience with React and component lifecycle methods.",
        "How would you optimize a slow-performing database query?",
        "What testing strategies do you typically implement in your projects?",
        "Explain your approach to handling asynchronous operations in JavaScript."
      ],
      behavioral: [
        "Describe a challenging project you worked on and how you overcame obstacles.",
        "Tell me about a time when you had to adapt to a significant change at work.",
        "How do you handle disagreements with team members?",
        "Describe a situation where you had to meet a tight deadline.",
        "Tell me about a time when you received constructive feedback."
      ],
      culture: [
        "What type of work environment brings out your best performance?",
        "How do you prefer to receive feedback?",
        "Describe your ideal team dynamic.",
        "What values are most important to you in a workplace?",
        "How do you contribute to a positive team culture?"
      ],
      case: [
        "How would you approach launching a new product in a competitive market?",
        "Describe how you would analyze a drop in user engagement.",
        "How would you improve our current product offering?",
        "What metrics would you track to measure the success of our platform?",
        "How would you prioritize features for our next release?"
      ]
    };
    
    return questions[type] || questions.technical;
  };
  
  const pastInterviews = [
    {
      id: '123abc',
      candidateName: 'James Wilson',
      position: 'Frontend Developer',
      date: '2024-10-10',
      status: 'completed',
      score: 85
    },
    {
      id: '456def',
      candidateName: 'Lisa Garcia',
      position: 'UX Designer',
      date: '2024-10-05',
      status: 'completed',
      score: 92
    },
    {
      id: '789ghi',
      candidateName: 'Robert Chen',
      position: 'Product Manager',
      date: '2024-09-28',
      status: 'completed',
      score: 78
    }
  ];
  
  return (
    <div className="interview-agent">
      <h1>Interview Agent</h1>
      <p className="section-description">
        Create and manage AI-powered interviews to assess candidates efficiently.
      </p>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'newInterview' ? 'active' : ''}`}
          onClick={() => setActiveTab('newInterview')}
        >
          New Interview
        </button>
        <button 
          className={`tab ${activeTab === 'activeInterview' ? 'active' : ''}`}
          onClick={() => setActiveTab('activeInterview')}
          disabled={!interview}
        >
          Active Interview
        </button>
        <button 
          className={`tab ${activeTab === 'pastInterviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('pastInterviews')}
        >
          Past Interviews
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'newInterview' && (
          <Card title="Create New Interview">
            <form className="interview-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="position">Position/Job Title</label>
                <input 
                  type="text" 
                  id="position" 
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Interview Type</label>
                <div className="interview-type-options">
                  {interviewTypes.map(type => (
                    <label key={type.id} className="radio-option">
                      <input 
                        type="radio" 
                        name="interviewType" 
                        value={type.id}
                        checked={interviewType === type.id}
                        onChange={() => setInterviewType(type.id)}
                      />
                      <span className="radio-label">{type.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="candidateName">Candidate Name</label>
                  <input 
                    type="text" 
                    id="candidateName" 
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="candidateEmail">Candidate Email</label>
                  <input 
                    type="email" 
                    id="candidateEmail" 
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setPosition('');
                    setInterviewType('technical');
                    setCandidateName('');
                    setCandidateEmail('');
                  }}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Interview'}
                </Button>
              </div>
            </form>
          </Card>
        )}
        
        {activeTab === 'activeInterview' && interview && (
          <Card 
            title={`Interview for ${interview.position}`}
            subtitle={`Candidate: ${interview.candidateName}`}
          >
            <div className="active-interview">
              <div className="interview-status">
                <div className="status-label">Status</div>
                <div className="status-value">
                  <span className="status-badge scheduled">Scheduled</span>
                </div>
              </div>
              
              <div className="interview-questions">
                <h3>Generated Interview Questions</h3>
                <p className="interview-instruction">
                  The AI will use these questions to conduct the interview. You can modify them if needed.
                </p>
                
                <div className="questions-list">
                  {interview.questions.map((question, index) => (
                    <div key={index} className="question-item">
                      <div className="question-number">{index + 1}</div>
                      <div className="question-text">{question}</div>
                      <button className="edit-question">✏️</button>
                    </div>
                  ))}
                  <button className="add-question">+ Add Question</button>
                </div>
              </div>
              
              <div className="interview-actions">
                <Button variant="outline" icon="✉️">Send Email to Candidate</Button>
                <Button variant="outline" icon="📋">Preview Interview</Button>
                <Button>Start Interview</Button>
              </div>
            </div>
          </Card>
        )}
        
        {activeTab === 'pastInterviews' && (
          <Card title="Past Interviews">
            <div className="past-interviews">
              <div className="interviews-header">
                <div className="interviews-filter">
                  <select className="filter-select">
                    <option value="all">All Positions</option>
                    <option value="frontend">Frontend Developer</option>
                    <option value="ux">UX Designer</option>
                    <option value="product">Product Manager</option>
                  </select>
                  
                  <select className="filter-select">
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Score</option>
                    <option value="lowest">Lowest Score</option>
                  </select>
                </div>
                
                <div className="interviews-search">
                  <input type="text" placeholder="Search candidates..." />
                </div>
              </div>
              
              <table className="interviews-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Position</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pastInterviews.map((interview) => (
                    <tr key={interview.id}>
                      <td>{interview.candidateName}</td>
                      <td>{interview.position}</td>
                      <td>{new Date(interview.date).toLocaleDateString()}</td>
                      <td>
                        <div className={`score-indicator ${
                          interview.score >= 85 ? 'high' : 
                          interview.score >= 70 ? 'medium' : 'low'
                        }`}>
                          {interview.score}%
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="icon-button" title="View Report">📊</button>
                          <button className="icon-button" title="Download Transcript">📝</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default InterviewAgent;