import React, { useState, useEffect, useRef } from 'react';
import { GAMES_DATA } from '../data';
import { Game } from '../types';
import { Star, Play, Pause, Volume2, Monitor, Cpu, Database, Award, CheckCircle2, AlertTriangle, HelpCircle, Gamepad2 } from 'lucide-react';

interface GamesProps {
  selectedGame: Game | null;
  setSelectedGame: (game: Game) => void;
}

export default function Games({ selectedGame, setSelectedGame }: GamesProps) {
  const currentSelected = selectedGame || GAMES_DATA[0];

  // Video Section State
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [videoProgress, setVideoProgress] = useState(15);
  const videoRef = useRef<HTMLVideoElement>(null);

  // System Diagnostics State
  const [userCpu, setUserCpu] = useState('Intel Core i7-12700K');
  const [userGpu, setUserGpu] = useState('NVIDIA RTX 4070');
  const [userRam, setUserRam] = useState('16 GB');
  const [userStorage, setUserStorage] = useState('SSD 120 GB');
  const [diagnosticResult, setDiagnosticResult] = useState<{
    status: 'optimal' | 'warning' | 'danger';
    cpuMatch: boolean;
    gpuMatch: boolean;
    ramMatch: boolean;
    reason: string;
  } | null>(null);

  // Automatically reset video player triggers when game changes
  useEffect(() => {
    setIsPlaying(false);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [currentSelected]);

  // Video Progress Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault();

    // Fun simulation logic
    const gameId = currentSelected.id;
    let status: 'optimal' | 'warning' | 'danger' = 'optimal';
    let cpuMatch = true;
    let gpuMatch = true;
    let ramMatch = true;
    let reason = 'All hardware is fully compatible at high-refresh 144Hz setups!';

    const selectedRamVal = parseInt(userRam) || 8;
    const recommendedRamVal = parseInt(currentSelected.specs.ram) || 12;

    if (selectedRamVal < recommendedRamVal) {
      ramMatch = false;
    }

    // Rough string matches to determine flags
    const gpuLower = userGpu.toLowerCase();
    if (gpuLower.includes('gtx') || gpuLower.includes('intel iris') || gpuLower.includes('integrated') || gpuLower.includes('rx 5')) {
      gpuMatch = false;
    }

    const cpuLower = userCpu.toLowerCase();
    if (cpuLower.includes('i3') || cpuLower.includes('ryzen 3') || cpuLower.includes('pentium')) {
      cpuMatch = false;
    }

    if (!cpuMatch && !gpuMatch) {
      status = 'danger';
      reason = 'Severe bottleneck encountered. We highly suggest physical graphics card upgrade.';
    } else if (!cpuMatch || !gpuMatch || !ramMatch) {
      status = 'warning';
      reason = 'Minimum requirements met! Resolution should be adjusted to medium details.';
    }

    setDiagnosticResult({
      status,
      cpuMatch,
      gpuMatch,
      ramMatch,
      reason
    });
  };

  return (
    <div className="space-y-12 pb-20 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Elite Game <span className="neon-cyan">Library</span>
        </h1>
        <p className="text-sm text-cyan-400 font-mono tracking-widest uppercase mt-1">
          Explore futuristic titles & run hardware diagnostics
        </p>
      </div>

      {/* Grid: Game Cards & Active Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Game Grid Selector (Col: 1-5) */}
        <div className="col-span-1 lg:col-span-5 space-y-4">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider block animate-pulse">
            SELECT A TITLE
          </span>
          <div className="grid grid-cols-1 gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {GAMES_DATA.map((game) => {
              const isSelected = game.id === currentSelected.id;
              return (
                <div
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className={`flex gap-4 p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(0,243,255,0.15)] active-glow'
                      : 'glass-panel border-white/5 hover:border-cyan-500/25'
                  }`}
                >
                  <img
                    src={game.coverUrl}
                    alt={game.title}
                    className="w-16 h-20 rounded-xl object-cover shrink-0 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyan-400 font-mono font-semibold uppercase">
                        {game.genre}
                      </span>
                      <div className="flex items-center gap-0.5 text-yellow-400 font-mono text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {game.rating}
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {game.tags.join(' • ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>        {/* Right Side: Showcase Panel, Specs, Video Player (Col: 6-12) */}
        <div className="col-span-1 lg:col-span-7 space-y-8">
          {/* Main Visual showcase & description */}
          <div className="p-8 rounded-3xl glass-panel space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentSelected.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentSelected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <span className="text-sm font-mono text-gray-400 block">Launch Price</span>
                <span className="text-2xl font-black neon-cyan font-mono">
                  ${currentSelected.price}
                </span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm">
              {currentSelected.description}
            </p>

            {/* Video Sections: HTML5 Trailer Viewer */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider block animate-pulse">
                GAME TRAILER & FOOTAGE PREVIEW
              </span>
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
                <video
                  ref={videoRef}
                  src={currentSelected.trailerUrl}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />

                {/* Subtitles Simulation */}
                {isPlaying && (
                  <div className="absolute bottom-16 inset-x-4 text-center z-10">
                    <span className="bg-black/90 text-white font-mono text-xs px-3 py-1.5 rounded-md leading-none border border-white/10 shadow-md">
                      [Dramatic electronic synthwave track amplifies in background] ({Math.floor(videoProgress)}s / 100s)
                    </span>
                  </div>
                )}

                {/* Video Play/Pause Cover Screen */}
                {!isPlaying && (
                  <div 
                    onClick={handlePlayPause}
                    className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center cursor-pointer group-hover:bg-black/35 transition-all z-20"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.5)] transform group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                    <span className="mt-4 font-bold text-xs tracking-widest text-cyan-200">
                      PLAY TRAILER
                    </span>
                  </div>
                )}

                {/* Custom Overlay Controls */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/95 to-transparent p-3 flex items-center justify-between gap-4 z-30">
                  <button
                    onClick={handlePlayPause}
                    className="p-1.5 text-white bg-white/5 hover:bg-white/15 rounded-lg transition-colors border border-white/10"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  {/* Progress Line */}
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-cyan-400"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-16 accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware System Checker Section */}
            <div className="border-t border-white/10 pt-8 space-y-6">
              <div className="flex items-center gap-2 text-white">
                <Monitor className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg uppercase tracking-wide">
                  PC Hardware Diagnostics Panel
                </h3>
              </div>

              {/* Requirement Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden group">
                  <Cpu className="w-4 h-4 text-cyan-400 mb-2" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">RECOMMENDED CPU</span>
                  <p className="text-xs font-bold text-white leading-tight mt-1 line-clamp-2">{currentSelected.specs.cpu}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden group">
                  <Monitor className="w-4 h-4 text-pink-400 mb-2" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">RECOMMENDED GPU</span>
                  <p className="text-xs font-bold text-white leading-tight mt-1 line-clamp-2">{currentSelected.specs.gpu}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden group">
                  <Database className="w-4 h-4 text-cyan-400 mb-2" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">RECOMMENDED RAM</span>
                  <p className="text-xs font-bold text-white leading-tight mt-1 line-clamp-2">{currentSelected.specs.ram}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden group">
                  <Award className="w-4 h-4 text-pink-400 mb-2" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">REQUIRED STORAGE</span>
                  <p className="text-xs font-bold text-white leading-tight mt-1 line-clamp-2">{currentSelected.specs.storage}</p>
                </div>
              </div>

              {/* Verification Form */}
              <form onSubmit={calculateCompatibility} className="p-6 glass-panel rounded-2xl space-y-4">
                <h4 className="text-sm font-semibold tracking-wider text-cyan-300 uppercase">
                  Verify Your Local PC Specifications
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Your CPU</label>
                    <input
                      type="text"
                      value={userCpu}
                      onChange={(e) => setUserCpu(e.target.value)}
                      className="w-full bg-black/55 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                      placeholder="e.g. Intel Core i7"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Your GPU</label>
                    <input
                      type="text"
                      value={userGpu}
                      onChange={(e) => setUserGpu(e.target.value)}
                      className="w-full bg-black/55 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                      placeholder="e.g. Nvidia RTX"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Available RAM</label>
                    <select
                      value={userRam}
                      onChange={(e) => setUserRam(e.target.value)}
                      className="w-full bg-black/55 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                    >
                      <option value="4 GB">4 GB RAM</option>
                      <option value="8 GB">8 GB RAM</option>
                      <option value="12 GB">12 GB RAM</option>
                      <option value="16 GB">16 GB RAM</option>
                      <option value="24 GB">24 GB RAM</option>
                      <option value="32 GB">32 GB RAM</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-[10px] text-gray-400 max-w-sm leading-tight font-mono">
                    *Our automated diagnostic validator aligns hardware instruction architecture against standard game models.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded-xl text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0 cursor-pointer"
                  >
                    RUN EVALUATION
                  </button>
                </div>
              </form>

              {/* Diagnostic Result Modal/Alert */}
              {diagnosticResult && (
                <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  diagnosticResult.status === 'optimal'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    : diagnosticResult.status === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                }`}>
                  <div className="flex items-start gap-3.5">
                    {diagnosticResult.status === 'optimal' ? (
                      <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 shrink-0 text-amber-400 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide">
                        {diagnosticResult.status === 'optimal' 
                          ? 'HIGH COMPATIBILITY GRANTED' 
                          : diagnosticResult.status === 'warning' 
                            ? 'STABLE PERFORMANCE AT LOW/MED SETTINGS'
                            : 'PHYSICAL UPGRADE HIGHLY REQUESTED'}
                      </h4>
                      <p className="text-xs text-slate-300 leading-normal mt-1 max-w-xl">
                        {diagnosticResult.reason}
                        <span className="block italic text-[10px] text-cyan-400 font-mono mt-1">
                          CPU Match: {diagnosticResult.cpuMatch ? '✅ OK' : '⚠️ bottlenecked'} • GPU Match: {diagnosticResult.gpuMatch ? '✅ OK' : '⚠️ bottlenecked'} • RAM capacity: {diagnosticResult.ramMatch ? '✅ OK' : '⚠️ insufficient'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDiagnosticResult(null)}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-white"
                  >
                    DISMISS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
