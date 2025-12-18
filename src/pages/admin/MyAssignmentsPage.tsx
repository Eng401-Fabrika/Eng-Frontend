import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { MyAssignmentDto } from '../../types/backend';

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default function MyAssignmentsPage() {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState<MyAssignmentDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest<MyAssignmentDto[]>('/api/Problem/my-assignments', { token });
      setAssignments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assignments.');
      setAssignments([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const accept = async (assignmentId: string) => {
    if (!token) return;
    await apiRequest('/api/Problem/assignments/' + assignmentId + '/accept', {
      method: 'POST',
      token,
    });
    setAssignments((prev) =>
      prev.map((a) =>
        a.assignmentId === assignmentId ? { ...a, status: 'Accepted' } : a,
      ),
    );
  };

  return (
    <div className="content-card">
      <div className="page-toolbar">
        <div>
          <h2>My Assignments</h2>
          <p className="muted">Tasks assigned to you.</p>
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
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned By</th>
              <th>Due</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.assignmentId}>
                <td>
                  <div style={{ fontWeight: 900, color: 'var(--text-dark)' }}>{a.problemTitle}</div>
                  {a.problemDescription && <div className="muted">{a.problemDescription}</div>}
                </td>
                <td>
                  <span className="badge">{a.status}</span>
                </td>
                <td>
                  <span className="badge">{a.problemPriority}</span>
                </td>
                <td>{a.assignedByUserName}</td>
                <td>{a.dueDate ? formatDate(a.dueDate) : '—'}</td>
                <td style={{ textAlign: 'right' }}>
                  {a.status === 'Pending' ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => accept(a.assignmentId)}
                    >
                      Accept
                    </button>
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
              </tr>
            ))}

            {assignments.length === 0 && (
              <tr>
                <td colSpan={6} className="muted">
                  No assignments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

