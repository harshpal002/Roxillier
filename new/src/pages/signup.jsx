import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, address, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwdRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (name.length < 20 || name.length > 60) {
      alert('Name must be between 20 and 60 characters.');
      return false;
    }
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return false;
    }
    if (address.length > 400) {
      alert('Address must be less than 400 characters.');
      return false;
    }
    if (!pwdRegex.test(password)) {
      alert('Password must be 8–16 chars, with one uppercase and one special character.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    try {
      const res = await api.post('/auth/signup', form);
      alert('Signup successful. Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />
      <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2">Sign Up</button>
    </div>
  );
}

export default Signup;
