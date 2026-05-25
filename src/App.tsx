import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Games from './components/Games';
import Store from './components/Store';
import Community from './components/Community';
import Support from './components/Support';
import Dashboard from './components/Dashboard';

import { Game, StoreItem, CartItem } from './types';
import { ShieldCheck, Calendar, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Dashboard Shared States (CD Keys, purchased hardware, support tickets log)
  const [purchasedKeys, setPurchasedKeys] = useState<string[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [supportTickets, setSupportTickets] = useState<Array<{
    id: string;
    subject: string;
    category: string;
    status: string;
    date: string;
    message: string;
    botReply: string;
  }>>([]);

  // Cart operations
  const addToCart = (item: StoreItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Sync shop voucher key directly back into dashboard state upon checkout
  const handlePurchaseComplete = (games: string[], items: string[]) => {
    if (games.length > 0) {
      setPurchasedKeys((prev) => [...prev, ...games]);
    }
    if (items.length > 0) {
      setPurchasedItems((prev) => [...prev, ...items]);
    }
  };

  // Sync filed tickets back into dashboard state upon submission
  const handleAddTicket = (subject: string, category: string, message: string, botReply: string) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const mockId = `TKT-${Math.floor(Math.random() * 900000 + 100000)}`;

    setSupportTickets((prev) => [
      {
        id: mockId,
        subject,
        category,
        status: 'RESOLVED',
        date: dateStr,
        message,
        botReply
      },
      ...prev
    ]);
  };

  // Render correct page
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            setActiveTab={setActiveTab}
            setSelectedGame={(game) => {
              setSelectedGame(game);
              setActiveTab('games');
            }}
          />
        );
      case 'games':
        return (
          <Games
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
          />
        );
      case 'store':
        return (
          <Store
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onPurchaseComplete={handlePurchaseComplete}
          />
        );
      case 'community':
        return <Community />;
      case 'support':
        return <Support onAddTicket={handleAddTicket} />;
      case 'dashboard':
        return (
          <Dashboard
            purchasedKeys={purchasedKeys}
            purchasedItems={purchasedItems}
            supportTickets={supportTickets}
          />
        );
      default:
        return (
          <Home
            setActiveTab={setActiveTab}
            setSelectedGame={(game) => {
              setSelectedGame(game);
              setActiveTab('games');
            }}
          />
        );
    }
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-transparent text-gray-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white">
      
      {/* Navbar overlay */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        openCart={() => setActiveTab('store')}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        {renderContent()}
      </main>

      {/* Footer Details */}
      <footer className="w-full bg-[#040406]/95 border-t border-white/10 py-10 mt-16 font-mono text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              NEXUS ARCADE
            </span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span className="text-[10px]">VER: 4.0.1 ALPHA SECURED</span>
          </div>

          {/* Diagnostics state */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px]">
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Secure SSL SSL SSL SSL Gateways
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Activity className="w-3.5 h-3.5 text-cyan-400 uppercase" />
              Ping Status: 12ms (Optimal)
            </span>
            <span>© 2026 Nexus Gaming Website. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
