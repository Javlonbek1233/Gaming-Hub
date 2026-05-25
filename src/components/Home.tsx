import React, { useEffect, useState } from 'react';
import { RACING_HERO, GAMES_DATA, STREAMERS_DATA, TOURNAMENTS_DATA } from '../data';
import { Game } from '../types';
import { Play, Users, Award, Shield, ChevronRight, Zap, Target, Star } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  setSelectedGame: (game: Game) => void;
}

export default function Home({ setActiveTab, setSelectedGame }: HomeProps) {
  const [activePlayers, setActivePlayers] = useState(14205);
  const [streamViews, setStreamViews] = useState(26410);

  // Dynamic status counters simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => prev + Math.floor(Math.random() * 10) - 4);
      setStreamViews(prev => prev + Math.floor(Math.random() * 15) - 7);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      {/* Animated Hero Section */}
      <div className="relative rounded-3xl overflow-hidden min-h-[550px] md:min-h-[620px] lg:min-h-[700px] flex items-center border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.05)]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={RACING_HERO} 
            alt="Futuristic neon racing loop" 
            className="w-full h-full object-cover transform scale-102 hover:scale-105 transition-transform duration-[12000ms]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl px-6 md:px-12 py-16 space-y-6 md:space-y-8 select-none">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-200">
              System Live • Season 4 Open
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white uppercase">
            Unlock the <br />
            <span className="neon-cyan">
              Next Dimension
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
            Unleash peak performance, explore ultra-premium futuristic titles, claim mechanical gear upgrades, and battle top cyber combatants.
          </p>

          {/* Action Group */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('games')}
              className="flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-extrabold rounded-xl tracking-wider hover:bg-cyan-400 active-glow transition-all duration-300 uppercase text-sm"
            >
              <Play className="w-4.5 h-4.5 fill-current" />
              EXPLORE GAMES
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 uppercase tracking-wider text-sm"
            >
              NEXUS STORE
            </button>
          </div>

          {/* Live Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 max-w-xl border-t border-white/10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 block mb-1">
                Active Combatants
              </span>
              <span className="text-2xl font-mono font-bold text-white tracking-wider">
                {activePlayers.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-magenta-400 block mb-1">
                Live Spectators
              </span>
              <span className="text-2xl font-mono font-bold text-white tracking-wider">
                {streamViews.toLocaleString()}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 block mb-1">
                Ping Latency
              </span>
              <span className="text-2xl font-mono font-bold text-cyan-400 tracking-wider">
                12 ms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl glass-panel hover:border-cyan-400/30 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Supersonic Performance</h3>
          <p className="text-gray-400">
            Our title catalog loads through an instant anti-gravity system cloud architecture optimized for fluid response.
          </p>
        </div>

        <div className="p-8 rounded-2xl glass-panel hover:border-pink-500/30 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Tactical Arenas</h3>
          <p className="text-gray-400">
            Enter weekly community battle brackets to claim micro-rewards, custom badges, and cash prize structures.
          </p>
        </div>

        <div className="p-8 rounded-2xl glass-panel hover:border-cyan-500/35 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Elite Security</h3>
          <p className="text-gray-400">
            Hacker-proof multiplayer matches. Fully secure hardware identification system protects against scripts or wallhacks.
          </p>
        </div>
      </div>

      {/* Featured Games Carousel Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              Trending Titles
            </h2>
            <p className="text-sm text-cyan-400/80 font-mono tracking-widest mt-1 animate-pulse">
              MOST ACTIVE THIS WEEK
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('games')}
            className="flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>All Games</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMES_DATA.slice(0, 3).map((game) => (
            <div 
              key={game.id} 
              className="glass-panel rounded-3xl overflow-hidden group hover:border-cyan-500/35 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div 
                className="relative h-56 cursor-pointer overflow-hidden"
                onClick={() => {
                  setSelectedGame(game);
                  setActiveTab('games');
                }}
              >
                <img 
                  src={game.coverUrl} 
                  alt={game.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Score badge */}
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 bg-black/75 border border-yellow-500/30 text-yellow-400 font-mono text-xs rounded-lg rounded-se-none">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {game.rating}
                </span>

                <span className="absolute bottom-4 left-4 bg-cyan-500 text-black font-mono font-bold text-xs px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {game.genre}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 
                  className="text-xl font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedGame(game);
                    setActiveTab('games');
                  }}
                >
                  {game.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {game.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-lg font-mono font-bold text-white">
                    ${game.price}
                  </span>
                  <button 
                    onClick={() => {
                      setSelectedGame(game);
                      setActiveTab('games');
                    }}
                    className="text-xs px-4 py-2 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 rounded-lg transition-all duration-300"
                  >
                    SPECS & TRAILER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streamers & Live Action Lobby */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Streamers Feed */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              Streaming Live Now
            </h2>
            <p className="text-sm text-pink-500 font-mono tracking-widest mt-1">
              SUPPORT CHANNELS IN REAL TIME
            </p>
          </div>

          <div className="space-y-4">
            {STREAMERS_DATA.map((streamer) => (
              <div 
                key={streamer.id} 
                className="flex flex-col sm:flex-row gap-5 p-5 glass-panel hover:border-pink-500/25 rounded-2xl transition-all"
              >
                {/* Avatar with Live Pulse */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className="relative">
                    <img 
                      src={streamer.avatarUrl} 
                      alt={streamer.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 bg-red-500 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full border border-black animate-pulse">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Info details */}
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-base font-extrabold text-white hover:text-pink-400 transition-colors cursor-pointer">
                      {streamer.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
                      <Users className="w-3 h-3" />
                      {streamer.viewers.toLocaleString()} watching
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-300 line-clamp-1">
                    {streamer.streamTitle}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono">
                    Playing: {streamer.game}
                  </p>
                </div>

                {/* Instant Spectate button */}
                <div className="flex items-center">
                  <button 
                    onClick={() => setActiveTab('community')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-pink-500/10 border border-white/10 hover:border-pink-500/20 text-pink-400 rounded-xl text-xs font-bold tracking-wider hover:shadow-[0_0_12px_rgba(244,63,94,0.25)] transition-all duration-300"
                  >
                    SPECTATE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Esports Tournament Block */}
        <div className="col-span-1 lg:col-span-4 p-6 glass-panel rounded-3xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-extrabold text-white uppercase flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400 animate-pulse" />
              Tournament Track
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Active cash bracket ladders
            </p>
          </div>

          <div className="space-y-4">
            {TOURNAMENTS_DATA.map((tour) => (
              <div 
                key={tour.id} 
                className="p-4 bg-black/40 border border-white/5 hover:border-cyan-500/20 rounded-xl space-y-2.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                    tour.status === 'ongoing' 
                      ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                      : tour.status === 'upcoming'
                        ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                        : 'bg-gray-500/10 border border-gray-500/30 text-gray-400'
                  }`}>
                    {tour.status}
                  </span>
                  <span className="text-xs font-mono font-black text-cyan-400">
                    {tour.prizePool}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">
                  {tour.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono">{tour.date}</span>
                  <span className="font-semibold text-cyan-300">
                    {tour.teamsCount}/{tour.maxTeams} Teams
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setActiveTab('community')}
            className="w-full py-3 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 text-xs font-bold tracking-widest rounded-xl transition-all uppercase"
          >
            Go To Live Lobbies
          </button>
        </div>
      </div>
    </div>
  );
}
