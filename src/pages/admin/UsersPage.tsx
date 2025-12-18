import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { UserListDto } from '../../types/backend';

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default function UsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<UserListDto[]>('/api/User', { token });
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleActive = async (user: UserListDto) => {
    if (!token) return;
    await apiRequest('/api/User/' + user.id + '/status', {
      method: 'PATCH',
      body: JSON.stringify({ isActive: !user.isActive }),
      token,
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)),
    );
  };

  return (
    <div className="content-card">
      <div className="page-toolbar">
        <div>
          <h2>Users</h2>
          <p className="muted">Manage application users and their statuses.</p>
        </div>
        <button className="btn" type="button" onClick={load} disabled={isLoading}>
          Refresh
        </button>
      </div>

      {isLoading && <div className="page-state">Loading…</div>}
      {!isLoading && error && <div className="page-state page-error">{error}</div>}

      {!isLoading && !error && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Roles</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={`badge ${u.isActive ? 'badge-success' : 'badge-danger'}`}
                  >
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  {u.roles?.length
                    ? u.roles.map((r) => (
                        <span key={r} className="badge">
                          {r}
                        </span>
                      ))
                    : '—'}
                </td>
                <td>{formatDate(u.createdAt)}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn" type="button" onClick={() => toggleActive(u)}>
                    Toggle
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="muted">
                  No users.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

