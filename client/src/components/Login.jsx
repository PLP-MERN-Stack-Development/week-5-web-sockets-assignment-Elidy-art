import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const res = await axios.post(`${API_URL}${endpoint}`, { username, password });
      onAuth(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Authentication failed');
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister((r) => !r)} className="toggle-auth">
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login; 