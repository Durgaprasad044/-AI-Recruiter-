import { useState } from 'react';
import './CandidateMessaging.css';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

function CandidateMessaging() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizedMessage, setCustomizedMessage] = useState('');
  
  const templates = [
    {
      id: 1,
      name: 'Interview Invitation',
      subject: 'Invitation to Interview with [Company Name]',
      content: `Dear [Candidate Name],

We were impressed by your application for the [Position] role at [Company Name] and would like to invite you for an interview.

The interview will be conducted [interview format: video call/in person] and will take approximately [duration] minutes. During this time, we will discuss your experience, skills, and how you might contribute to our team.

Please let us know your availability for the following time slots:
- [Date Option 1] at [Time Option 1]
- [Date Option 2] at [Time Option 2]
- [Date Option 3] at [Time Option 3]

We look forward to speaking with you and learning more about your background.

Best regards,
[Your Name]
[Your Position]
[Company Name]`,
      tags: ['interview', 'invitation']
    },
    {
      id: 2,
      name: 'Application Acknowledgement',
      subject: 'Thank You for Applying to [Company Name]',
      content: `Dear [Candidate Name],

Thank you for applying for the [Position] position at [Company Name]. We appreciate your interest in joining our team.

We are currently reviewing all applications and will be in touch if your qualifications match our requirements for this role. Due to the high volume of applications we receive, we may not be able to respond to each applicant individually.

In the meantime, we encourage you to learn more about our company and culture by visiting our website and social media channels.

Thank you again for your interest in [Company Name].

Best regards,
The Recruitment Team
[Company Name]`,
      tags: ['acknowledgement', 'application']
    },
    {
      id: 3,
      name: 'Rejection - After Interview',
      subject: 'Update on Your Application with [Company Name]',
      content: `Dear [Candidate Name],

Thank you for taking the time to interview for the [Position] position at [Company Name]. We appreciate your interest in our company and the effort you put into the interview process.

After careful consideration, we have decided to move forward with another candidate whose qualifications better align with our current needs. This decision was not easy, as we were impressed with many aspects of your background and experience.

We would like to thank you for your time and interest in [Company Name]. We encourage you to apply for future positions that match your skills and experience.

We wish you the best in your job search and future career endeavors.

Best regards,
[Your Name]
[Your Position]
[Company Name]`,
      tags: ['rejection', 'post-interview']
    },
    {
      id: 4,
      name: 'Job Offer',
      subject: 'Job Offer: [Position] at [Company Name]',
      content: `Dear [Candidate Name],

We are delighted to offer you the position of [Position] at [Company Name]. Your experience and skills impressed our team, and we believe you would be a valuable addition to our organization.

The details of the offer are as follows:

- Position: [Position Title]
- Department: [Department]
- Reporting to: [Manager Name], [Manager Title]
- Start date: [Start Date]
- Salary: [Salary]
- Benefits: [Brief overview of benefits]

Attached, you will find a comprehensive offer letter with more details about the position, benefits, and company policies.

To accept this offer, please sign the attached offer letter and return it to us by [Response Deadline].

If you have any questions or would like to discuss any aspect of this offer, please don't hesitate to contact me at [Your Email] or [Your Phone Number].

We are excited about the possibility of you joining our team and look forward to your response.

Best regards,
[Your Name]
[Your Position]
[Company Name]`,
      tags: ['offer', 'acceptance']
    }
  ];
  
  const sentMessages = [
    {
      id: 1,
      recipient: 'John Smith',
      email: 'john.smith@example.com',
      subject: 'Invitation to Interview with Acme Inc',
      sent: '2024-10-15T14:30:00',
      status: 'Delivered',
      opened: true
    },
    {
      id: 2,
      recipient: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      subject: 'Thank You for Applying to Acme Inc',
      sent: '2024-10-12T09:15:00',
      status: 'Delivered',
      opened: true
    },
    {
      id: 3,
      recipient: 'Michael Brown',
      email: 'michael.brown@example.com',
      subject: 'Update on Your Application with Acme Inc',
      sent: '2024-10-10T16:45:00',
      status: 'Delivered',
      opened: false
    }
  ];
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomizedMessage(template.content);
  };
  
  const handleMessageChange = (e) => {
    setCustomizedMessage(e.target.value);
  };

  const insertVariable = (variable) => {
    setCustomizedMessage(prevMessage => prevMessage + variable);
  };
  
  return (
    <div className="candidate-messaging">
      <h1>Candidate Messaging</h1>
      <p className="section-description">
        Create and send personalized messages to candidates at every stage of the recruitment process.
      </p>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          Message Templates
        </button>
        <button 
          className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          Sent Messages
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Message Analytics
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'templates' && (
          <div className="templates-container">
            <Card title="Message Templates" className="templates-card">
              <div className="templates-header">
                <div className="templates-search">
                  <input type="text" placeholder="Search templates..." />
                </div>
                <Button size="small" icon="➕">New Template</Button>
              </div>
              
              <div className="templates-grid">
                {templates.map(template => (
                  <div 
                    key={template.id} 
                    className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <h3 className="template-name">{template.name}</h3>
                    <p className="template-subject">{template.subject}</p>
                    <div className="template-preview">
                      {template.content.substring(0, 100)}...
                    </div>
                    <div className="template-tags">
                      {template.tags.map((tag, index) => (
                        <span key={index} className="template-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {selectedTemplate && (
              <Card 
                title="Customize Message" 
                subtitle="Edit the template to personalize it for your candidate"
                className="message-editor-card"
              >
                <div className="message-editor">
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      value={selectedTemplate.subject}
                      readOnly
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message Content</label>
                    <textarea 
                      id="message" 
                      value={customizedMessage}
                      onChange={handleMessageChange}
                      rows={15}
                    ></textarea>
                  </div>
                  
                  <div className="template-variables">
                    <h4>Available Variables</h4>
                    <p>Click to insert:</p>
                    <div className="variables-list">
                      <button className="variable-button" onClick={() => insertVariable('[Candidate Name]')}>[Candidate Name]</button>
                      <button className="variable-button" onClick={() => insertVariable('[Position]')}>[Position]</button>
                      <button className="variable-button" onClick={() => insertVariable('[Company Name]')}>[Company Name]</button>
                      <button className="variable-button" onClick={() => insertVariable('[Your Name]')}>[Your Name]</button>
                      <button className="variable-button" onClick={() => insertVariable('[Your Position]')}>[Your Position]</button>
                      <button className="variable-button" onClick={() => insertVariable('[Date]')}>[Date]</button>
                      <button className="variable-button" onClick={() => insertVariable('[Time]')}>[Time]</button>
                    </div>
                  </div>
                  
                  <div className="message-actions">
                    <Button variant="outline" onClick={() => alert('Preview functionality is not implemented yet.')}>Preview</Button>
                    <Button variant="outline" onClick={() => alert('Save as Template functionality is not implemented yet.')}>Save as Template</Button>
                    <Button onClick={() => alert('Send Message functionality is not implemented yet.')}>Send Message</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
        
        {activeTab === 'sent' && (
          <Card title="Sent Messages">
            <div className="sent-messages">
              <div className="messages-header">
                <div className="messages-filter">
                  <select>
                    <option value="all">All Messages</option>
                    <option value="opened">Opened</option>
                    <option value="unopened">Unopened</option>
                  </select>
                  
                  <select>
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                
                <div className="messages-search">
                  <input type="text" placeholder="Search messages..." />
                </div>
              </div>
              
              <table className="messages-table">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Subject</th>
                    <th>Sent</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sentMessages.map(message => (
                    <tr key={message.id}>
                      <td>
                        <div className="recipient-info">
                          <div className="recipient-name">{message.recipient}</div>
                          <div className="recipient-email">{message.email}</div>
                        </div>
                      </td>
                      <td>{message.subject}</td>
                      <td>{new Date(message.sent).toLocaleDateString()}</td>
                      <td>
                        <div className="message-status">
                          <span className="status-indicator"></span>
                          <span className="status-text">
                            {message.status}
                            {message.opened ? ' (Opened)' : ''}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="icon-button" title="View Message">👁️</button>
                          <button className="icon-button" title="Resend">🔄</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        
        {activeTab === 'analytics' && (
          <Card title="Message Analytics">
            <div className="analytics-container">
              <div className="analytics-summary">
                <div className="analytics-card">
                  <div className="analytics-value">87%</div>
                  <div className="analytics-label">Open Rate</div>
                </div>
                
                <div className="analytics-card">
                  <div className="analytics-value">62%</div>
                  <div className="analytics-label">Response Rate</div>
                </div>
                
                <div className="analytics-card">
                  <div className="analytics-value">1.8h</div>
                  <div className="analytics-label">Avg. Response Time</div>
                </div>
                
                <div className="analytics-card">
                  <div className="analytics-value">142</div>
                  <div className="analytics-label">Messages Sent</div>
                </div>
              </div>
              
              <div className="analytics-charts">
                <div className="chart-container">
                  <h3>Message Performance by Type</h3>
                  <div className="bar-chart">
                    <div className="chart-bar-container">
                      <div className="chart-label">Interview Invitation</div>
                      <div className="chart-bar-wrapper">
                        <div className="chart-bar" style={{ width: '94%' }}>94%</div>
                      </div>
                    </div>
                    <div className="chart-bar-container">
                      <div className="chart-label">Application Acknowledgement</div>
                      <div className="chart-bar-wrapper">
                        <div className="chart-bar" style={{ width: '87%' }}>87%</div>
                      </div>
                    </div>
                    <div className="chart-bar-container">
                      <div className="chart-label">Rejection</div>
                      <div className="chart-bar-wrapper">
                        <div className="chart-bar" style={{ width: '76%' }}>76%</div>
                      </div>
                    </div>
                    <div className="chart-bar-container">
                      <div className="chart-label">Job Offer</div>
                      <div className="chart-bar-wrapper">
                        <div className="chart-bar" style={{ width: '98%' }}>98%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="chart-container">
                  <h3>Response Time Distribution</h3>
                  <div className="donut-chart">
                    <div className="donut-segment" style={{ '--offset': '0', '--value': '40', '--bg': 'var(--primary-500)' }}></div>
                    <div className="donut-segment" style={{ '--offset': '40', '--value': '25', '--bg': 'var(--secondary-500)' }}></div>
                    <div className="donut-segment" style={{ '--offset': '65', '--value': '20', '--bg': 'var(--accent-500)' }}></div>
                    <div className="donut-segment" style={{ '--offset': '85', '--value': '15', '--bg': 'var(--neutral-400)' }}></div>
                    <div className="donut-hole">62%</div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: 'var(--primary-500)' }}></div>
                      <span>Within 1 hour (40%)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: 'var(--secondary-500)' }}></div>
                      <span>1-3 hours (25%)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: 'var(--accent-500)' }}></div>
                      <span>3-24 hours (20%)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: 'var(--neutral-400)' }}></div>
                      <span>24+ hours (15%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CandidateMessaging;