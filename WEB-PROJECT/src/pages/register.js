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
    <div className="form-container">
      <h1 className="text-center text-3xl font-bold mb-6">Create Your Account</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="input-group">
          <label htmlFor="username" className="block font-semibold text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="search-input"
            required
          />
        </div>
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
        <div className="input-group">
          <label htmlFor="password2" className="block font-semibold text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm your password"
            className="search-input"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default Register;
