import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { LeaderboardDto } from '../../types/backend';

export default function LeaderboardPage() {
  const { token } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const lb = await apiRequest<LeaderboardDto>('/api/Quiz/leaderboard?top=50', { token });
      setLeaderboard(lb);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard.');
      setLeaderboard(null);
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
          <h2>Leaderboard</h2>
          <p className="muted">Top users by total points.</p>
        </div>
        <button className="btn" type="button" onClick={load} disabled={isLoading}>
          Refresh
        </button>
      </div>

      {isLoading && <div className="page-state">Loading…</div>}
      {!isLoading && error && <div className="page-state page-error">{error}</div>}

      {!isLoading && !error && leaderboard && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.rankings.map((r) => (
              <tr key={r.userId}>
                <td>{r.rank}</td>
                <td>
                  <div style={{ fontWeight: 900, color: 'var(--text-dark)' }}>{r.userName}</div>
                  <div className="muted">{r.email}</div>
                </td>
                <td>
                  <span className="badge badge-success">{r.totalPoints}</span>
                </td>
                <td>{r.level}</td>
              </tr>
            ))}

            {leaderboard.rankings.length === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  No rankings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

