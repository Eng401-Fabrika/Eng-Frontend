import { useAuth } from '../../auth/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="content-card">
      <h2>Welcome</h2>
      <p className="muted">
        Use the sidebar to navigate through modules available for your roles.
      </p>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <div>
          <span className="badge">User</span>{' '}
          <span className="badge">{user?.name ?? '—'}</span>
        </div>
        <div>
          <span className="badge">Email</span>{' '}
          <span className="badge">{user?.email ?? '—'}</span>
        </div>
        <div>
          <span className="badge">Roles</span>{' '}
          {user?.roles?.length ? (
            user.roles.map((r) => (
              <span key={r} className="badge">
                {r}
              </span>
            ))
          ) : (
            <span className="badge">—</span>
          )}
        </div>
      </div>
    </div>
  );
}

