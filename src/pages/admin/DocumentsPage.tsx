import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { DocumentListDto } from '../../types/backend';

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default function DocumentsPage() {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<DocumentListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<DocumentListDto[]>('/api/Document', { token });
      setDocuments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents.');
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleActive = async (doc: DocumentListDto) => {
    if (!token) return;
    await apiRequest('/api/Document/' + doc.id + '/status', {
      method: 'PATCH',
      body: JSON.stringify({ isActive: !doc.isActive }),
      token,
    });
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
  };

  return (
    <div className="content-card">
      <div className="page-toolbar">
        <div>
          <h2>Documents</h2>
          <p className="muted">Admin document management (active documents only).</p>
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
              <th>Title</th>
              <th>File</th>
              <th>Roles</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id}>
                <td>
                  <div style={{ fontWeight: 900, color: 'var(--text-dark)' }}>{d.title}</div>
                  {d.description && <div className="muted">{d.description}</div>}
                </td>
                <td>{d.fileName}</td>
                <td>
                  {d.assignedRoles?.length
                    ? d.assignedRoles.map((r) => (
                        <span key={r} className="badge">
                          {r}
                        </span>
                      ))
                    : '—'}
                </td>
                <td>{formatDate(d.createdAt)}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn" type="button" onClick={() => toggleActive(d)}>
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}

            {documents.length === 0 && (
              <tr>
                <td colSpan={5} className="muted">
                  No documents.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

