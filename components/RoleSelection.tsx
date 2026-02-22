import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Monitor, BarChart3, ArrowRight, LogOut, Radio } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light min-h-screen flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white">
            <Radio className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Orchestrator<span className="text-primary">.ai</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              AM
            </div>
            <span className="text-sm font-medium text-slate-600">Alex Morgan</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">Select Dashboard</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Choose your workspace to access the tools relevant to your role.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <RoleCard
              title="Manager Dashboard"
              description="Access comprehensive sales analytics, manage inventory procurement, and configure AI-driven dynamic pricing rules."
              icon={<BarChart3 className="w-8 h-8 text-primary" />}
              actionText="Enter Workspace"
              onClick={() => navigate('/manager')}
            />
            <RoleCard
              title="Chef Dashboard"
              description="Monitor real-time ingredient stock, manage daily prep lists, and log kitchen waste for optimization."
              icon={<Utensils className="w-8 h-8 text-primary" />}
              actionText="Enter Kitchen View"
              onClick={() => navigate('/chef')}
            />
            <RoleCard
              title="Display Board Mode"
              description="Launch the customer-facing digital menu board optimized for large screens with live pricing updates."
              icon={<Monitor className="w-8 h-8 text-primary" />}
              actionText="Launch Display"
              onClick={() => navigate('/display')}
            />
          </div>

          <div className="pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                System Operational
              </div>
              <div>Last login: Today at 09:42 AM from San Francisco, CA</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div>© 2023 Orchestrator.ai Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Log Out
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const RoleCard: React.FC<{ title: string, description: string, icon: React.ReactNode, actionText: string, onClick: () => void }> = ({ title, description, icon, actionText, onClick }) => (
  <div onClick={onClick} className="group cursor-pointer block bg-white rounded-xl p-8 border border-slate-200 h-full flex flex-col items-start relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary">
    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-slate-500 leading-relaxed mb-8 flex-grow">{description}</p>
    <div className="flex items-center text-primary font-medium text-sm mt-auto">
      <span>{actionText}</span>
      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
    </div>
    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
  </div>
);

export default RoleSelection;