const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload setup (for resumes)
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.send('AI Recruiter Agent Backend is running!');
});

// Placeholder for Resume Screening API
app.post('/api/screen_resume', upload.single('resume'), (req, res) => {
  // TODO: Implement resume screening logic
  const jobDescription = req.body.jobDescription;
  const resumeFile = req.file;

  if (!resumeFile || !jobDescription) {
    return res.status(400).json({ error: 'Resume file and job description are required.' });
  }

  // Simulate processing
  console.log('Received job description:', jobDescription);
  console.log('Received resume:', resumeFile.originalname);
  res.json({ message: 'Resume received for screening.', data: { jobDescription, resumeName: resumeFile.originalname } });
});

// Placeholder for AI Interview Agent API
app.post('/api/interview', (req, res) => {
  // TODO: Implement AI interview logic
  const { candidateId, responses } = req.body;
  console.log('Received interview data for candidate:', candidateId, 'Responses:', responses);
  res.json({ message: 'Interview data received.', data: req.body });
});

// Placeholder for Smart Candidate Messaging API
app.post('/api/send_message', (req, res) => {
  // TODO: Implement smart candidate messaging logic
  const { candidateId, messageType, customContent } = req.body;
  console.log('Request to send message to candidate:', candidateId, 'Type:', messageType, 'Content:', customContent);
  res.json({ message: 'Message request received.', data: req.body });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});