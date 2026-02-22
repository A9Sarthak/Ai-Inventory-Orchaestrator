import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, ArrowRight, Timer, TrendingDown, Utensils, ClipboardCheck, Radio, Lightbulb, Rocket } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white">
                <Radio className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Orchestrator<span className="text-primary">.ai</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm font-medium text-slate-600 hover:text-primary">Contact Sales</button>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-all shadow-md hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Inventory Intelligence v2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Turn Expiring Inventory Into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Intelligent Revenue</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            The first supply-side dynamic pricing engine for modern enterprises. Automatically detect at-risk stock and adjust menu pricing or suggest specials before waste happens.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button className="px-8 py-3.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 bg-white">
              <PlayCircle className="w-5 h-5" />
              View Demo
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              Start Optimization
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-16 relative mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm p-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
            <img
              src="/images/hero-dashboard.svg"
              alt="Orchestrator.ai Dashboard — Inventory intelligence and dynamic pricing analytics"
              className="rounded-lg w-full h-auto object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Orchestrate Your Kitchen</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI monitors your inventory in real-time to make split-second decisions that maximize margin and minimize waste.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Timer className="text-primary text-2xl w-6 h-6" />}
              title="Expiry Monitoring"
              description="Real-time tracking of shelf life across all SKUs. Our system flags ingredients approaching their critical window 48 hours in advance."
              color="bg-blue-100"
            />
            <FeatureCard
              icon={<TrendingDown className="text-primary text-2xl w-6 h-6" />}
              title="Price Decay Engine"
              description="Dynamic pricing algorithms that automatically adjust digital menu prices based on ingredient freshness and demand velocity."
              color="bg-indigo-100"
            />
            <FeatureCard
              icon={<Utensils className="text-primary text-2xl w-6 h-6" />}
              title="Metamorphosis Decision System"
              description={`AI that suggests recipe modifications or "Chef's Specials" instantly to utilize at-risk stock before it becomes waste.`}
              color="bg-purple-100"
            />
            <FeatureCard
              icon={<ClipboardCheck className="text-primary text-2xl w-6 h-6" />}
              title="Automated Work Orders"
              description="Triggers kitchen prep tasks automatically. When tomatoes are ripe, salsa prep orders are sent to the KDS instantly."
              color="bg-emerald-100"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-background-light border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Adaptive Workflow</h2>
            <p className="text-lg text-slate-600">From raw ingredient to optimized revenue in three autonomous steps.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-primary to-blue-200 opacity-30"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <Step
                icon={<Radio className="w-10 h-10 text-primary" />}
                step="1. Monitor"
                description="Seamless integration with POS and Inventory Management Systems to ingest real-time stock levels and expiry dates."
              />
              <Step
                icon={<Lightbulb className="w-10 h-10 text-primary" />}
                step="2. Optimize"
                description="Our core AI calculates the optimal move: discount the item, promote a special, or trigger a preservation prep task."
              />
              <Step
                icon={<Rocket className="w-10 h-10 text-primary" />}
                step="3. Transform"
                description="Execution is automated. Menu prices update on delivery apps and work orders appear on kitchen displays instantly."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-900 opacity-20 blur-3xl"></div>
            <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-6">Ready to stop throwing money away?</h2>
            <p className="relative text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join forward-thinking enterprise chains using Orchestrator.ai to reduce food waste by 35% and boost margins.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                Book a Demo
              </button>
            </div>
            <p className="relative mt-6 text-sm text-blue-200/80">No credit card required for pilot program.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white">
                  <Radio className="w-3 h-3" />
                </div>
                <span className="font-bold text-lg text-slate-900">Orchestrator.ai</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                Empowering restaurants with intelligent inventory orchestration. We turn potential waste into profitable opportunities through AI-driven decisions.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Product</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Integrations</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2023 Orchestrator.ai Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-400 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-400 hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) => (
  <div className="group p-8 bg-background-light rounded-xl border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Step = ({ icon, step, description }: { icon: React.ReactNode, step: string, description: string }) => (
  <div className="relative z-10 flex flex-col items-center">
    <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center shadow-lg mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{step}</h3>
    <p className="text-slate-600 text-sm px-4">{description}</p>
  </div>
);

export default LandingPage;