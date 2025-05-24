import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Send, RefreshCw, Clipboard, Save, ThumbsUp } from 'lucide-react';

const InterviewAgent = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [summary, setSummary] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef(null);

  const roles = [
    { 
      id: 'frontend', 
      title: 'Frontend Developer',
      description: 'React, Vue, Angular, CSS, JavaScript'
    },
    { 
      id: 'backend', 
      title: 'Backend Developer',
      description: 'Node.js, Python, Java, Databases'
    },
    { 
      id: 'fullstack', 
      title: 'Full Stack Developer',
      description: 'Frontend + Backend technologies'
    },
    { 
      id: 'data', 
      title: 'Data Scientist',
      description: 'Python, R, ML, Statistics'
    },
  ];

  const questions = {
    frontend: [
      "Can you explain the difference between controlled and uncontrolled components in React?",
      "How would you optimize the performance of a React application?",
      "Explain the concept of CSS-in-JS and its advantages.",
      "How do you handle state management in large React applications?",
      "Describe your experience with responsive design and accessibility."
    ],
    backend: [
      "Explain RESTful API design principles and best practices.",
      "How do you handle database transactions and ensure data integrity?",
      "Describe your experience with microservices architecture.",
      "How do you implement authentication and authorization in web applications?",
      "What strategies do you use for error handling and logging?"
    ],
    fullstack: [
      "How do you structure a full-stack application for scalability?",
      "Explain your approach to API design and frontend-backend communication.",
      "Describe your experience with deployment and DevOps practices.",
      "How do you ensure security in full-stack applications?",
      "What's your approach to testing across the entire application stack?"
    ],
    data: [
      "Explain the difference between supervised and unsupervised learning.",
      "How do you handle missing data in a dataset?",
      "Describe your experience with feature engineering.",
      "How do you evaluate the performance of a machine learning model?",
      "Explain your approach to communicating technical findings to non-technical stakeholders."
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startInterview = () => {
    if (!activeRole) return;
    
    setInterviewStarted(true);
    setMessages([{
      role: 'assistant',
      content: `Welcome to your interview for the ${roles.find(r => r.id === activeRole)?.title} position. I'll ask you a series of questions to understand your experience and skills. Let's begin!`
    }]);
    
    // Ask first question after delay
    setTimeout(() => {
      const firstQuestion = questions[activeRole][0];
      setCurrentQuestion(firstQuestion);
      setMessages(prev => [...prev, { role: 'assistant', content: firstQuestion }]);
      setQuestionCount(1);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendResponse = () => {
    if (!userResponse.trim()) return;
    
    // Add user response to messages
    setMessages(prev => [...prev, { role: 'user', content: userResponse }]);
    setIsTyping(true);
    
    // Clear input
    setUserResponse('');
    
    // Process next question after delay
    setTimeout(() => {
      if (questionCount < 5) {
        const nextQuestion = questions[activeRole][questionCount];
        setCurrentQuestion(nextQuestion);
        setMessages(prev => [...prev, { role: 'assistant', content: nextQuestion }]);
        setQuestionCount(prev => prev + 1);
        setIsTyping(false);
      } else {
        // End interview after 5 questions
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Thank you for completing the interview! I'll now analyze your responses and provide a summary." 
        }]);
        setIsTyping(false);
        setInterviewComplete(true);
        
        // Generate summary after delay
        setTimeout(() => {
          const generatedSummary = generateMockSummary(activeRole);
          setSummary(generatedSummary);
        }, 2000);
      }
    }, 1500);
  };

  const resetInterview = () => {
    setInterviewStarted(false);
    setMessages([]);
    setCurrentQuestion('');
    setUserResponse('');
    setQuestionCount(0);
    setInterviewComplete(false);
    setSummary(null);
    setActiveRole(null);
  };

  const generateMockSummary = (role) => {
    const roleTitle = roles.find(r => r.id === role)?.title;
    
    return `
## Interview Summary for ${roleTitle} Position

### Technical Skills
- Demonstrates solid understanding of core ${roleTitle} concepts
- Shows good problem-solving approach to technical challenges
- Has practical experience with key technologies
- Applies best practices in their work

### Communication Skills
- Articulates technical concepts clearly
- Provides structured and well-organized responses
- Communicates with confidence and clarity
- Uses appropriate technical terminology

### Areas of Strength
- In-depth knowledge of primary technologies
- Practical experience with real-world applications
- Understanding of architectural considerations

### Areas for Improvement
- Could provide more specific examples from past projects
- May benefit from deeper experience with advanced concepts
- Consider expanding knowledge in complementary technologies

### Overall Assessment
Candidate shows promising technical skills and communicates effectively. Recommend advancing to the next interview stage to further evaluate technical capabilities through a practical assessment.

**Match Score: 78/100**
`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Summary copied to clipboard!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Interview Agent</h1>
      <p className="text-lg text-gray-700 mb-8">
        Conduct virtual technical interviews with candidates and get AI-generated summaries and evaluations.
      </p>

      {!interviewStarted ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Select Role for Interview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {roles.map((role) => (
              <div 
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 
                  ${activeRole === role.id 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
              >
                <h3 className="font-medium text-lg mb-1">{role.title}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={startInterview}
            disabled={!activeRole}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm 
              ${!activeRole 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
          >
            Start Interview <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-300px)] flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">
                    {roles.find(r => r.id === activeRole)?.title} Interview
                  </h2>
                  <button 
                    onClick={resetInterview}
                    className="text-gray-500 hover:text-blue-600 flex items-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" /> Reset
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}
                  >
                    <div 
                      className={`inline-block max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="mb-4">
                    <div className="inline-block max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {!interviewComplete && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={userResponse}
                      onChange={(e) => setUserResponse(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendResponse();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendResponse}
                      className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {interviewComplete && summary ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Interview Summary</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => copyToClipboard(summary)}
                      className="text-gray-500 hover:text-blue-600"
                      title="Copy to clipboard"
                    >
                      <Clipboard className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-blue-600"
                      title="Save summary"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none overflow-y-auto max-h-[calc(100vh-400px)]">
                  <div className="whitespace-pre-wrap">{summary}</div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                  <button 
                    onClick={resetInterview}
                    className="text-blue-600 hover:underline"
                  >
                    Start New Interview
                  </button>
                  <button 
                    className="flex items-center text-green-600 hover:underline"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" /> Approve
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h2 className="font-semibold mb-3">Interview Progress</h2>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{interviewComplete ? '5/5' : `${questionCount}/5`}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: interviewComplete ? '100%' : `${(questionCount / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Current Position</div>
                    <div className="text-gray-700">
                      {roles.find(r => r.id === activeRole)?.title}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="font-medium">Focus Areas</div>
                    <div className="text-gray-700">
                      {roles.find(r => r.id === activeRole)?.description}
                    </div>
                  </div>
                  
                  {!interviewComplete && (
                    <div className="text-sm">
                      <div className="font-medium">Current Question</div>
                      <div className="text-gray-700 italic">
                        "{currentQuestion}"
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewAgent;