import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Radio } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/roles');
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="w-full py-4 px-8 flex justify-between items-center border-b border-slate-200/60 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white">
            <Radio className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Orchestrator<span className="text-primary">.ai</span>
          </span>
        </div>
        <a href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Need help?</a>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Card */}
        <div className="w-full max-w-[440px] bg-white shadow-2xl shadow-slate-200/50 rounded-lg border border-slate-100 p-8 sm:p-10 z-20 transition-all duration-300">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-500 text-sm">Enter your credentials to access the optimization dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-slate-400 w-5 h-5 group-focus-within:text-primary" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-primary hover:text-blue-600 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-slate-400 w-5 h-5 group-focus-within:text-primary" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 rounded bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200 transition-colors">
              <svg className="h-5 w-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path></svg>
              Google
            </button>
            <button type="button" className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 rounded bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200 transition-colors">
              <svg className="h-5 w-5 mr-2 text-[#0078D4]" fill="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h11.377v11.372H0z"></path><path d="M11.377 0h11.372v11.372H11.377z"></path><path d="M0 11.372h11.377v11.377H0z"></path><path d="M11.377 11.372h11.372v11.377H11.377z"></path></svg>
              Microsoft
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            Don't have an account? <a href="#" className="font-medium text-primary hover:text-blue-600">Contact Sales</a>
          </p>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-400 absolute bottom-0 left-0">
        <p>© 2023 Orchestrator.ai Inc. All rights reserved. • <a href="#" className="hover:text-slate-600">Privacy Policy</a> • <a href="#" className="hover:text-slate-600">Terms of Service</a></p>
      </footer>
    </div>
  );
};

export default LoginPage;