import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { loading, user, isAdmin } = useAuth();

  if (loading) {
    return <div className="p-8 text-center text-zinc-300">Checking access...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
