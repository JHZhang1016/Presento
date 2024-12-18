import Navbar from './Navbar'
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Workplace from './Workplace';
import Preview from './Preview';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import { Routes, Route, useLocation } from 'react-router-dom';

const Layout = () => {
  const useNavbarVisibility = () => {
    const location = useLocation();
    const hideNavbarPaths = ['/', '/preview/:id'];

    return !hideNavbarPaths.some((path) => {
      const regex = new RegExp(`^${path.replace(/:\w+/g, '[^/]+')}$`);
      return regex.test(location.pathname);
    });
  };

  const isNavbarVisible = useNavbarVisibility();

  return (
    <>
      {isNavbarVisible && <Navbar />}
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/presentation/:id' element={<ProtectedRoute><Workplace /></ProtectedRoute>} />
        <Route path='/preview/:id' element={<Preview />} />
        <Route path='*' element={<Welcome />} />
      </Routes>
    </>
  )
}

export default Layout;