import { useState, useEffect } from 'react';
import './CandidateActivity.css';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

function CandidateActivity() {
  const [activeTab, setActiveTab] = useState('weekly');
  
  const [data, setData] = useState({
    weekly: [],
    monthly: [],
    yearly: []
  });

  const labels = {
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yearly: ['2021', '2022', '2023', '2024', '2025']
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidateActivity = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/candidate-activity');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const candidateActivityData = await response.json();
        // Extract relevant data for the weekly chart
        const weeklyActivityData = candidateActivityData.map(item => item.id);

        setData((prevState) => ({
          ...prevState,
          weekly: weeklyActivityData,
        }));
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch candidate activity:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidateActivity();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // You can add logic here to fetch different data based on the tab
    // For now, we'll just update the activeTab state
  };

  const handleViewReport = () => {
    alert('View Detailed Report functionality is not implemented yet.');
    // Implement the logic to view the detailed report
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
          <Button variant="ghost" size="small" onClick={handleViewReport}>View Detailed Report</Button>
        </div>
      }
    >
      {isLoading && <p>Loading candidate activity data...</p>}
      {error && <p>Error: {error}</p>}
      <div className="chart-tabs">
        <button 
          className={`chart-tab ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => handleTabChange('weekly')}
        >
          Weekly
        </button>
        <button
          className={`chart-tab ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => handleTabChange('monthly')}
        >
          Monthly
        </button>
        <button
          className={`chart-tab ${activeTab === 'yearly' ? 'active' : ''}`}
          onClick={() => handleTabChange('yearly')}
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