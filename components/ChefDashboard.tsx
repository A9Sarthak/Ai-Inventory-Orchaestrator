import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Sparkles, Clipboard, CheckCircle, AlertTriangle, PiggyBank, ArrowRight, Timer, PlusCircle, Check, Clock, Home, Radio } from 'lucide-react';

const ChefDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-light font-sans text-slate-800 antialiased h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-full z-10 shadow-sm shrink-0 transition-all duration-300">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100">
            <div className="bg-primary/10 p-2 rounded-lg cursor-pointer" onClick={() => navigate('/')}>
              <Radio className="text-primary w-6 h-6" />
            </div>
            <span className="ml-3 font-bold text-lg hidden lg:block text-slate-800">Orchestrator<span className="text-primary">.ai</span></span>
          </div>
          <nav className="mt-6 px-2 lg:px-4 space-y-2">
            <NavItem icon={<Home size={24} />} text="Home" onClick={() => navigate('/')} />
            <NavItem icon={<Sparkles size={24} />} text="Transformation Queue" active />
            <NavItem icon={<Clipboard size={24} />} text="Work Orders" />
            <NavItem icon={<CheckCircle size={24} />} text="Completed Tasks" />
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100">
          <a className="flex items-center justify-center lg:justify-start px-3 py-3 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
              CM
            </div>
            <div className="ml-3 hidden lg:block">
              <p className="text-sm font-semibold text-slate-700">Chef Marco</p>
              <p className="text-xs text-slate-400">Head of Ops</p>
            </div>
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto h-full p-4 lg:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kitchen Operations</h1>
            <p className="text-slate-500 mt-1">AI-Powered Inventory Optimization</p>
          </div>
          <div className="flex gap-4">
            <HeaderStat title="At Risk" value="12 Items" icon={<AlertTriangle className="text-xl" />} color="bg-red-50 text-red-600" />
            <HeaderStat title="Value Recovery" value="$450.00" icon={<PiggyBank className="text-xl" />} color="bg-green-50 text-green-600" />
          </div>
        </header>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-primary w-5 h-5" />
              Suggested Transformations
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">3 High Priority</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <TransformationCard
              title="Heirloom Tomatoes"
              meta="Batch #4492 • Walk-in 2"
              expiresIn="24h"
              recommendation="Turn into Spicy Gazpacho Base"
              shelfLife="4 Days"
              value="$85.00"
              expiresColor="text-red-600 border-red-100 bg-red-50"
            />
            <TransformationCard
              title="Whole Milk"
              meta="Batch #9921 • Dairy Fridge"
              expiresIn="48h"
              recommendation="Make House Ricotta"
              shelfLife="7 Days"
              value="$120.00"
              expiresColor="text-orange-600 border-orange-100 bg-orange-50"
            />
            <TransformationCard
              title="Fresh Basil"
              meta="Batch #1023 • Walk-in 1"
              expiresIn="12h"
              recommendation="Process into Pesto"
              shelfLife="14 Days"
              value="$45.50"
              expiresColor="text-red-600 border-red-100 bg-red-50"
            />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Clock className="text-primary w-5 h-5" />
              Today's Transformation Timeline
            </h2>
            <button className="text-sm text-primary font-semibold hover:text-blue-700">View All Orders</button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-4 px-2">
                <span>10:00 AM</span>
                <span>11:00 AM</span>
                <span>12:00 PM</span>
                <span>01:00 PM</span>
                <span>02:00 PM</span>
                <span>03:00 PM</span>
                <span>04:00 PM</span>
              </div>
              <div className="relative h-48 bg-slate-50 rounded-lg border border-slate-100">
                <div className="absolute inset-0 grid grid-cols-6 divide-x divide-slate-200 pointer-events-none">
                  <div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
                <div className="absolute top-0 bottom-0 left-[35%] w-px bg-red-500 z-10">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>

                <TaskBar top="4" left="5%" width="25%" color="bg-blue-100 border-l-4 border-primary" textColor="text-blue-900" label="Prep Gazpacho Base" />
                <TaskBar top="16" left="40%" width="15%" color="bg-purple-100 border-l-4 border-purple-500" textColor="text-purple-900" label="Dehydrate Mushrooms" />
                <TaskBar top="28" left="60%" width="20%" color="bg-orange-100 border-l-4 border-orange-500" textColor="text-orange-900" label="Pickle Red Onions" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick }: { icon: React.ReactNode, text: string, active?: boolean, onClick?: () => void }) => (
  <a onClick={onClick} className={`flex items-center justify-center lg:justify-start px-3 py-3 rounded-lg font-medium group cursor-pointer ${active ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors'}`}>
    {icon}
    <span className="ml-3 hidden lg:block">{text}</span>
  </a>
);

const HeaderStat = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center min-w-[200px]">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div className="ml-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const TransformationCard = ({ title, meta, expiresIn, recommendation, shelfLife, value, expiresColor }: any) => (
  <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
    <div className="p-5 flex-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{meta}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded flex items-center ${expiresColor}`}>
          <Timer className="w-3 h-3 mr-1" /> Expires in {expiresIn}
        </span>
      </div>
      <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-100">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">AI Recommendation</p>
        <div className="flex items-center gap-3">
          <ArrowRight className="text-primary w-5 h-5" />
          <span className="font-bold text-slate-800 text-lg">{recommendation}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex flex-col">
          <span className="text-slate-500">Shelf Life Extension</span>
          <span className="font-bold text-green-600 flex items-center gap-1">
            <PlusCircle className="w-4 h-4" /> {shelfLife}
          </span>
        </div>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="flex flex-col text-right">
          <span className="text-slate-500">Value Recovery</span>
          <span className="font-bold text-slate-900">{value}</span>
        </div>
      </div>
    </div>
    <div className="bg-slate-50 border-t border-slate-200 p-4 grid grid-cols-2 gap-3">
      <button className="flex items-center justify-center px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition-colors">Reject</button>
      <button className="flex items-center justify-center px-4 py-3 bg-kitchen-emerald hover:bg-emerald-600 text-white rounded-lg font-bold shadow-sm transition-colors">
        <Check className="w-4 h-4 mr-2" /> Accept
      </button>
    </div>
  </div>
);

const TaskBar = ({ top, left, width, color, textColor, label }: any) => (
  <div
    className={`absolute h-10 shadow-sm flex items-center px-3 z-10 group cursor-pointer hover:opacity-90 transition-opacity rounded-r-md ${color}`}
    style={{ top: `${top}px`, left, width }}
  >
    <span className={`text-xs font-bold truncate ${textColor}`}>{label}</span>
  </div>
);

export default ChefDashboard;