import { useState } from 'react';
import './Sidebar.css';

function Sidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'resumeScreening', label: 'Resume Screening', icon: '📄' },
    { id: 'interviewAgent', label: 'Interview Agent', icon: '💬' },
    { id: 'candidateMessaging', label: 'Candidate Messaging', icon: '✉️' },
    { id: 'supportBot', label: 'Support Bot', icon: '🤖' }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-icon">🧠</span>
            {!collapsed && <h2 className="logo-text">AI Recruiter</h2>}
          </div>
        </div>
        <button className="toggle-button" onClick={toggleSidebar}>
          {collapsed ? '▶' : '◀'}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navigationItems.map(item => (
            <li key={item.id} className={activePage === item.id ? 'active' : ''}>
              <button 
                className="nav-item" 
                onClick={() => setActivePage(item.id)}
                title={collapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="version">
          {!collapsed && <span>Version 1.0.0</span>}
        </div>
        <button className="help-button">
          <span className="help-icon">❓</span>
          {!collapsed && <span>Help & Support</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;