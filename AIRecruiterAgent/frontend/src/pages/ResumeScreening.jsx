import React, { useState } from 'react';
import axios from 'axios';

function ResumeScreening() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [screeningResult, setScreeningResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setScreeningResult(null);

    if (!jobDescription || !resumeFile) {
      setError('Please provide both a job description and a resume file.');
      return;
    }

    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resumeFile);

    try {
      // Replace with your backend API endpoint
      const response = await axios.post('http://localhost:5000/api/screen_resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setScreeningResult(response.data);
    } catch (err) {
      setError('Failed to screen resume. Please try again. Error: ' + (err.response?.data?.error || err.message));
      console.error("Screening error:", err);
    }
  };

  return (
    <div>
      <h1>Automated Resume Screening</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobDescription">Job Description:</label><br />
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="5"
            cols="50"
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="resume">Upload Resume (PDF, DOCX):</label><br />
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Screen Resume</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {screeningResult && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h2>Screening Result:</h2>
          <pre>{JSON.stringify(screeningResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumeScreening;