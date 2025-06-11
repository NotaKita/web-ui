import { Routes, Route } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import Auth from '@/pages/auth/Auth';
import Home from '@/pages/home/Home';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.AUTH} element={<Auth />} />
      <Route
        path={ROUTE_PATHS.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
