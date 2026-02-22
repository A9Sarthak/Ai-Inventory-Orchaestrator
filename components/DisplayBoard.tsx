import React, { useState, useEffect } from 'react';
import { API_URL } from '../lib/config';
import { Utensils, Timer, Flame, Sparkles, Loader2 } from 'lucide-react';

// Fallback gradients and images for API dishes
const gradients = [
  'bg-gradient-to-br from-orange-50 to-amber-100',
  'bg-gradient-to-br from-red-50 to-orange-100',
  'bg-gradient-to-br from-green-50 to-emerald-100',
  'bg-gradient-to-br from-blue-50 to-sky-100',
  'bg-gradient-to-br from-stone-100 to-stone-200',
  'bg-gradient-to-br from-yellow-50 to-orange-100',
];

const fallbackImages = [
  '/images/truffle-burger.svg',
  '/images/spicy-rigatoni.svg',
  '/images/caesar-salad.svg',
  '/images/craft-cola.svg',
  '/images/tiramisu.svg',
  '/images/garlic-knots.svg',
];

// Hardcoded deals (used when API returns no dishes)
const hardcodedDeals = [
  { title: 'Truffle Burger', description: 'Premium wagyu beef, black truffle aioli, aged cheddar, brioche bun.', price: 12.50, category: 'Mains', image: '/images/truffle-burger.svg', gradient: gradients[0], originalPrice: '$18.00', timeLeft: '14:02' },
  { title: 'Spicy Rigatoni', description: 'Calabrian chili vodka sauce, reggiano parmesan, fresh basil.', price: 16.00, category: 'Mains', image: '/images/spicy-rigatoni.svg', gradient: gradients[1], originalPrice: '$22.00', timeLeft: '08:45' },
  { title: 'Caesar Salad', description: 'Romaine hearts, garlic croutons, house dressing.', price: 9.99, category: 'Salads', image: '/images/caesar-salad.svg', gradient: gradients[2], originalPrice: '$14.00', timeLeft: '05:20' },
  { title: 'Craft Cola', description: 'House-made syrup, sparkling water, lime wedge.', price: 2.50, category: 'Drinks', image: '/images/craft-cola.svg', gradient: gradients[3], originalPrice: '$4.00', timeLeft: '12:00' },
  { title: 'Tiramisu', description: 'Espresso-soaked ladyfingers, mascarpone cream.', price: 6.50, category: 'Desserts', image: '/images/tiramisu.svg', gradient: gradients[4], originalPrice: '$9.00', timeLeft: '03:15' },
  { title: 'Garlic Knots', description: 'Oven-baked dough, garlic butter, parsley.', price: 3.00, category: 'Sides', image: '/images/garlic-knots.svg', gradient: gradients[5], originalPrice: '$6.00', timeLeft: '11:10' },
];

interface Dish {
  _id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
  createdAt: string;
}

const DisplayBoard: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dishes from backend API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/dishes`);

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setDishes(result.data);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        console.error('Failed to fetch dishes:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dishes');
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Use API dishes if available, otherwise use hardcoded deals
  const useApiDishes = dishes.length > 0;

  return (
    <div className="bg-background-light font-sans text-slate-800 flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex-none bg-white shadow-sm border-b border-slate-200 z-10">
        <div className="max-w-[1920px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Utensils className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-none">Orchestrator Bistro</h1>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Live Dynamic Pricing</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-kitchen-emerald animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-600">SYSTEM ONLINE</span>
            </div>
            <div className="text-4xl font-light text-slate-400 font-mono tracking-widest">
              12:45
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-grow p-6 md:p-8">
        <div className="max-w-[1920px] mx-auto flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-700 flex items-center gap-2">
              <Flame className="text-primary w-6 h-6" />
              {useApiDishes ? 'Menu — From API' : 'Current Flash Deals'}
            </h2>
            <div className="h-px flex-grow bg-slate-200 ml-6"></div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="ml-3 text-lg text-slate-500 font-medium">Loading dishes...</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
              <p className="font-medium">⚠ Could not load dishes from API: {error}</p>
              <p className="text-sm mt-1 text-red-500">Showing default flash deals instead.</p>
            </div>
          )}

          {/* Dish Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
              {useApiDishes
                ? dishes.filter(d => d.available).map((dish, index) => (
                  <DealCard
                    key={dish._id}
                    image={fallbackImages[index % fallbackImages.length]}
                    gradient={gradients[index % gradients.length]}
                    title={dish.name}
                    description={dish.category || 'Uncategorized'}
                    originalPrice={`$${(dish.price * 1.3).toFixed(2)}`}
                    price={`$${dish.price.toFixed(2)}`}
                    timeLeft="--:--"
                    active
                  />
                ))
                : hardcodedDeals.map((deal, index) => (
                  <DealCard
                    key={index}
                    image={deal.image}
                    gradient={deal.gradient}
                    title={deal.title}
                    description={deal.description}
                    originalPrice={deal.originalPrice}
                    price={`$${deal.price.toFixed(2)}`}
                    timeLeft={deal.timeLeft}
                    active={index < 2}
                  />
                ))
              }
            </div>
          )}
        </div>
      </main>

      {/* Footer Ticker */}
      <footer className="flex-none bg-slate-900 text-white overflow-hidden py-3">
        <div className="flex items-center whitespace-nowrap">
          <div className="px-6 flex items-center gap-2 font-bold text-primary">
            <Sparkles className="w-4 h-4" />
            <span>AI OPTIMIZED</span>
          </div>
          <div className="flex items-center gap-12 text-lg font-medium text-slate-300 opacity-90 animate-marquee">
            <span>Download our app for an extra 5% off!</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span>Happy Hour deals start at 4PM</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span>Try our new seasonal Pumpkin Spice Latte</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span>Powered by Orchestrator.ai</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span>Free WiFi: BistroGuest_5G</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface DealCardProps {
  image: string;
  gradient: string;
  title: string;
  description: string;
  originalPrice: string;
  price: string;
  timeLeft: string;
  timeLeftColor?: string;
  active?: boolean;
}

const DealCard: React.FC<DealCardProps> = ({ image, gradient, title, description, originalPrice, price, timeLeft, timeLeftColor = "text-primary", active }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 border-transparent flex flex-col overflow-hidden ${active ? 'hover:border-primary/20 animate-subtle-pulse' : ''}`}>
      <div className={`relative h-44 flex-shrink-0 overflow-hidden ${gradient}`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-kitchen-emerald text-white px-3 py-1 rounded-full font-bold text-xs shadow-md flex items-center gap-1">
          <Flame className="w-3 h-3" /> FLASH DEAL
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-1">{title}</h3>
          <p className="text-slate-500 text-base leading-snug line-clamp-2">{description}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium text-slate-400 strike-diagonal">{originalPrice}</span>
            <div className="text-5xl font-black text-primary tracking-tight leading-none">{price}</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Ending In</span>
            <div className="flex items-center gap-2 font-mono text-2xl font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
              <Timer className={`w-5 h-5 ${timeLeftColor}`} />
              {timeLeft}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayBoard;