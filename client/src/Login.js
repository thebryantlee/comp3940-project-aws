import React, { useState } from 'react';
import { signIn } from './services/AuthService';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState(''); // For new password input
  const [newPasswordRequired, setNewPasswordRequired] = useState(false);
  const [user, setUser] = useState(null); // To hold the CognitoUser object when new password is required

  const handleLogin = (event) => {
    event.preventDefault();
    signIn(username, password,
      (result) => {
        console.log('Login successful:', result);
        onLoginSuccess(); // Call the onLoginSuccess prop function from App.js
      },
      (error) => {
        console.error('Login failed:', error);
        setError('Login failed: ' + error.message); // Display error message to the user
      },
      (userAttributes, requiredAttributes) => {
        // Handle new password required here
        // For example, show a form or modal to the user to enter a new password
        console.log('New password required');
        setUser(userAttributes);
      }
    );
  };

  const handleNewPassword = (event) => {
    event.preventDefault();
    if (user) { // Assuming 'user' is the CognitoUser object stored in state
      user.completeNewPasswordChallenge(newPassword, {}, {
        onSuccess: (result) => {
          console.log('Password changed successfully', result);
          onLoginSuccess(); // Transition to logged-in state
        },
        onFailure: (err) => {
          console.error('Failed to change password:', err);
          setError('Failed to change password: ' + err.message);
        }
      });
    }
  };


  return (
    <div>
      <h2>Login</h2>
      {!newPasswordRequired ? (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <div style={{color: 'red'}}>{error}</div>}
          <button type="submit">Log In</button>
        </form>
      ) : (
        <form onSubmit={handleNewPassword}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          {/* Optionally, add fields for any required attributes */}
          <button type="submit">Set New Password</button>
        </form>
      )}
      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  );
}
export default Login;
