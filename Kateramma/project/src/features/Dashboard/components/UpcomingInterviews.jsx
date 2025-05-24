import './UpcomingInterviews.css';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

function UpcomingInterviews() {
  const interviews = [
    {
      id: 1,
      candidate: 'Alex Johnson',
      position: 'Senior Frontend Developer',
      date: 'Today',
      time: '11:00 AM',
      interviewer: 'Sarah Chen',
      type: 'Technical'
    },
    {
      id: 2,
      candidate: 'Maya Patel',
      position: 'UX/UI Designer',
      date: 'Today',
      time: '2:30 PM',
      interviewer: 'David Kim',
      type: 'Portfolio'
    },
    {
      id: 3,
      candidate: 'Carlos Rodriguez',
      position: 'Product Manager',
      date: 'Tomorrow',
      time: '10:00 AM',
      interviewer: 'Lisa Wong',
      type: 'Behavioral'
    },
    {
      id: 4,
      candidate: 'Emily Wilson',
      position: 'DevOps Engineer',
      date: 'Tomorrow',
      time: '3:00 PM',
      interviewer: 'Michael Taylor',
      type: 'Technical'
    }
  ];

  return (
    <Card 
      title="Upcoming Interviews" 
      footer={<Button variant="ghost" size="small">View Full Schedule</Button>}
    >
      <div className="interviews-list">
        {interviews.map(interview => (
          <div key={interview.id} className="interview-item">
            <div className="interview-time">
              <div className="interview-date">{interview.date}</div>
              <div className="interview-hour">{interview.time}</div>
            </div>
            <div className="interview-details">
              <h4 className="candidate-name">{interview.candidate}</h4>
              <div className="interview-position">{interview.position}</div>
              <div className="interview-meta">
                <span className="interview-interviewer">{interview.interviewer}</span>
                <span className={`interview-type ${interview.type.toLowerCase()}`}>
                  {interview.type}
                </span>
              </div>
            </div>
            <div className="interview-actions">
              <Button variant="outline" size="small">Details</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default UpcomingInterviews;