import { Navigate } from 'react-router-dom';

// Check if the user is authenticated by looking for the token in local storage
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children components (e.g., Dashboard)
  return children;
}

export default ProtectedRoute;
