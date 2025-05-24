import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Search, HelpCircle, Upload } from 'lucide-react';
import { mockKnowledgeBase } from '../utils/mockData';

const SupportBot = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your HR support bot. How can I help you today? You can ask me about our hiring process, benefits, policies, or job descriptions.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'What is your remote work policy?',
    'Can you explain the interview process?',
    'What benefits do you offer?',
    'Do you sponsor work visas?'
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
  if (!query.trim()) return;

  setMessages(prev => [...prev, { role: 'user', content: query }]);
  setQuery('');
  setIsTyping(true);

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: query })
    });

    const data = await response.json();

    const botResponse = data.answer || "I couldn't find an answer for that. Would you like me to connect you with HR?";
    
    setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
  } catch (error) {
    console.error('Error fetching from API:', error);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "Oops! Something went wrong while reaching the knowledge base. Please try again later."
    }]);
  }

  setIsTyping(false);
    // Find answer in mock knowledge base or give fallback
setTimeout(() => {
  const lowerQuery = query.toLowerCase();
  const matchedQuestion = mockKnowledgeBase.find(item => 
    item.question.toLowerCase().includes(lowerQuery) || 
    lowerQuery.includes(item.question.toLowerCase().substring(0, 10))
  );

  let botResponse;
  if (matchedQuestion) {
    botResponse = matchedQuestion.answer;
  } else {
    botResponse = "I don't have specific information on that topic yet. This would be a great question for our HR team. Would you like me to connect you with someone who can help?";
  }

  setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
  setIsTyping(false);
}, 1500);
  };

  const useSuggestion = (suggestion) => {
    setQuery(suggestion);
    // Focus the input field after selecting a suggestion
    inputRef.current?.focus();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">HR Support Bot</h1>
      <p className="text-lg text-gray-700 mb-8">
        Get instant answers to your HR-related questions, powered by our knowledge base of policies and job descriptions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-300px)] flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                  <HelpCircle className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <h2 className="font-semibold">HR Assistant</h2>
                  <div className="text-xs text-green-600">Online</div>
                </div>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-violet-600 text-white rounded-br-none' 
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
            
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => useSuggestion(suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me about HR policies, benefits, or job requirements..."
                  className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-violet-600 text-white p-2 rounded-r-lg hover:bg-violet-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h2 className="font-semibold mb-3">Knowledge Base</h2>
            
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search knowledge base..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="font-medium text-sm">Employee Handbook</div>
                <div className="text-xs text-gray-500">20 topics</div>
              </div>
              <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="font-medium text-sm">Benefits & PTO</div>
                <div className="text-xs text-gray-500">15 topics</div>
              </div>
              <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="font-medium text-sm">Hiring Process</div>
                <div className="text-xs text-gray-500">12 topics</div>
              </div>
              <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="font-medium text-sm">Job Descriptions</div>
                <div className="text-xs text-gray-500">35 topics</div>
              </div>
            </div>
            
            <button className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100">
              <Plus className="mr-2 h-4 w-4" />
              Add Documents
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold mb-3">Upload Resources</h2>
            <p className="text-xs text-gray-600 mb-3">
              Upload HR documents, policies, or job descriptions to enhance the knowledge base.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
              <div className="text-xs text-gray-600">
                Drag & drop files or 
                <span className="text-violet-600 font-medium cursor-pointer"> browse</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                PDF, DOCX, TXT files supported
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBot;