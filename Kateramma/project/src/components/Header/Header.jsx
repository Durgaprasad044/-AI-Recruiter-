import './Header.css';
import { useState, useEffect } from 'react';

const pageNames = {
  dashboard: 'Dashboard',
  resumeScreening: 'Resume Screening',
  interviewAgent: 'Interview Agent',
  candidateMessaging: 'Candidate Messaging',
  supportBot: 'Support Bot'
};

function Header({ activePage }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New candidate application for Software Engineer', read: false },
    { id: 2, message: 'Interview scheduled for tomorrow at 10:00 AM', read: false },
    { id: 3, message: 'Feedback received from hiring manager', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(note => 
      note.id === id ? { ...note, read: true } : note
    ));
  };

  const unreadCount = notifications.filter(note => !note.read).length;

  return (
    <header className="header">
      <div className="header-left">
        <h1>{pageNames[activePage]}</h1>
        <p className="date">{formatDate(currentTime)} | {formatTime(currentTime)}</p>
      </div>
      <div className="header-right">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
        <div className="notification-container">
          <button className="notification-button" onClick={toggleNotifications}>
            <span className="notification-icon">🔔</span>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <h3>Notifications</h3>
              {notifications.length > 0 ? (
                <ul className="notification-list">
                  {notifications.map(note => (
                    <li 
                      key={note.id} 
                      className={`notification-item ${note.read ? 'read' : 'unread'}`}
                      onClick={() => markAsRead(note.id)}
                    >
                      <span className="notification-message">{note.message}</span>
                      {!note.read && <span className="notification-status">New</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-notifications">No new notifications</p>
              )}
            </div>
          )}
        </div>
        <div className="user-profile">
          <div className="avatar">HR</div>
          <div className="user-info">
            <span className="user-name">HR Admin</span>
            <span className="user-role">Talent Acquisition</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;