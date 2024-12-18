import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn !== 'true') {
    return (<Navigate to='/login' replace />);
  }

  return children;
};

export default ProtectedRoute;