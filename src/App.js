import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  return (
    <div className="container">
      {loggedInUser ? (
        <>
          {loggedInUser.userType === 'admin' ? (
            <AdminDashboard />
          ) : loggedInUser.userType === 'user' ? (
            <UserDashboard />
          ) : (
            <p>Invalid userType: {loggedInUser.userType}</p>
          )}
        </>
      ) : (
        <>
          {registeredSuccessfully ? (
            <div className="alert-box">
              {/* <p>
                Registered successfully! Go to{' '}
                <button onClick={() => setShowRegisterForm(true)}>Login</button>
              </p> */}
            </div>
          ) : (
            <>
              {showRegisterForm ? (
                <>
                  <RegisterForm
                    onRegister={() => setRegisteredSuccessfully(true)}
                    onToggleForm={() => setShowRegisterForm(false)}
                    onRegisteredSuccessfully={() => setShowRegisterForm(true)} 
                  />
                </>
              ) : (
                <>
                  <LoginForm
                    onLogin={(email, userType) => setLoggedInUser({ email, userType })}
                    onToggleForm={() => setShowRegisterForm(true)}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;