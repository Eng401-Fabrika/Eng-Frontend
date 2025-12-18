import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import HomeRedirect from './pages/HomeRedirect';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import DocumentsPage from './pages/admin/DocumentsPage';
import LeaderboardPage from './pages/admin/LeaderboardPage';
import MyAssignmentsPage from './pages/admin/MyAssignmentsPage';
import MyDocumentsPage from './pages/admin/MyDocumentsPage';
import PermissionsPage from './pages/admin/PermissionsPage';
import ProblemsPage from './pages/admin/ProblemsPage';
import QuizPage from './pages/admin/QuizPage';
import QuizQuestionsPage from './pages/admin/QuizQuestionsPage';
import RolesPage from './pages/admin/RolesPage';
import UsersPage from './pages/admin/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />

        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="my-documents" element={<MyDocumentsPage />} />
            <Route path="my-assignments" element={<MyAssignmentsPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />

            <Route path="users" element={<UsersPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="permissions" element={<PermissionsPage />} />

            <Route path="documents" element={<DocumentsPage />} />
            <Route path="problems" element={<ProblemsPage />} />
            <Route path="quiz-questions" element={<QuizQuestionsPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

