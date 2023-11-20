import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin, onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setMessage('Login successful');
        setUserType(response.data.userType);

        // Redirect to the appropriate dashboard based on userType
        onLogin(email, response.data.userType);
      } else {
        setMessage('User not found. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed. Please try again.');
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
      borderRadius: '3px',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
      color: '#ffdab9',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
      textAlign: 'left',
    },
    input: {
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      outline: 'none',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '18px',
      cursor: 'pointer',
    },
    message: {
      color: '#dc3545',
      fontSize: '16px',
      marginTop: '10px',
    },
    toggleMessage: {
      marginTop: '15px',
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
          <h2 style={styles.heading}>Login</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <label style={styles.label}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
          <p style={styles.message}>{message}</p>
          <p style={styles.toggleMessage}>
            Don't have an account? <button onClick={onToggleForm} style={styles.toggleButton}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;