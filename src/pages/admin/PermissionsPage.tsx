import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { PermissionsByCategoryDto } from '../../types/backend';

export default function PermissionsPage() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<PermissionsByCategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<PermissionsByCategoryDto[]>(
        '/api/RolePermission/permissions',
        { token },
      );
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load permissions.');
      setCategories([]);
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
          <h2>Permissions</h2>
          <p className="muted">Browse permissions grouped by category.</p>
        </div>
        <button className="btn" type="button" onClick={load} disabled={isLoading}>
          Refresh
        </button>
      </div>

      {isLoading && <div className="page-state">Loading…</div>}
      {!isLoading && error && <div className="page-state page-error">{error}</div>}

      {!isLoading && !error && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {categories.map((c) => (
            <div
              key={c.category}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 16,
                padding: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div style={{ fontWeight: 900, color: 'var(--text-dark)' }}>{c.category}</div>
                <span className="badge">{c.permissions.length}</span>
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {c.permissions.map((p) => (
                  <span key={p.id} className="badge" title={p.name}>
                    {p.displayName || p.name}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {categories.length === 0 && <div className="page-state">No permissions.</div>}
        </div>
      )}
    </div>
  );
}

