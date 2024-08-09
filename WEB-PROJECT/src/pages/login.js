import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      const data = response.data;
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-center text-3xl font-bold mb-6">Login to Your Account</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="input-group">
          <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="search-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="search-input"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Create one
        </a>
      </p>
    </div>
  );
};

export default Login;
