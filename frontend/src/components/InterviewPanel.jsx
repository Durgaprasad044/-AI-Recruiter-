import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, Bot, FileText, Clock } from 'lucide-react';

const InterviewAgent = ({ candidateName = "Candidate", jobRole = "Software Developer" }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewSummary, setInterviewSummary] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const interviewQuestions = [
    "Hi! I'm your AI interviewer. Let's start with a brief introduction - can you tell me about yourself and your background?",
    "What interests you most about this Software Developer position, and how does it align with your career goals?",
    "Can you describe a challenging technical problem you've solved recently? Walk me through your approach.",
    "How do you stay updated with the latest technologies and trends in software development?",
    "Describe a time when you had to work with a difficult team member. How did you handle the situation?",
    "What's your experience with our tech stack, and how would you approach learning new technologies?",
    "Where do you see yourself in your career in the next 3-5 years?",
    "Do you have any questions about the role, team, or company culture?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startInterview = () => {
    setIsInterviewActive(true);
    setMessages([]);
    setCurrentQuestionIndex(0);
    
    // Add initial AI message
    setTimeout(() => {
      addAIMessage(interviewQuestions[0]);
    }, 500);
  };

  const addAIMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    addUserMessage(currentMessage);
    setCurrentMessage('');

    // Process next question or complete interview
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex < interviewQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        addAIMessage(interviewQuestions[nextIndex]);
      } else {
        // Complete interview
        completeInterview();
      }
    }, 1500);
  };

  const completeInterview = () => {
    setIsInterviewActive(false);
    setInterviewComplete(true);
    
    addAIMessage("Thank you for completing the interview! I'm now generating your interview summary and assessment. Please wait a moment...");
    
    // Generate mock summary
    setTimeout(() => {
      const mockSummary = {
        candidateName,
        jobRole,
        duration: "45 minutes",
        overallScore: 8.5,
        strengths: [
          "Strong technical problem-solving skills",
          "Good communication and articulation",
          "Relevant experience with required technologies",
          "Positive attitude and enthusiasm"
        ],
        areasForImprovement: [
          "Could provide more specific examples",
          "Leadership experience could be stronger"
        ],
        technicalAssessment: {
          problemSolving: 9,
          communication: 8,
          technicalKnowledge: 8,
          culturalFit: 9
        },
        recommendation: "Strong candidate - Recommend for next round",
        keyResponses: [
          {
            question: "Technical problem-solving approach",
            summary: "Demonstrated systematic thinking and good debugging methodology"
          },
          {
            question: "Team collaboration",
            summary: "Showed good interpersonal skills and conflict resolution abilities"
          }
        ]
      };
      
      setInterviewSummary(mockSummary);
    }, 3000);
  };

  const resetInterview = () => {
    setMessages([]);
    setIsInterviewActive(false);
    setInterviewComplete(false);
    setCurrentQuestionIndex(0);
    setInterviewSummary(null);
    setCurrentMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <MessageCircle className="mr-2" />
          AI-Powered Interview Agent
        </h2>
        <p className="text-gray-600">Adaptive text-based interviews with real-time response analysis</p>
      </div>

      {!isInterviewActive && !interviewComplete && (
        <div className="text-center py-12">
          <div className="bg-blue-50 rounded-lg p-8 mb-6">
            <Bot className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ready to start the interview for {candidateName}?
            </h3>
            <p className="text-gray-600 mb-4">
              Position: <span className="font-medium">{jobRole}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              The interview will be adaptive and typically takes 30-45 minutes. 
              I'll ask follow-up questions based on your responses.
            </p>
            <button
              onClick={startInterview}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Interview
            </button>
          </div>
        </div>
      )}

      {isInterviewActive && (
        <div className="border border-gray-200 rounded-lg">
          {/* Chat Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="font-medium text-gray-800">Interview in Progress</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                Question {currentQuestionIndex + 1} of {interviewQuestions.length}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white ml-12' 
                    : 'bg-gray-100 text-gray-800 mr-12'
                }`}>
                  <div className="flex items-start">
                    {message.sender === 'ai' && <Bot className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />}
                    {message.sender === 'user' && <User className="w-5 h-5 mr-2 mt-0.5" />}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 mr-12">
                  <div className="flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your response..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {interviewSummary && (
        <div className="mt-6 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FileText className="mr-2" />
              Interview Summary & Assessment
            </h3>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Score: {interviewSummary.overallScore}/10
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Candidate Details</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {interviewSummary.candidateName}</p>
                <p><span className="font-medium">Position:</span> {interviewSummary.jobRole}</p>
                <p><span className="font-medium">Duration:</span> {interviewSummary.duration}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Technical Assessment</h4>
              <div className="space-y-2">
                {Object.entries(interviewSummary.technicalAssessment).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-medium">{value}/10</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-green-700">Strengths</h4>
              <ul className="space-y-1">
                {interviewSummary.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-orange-700">Areas for Improvement</h4>
              <ul className="space-y-1">
                {interviewSummary.areasForImprovement.map((area, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Key Response Summary</h4>
            <div className="space-y-3">
              {interviewSummary.keyResponses.map((response, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-sm text-gray-800">{response.question}</p>
                  <p className="text-sm text-gray-600 mt-1">{response.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
            <p className="text-blue-700">{interviewSummary.recommendation}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={resetInterview}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Start New Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewAgent;