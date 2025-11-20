import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (section: 'documentation' | 'actions') => {
    navigate(`/admin/${section}`);
  };

  return (
    <div className="dashboard">
      {/* Section A - Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Your Admin Panel</h1>
          <p className="hero-subtitle">
            Manage your application with ease and efficiency
          </p>
          <div className="hero-image">
            <div className="hero-illustration">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="80" fill="url(#grad1)" opacity="0.2" />
                <circle cx="100" cy="100" r="60" fill="url(#grad1)" opacity="0.4" />
                <circle cx="100" cy="100" r="40" fill="url(#grad1)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>↓</span>
        </div>
      </section>

      {/* Section B - CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Choose Your Path</h2>
          <p>
            Access documentation to learn more or dive into actions to start managing your system
          </p>
        </div>
      </section>

      {/* Section C - Navigation Cards */}
      <section className="navigation-section">
        <div className="navigation-cards">
          <div
            className="nav-card"
            onClick={() => handleCardClick('documentation')}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleCardClick('documentation')}
          >
            <div className="nav-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>Dökümantasyon</h3>
            <p>Browse guides, references, and documentation</p>
          </div>

          <div
            className="nav-card"
            onClick={() => handleCardClick('actions')}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleCardClick('actions')}
          >
            <div className="nav-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h3>Aksiyonlar</h3>
            <p>Perform actions and manage your system</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
