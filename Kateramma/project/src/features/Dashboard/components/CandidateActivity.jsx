import { useState } from 'react';
import './CandidateActivity.css';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

function CandidateActivity() {
  const [activeTab, setActiveTab] = useState('weekly');
  
  // Sample data
  const data = {
    weekly: [25, 38, 42, 30, 35, 20, 28],
    monthly: [120, 145, 165, 180, 172, 190, 210, 205, 220, 215, 230, 245],
    yearly: [1200, 1450, 1700, 2000, 1950]
  };
  
  const labels = {
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yearly: ['2021', '2022', '2023', '2024', '2025']
  };
  
  const maxValue = Math.max(...data[activeTab]);
  
  return (
    <Card 
      title="Candidate Activity" 
      subtitle="Overview of application submissions"
      footer={
        <div className="chart-footer">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color"></div>
              <span>New Applications</span>
            </div>
          </div>
          <Button variant="ghost" size="small">View Detailed Report</Button>
        </div>
      }
    >
      <div className="chart-tabs">
        <button 
          className={`chart-tab ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly
        </button>
        <button 
          className={`chart-tab ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly
        </button>
        <button 
          className={`chart-tab ${activeTab === 'yearly' ? 'active' : ''}`}
          onClick={() => setActiveTab('yearly')}
        >
          Yearly
        </button>
      </div>
      
      <div className="chart-container">
        <div className="chart">
          {data[activeTab].map((value, index) => (
            <div className="chart-column" key={index}>
              <div 
                className="chart-bar" 
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  animationDelay: `${index * 0.1}s`
                }}
                data-value={value}
              ></div>
              <div className="chart-label">{labels[activeTab][index]}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default CandidateActivity;