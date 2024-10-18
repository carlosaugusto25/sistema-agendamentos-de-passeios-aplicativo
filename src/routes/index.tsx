import { useAuth } from '../context/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes: React.FC = () => {
  const { user } = useAuth();
  return !!user?.id ? <AppRoutes /> : <AuthRoutes />;
};
export default Routes;
