const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const candidateActivity = [
  { id: 1, candidate: 'John Doe', activity: 'Applied for Frontend Developer', date: '2024-05-24' },
  { id: 2, candidate: 'Jane Smith', activity: 'Interviewed for Backend Developer', date: '2024-05-23' },
  { id: 3, candidate: 'Peter Jones', activity: 'Offer sent for Data Scientist', date: '2024-05-22' }
];

app.get('/api/candidate-activity', (req, res) => {
  res.json(candidateActivity);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});