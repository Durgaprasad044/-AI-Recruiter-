import { useState } from 'react';
import './ResumeScreening.css';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

function ResumeScreening() {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };
  
  const handleFileChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileArray]);
    }
  };
  
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const handleScreenResumes = () => {
    if (jobDescription.trim() === '' || files.length === 0) {
      alert('Please provide a job description and at least one resume');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const mockResults = [
        { 
          name: 'John Smith', 
          matchScore: 89, 
          skills: ['React', 'JavaScript', 'Node.js', 'TypeScript'],
          experience: '5 years',
          education: 'MS Computer Science',
          highlight: 'Led a team of 5 developers for an e-commerce platform'
        },
        { 
          name: 'Emma Johnson', 
          matchScore: 76, 
          skills: ['React', 'CSS', 'HTML', 'UI/UX'],
          experience: '3 years',
          education: 'BS Information Technology',
          highlight: 'Improved site performance by 40% through code optimization'
        },
        { 
          name: 'Michael Brown', 
          matchScore: 92, 
          skills: ['React', 'JavaScript', 'Redux', 'GraphQL'],
          experience: '7 years',
          education: 'BS Computer Engineering',
          highlight: 'Developed high-traffic applications serving millions of users'
        },
        { 
          name: 'Sarah Williams', 
          matchScore: 68, 
          skills: ['Angular', 'JavaScript', 'Node.js'],
          experience: '4 years',
          education: 'BS Computer Science',
          highlight: 'Implemented CI/CD pipelines reducing deployment time by 60%'
        },
      ];
      
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <div className="resume-screening">
      <h1>Resume Screening</h1>
      <p className="section-description">
        Upload resumes and job descriptions to automatically rank and match candidates.
      </p>
      
      <div className="resume-screening-container">
        <Card title="Job Description">
          <div className="job-description-form">
            <textarea 
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              placeholder="Paste your job description here..."
              className="job-description-input"
              rows={10}
            ></textarea>
            
            <h4>Upload Resumes</h4>
            <div className="file-upload-container">
              <div className="file-upload-area">
                <input 
                  type="file" 
                  id="resume-upload" 
                  className="file-input"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="resume-upload" className="file-upload-label">
                  <div className="upload-icon">📁</div>
                  <div className="upload-text">
                    <p className="upload-title">Drag & drop files here</p>
                    <p className="upload-subtitle">or click to browse files</p>
                  </div>
                </label>
              </div>
              
              {files.length > 0 && (
                <div className="file-list">
                  <h4>Selected Files</h4>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index} className="file-item">
                        <span className="file-name">{file.name}</span>
                        <button 
                          className="remove-file-btn"
                          onClick={() => removeFile(index)}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <Button 
                variant="outline"
                onClick={() => {
                  setJobDescription('');
                  setFiles([]);
                  setResults(null);
                }}
              >
                Clear Form
              </Button>
              <Button 
                onClick={handleScreenResumes}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Screen Resumes'}
              </Button>
            </div>
          </div>
        </Card>
        
        {results && (
          <Card title="Screening Results">
            <div className="screening-results">
              <div className="results-header">
                <h3>{results.length} Candidates Matched</h3>
                <div className="results-actions">
                  <Button variant="outline" size="small" icon="📊">Export Results</Button>
                  <Button variant="ghost" size="small" icon="📧">Email to Hiring Manager</Button>
                </div>
              </div>
              
              <div className="candidates-list">
                {results.map((candidate, index) => (
                  <div key={index} className="candidate-card">
                    <div className="candidate-score">
                      <div 
                        className={`score-circle ${
                          candidate.matchScore >= 85 ? 'high' : 
                          candidate.matchScore >= 70 ? 'medium' : 'low'
                        }`}
                      >
                        {candidate.matchScore}%
                      </div>
                      <span className="score-label">Match</span>
                    </div>
                    
                    <div className="candidate-info">
                      <h3 className="candidate-name">{candidate.name}</h3>
                      
                      <div className="candidate-details">
                        <div className="detail-item">
                          <span className="detail-label">Experience:</span>
                          <span className="detail-value">{candidate.experience}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Education:</span>
                          <span className="detail-value">{candidate.education}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Key Highlight:</span>
                          <span className="detail-value">{candidate.highlight}</span>
                        </div>
                      </div>
                      
                      <div className="candidate-skills">
                        {candidate.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="candidate-actions">
                      <Button variant="outline" size="small">View Profile</Button>
                      <Button size="small">Schedule Interview</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ResumeScreening;