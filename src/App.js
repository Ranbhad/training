import React, { useState } from 'react';
import MasterLogin from './MasterLogin';
import RegisterForm from './RegisterForm';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import LoginForm from './LoginForm';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  return (
    <div className="container">
      {loggedInUser ? (
        <>
          {loggedInUser.userType === 'admin' ? (
            <AdminDashboard onBackToLogin={() => setLoggedInUser(null)} loggedInUser={loggedInUser} />
          ) : loggedInUser.userType === 'user' ? (
            <UserDashboard onBackToLogin={() => setLoggedInUser(null)} loggedInUser={loggedInUser} />
          ) : (
            <p>Invalid userType: {loggedInUser.userType}</p>
          )}
        </>
      ) : (
        <>
{registeredSuccessfully ? (
  <div className="alert-box">
    <p>
      Registered successfully! Go to{' '}
      <button onClick={() => setShowRegisterForm(false)}>Login</button>
    </p>
  </div>
) : (
  <>
    {showRegisterForm ? (
      <RegisterForm
        onRegister={() => setRegisteredSuccessfully(true)}
        onToggleForm={() => setShowRegisterForm(false)}
      />
    ) : (
      <LoginForm
        onLogin={(email, userType) => setLoggedInUser({ email, userType })}
        onToggleForm={() => setShowRegisterForm(true)}
      />
    )}
  </>
)}

        </>
      )}
    </div>
  );
};

export default App;
