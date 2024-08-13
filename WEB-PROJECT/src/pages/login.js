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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Login to Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center">
          Don't have an account?{' '}
          <a href="/register" className="link link-primary">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;