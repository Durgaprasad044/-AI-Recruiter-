// UploadResumeForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function UploadResumeForm() {
  const [jdText, setJdText] = useState('');
  const [resumes, setResumes] = useState('');

  const uploadJD = async () => {
    await axios.post('http://localhost:8000/screen/upload-jd', { jd_text: jdText });
    alert('Job description uploaded.');
  };

  const uploadResumes = async () => {
    const parsed = JSON.parse(resumes);
    await axios.post('http://localhost:8000/screen/upload-resumes', parsed);
    alert('Resumes uploaded.');
  };

  return (
    <div className="section">
      <textarea
        className="textarea"
        rows="3"
        placeholder="Paste job description here..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />
      <button className="button blue" onClick={uploadJD}>Upload JD</button>

      <textarea
        className="textarea"
        rows="5"
        placeholder='Paste resumes JSON here...'
        value={resumes}
        onChange={(e) => setResumes(e.target.value)}
      />
      <button className="button green" onClick={uploadResumes}>Upload Resumes</button>
    </div>
  );
}
