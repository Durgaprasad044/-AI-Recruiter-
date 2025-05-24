import './RecentJobs.css';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

function RecentJobs() {
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      applicants: 42,
      posted: '5 days ago',
      status: 'active'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      applicants: 36,
      posted: '1 week ago',
      status: 'active'
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      applicants: 28,
      posted: '2 weeks ago',
      status: 'active'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Seattle, WA',
      applicants: 15,
      posted: '3 weeks ago',
      status: 'paused'
    }
  ];

  return (
    <Card 
      title="Recent Job Postings" 
      footer={<Button variant="ghost" size="small">View All Jobs</Button>}
    >
      <div className="jobs-list">
        {jobs.map(job => (
          <div key={job.id} className="job-item">
            <div className="job-info">
              <h4 className="job-title">{job.title}</h4>
              <div className="job-meta">
                <span className="job-department">{job.department}</span>
                <span className="job-location">{job.location}</span>
              </div>
            </div>
            <div className="job-stats">
              <div className="job-applicants">
                <span className="applicants-count">{job.applicants}</span>
                <span className="applicants-label">Applicants</span>
              </div>
              <div className="job-date">{job.posted}</div>
              <div className={`job-status ${job.status}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RecentJobs;