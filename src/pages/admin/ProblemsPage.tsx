import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { ProblemListDto } from '../../types/backend';

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default function ProblemsPage() {
  const { token } = useAuth();
  const [problems, setProblems] = useState<ProblemListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<ProblemListDto[]>('/api/Problem', { token });
      setProblems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load problems.');
      setProblems([]);
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
          <h2>Problems</h2>
          <p className="muted">Admin task/problem management.</p>
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
              <th>Priority</th>
              <th>Status</th>
              <th>Assignments</th>
              <th>Due</th>
              <th>Created</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>
                  <span className="badge">{p.priority}</span>
                </td>
                <td>
                  <span className="badge">{p.status}</span>
                </td>
                <td>{p.assignmentCount}</td>
                <td>{p.dueDate ? formatDate(p.dueDate) : '—'}</td>
                <td>{formatDate(p.createdAt)}</td>
                <td>{p.createdByUserName}</td>
              </tr>
            ))}

            {problems.length === 0 && (
              <tr>
                <td colSpan={7} className="muted">
                  No problems.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

