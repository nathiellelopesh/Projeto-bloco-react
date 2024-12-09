import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context';

const ProtectedRoute = () => {
    const { user } = useAppContext()

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
//