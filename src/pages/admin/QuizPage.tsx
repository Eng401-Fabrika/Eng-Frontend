import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { LeaderboardDto, UserScoreDto } from '../../types/backend';

export default function QuizPage() {
  const { token } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardDto | null>(null);
  const [myScore, setMyScore] = useState<UserScoreDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const [score, lb] = await Promise.all([
        apiRequest<UserScoreDto>('/api/Quiz/my-score', { token }),
        apiRequest<LeaderboardDto>('/api/Quiz/leaderboard?top=10', { token }),
      ]);
      setMyScore(score);
      setLeaderboard(lb);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quiz data.');
      setMyScore(null);
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
          <h2>Quiz</h2>
          <p className="muted">Your score and the current leaderboard.</p>
        </div>
        <button className="btn" type="button" onClick={load} disabled={isLoading}>
          Refresh
        </button>
      </div>

      {isLoading && <div className="page-state">Loading…</div>}
      {!isLoading && error && <div className="page-state page-error">{error}</div>}

      {!isLoading && !error && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {myScore && (
            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 16,
                padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge">Level {myScore.level}</span>
                <span className="badge">Rank {myScore.rank}</span>
                <span className="badge badge-success">Total {myScore.totalPoints}</span>
                <span className="badge">Quiz {myScore.quizPoints}</span>
                <span className="badge">Tasks {myScore.taskPoints}</span>
              </div>
            </div>
          )}

          {leaderboard && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Quiz</th>
                  <th>Tasks</th>
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
                    <td>{r.quizPoints}</td>
                    <td>{r.taskPoints}</td>
                  </tr>
                ))}

                {leaderboard.rankings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="muted">
                      No rankings.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

