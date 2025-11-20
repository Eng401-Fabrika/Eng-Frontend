import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './AdminPanel.css';

const AdminPanel = () => {
  const { section } = useParams<{ section: 'documentation' | 'actions' }>();

  return (
    <div className="admin-panel">
      <Sidebar section={section as 'documentation' | 'actions'} />

      <main className="admin-content">
        <header className="admin-header">
          <h1>
            {section === 'documentation' ? 'Dökümantasyon' : 'Aksiyonlar'}
          </h1>
          <div className="admin-header-actions">
            <button className="header-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button className="header-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <div className="user-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </header>

        <div className="admin-main">
          <div className="content-wrapper">
            {section === 'documentation' ? (
              <div className="documentation-content">
                <div className="content-card">
                  <h2>Welcome to Documentation</h2>
                  <p>
                    Browse through our comprehensive documentation to learn about all features
                    and capabilities of the admin panel.
                  </p>

                  <div className="info-grid">
                    <div className="info-card">
                      <div className="info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                      </div>
                      <h3>Getting Started</h3>
                      <p>Quick start guide to help you get up and running quickly.</p>
                    </div>

                    <div className="info-card">
                      <div className="info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                      </div>
                      <h3>API Reference</h3>
                      <p>Complete API documentation with examples and best practices.</p>
                    </div>

                    <div className="info-card">
                      <div className="info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                      </div>
                      <h3>Guides</h3>
                      <p>Step-by-step tutorials for common tasks and workflows.</p>
                    </div>

                    <div className="info-card">
                      <div className="info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                      </div>
                      <h3>Examples</h3>
                      <p>Real-world examples and code snippets to help you learn.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="actions-content">
                <div className="content-card">
                  <h2>Actions Dashboard</h2>
                  <p>
                    Manage your system, users, and settings from this central control panel.
                  </p>

                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div className="stat-details">
                        <h3>Total Users</h3>
                        <p className="stat-value">1,234</p>
                        <span className="stat-change positive">+12% this month</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="9"></rect>
                          <rect x="14" y="3" width="7" height="5"></rect>
                          <rect x="14" y="12" width="7" height="9"></rect>
                          <rect x="3" y="16" width="7" height="5"></rect>
                        </svg>
                      </div>
                      <div className="stat-details">
                        <h3>Active Sessions</h3>
                        <p className="stat-value">856</p>
                        <span className="stat-change positive">+8% this week</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="20" x2="18" y2="10"></line>
                          <line x1="12" y1="20" x2="12" y2="4"></line>
                          <line x1="6" y1="20" x2="6" y2="14"></line>
                        </svg>
                      </div>
                      <div className="stat-details">
                        <h3>Performance</h3>
                        <p className="stat-value">98.5%</p>
                        <span className="stat-change positive">+2.5% uptime</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M12 1v6m0 6v6m5.657-13.657l-4.243 4.243m-2.828 2.828l-4.243 4.243m16.97 0l-4.243-4.243m-2.828-2.828l-4.243-4.243"></path>
                        </svg>
                      </div>
                      <div className="stat-details">
                        <h3>System Health</h3>
                        <p className="stat-value">Excellent</p>
                        <span className="stat-change">All systems operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
