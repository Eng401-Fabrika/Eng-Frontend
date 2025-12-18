import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/admin/dashboard' : '/login'} replace />;
}

