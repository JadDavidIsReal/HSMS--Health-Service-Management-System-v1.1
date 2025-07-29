import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      alert('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Nurse', email: 'nurse@clinic.edu', password: 'nurse123' },
    { role: 'Doctor', email: 'doctor@clinic.edu', password: 'doctor123' },
    { role: 'Student/Patient', email: 'student@clinic.edu', password: 'student123' },
  ];

  const fillCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Meditrack</h1>
          <p className="text-gray-500">Medicine Inventory System</p>
        </div>

        <div className="border rounded-md p-6 bg-white">
          <h2 className="text-xl font-bold">Sign In</h2>
          <p className="text-gray-500">Enter your credentials to access the system</p>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-pink-500 text-white px-4 py-2 rounded-md" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="border rounded-md p-6 bg-white">
          <h2 className="text-lg font-bold">Demo Credentials</h2>
          <p className="text-gray-500">Click on any role to automatically fill the login form</p>
          <div className="space-y-3 mt-4">
            {demoCredentials.map((cred) => (
              <div
                key={cred.role}
                className="p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => fillCredentials(cred.email, cred.password)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{cred.role}</p>
                    <p className="text-sm text-gray-500">{cred.email}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Click to use
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          UIC - School Clinic © 2024
        </div>
      </div>
    </div>
  );
};

export default Login;