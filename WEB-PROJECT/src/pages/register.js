import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../lib/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password, password2);
      router.push('/login');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Create Your Account</h1>
        {error && <div className="alert alert-error mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
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
          <div className="form-control">
            <label htmlFor="password2" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm your password"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{' '}
          <a href="/login" className="link link-primary">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;