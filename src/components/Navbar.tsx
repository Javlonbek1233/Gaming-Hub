import React from 'react';
import { Gamepad2, ShoppingCart, Cpu, MessageSquare, HelpCircle, User, Menu, X, Rocket } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export default function Navbar({ activeTab, setActiveTab, cartCount, openCart }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', id: 'home', icon: Rocket },
    { name: 'Games', id: 'games', icon: Gamepad2 },
    { name: 'Store', id: 'store', icon: ShoppingCart },
    { name: 'Community', id: 'community', icon: MessageSquare },
    { name: 'Support', id: 'support', icon: HelpCircle },
    { name: 'Dashboard', id: 'dashboard', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              <Gamepad2 className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tighter neon-cyan block">
                NEXUS<span className="text-white font-medium pl-0.5">ARCADE</span>
              </span>
              <span className="text-[9px] font-mono block text-cyan-400/80 tracking-[0.2em] uppercase leading-none mt-0.5">
                Command Grid
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-cyan-500/10 border border-cyan-500/30 active-glow'
                      : 'text-gray-400 hover:text-cyan-400 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`} />
                  {item.name}
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse drop-shadow-[0_0_4px_#22d3ee]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Cart & Profile status */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={openCart}
              className="relative p-2.5 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-black font-mono text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold border border-black shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500/15 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.25)]"
            >
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span>DASHBOARD</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={openCart}
              className="relative p-2 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-black font-mono text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-lg px-4 py-6 space-y-2 animate-fade-in">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  isActive
                    ? 'text-white bg-cyan-500/10 border-l-4 border-cyan-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button 
              onClick={() => {
                setActiveTab('dashboard');
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 w-full border border-cyan-500/30 text-cyan-400 rounded-lg font-semibold"
            >
              <Cpu className="w-4 h-4" />
              SYSTEM DASHBOARD
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
