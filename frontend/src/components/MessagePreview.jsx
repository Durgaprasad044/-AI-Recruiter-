import React, { useState } from 'react';
import { Mail, Send, User, Calendar, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

const CandidateMessaging = ({ candidates = [] }) => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [messageType, setMessageType] = useState('interview_invite');
  const [customMessage, setCustomMessage] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sentMessages, setSentMessages] = useState([]);

  const messageTypes = [
    { value: 'interview_invite', label: 'Interview Invitation', icon: Calendar, color: 'blue' },
    { value: 'rejection', label: 'Application Rejection', icon: XCircle, color: 'red' },
    { value: 'feedback', label: 'Interview Feedback', icon: MessageSquare, color: 'green' },
    { value: 'offer', label: 'Job Offer', icon: CheckCircle, color: 'green' },
    { value: 'follow_up', label: 'Follow-up Message', icon: Mail, color: 'gray' }
  ];

  const mockCandidates = candidates.length > 0 ? candidates : [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', status: 'screened' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@email.com', status: 'interviewed' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', status: 'rejected' }
  ];

  const generateMessage = async () => {
    if (!selectedCandidate || !messageType) {
      alert('Please select a candidate and message type');
      return;
    }

    setIsGenerating(true);

    const candidate = mockCandidates.find(c => c.id.toString() === selectedCandidate);
    
    // Mock AI message generation
    setTimeout(() => {
      const templates = {
        interview_invite: `Dear ${candidate.name},

Thank you for your interest in the Software Developer position at our company. We were impressed with your application and would like to invite you to the next stage of our hiring process.

Interview Details:
• Position: Senior Software Developer
• Format: Technical Interview (60 minutes)
• Available slots: 
  - Monday, May 27th at 2:00 PM
  - Tuesday, May 28th at 10:00 AM
  - Wednesday, May 29th at 3:00 PM

The interview will cover technical problem-solving, system design, and your experience with React, Node.js, and cloud technologies. Please come prepared to discuss your previous projects and walk through your problem-solving approach.

Please reply with your preferred time slot by Friday, May 24th. If none of these times work for you, let us know your availability and we'll do our best to accommodate.

We look forward to speaking with you!

Best regards,
The Hiring Team`,

        rejection: `Dear ${candidate.name},

Thank you for taking the time to apply for the Software Developer position and for participating in our interview process. We appreciate the effort you put into your application and interview.

After careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs. This was a difficult decision as we were impressed with your background and enthusiasm.

We encourage you to apply for future opportunities that match your skills and interests. We'll keep your resume on file and reach out if a suitable position becomes available.

Thank you again for your interest in our company. We wish you the best of luck in your job search.

Best regards,
The Hiring Team`,

        feedback: `Dear ${candidate.name},

Thank you for interviewing for the Software Developer position. We wanted to provide you with feedback from your recent interview.

Strengths observed:
• Strong technical problem-solving skills
• Good communication and ability to explain complex concepts
• Relevant experience with our tech stack
• Positive attitude and team-oriented mindset

Areas for continued growth:
• Consider gaining more experience with system design at scale
• Leadership opportunities could strengthen your profile

We were impressed with your skills and believe you have strong potential. While we've decided to move forward with another candidate for this specific role, we'd encourage you to apply for future positions that match your evolving skillset.

Thank you for your time and interest in our company.

Best regards,
The Hiring Team`,

        offer: `Dear ${candidate.name},

Congratulations! We are pleased to extend an offer for the Software Developer position at our company.

Offer Details:
• Position: Senior Software Developer
• Start Date: June 10, 2025
• Salary: $95,000 annually
• Benefits: Health insurance, 401k matching, 20 days PTO
• Location: Hybrid (3 days in office, 2 days remote)

We were impressed by your technical skills, problem-solving abilities, and cultural fit with our team. We believe you'll make a valuable contribution to our engineering organization.

Please review the attached formal offer letter for complete details. We'd like to have your response by Friday, May 31st. If you have any questions or would like to discuss any aspects of the offer, please don't hesitate to reach out.

We're excited about the possibility of you joining our team!

Best regards,
The Hiring Team`,

        follow_up: `Dear ${candidate.name},

I hope this message finds you well. I wanted to follow up on your recent application for the Software Developer position.

We received your application and are currently reviewing all submissions. Due to the high volume of applications, our review process is taking longer than initially anticipated.

Current status: Your application is under review by our technical team
Expected timeline: We expect to complete the initial screening by June 5th
Next steps: Qualified candidates will be contacted for phone screenings

We appreciate your patience and continued interest in our company. If you have any questions or if there are any updates to your contact information, please let us know.

Thank you for considering us as your next career opportunity.

Best regards,
The Hiring Team`
      };

      let message = templates[messageType] || '';

      if (customMessage.trim()) {
        message = `${message}\n\nAdditional Notes:\n${customMessage}`;
      }

      setGeneratedMessage(message);
      setIsGenerating(false);
    }, 2000);
  };

  const sendMessage = () => {
    if (!generatedMessage || !selectedCandidate) return;

    const candidate = mockCandidates.find(c => c.id.toString() === selectedCandidate);
    const messageTypeInfo = messageTypes.find(t => t.value === messageType);

    const newMessage = {
      id: Date.now(),
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      type: messageType,
      typeLabel: messageTypeInfo.label,
      content: generatedMessage,
      timestamp: new Date().toLocaleString(),
      status: 'sent'
    };

    setSentMessages(prev => [newMessage, ...prev]);
    setGeneratedMessage('');
    setCustomMessage('');
    
    alert(`Message sent to ${candidate.name} (${candidate.email})`);
  };

  const getTypeColor = (type) => {
    const typeInfo = messageTypes.find(t => t.value === type);
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      green: 'bg-green-100 text-green-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    return colors[typeInfo?.color] || colors.gray;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Mail className="mr-2" />
          Smart Candidate Messaging
        </h2>
        <p className="text-gray-600">Generate personalized emails for interview invites, rejections, feedback, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Message Generator */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Message</h3>
            
            <div className="space-y-4">
              {/* Candidate Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Candidate
                </label>
                <select
                  value={selectedCandidate}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a candidate...</option>
                  {mockCandidates.map(candidate => (
                    <option key={candidate.id} value={candidate.id.toString()}>
                      {candidate.name} ({candidate.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {messageTypes.map(type => {
                    const Icon = type.icon;
                    return (
                      <label key={type.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="messageType"
                          value={type.value}
                          checked={messageType === type.value}
                          onChange={(e) => setMessageType(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`flex items-center w-full p-3 rounded-lg border-2 transition-colors ${
                          messageType === type.value 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <Icon className="w-5 h-5 mr-3 text-gray-600" />
                          <span className="font-medium text-gray-800">{type.label}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add any specific details or custom message..."
                  className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateMessage}
                disabled={isGenerating || !selectedCandidate || !messageType}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Message...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Generate Personalized Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Message Preview */}
          {generatedMessage && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Generated Message</h4>
                <button
                  onClick={sendMessage}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {generatedMessage}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Message History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Recent Messages ({sentMessages.length})
          </h3>
          
          {sentMessages.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No messages sent yet</p>
              <p className="text-sm text-gray-400">Generated messages will appear here</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sentMessages.map(message => (
                <div key={message.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="font-medium text-gray-800">{message.candidateName}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.type)}`}>
                      {message.typeLabel}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{message.candidateEmail}</p>
                  
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {message.content.substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Sent: {message.timestamp}</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      <span className="text-green-600">Delivered</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateMessaging;