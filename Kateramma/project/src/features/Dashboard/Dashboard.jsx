import './Dashboard.css';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import MetricCard from './components/MetricCard';
import CandidateActivity from './components/CandidateActivity';
import RecentJobs from './components/RecentJobs';
import UpcomingInterviews from './components/UpcomingInterviews';

function Dashboard() {
  const metrics = [
    { 
      title: 'Active Candidates', 
      value: 284, 
      change: '+12%', 
      trend: 'up',
      icon: '👥'
    },
    { 
      title: 'Open Positions', 
      value: 27, 
      change: '+3', 
      trend: 'up',
      icon: '📋'
    },
    { 
      title: 'Interviews Scheduled', 
      value: 48, 
      change: '+5', 
      trend: 'up',
      icon: '📅'
    },
    { 
      title: 'Time to Hire', 
      value: '18 days', 
      change: '-2 days', 
      trend: 'down',
      icon: '⏱️'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Recruitment Dashboard</h1>
          <p className="dashboard-subtitle">
            Your AI recruitment assistant overview and analytics
          </p>
        </div>
        <div className="dashboard-actions">
          <Button variant="outline" icon="📊">Export Report</Button>
          <Button icon="➕">Create New Job</Button>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>

      <div className="dashboard-row">
        <div className="dashboard-col-wide">
          <CandidateActivity />
        </div>
        <div className="dashboard-col-narrow">
          <Card title="Recruitment Funnel" className="funnel-card">
            <div className="funnel">
              <div className="funnel-stage">
                <div className="stage-label">
                  <span className="stage-name">Applications</span>
                  <span className="stage-value">483</span>
                </div>
                <div className="stage-bar" style={{ width: '100%' }}></div>
              </div>
              <div className="funnel-stage">
                <div className="stage-label">
                  <span className="stage-name">Screening</span>
                  <span className="stage-value">187</span>
                </div>
                <div className="stage-bar" style={{ width: '80%' }}></div>
              </div>
              <div className="funnel-stage">
                <div className="stage-label">
                  <span className="stage-name">Interview</span>
                  <span className="stage-value">84</span>
                </div>
                <div className="stage-bar" style={{ width: '60%' }}></div>
              </div>
              <div className="funnel-stage">
                <div className="stage-label">
                  <span className="stage-name">Assessment</span>
                  <span className="stage-value">42</span>
                </div>
                <div className="stage-bar" style={{ width: '40%' }}></div>
              </div>
              <div className="funnel-stage">
                <div className="stage-label">
                  <span className="stage-name">Offer</span>
                  <span className="stage-value">18</span>
                </div>
                <div className="stage-bar" style={{ width: '20%' }}></div>
              </div>
              <div className="funnel-stage">
                <div className="stage-label">
                  <span className="stage-name">Hired</span>
                  <span className="stage-value">12</span>
                </div>
                <div className="stage-bar" style={{ width: '10%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-col">
          <RecentJobs />
        </div>
        <div className="dashboard-col">
          <UpcomingInterviews />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;