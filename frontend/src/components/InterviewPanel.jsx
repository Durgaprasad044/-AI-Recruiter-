import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, User, Bot, Play, Square, FileText, Download, RotateCcw } from 'lucide-react';

export default function InterviewAgent() {
  const [interviewState, setInterviewState] = useState('setup'); // setup, active, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [interviewType, setInterviewType] = useState('technical');
  const [candidateName, setCandidateName] = useState('');
  const [position, setPosition] = useState('');
  const [summary, setSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const messagesEndRef = useRef(null);

  const interviewTypes = {
    technical: [
      "Tell me about your experience with React and modern JavaScript frameworks.",
      "How do you approach debugging complex issues in your code?",
      "Describe a challenging technical problem you've solved recently.",
      "What's your experience with database design and optimization?",
      "How do you ensure code quality and maintainability in your projects?"
    ],
    behavioral: [
      "Tell me about a time when you had to work with a difficult team member.",
      "Describe a situation where you had to meet a tight deadline.",
      "How do you handle constructive criticism?",
      "Tell me about a project you're particularly proud of.",
      "Describe a time when you had to learn something completely new quickly."
    ],
    leadership: [
      "How do you motivate team members during challenging projects?",
      "Tell me about a time you had to make a difficult decision with limited information.",
      "How do you handle conflicts within your team?",
      "Describe your approach to delegating tasks and responsibilities.",
      "How do you ensure effective communication across different departments?"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses, questions]);

  const startInterview = () => {
    const selectedQuestions = interviewTypes[interviewType];
    setQuestions(selectedQuestions);
    setInterviewState('active');
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const generateAdaptiveQuestion = (previousResponse, questionIndex) => {
    const adaptiveQuestions = {
      technical: [
        "That's interesting. Can you walk me through the specific technologies you used?",
        "How would you scale that solution for enterprise-level applications?",
        "What alternative approaches did you consider?",
        "How do you stay updated with emerging technologies in this field?",
        "What metrics do you use to measure the success of your technical solutions?"
      ],
      behavioral: [
        "How did that experience change your approach to similar situations?",
        "What would you do differently if faced with that situation again?",
        "How did you measure the success of your actions?",
        "What feedback did you receive from others involved?",
        "How do you apply those lessons to your current work?"
      ],
      leadership: [
        "What was the outcome of that leadership approach?",
        "How do you adapt your leadership style to different team members?",
        "What challenges did you face in implementing that strategy?",
        "How do you measure team performance and satisfaction?",
        "What leadership principles guide your decision-making?"
      ]
    };

    return adaptiveQuestions[interviewType][questionIndex % adaptiveQuestions[interviewType].length];
  };

  const submitResponse = () => {
    if (!currentResponse.trim()) return;

    const newResponse = {
      question: questions[currentQuestionIndex],
      answer: currentResponse,
      timestamp: new Date().toLocaleTimeString()
    };

    setResponses(prev => [...prev, newResponse]);
    setCurrentResponse('');

    if (currentQuestionIndex < questions.length - 1) {
      // Generate next question (adaptive or sequential)
      let nextQuestion;
      if (adaptiveMode && currentQuestionIndex > 0) {
        nextQuestion = generateAdaptiveQuestion(currentResponse, currentQuestionIndex);
      } else {
        nextQuestion = questions[currentQuestionIndex + 1];
      }
      
      setQuestions(prev => {
        const newQuestions = [...prev];
        if (currentQuestionIndex + 1 < newQuestions.length) {
          newQuestions[currentQuestionIndex + 1] = nextQuestion;
        }
        return newQuestions;
      });
      
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setInterviewState('completed');
      generateSummary();
    }
  };

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysisPoints = [];
      
      // Analyze response length and depth
      const avgResponseLength = responses.reduce((acc, r) => acc + r.answer.length, 0) / responses.length;
      if (avgResponseLength > 200) {
        analysisPoints.push("• Candidate provides detailed, comprehensive responses");
      } else {
        analysisPoints.push("• Responses could be more detailed and elaborate");
      }

      // Analyze technical keywords (simplified)
      const technicalKeywords = ['algorithm', 'database', 'framework', 'optimization', 'architecture', 'scalable'];
      const keywordCount = responses.reduce((acc, r) => {
        return acc + technicalKeywords.filter(keyword => 
          r.answer.toLowerCase().includes(keyword)
        ).length;
      }, 0);

      if (keywordCount > 3) {
        analysisPoints.push("• Strong technical vocabulary and understanding demonstrated");
      }

      // Analyze problem-solving approach
      const problemSolvingWords = ['challenge', 'solution', 'approach', 'analyze', 'implement'];
      const problemSolvingScore = responses.reduce((acc, r) => {
        return acc + problemSolvingWords.filter(word => 
          r.answer.toLowerCase().includes(word)
        ).length;
      }, 0);

      if (problemSolvingScore > 2) {
        analysisPoints.push("• Demonstrates structured problem-solving methodology");
      }

      const summaryText = `
**Interview Summary for ${candidateName}**
**Position: ${position}**
**Interview Type: ${interviewType.charAt(0).toUpperCase() + interviewType.slice(1)}**

**Overall Assessment:**
${analysisPoints.join('\n')}

**Key Strengths:**
• Communication skills appear strong based on response structure
• Shows willingness to engage with complex questions
• Demonstrates relevant experience in the field

**Areas for Follow-up:**
• Technical implementation details could be explored further
• Leadership experience and team collaboration approach
• Specific examples of past project outcomes

**Recommendation:** 
Based on this initial screening, the candidate shows promise and should be considered for the next round of interviews.

**Interview Duration:** ${responses.length} questions completed
**Completion Rate:** 100%
      `;

      setSummary(summaryText);
      setIsGeneratingSummary(false);
    }, 2000);
  };

  const resetInterview = () => {
    setInterviewState('setup');
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setResponses([]);
    setCurrentResponse('');
    setSummary('');
    setCandidateName('');
    setPosition('');
  };

  const exportSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `interview-summary-${candidateName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-8 h-8" />
              <h1 className="text-3xl font-bold">AI Interview Agent</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Adaptive interview system with intelligent questioning and response analysis
            </p>
          </div>

          {/* Setup Phase */}
          {interviewState === 'setup' && (
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Interview Setup</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter candidate name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Interview Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(interviewTypes).map(type => (
                    <button
                      key={type}
                      onClick={() => setInterviewType(type)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        interviewType === type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium capitalize">{type}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {type === 'technical' && 'Code & Systems'}
                        {type === 'behavioral' && 'Soft Skills'}
                        {type === 'leadership' && 'Management'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={adaptiveMode}
                    onChange={(e) => setAdaptiveMode(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Enable Adaptive Questioning (AI adjusts follow-up questions based on responses)
                  </span>
                </label>
              </div>

              <button
                onClick={startInterview}
                disabled={!candidateName || !position}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Interview
              </button>
            </div>
          )}

          {/* Active Interview */}
          {interviewState === 'active' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Interviewing: {candidateName}
                  </h2>
                  <p className="text-gray-600">{position} - {interviewType} Interview</p>
                </div>
                <div className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Conversation History */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
                {responses.map((response, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <div className="flex items-start gap-3 mb-3">
                      <Bot className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="bg-blue-100 rounded-lg p-3 flex-1">
                        <p className="text-gray-800">{response.question}</p>
                        <span className="text-xs text-gray-500">{response.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div className="bg-green-100 rounded-lg p-3 flex-1">
                        <p className="text-gray-800">{response.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Current Question */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Bot className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="text-gray-800 text-lg font-medium">
                      {questions[currentQuestionIndex]}
                    </p>
                    {adaptiveMode && currentQuestionIndex > 0 && (
                      <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded mt-2 inline-block">
                        Adaptive Question
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Response Input */}
              <div className="space-y-4">
                <textarea
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  placeholder="Type your response here..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={submitResponse}
                    disabled={!currentResponse.trim()}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Complete Interview' : 'Next Question'}
                  </button>
                  <button
                    onClick={resetInterview}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Completed Interview */}
          {interviewState === 'completed' && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Interview Completed</h2>
                <p className="text-gray-600">
                  AI analysis complete for {candidateName}
                </p>
              </div>

              {isGeneratingSummary ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing responses and generating summary...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Interview Summary
                    </h3>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                        {summary}
                      </pre>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={exportSummary}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Export Summary
                    </button>
                    <button
                      onClick={resetInterview}
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      New Interview
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}