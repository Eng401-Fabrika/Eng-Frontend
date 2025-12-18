import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { RoleDto } from '../../types/backend';

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default function RolesPage() {
  const { token } = useAuth();
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<RoleDto[]>('/api/RolePermission/roles', { token });
      setRoles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load roles.');
      setRoles([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="content-card">
      <div className="page-toolbar">
        <div>
          <h2>Roles</h2>
          <p className="muted">Roles and their assigned permissions.</p>
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
              <th>System</th>
              <th>Permissions</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td>
                  <div style={{ fontWeight: 900, color: 'var(--text-dark)' }}>{r.name}</div>
                  {r.description && <div className="muted">{r.description}</div>}
                </td>
                <td>
                  <span className={`badge ${r.isSystemRole ? 'badge-success' : ''}`}>
                    {r.isSystemRole ? 'System' : 'Custom'}
                  </span>
                </td>
                <td>{r.permissions?.length ?? 0}</td>
                <td>{formatDate(r.createdAt)}</td>
              </tr>
            ))}

            {roles.length === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  No roles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

