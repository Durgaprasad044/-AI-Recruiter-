import React, { useState } from 'react';
import { Code, Send, Check, X, AlertCircle, HelpCircle, Clipboard } from 'lucide-react';
import { mockCodingChallenges } from '../utils/mockData';

const CodingEvaluator = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [results, setResults] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const selectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setUserCode('');
    setResults(null);
  };

  const evaluateCode = () => {
    if (!userCode.trim()) {
      alert('Please enter your code solution first');
      return;
    }

    setIsEvaluating(true);

    // Simulate API call with delay
    setTimeout(() => {
      // Generate mock results with random scores
      const mockScores = {
        correctness: Math.floor(Math.random() * 41) + 60, // 60-100
        efficiency: Math.floor(Math.random() * 41) + 60,  // 60-100
        readability: Math.floor(Math.random() * 41) + 60, // 60-100
      };
      
      const totalScore = Math.floor((mockScores.correctness + mockScores.efficiency + mockScores.readability) / 3);
      
      let feedback = '';
      let strengths = [];
      let weaknesses = [];
      
      // Generate appropriate feedback based on scores
      if (totalScore >= 90) {
        feedback = "Excellent solution! Your code is correct, efficient, and well-structured.";
        strengths = [
          "Great algorithmic approach",
          "Optimal time complexity",
          "Clean, readable code structure"
        ];
        weaknesses = [
          "Consider adding more comments",
          "Minor optimization opportunities"
        ];
      } else if (totalScore >= 80) {
        feedback = "Good solution that meets the requirements with some room for improvement.";
        strengths = [
          "Correct implementation",
          "Good code structure",
          "Reasonable approach"
        ];
        weaknesses = [
          "Time complexity could be improved",
          "Consider edge cases more carefully",
          "Variable naming could be more descriptive"
        ];
      } else if (totalScore >= 70) {
        feedback = "Acceptable solution with several areas that need improvement.";
        strengths = [
          "Functional implementation",
          "Handles basic cases correctly"
        ];
        weaknesses = [
          "Inefficient algorithm",
          "Missing edge case handling",
          "Code readability needs improvement",
          "Inconsistent code style"
        ];
      } else {
        feedback = "Your solution needs significant improvement. Consider revisiting the core concepts.";
        strengths = [
          "Good attempt at solving the problem"
        ];
        weaknesses = [
          "Algorithm doesn't handle all cases correctly",
          "Inefficient approach with poor time complexity",
          "Code organization needs improvement",
          "Missing important edge cases"
        ];
      }
      
      setResults({
        scores: mockScores,
        totalScore,
        feedback,
        strengths,
        weaknesses,
        passed: totalScore >= 70,
      });
      
      setIsEvaluating(false);
    }, 2500);
  };

  const copyChallenge = () => {
    if (!selectedChallenge) return;
    
    const challengeText = `
Challenge: ${selectedChallenge.title} (${selectedChallenge.difficulty})

Description:
${selectedChallenge.description}

Examples:
${selectedChallenge.examples.map(ex => `Input: ${ex.input}
Output: ${ex.output}
${ex.explanation ? `Explanation: ${ex.explanation}` : ''}`).join('\n\n')}
    `;
    
    navigator.clipboard.writeText(challengeText.trim());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetEvaluation = () => {
    setUserCode('');
    setResults(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Coding Challenge Evaluator</h1>
      <p className="text-lg text-gray-700 mb-8">
        Evaluate coding solutions with instant feedback on correctness, efficiency, and code quality.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Challenges</h2>
            <div className="space-y-3">
              {mockCodingChallenges.map((challenge) => (
                <div 
                  key={challenge.id}
                  onClick={() => selectChallenge(challenge)}
                  className={`p-3 rounded-md cursor-pointer transition-colors
                    ${selectedChallenge?.id === challenge.id
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'bg-gray-50 border border-gray-200 hover:border-emerald-200'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{challenge.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full
                      ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedChallenge ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedChallenge.title}</h2>
                <button
                  onClick={copyChallenge}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-1 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="text-gray-800 mb-3">{selectedChallenge.description}</div>
                
                <div className="mt-4">
                  <h3 className="font-medium text-sm mb-2">Examples:</h3>
                  {selectedChallenge.examples.map((example, index) => (
                    <div key={index} className="mb-3 text-sm">
                      <div className="font-mono bg-gray-100 p-2 rounded mb-1">
                        <div><span className="text-gray-500">Input:</span> {example.input}</div>
                        <div><span className="text-gray-500">Output:</span> {example.output}</div>
                      </div>
                      {example.explanation && (
                        <div className="text-gray-600 text-xs ml-1">{example.explanation}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="userCode">
                    Your Solution
                  </label>
                  <div className="flex items-center text-xs text-gray-500">
                    <Code className="h-3 w-3 mr-1" />
                    JavaScript
                  </div>
                </div>
                <textarea
                  id="userCode"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={10}
                  className="w-full font-mono text-sm border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Write your code solution here..."
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={resetEvaluation}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Reset
                </button>
                
                <button
                  onClick={evaluateCode}
                  disabled={isEvaluating}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
                    ${isEvaluating 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                    }`}
                >
                  {isEvaluating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Evaluate Solution
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
              <HelpCircle className="h-12 w-12 text-emerald-200 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Challenge Selected</h3>
              <p className="text-gray-600 mb-4">
                Please select a coding challenge from the list to begin.
              </p>
            </div>
          )}
          
          {results && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Evaluation Results</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${results.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {results.passed ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Passed
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Needs Improvement
                    </>
                  )}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-center mb-2">
                  {results.totalScore}
                  <span className="text-gray-500 text-lg">/100</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-2">
                  {Object.entries(results.scores).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-medium capitalize text-sm mb-1">{key}</div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{ width: `${value}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center
                              ${value >= 90 ? 'bg-green-500' : 
                                value >= 75 ? 'bg-blue-500' : 
                                value >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          ></div>
                        </div>
                        <div className="text-xs mt-1">{value}/100</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Feedback:</h3>
                <p className="text-gray-700 mb-4">{results.feedback}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Strengths
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {results.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-1">•</span> {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-md border border-red-100">
                    <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Areas for Improvement
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {results.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-1">•</span> {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={resetEvaluation}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingEvaluator;