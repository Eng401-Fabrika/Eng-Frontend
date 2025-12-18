import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import type { DocumentListDto, QuestionWithAnswerDto } from '../../types/backend';

export default function QuizQuestionsPage() {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<DocumentListDto[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>('');
  const [questions, setQuestions] = useState<QuestionWithAnswerDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedDocument = useMemo(
    () => documents.find((d) => d.id === selectedDocumentId) ?? null,
    [documents, selectedDocumentId],
  );

  const loadDocuments = useCallback(async () => {
    if (!token) return;
    const data = await apiRequest<DocumentListDto[]>('/api/Document', { token });
    setDocuments(data);
    if (!selectedDocumentId && data.length > 0) setSelectedDocumentId(data[0].id);
  }, [token, selectedDocumentId]);

  const loadQuestions = useCallback(async () => {
    if (!token || !selectedDocumentId) return;
    const data = await apiRequest<QuestionWithAnswerDto[]>(
      '/api/Quiz/questions/document/' + selectedDocumentId,
      { token },
    );
    setQuestions(data);
  }, [token, selectedDocumentId]);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      await loadDocuments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents.');
      setDocuments([]);
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, loadDocuments]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!token || !selectedDocumentId) return;
    setError(null);
    loadQuestions().catch((err: unknown) =>
      setError(err instanceof Error ? err.message : 'Failed to load questions.'),
    );
  }, [token, selectedDocumentId, loadQuestions]);

  return (
    <div className="content-card">
      <div className="page-toolbar">
        <div>
          <h2>Quiz Questions</h2>
          <p className="muted">Questions per document (admin).</p>
        </div>
        <button className="btn" type="button" onClick={load} disabled={isLoading}>
          Refresh
        </button>
      </div>

      {isLoading && <div className="page-state">Loading…</div>}
      {!isLoading && error && <div className="page-state page-error">{error}</div>}

      {!isLoading && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontWeight: 800,
                marginBottom: 8,
                color: 'var(--text-dark)',
              }}
            >
              Document
            </label>
            <select
              value={selectedDocumentId}
              onChange={(e) => setSelectedDocumentId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 12,
                border: '2px solid var(--border-color)',
                background: 'var(--bg-white)',
                fontWeight: 700,
              }}
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
            {selectedDocument && (
              <div className="muted" style={{ marginTop: 8 }}>
                Showing questions for: <strong>{selectedDocument.title}</strong>
              </div>
            )}
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Points</th>
                <th>Difficulty</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>
                    <div style={{ fontWeight: 900, color: 'var(--text-dark)' }}>{q.questionText}</div>
                    <div
                      style={{
                        marginTop: 8,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                      }}
                    >
                      {q.options.map((opt, idx) => (
                        <span
                          key={opt + idx}
                          className={`badge ${idx === q.correctAnswerIndex ? 'badge-success' : ''}`}
                        >
                          {idx + 1}. {opt}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{q.points}</td>
                  <td>{q.difficulty}</td>
                  <td>
                    <span className="badge badge-success">{q.correctAnswerIndex + 1}</span>
                  </td>
                </tr>
              ))}

              {questions.length === 0 && (
                <tr>
                  <td colSpan={4} className="muted">
                    No questions for this document.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

