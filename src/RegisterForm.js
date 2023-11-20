import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onRegister, onToggleForm, onRegisteredSuccessfully }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userType, setUserType] = useState('');
  const [secretkey, setSecretKey] = useState('');
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', {
        email: email,
        password: password,
        userType: userType,
      });

      if (response && response.status === 200 && response.data === 'Registration successful') {
        alert('Registration successful');
        onRegister(email);
        onRegisteredSuccessfully();
        onToggleForm();
        setRegisteredSuccessfully(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Email already registered');
      } else {
        alert('Registration failed');
      }
    }
  };

  const handleSubmit = (e) => {
    if (userType === 'admin' && secretkey !== 'admin') {
      e.preventDefault();
      alert('Invalid Admin');
    } else {
      e.preventDefault();

      validateEmail();
      validatePassword();
      if (userType === 'user' && !emailError && !passwordError) {
        onRegister(email);
        handleRegister();
      } else if (userType === 'admin' && !emailError && !passwordError && secretkey === 'admin') {
        onRegister(email);
        handleRegister();
      }
    }
  };

  const styles = {
    container: {
      textAlign: 'center',
      maxWidth: '400px',
      margin: 'auto',
      marginTop: '100px',
      padding: '20px',
      marginLeft: '100px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
      color: '#ffdab9',
    },
    radioGroup: {
      marginTop: '10px',
      marginBottom: '20px',
    },
    radio: {
      marginRight: '5px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '3px',
      fontSize: '16px',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '3px',
      fontSize: '18px',
      cursor: 'pointer',
    },
    error: {
      color: '#dc3545',
      fontSize: '14px',
      marginTop: '5px',
    },
    toggleMessage: {
      marginTop: '10px',
      fontSize: '16px',
      color: '#333',
    },
    toggleButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#007bff',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  };

  return (
    <div>
      <div style={{
        backgroundImage: 'url("https://t3.ftcdn.net/jpg/04/61/99/04/240_F_461990414_MTlPVE2tUo00dxdebWJ4qXT1GQSE2rB8.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Register</h2>
          <div style={styles.radioGroup}>
            Register as:
            <input
              type="radio"
              name="UserType"
              value="user"
              onChange={(e) => setUserType(e.target.value)}
              style={styles.radio}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="admin"
              onChange={(e) => setUserType(e.target.value)}
              style={styles.radio}
            />
            Admin
          </div>
          {userType === 'admin' ? (
            <form style={styles.form}>
              <label style={styles.label}><b>Secret Key</b></label>
              <input
                type="password"
                value={secretkey}
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
                style={styles.input}
              />
            </form>
          ) : null}

          <form style={styles.form}>
            <label style={styles.label}><b>Email</b></label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            {emailError && <p style={styles.error}>{emailError}</p>}
            <label style={styles.label}><b>Password</b></label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            {passwordError && <p style={styles.error}>{passwordError}</p>}
            <button onClick={handleSubmit} style={styles.button}>Register</button>
          </form>

          <p style={styles.toggleMessage}>Already have an account? <button onClick={onToggleForm} style={styles.toggleButton}>Login</button></p>
          {registeredSuccessfully && (
            <div className="alert-box">
              <p>
                Registered successfully! Go to{' '}
                <button onClick={onToggleForm}>Login</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;