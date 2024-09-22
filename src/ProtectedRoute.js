import React ,{useEffect,useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const [delayedAuth, setDelayedAuth] = useState(null);
  const { isAuthenticated } =  useAuth();
console.log('isAuthenticated',isAuthenticated);
useEffect(() => {
  const timer = setTimeout(() => {
    setDelayedAuth(isAuthenticated);
  }, 2000);

  return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
}, [isAuthenticated]);
//console.log('children',children);
if (delayedAuth === null) {
  return <div>Loading...</div>; // Optionally show a loading state
}
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  return children;
};

export default ProtectedRoute;
