import React, { useState } from 'react';
import { Upload, FileText, Star, User, Mail, Phone } from 'lucide-react';

const ResumeScreening = ({ onCandidatesRanked }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rankedCandidates, setRankedCandidates] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setResumes(files);
  };

  const processResumes = async () => {
    if (!jobDescription.trim() || resumes.length === 0) {
      alert('Please provide job description and upload at least one resume');
      return;
    }

    setIsProcessing(true);
    
    // Mock AI processing delay
    setTimeout(() => {
      const mockCandidates = [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          score: 95,
          matchReason: 'Excellent match with 5+ years React experience, strong backend skills, and leadership experience',
          skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Team Leadership'],
          experience: '6 years',
          education: 'MS Computer Science'
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          phone: '+1 (555) 234-5678',
          score: 88,
          matchReason: 'Strong technical skills with relevant project experience, minor gap in cloud technologies',
          skills: ['JavaScript', 'Python', 'React', 'MongoDB', 'Docker'],
          experience: '4 years',
          education: 'BS Software Engineering'
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          email: 'emily.rodriguez@email.com',
          phone: '+1 (555) 345-6789',
          score: 82,
          matchReason: 'Good foundation with some relevant experience, would benefit from additional training',
          skills: ['HTML/CSS', 'JavaScript', 'React', 'Git', 'Agile'],
          experience: '2 years',
          education: 'BS Computer Science'
        }
      ];
      
      setRankedCandidates(mockCandidates);
      setIsProcessing(false);
      
      if (onCandidatesRanked) {
        onCandidatesRanked(mockCandidates);
      }
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <FileText className="mr-2" />
          Automated Resume Screening
        </h2>
        <p className="text-gray-600">Upload resumes and get AI-powered candidate rankings based on job requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Job Description Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter the job description including required skills, experience, and qualifications..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Resume Upload */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resumes
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <input
                type="file"
                multiple
                accept=".pdf,.json,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-800">Click to upload</span>
                <span className="text-gray-500"> or drag and drop</span>
              </label>
              <p className="text-sm text-gray-500 mt-1">PDF, JSON, DOC, DOCX up to 10MB each</p>
              {resumes.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  {resumes.length} file(s) selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Process Button */}
      <div className="mb-6">
        <button
          onClick={processResumes}
          disabled={isProcessing || !jobDescription.trim() || resumes.length === 0}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Resumes...
            </>
          ) : (
            'Screen & Rank Candidates'
          )}
        </button>
      </div>

      {/* Results */}
      {rankedCandidates.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ranked Candidates ({rankedCandidates.length})
          </h3>
          <div className="space-y-4">
            {rankedCandidates.map((candidate, index) => (
              <div key={candidate.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {candidate.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {candidate.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {candidate.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-semibold flex items-center ${getScoreColor(candidate.score)}`}>
                    <Star className="w-4 h-4 mr-1" />
                    {candidate.score}%
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Experience: </span>
                    <span className="text-sm text-gray-600">{candidate.experience}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Education: </span>
                    <span className="text-sm text-gray-600">{candidate.education}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Key Skills: </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {candidate.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">AI Assessment: </span>
                  <p className="text-sm text-gray-600 mt-1">{candidate.matchReason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeScreening;