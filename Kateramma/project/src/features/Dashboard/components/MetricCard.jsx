import './MetricCard.css';
import Card from '../../../components/UI/Card';

function MetricCard({ title, value, change, trend, icon }) {
  return (
    <Card className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-value">{value}</div>
        <div className={`metric-change ${trend}`}>
          {change}
          <span className="trend-icon">
            {trend === 'up' ? '↑' : '↓'}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default MetricCard;