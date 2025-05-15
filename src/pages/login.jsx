import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const role = res.data.user.role;

      if (role === 'admin') navigate('/admin');
      else if (role === 'owner') navigate('/owner');
      else navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
    </div>
  );
}

export default Login;
