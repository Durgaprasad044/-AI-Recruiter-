import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, FileText, Search, Clock, HelpCircle } from 'lucide-react';

const SupportBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [documentSources, setDocumentSources] = useState([]);
  const messagesEndRef = useRef(null);

  const mockDocuments = [
    { id: 1, name: 'Employee Handbook', type: 'PDF', lastUpdated: '2025-01-15' },
    { id: 2, name: 'Benefits Guide', type: 'PDF', lastUpdated: '2025-01-10' },
    { id: 3, name: 'Leave Policies', type: 'PDF', lastUpdated: '2025-01-20' },
    { id: 4, name: 'Code of Conduct', type: 'PDF', lastUpdated: '2025-01-05' },
    { id: 5, name: 'Interview Process Guide', type: 'PDF', lastUpdated: '2025-01-12' }
  ];

  const commonQuestions = [
    "What are the company's vacation policies?",
    "How does the interview process work?",
    "What benefits does the company offer?",
    "What is the dress code policy?",
    "How do I request time off?",
    "What are the working hours?",
    "What is the remote work policy?",
    "How do performance reviews work?"
  ];

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: "Hi! I'm your AI HR assistant. I can help answer questions about company policies, benefits, interview processes, and more. I have access to all our HR documents and policies. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        sources: []
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userQuery) => {
    const responses = {
      'vacation': {
        text: "Based on our Employee Handbook, here's information about vacation policies:\n\n• New employees receive 15 days of PTO annually\n• After 3 years: 20 days annually\n• After 5 years: 25 days annually\n• PTO requests should be submitted at least 2 weeks in advance\n• Maximum carryover: 5 days to the following year\n• All PTO must be approved by your direct manager",
        sources: ['Employee Handbook', 'Leave Policies']
      },
      'benefits': {
        text: "Here's a comprehensive overview of our benefits package:\n\n**Health & Wellness:**\n• Medical, dental, and vision insurance (company pays 80%)\n• Health Savings Account (HSA) with company contribution\n• Mental health support and counseling services\n\n**Financial:**\n• 401(k) with 6% company match\n• Life insurance (2x annual salary)\n• Disability insurance\n\n**Work-Life Balance:**\n• Flexible working hours\n• Remote work options\n• Professional development budget ($2,000/year)",
        sources: ['Benefits Guide', 'Employee Handbook']
      },
      'interview': {
        text: "Our interview process is designed to be thorough yet efficient:\n\n**Stage 1: Application Review** (1-2 days)\n• Resume screening against job requirements\n• Initial qualification assessment\n\n**Stage 2: Phone/Video Screening** (30 minutes)\n• Basic fit assessment\n• Role expectations discussion\n\n**Stage 3: Technical Interview** (60-90 minutes)\n• Technical skills assessment\n• Problem-solving exercises\n\n**Stage 4: Team Interview** (45 minutes)\n• Cultural fit evaluation\n• Meet potential teammates\n\n**Stage 5: Final Interview** (30 minutes)\n• Leadership meeting\n• Questions and offer discussion\n\nTotal timeline: 1-2 weeks from application to decision",
        sources: ['Interview Process Guide', 'Employee Handbook']
      },
      'remote': {
        text: "Our remote work policy offers flexibility while maintaining collaboration:\n\n**Hybrid Model:**\n• 3 days in office, 2 days remote (standard)\n• Core collaboration hours: 10 AM - 3 PM (all time zones)\n• Flexible start times between 7 AM - 10 AM\n\n**Full Remote Options:**\n• Available for certain roles and tenured employees\n• Requires manager approval\n• Quarterly in-person meetings required\n\n**Equipment & Support:**\n• Company-provided laptop and monitor\n• $500 home office setup stipend\n• High-speed internet reimbursement ($50/month)",
        sources: ['Employee Handbook', 'Remote Work Policy']
      },
      'default': {
        text: "I'd be happy to help you with that question. Based on our available documentation, I can provide information about:\n\n• Company policies and procedures\n• Benefits and compensation\n• Leave and time-off policies\n• Interview and hiring processes\n• Code of conduct and guidelines\n• Performance review processes\n\nCould you please be more specific about what you'd like to know? You can also try asking one of the common questions from the suggestions below.",
        sources: ['Employee Handbook']
      }
    };

    const query = userQuery.toLowerCase();
    let response = responses.default;

    if (query.includes('vacation') || query.includes('pto') || query.includes('time off')) {
      response = responses.vacation;
    } else if (query.includes('benefit') || query.includes('insurance') || query.includes('401k')) {
      response = responses.benefits;
    } else if (query.includes('interview') || query.includes('hiring') || query.includes('process')) {
      response = responses.interview;
    } else if (query.includes('remote') || query.includes('work from home') || query.includes('hybrid')) {
      response = responses.remote;
    }

    return response;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      sources: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        sources: response.sources
      };

      setMessages(prev => [...prev, botMessage]);
      setDocumentSources(response.sources);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const searchDocuments = () => {
    if (!searchQuery.trim()) return;
    
    const results = mockDocuments.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const searchMessage = {
      id: Date.now(),
      text: `I found ${results.length} document(s) related to "${searchQuery}":\n\n${results.map(doc => `• ${doc.name} (${doc.type}) - Updated ${doc.lastUpdated}`).join('\n')}\n\nWould you like me to help you find specific information from these documents?`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
      sources: results.map(doc => doc.name)
    };
    
    setMessages(prev => [...prev, searchMessage]);
    setSearchQuery('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Bot className="mr-2" />
          AI HR Support Bot (RAG-Powered)
        </h2>
        <p className="text-gray-600">Get instant answers to HR questions using our knowledge base</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Documents & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Document Search */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Search Documents
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchDocuments()}
                placeholder="Search policies..."
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={searchDocuments}
                className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Available Documents */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Knowledge Base
            </h3>
            <div className="space-y-2">
              {mockDocuments.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-white rounded border text-xs">
                  <div>
                    <p className="font-medium text-gray-800">{doc.name}</p>
                    <p className="text-gray-500">{doc.type}</p>
                  </div>
                  <div className="text-gray-400">
                    <Clock className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Questions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              Quick Questions
            </h3>
            <div className="space-y-2">
              {commonQuestions.slice(0, 4).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left w-full p-2 text-xs bg-white rounded border hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="border border-gray-200 rounded-lg h-96 flex flex-col">
            {/* Chat Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
              <div className="flex items-center">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="font-medium text-gray-800">HR Support Bot</span>
                <span className="text-sm text-gray-500 ml-2">• Online</span>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white ml-12' 
                      : 'bg-gray-100 text-gray-800 mr-12'
                  }`}>
                    <div className="flex items-start">
                      {message.sender === 'bot' && <Bot className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />}
                      {message.sender === 'user' && <User className="w-5 h-5 mr-2 mt-0.5" />}
                      <div className="flex-1">
                        <pre className="whitespace-pre-wrap text-sm font-sans">{message.text}</pre>
                        <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-300">
                            <p className="text-xs text-gray-600 mb-1">Sources:</p>
                            <div className="flex flex-wrap gap-1">
                              {message.sources.map((source, idx) => (
                                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
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
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me about company policies, benefits, procedures..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBot;