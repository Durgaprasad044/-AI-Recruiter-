import React, { useState } from 'react';
import { Copy, Check, Send, RefreshCw, Trash2 } from 'lucide-react';

const CandidateMessaging = () => {
  const [messageType, setMessageType] = useState('invite');
  const [candidateName, setCandidateName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [savedTemplates, setSavedTemplates] = useState([
    { 
      name: 'Standard Interview Invitation',
      type: 'invite',
      content: 'Dear {candidateName}, we are pleased to invite you for an interview for the {positionTitle} position at {companyName}. The interview is scheduled for {interviewDate}. Please let us know if this works for you.'
    },
    { 
      name: 'Technical Interview Preparation',
      type: 'invite',
      content: 'Dear {candidateName}, we are excited to move forward with your application for the {positionTitle} role. For your upcoming technical interview, please be prepared to discuss your experience with relevant technologies and problem-solving approaches.'
    },
    { 
      name: 'Positive Rejection Template',
      type: 'rejection',
      content: 'Dear {candidateName}, thank you for your interest in the {positionTitle} position at {companyName}. While we were impressed with your qualifications, we have decided to proceed with other candidates who more closely match our current needs.'
    }
  ]);

  const messageTypes = [
    { id: 'invite', name: 'Interview Invitation' },
    { id: 'rejection', name: 'Rejection Letter' },
    { id: 'offer', name: 'Job Offer' },
    { id: 'followup', name: 'Interview Follow-up' },
    { id: 'feedback', name: 'Feedback' },
  ];

  const generateMessage = () => {
    // Validate required fields
    if (!candidateName || !positionTitle || !companyName) {
      alert('Please fill in the required fields: Candidate Name, Position, and Company');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let message = '';
      
      switch (messageType) {
        case 'invite':
          message = `Dear ${candidateName},

We hope this email finds you well. I'm pleased to inform you that your application for the ${positionTitle} position at ${companyName} has impressed our hiring team, and we would like to invite you for an interview.

${interviewDate ? `The interview is scheduled for ${interviewDate}.` : 'We would like to schedule an interview at your earliest convenience.'}

${additionalNotes ? `Additional information: ${additionalNotes}` : ''}

During the interview, you'll have the opportunity to discuss your experience and qualifications in more detail, as well as learn more about our company and the role.

Please confirm your availability by replying to this email. If the proposed time doesn't work for you, please suggest a few alternatives.

We look forward to speaking with you!

Best regards,
HR Team
${companyName}`;
          break;
          
        case 'rejection':
          message = `Dear ${candidateName},

Thank you for your interest in the ${positionTitle} position at ${companyName} and for taking the time to go through our application process.

After careful consideration of all applications, we regret to inform you that we have decided not to move forward with your candidacy at this time.

${additionalNotes ? `${additionalNotes}` : 'While your qualifications and experience are impressive, we have decided to proceed with candidates whose backgrounds more closely align with our current needs.'}

We encourage you to apply for future positions that match your qualifications and interests. We will keep your application on file and contact you if a suitable position becomes available.

We wish you the best in your job search and future professional endeavors.

Sincerely,
HR Team
${companyName}`;
          break;
          
        case 'offer':
          message = `Dear ${candidateName},

I am delighted to offer you the position of ${positionTitle} at ${companyName}. Your impressive background, experience, and the skills you demonstrated during the interview process have convinced us that you would be a valuable addition to our team.

${additionalNotes ? `${additionalNotes}` : 'We were particularly impressed by your expertise and believe your contributions will be invaluable to our organization.'}

${interviewDate ? `We would like you to start on ${interviewDate}, if that works for you.` : 'We are flexible with your start date and would like to discuss this further.'}

Please review the attached offer letter which outlines the terms and conditions of your employment, including compensation, benefits, and other important details.

We would appreciate your response by [Response Date]. If you have any questions or need clarification about the offer, please don't hesitate to contact me.

We are excited about the prospect of you joining our team and contributing to our continued success!

Warm regards,
HR Team
${companyName}`;
          break;
          
        case 'followup':
          message = `Dear ${candidateName},

Thank you for taking the time to interview for the ${positionTitle} position at ${companyName} ${interviewDate ? `on ${interviewDate}` : 'recently'}.

${additionalNotes ? `${additionalNotes}` : 'We appreciate your thoughtful responses and the insights you shared about your experience and approach.'}

Our team is currently reviewing all candidates and we expect to make a decision soon. We will contact you either way once we have completed the interview process.

If you have any questions in the meantime, please don't hesitate to reach out.

Best regards,
HR Team
${companyName}`;
          break;
          
        case 'feedback':
          message = `Dear ${candidateName},

Thank you for participating in the interview process for the ${positionTitle} position at ${companyName} ${interviewDate ? `on ${interviewDate}` : 'recently'}.

As promised, I wanted to provide you with some feedback on your interview:

${additionalNotes ? `${additionalNotes}` : 'You presented yourself professionally and demonstrated solid technical knowledge related to the position. Your responses to situational questions showed good problem-solving skills and alignment with our company values.'}

We appreciate your interest in joining our team and the time you invested in the interview process.

Best regards,
HR Team
${companyName}`;
          break;
          
        default:
          message = `Dear ${candidateName},

Thank you for your interest in ${companyName}. We appreciate your application for the ${positionTitle} position.

${additionalNotes}

Best regards,
HR Team
${companyName}`;
      }
      
      setGeneratedMessage(message);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const clearForm = () => {
    setCandidateName('');
    setPositionTitle('');
    setCompanyName('');
    setInterviewDate('');
    setAdditionalNotes('');
    setGeneratedMessage('');
  };

  const applyTemplate = (template) => {
    setMessageType(template.type);
    // Don't overwrite existing values if they're already filled
    if (!candidateName) setCandidateName('{candidateName}');
    if (!positionTitle) setPositionTitle('{positionTitle}');
    if (!companyName) setCompanyName('{companyName}');
    if (!interviewDate && template.type === 'invite') setInterviewDate('{interviewDate}');
    
    let content = template.content;
    content = content.replace('{candidateName}', candidateName || '{candidateName}');
    content = content.replace('{positionTitle}', positionTitle || '{positionTitle}');
    content = content.replace('{companyName}', companyName || '{companyName}');
    content = content.replace('{interviewDate}', interviewDate || '{interviewDate}');
    
    setGeneratedMessage(content);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Candidate Messaging</h1>
      <p className="text-lg text-gray-700 mb-8">
        Generate personalized, professional emails for candidates at various stages of the recruitment process.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Message Generator</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {messageTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setMessageType(type.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${messageType === type.id
                        ? 'bg-blue-100 text-blue-700 border-blue-300 border'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="candidateName">
                  Candidate Name*
                </label>
                <input
                  id="candidateName"
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="positionTitle">
                  Position Title*
                </label>
                <input
                  id="positionTitle"
                  type="text"
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Senior Developer"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="companyName">
                  Company Name*
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Acme Inc"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="interviewDate">
                  Date/Time (if applicable)
                </label>
                <input
                  id="interviewDate"
                  type="text"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Monday, June 15 at 2:00 PM"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="additionalNotes">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific details or requirements for the candidate..."
              ></textarea>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-between">
              <button
                onClick={generateMessage}
                disabled={isGenerating}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                  ${isGenerating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate Message
                  </>
                )}
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={clearForm}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Trash2 className="mr-2 h-4 w-4 text-gray-500" />
                  Clear
                </button>
                
                <button
                  onClick={() => {
                    // Could add a modal for saving template in a real app
                    alert('Template would be saved in a real application!');
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCw className="mr-2 h-4 w-4 text-gray-500" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
          
          {generatedMessage && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Message</h2>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-1 h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{generatedMessage}</div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Saved Templates</h2>
            <div className="space-y-3">
              {savedTemplates.map((template, index) => (
                <div 
                  key={index}
                  className="p-3 border border-gray-200 rounded-md hover:border-blue-300 cursor-pointer transition-colors"
                  onClick={() => applyTemplate(template)}
                >
                  <div className="font-medium text-gray-800 mb-1">{template.name}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    Type: {messageTypes.find(t => t.id === template.type)?.name}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {template.content.substring(0, 80)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateMessaging;