import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { mockResumes } from '../utils/mockData';
import FileUpload from '../components/FileUpload';

const ResumeScreening = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedResumes, setUploadedResumes] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | any[]>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResumeUpload = (fileName: string) => {
    setUploadedResumes((prev) => [...prev, fileName]);
  };

  const removeResume = (index: number) => {
    setUploadedResumes((prev) => prev.filter((_, i) => i !== index));
  };

  const analyzeResumes = () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    if (uploadedResumes.length === 0) {
      setError('Please upload at least one resume');
      return;
    }

    setError(null);
    setIsAnalyzing(true);

    // Simulate API call with delay
    setTimeout(() => {
      // Shuffle and slice mock data to simulate results
      const shuffled = [...mockResumes].sort(() => 0.5 - Math.random());
      const rankedResults = shuffled.slice(0, uploadedResumes.length).map((resume, index) => ({
        ...resume,
        match: 95 - (index * 5 + Math.floor(Math.random() * 5)),
        fileName: uploadedResumes[index],
      }));

      setResults(rankedResults.sort((a, b) => b.match - a.match));
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setResults(null);
    setUploadedResumes([]);
    setJobDescription('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Resume Screening</h1>
      <p className="text-lg text-gray-700 mb-8">
        Upload candidate resumes and a job description to automatically rank candidates based on match score.
      </p>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {results ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Analysis Results</h2>
            <button
              onClick={resetAnalysis}
              className="text-blue-600 hover:text-blue-800"
            >
              Start New Analysis
            </button>
          </div>

          <div className="space-y-4">
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  result.match > 80 
                    ? 'border-green-200 bg-green-50' 
                    : result.match > 60 
                      ? 'border-yellow-200 bg-yellow-50' 
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-lg">{result.name}</div>
                    <div className="text-gray-600 text-sm mb-2">
                      {result.fileName} • {result.experience} years experience
                    </div>
                    <div className="text-sm text-gray-700 mb-2">{result.skills.join(', ')}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      result.match > 80 
                        ? 'text-green-600' 
                        : result.match > 60 
                          ? 'text-yellow-600' 
                          : 'text-gray-600'
                    }`}>
                      {result.match}%
                    </div>
                    <div className="text-sm text-gray-500">match score</div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Key Strengths</div>
                  <div className="flex flex-wrap gap-2">
                    {result.strengths.map((strength: string, i: number) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Check className="h-3 w-3 mr-1" />
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full border border-gray-300 rounded-lg p-3 h-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>
            <FileUpload onFileUpload={handleResumeUpload} acceptedFileTypes=".pdf,.docx,.doc" />

            {uploadedResumes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files ({uploadedResumes.length})</h3>
                <ul className="space-y-2">
                  {uploadedResumes.map((file, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span className="text-sm text-gray-600">{file}</span>
                      <button 
                        onClick={() => removeResume(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {!results && (
        <div className="flex justify-center">
          <button
            onClick={analyzeResumes}
            disabled={isAnalyzing}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm 
              ${isAnalyzing 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Resumes...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Analyze Resumes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeScreening;