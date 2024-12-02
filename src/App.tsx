import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';
import { Layout } from './components/layout';
import { ProtectedRoute } from './components/auth/protected-route';
import { ROUTES } from './lib/config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;