import { useState, useRef, useEffect } from 'react';
import './SupportBot.css';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

function SupportBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      content: "Hello! I'm your HR Support Bot. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const generateBotResponse = (query) => {
    const faqResponses = {
      'vacation': 'Full-time employees receive 20 days of paid vacation per year. Vacation days accrue at a rate of 1.67 days per month and reset on January 1st each year. You can request vacation time through the HR portal with at least 2 weeks notice.',
      'sick leave': 'Employees are entitled to 10 days of paid sick leave per year. For absences longer than 3 consecutive days, a doctor\'s note may be required. Please notify your manager as soon as possible if you need to take sick leave.',
      'benefits': 'Our benefits package includes health, dental, and vision insurance, a 401(k) retirement plan with up to 4% company match, and a wellness program. New employees are eligible for benefits after 30 days of employment.',
      'remote work': 'Our hybrid work policy allows employees to work remotely up to 3 days per week, with in-office attendance required for team meetings and collaborative sessions. Remote work arrangements must be approved by your manager.',
      'parental leave': 'We offer 12 weeks of paid parental leave for primary caregivers and 4 weeks for secondary caregivers. This policy applies to births, adoptions, and foster placements. Please notify HR at least 30 days before your anticipated leave date.',
      'resignation': 'To resign from your position, please provide at least two weeks written notice to your manager and HR. You will have an exit interview scheduled, and HR will provide information about benefits continuation and final paycheck.',
      'performance review': 'Performance reviews are conducted annually in December. The process includes self-assessment, manager evaluation, and goal setting for the coming year. Salary adjustments related to performance are implemented in January.',
      'training': 'We offer a $1,500 annual professional development budget for each employee. You can use this for conferences, online courses, certifications, or books. Requests should be submitted through the HR portal for manager approval.',
      'referral': 'Our employee referral program offers a $2,000 bonus for successful referrals after the new hire completes 90 days of employment. Submit referrals through the HR portal with the candidate\'s resume and contact information.',
      'dress code': 'We maintain a business casual dress code. While we don\'t have strict requirements, employees should dress professionally, especially when meeting with clients or external partners. Fridays are designated as casual dress days.'
    };
    
    let response = "I'm not sure I understand your question. Could you please rephrase or ask about specific HR policies like vacation, sick leave, benefits, or remote work?";
    
    const lowerQuery = query.toLowerCase();
    
    // Check if the query contains any of the keywords
    for (const [keyword, answer] of Object.entries(faqResponses)) {
      if (lowerQuery.includes(keyword)) {
        response = answer;
        break;
      }
    }
    
    return {
      id: messages.length + 2,
      sender: 'bot',
      content: response,
      timestamp: new Date().toISOString()
    };
  };
  
  const suggestedQuestions = [
    "How many vacation days do employees get?",
    "What is the sick leave policy?",
    "Can you explain our benefits package?",
    "What is our remote work policy?",
    "How does parental leave work?",
    "What's the process for resigning from my position?",
    "When are performance reviews conducted?",
    "Are there professional development opportunities?",
    "How does the employee referral program work?",
    "What is the company dress code?"
  ];
  
  const handleSuggestedQuestion = (question) => {
    setInput(question);
    
    // Focus on the input field
    document.getElementById('chat-input').focus();
  };
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const faqCategories = [
    {
      name: 'Time Off & Leave',
      topics: ['Vacation', 'Sick Leave', 'Parental Leave', 'Bereavement', 'Holidays']
    },
    {
      name: 'Benefits & Compensation',
      topics: ['Health Insurance', 'Retirement', 'Bonuses', 'Salary Reviews', 'Wellness Program']
    },
    {
      name: 'Workplace Policies',
      topics: ['Remote Work', 'Dress Code', 'Code of Conduct', 'Security', 'Equipment']
    },
    {
      name: 'Career Development',
      topics: ['Training', 'Performance Reviews', 'Promotions', 'Mentorship', 'Certifications']
    }
  ];
  
  return (
    <div className="support-bot">
      <h1>Candidate Support Bot</h1>
      <p className="section-description">
        Get instant answers to common HR questions and policies.
      </p>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button 
          className={`tab ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ Database
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Bot Settings
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'chat' && (
          <div className="chat-container">
            <Card className="chat-card">
              <div className="chat-messages">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <div className="message-content">{message.content}</div>
                    <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot-message typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form className="chat-input-container" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  id="chat-input"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your question here..."
                  className="chat-input"
                />
                <Button type="submit" disabled={input.trim() === ''}>Send</Button>
              </form>
            </Card>
            
            <Card title="Suggested Questions" className="suggested-questions-card">
              <div className="suggested-questions">
                {suggestedQuestions.map((question, index) => (
                  <button 
                    key={index} 
                    className="suggested-question"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'faq' && (
          <Card title="FAQ Database">
            <div className="faq-database">
              <div className="faq-search">
                <input type="text" placeholder="Search FAQs..." />
                <Button variant="outline" size="small">Search</Button>
              </div>
              
              <div className="faq-categories">
                {faqCategories.map((category, index) => (
                  <div key={index} className="faq-category">
                    <h3 className="category-name">{category.name}</h3>
                    <div className="category-topics">
                      {category.topics.map((topic, topicIndex) => (
                        <button key={topicIndex} className="topic-button">
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="faq-actions">
                <Button variant="outline" icon="➕">Add New FAQ</Button>
                <Button variant="outline" icon="📤">Export FAQs</Button>
                <Button variant="outline" icon="📥">Import FAQs</Button>
              </div>
            </div>
          </Card>
        )}
        
        {activeTab === 'settings' && (
          <Card title="Bot Settings">
            <div className="bot-settings">
              <div className="settings-section">
                <h3>General Settings</h3>
                <div className="settings-group">
                  <div className="setting-item">
                    <label className="toggle-label">
                      <span className="setting-name">Enable Bot for All Users</span>
                      <div className="toggle-switch">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <label className="toggle-label">
                      <span className="setting-name">Allow File Attachments</span>
                      <div className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <label htmlFor="bot-name">Bot Name</label>
                    <input type="text" id="bot-name" value="HR Support Bot" />
                  </div>
                  
                  <div className="setting-item">
                    <label htmlFor="greeting-message">Greeting Message</label>
                    <textarea 
                      id="greeting-message" 
                      rows="3"
                      defaultValue="Hello! I'm your HR Support Bot. How can I help you today?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Response Settings</h3>
                <div className="settings-group">
                  <div className="setting-item">
                    <label htmlFor="response-time">Simulated Response Time (ms)</label>
                    <input type="number" id="response-time" value="1500" min="0" max="5000" />
                  </div>
                  
                  <div className="setting-item">
                    <label className="toggle-label">
                      <span className="setting-name">Show Typing Indicator</span>
                      <div className="toggle-switch">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <label htmlFor="fallback-message">Fallback Message</label>
                    <textarea 
                      id="fallback-message" 
                      rows="3"
                      defaultValue="I'm not sure I understand your question. Could you please rephrase or ask about specific HR policies?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Advanced Settings</h3>
                <div className="settings-group">
                  <div className="setting-item">
                    <label className="toggle-label">
                      <span className="setting-name">Enable Analytics</span>
                      <div className="toggle-switch">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <label className="toggle-label">
                      <span className="setting-name">Log Conversations</span>
                      <div className="toggle-switch">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <label htmlFor="retention-period">Conversation Retention (days)</label>
                    <input type="number" id="retention-period" value="30" min="1" max="365" />
                  </div>
                </div>
              </div>
              
              <div className="settings-actions">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Settings</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default SupportBot;