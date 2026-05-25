import React, { useState, useEffect } from 'react';
import { Gamepad2, Award, Key, Cpu, Sparkles, Activity, ShieldCheck, UserCheck, RefreshCw, Ticket } from 'lucide-react';

interface DashboardProps {
  purchasedKeys: string[];
  purchasedItems: string[];
  supportTickets: Array<{
    id: string;
    subject: string;
    category: string;
    status: string;
    date: string;
    message: string;
    botReply: string;
  }>;
}

export default function Dashboard({ purchasedKeys, purchasedItems, supportTickets }: DashboardProps) {
  const [gamerTag, setGamerTag] = useState('CyberValkyria_85');
  const [editingGamerTag, setEditingGamerTag] = useState(false);
  const [gamerLevel, setGamerLevel] = useState(42);
  const [xp, setXp] = useState(4250);
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);
  const nextLevelXp = 5000;

  // Latency metrics simulation
  const [ping, setPing] = useState(12);
  const [jitter, setJitter] = useState(2);
  const [packetLoss, setPacketLoss] = useState(0);

  useEffect(() => {
    const latInterval = setInterval(() => {
      setPing(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newVal = prev + change;
        return newVal < 6 ? 6 : newVal > 28 ? 28 : newVal;
      });
      setJitter(prev => {
        const newVal = Math.floor(Math.random() * 4);
        return newVal === 0 ? 1 : newVal;
      });
    }, 3000);
    return () => clearInterval(latInterval);
  }, []);

  const handleGainXp = () => {
    setLevelUpMessage(null);
    setXp(prev => {
      const newVal = prev + 350;
      if (newVal >= nextLevelXp) {
        setGamerLevel(lvl => lvl + 1);
        setLevelUpMessage(`LEVEL UP! You has advanced to Level ${gamerLevel + 1}. Premium awards loaded.`);
        setTimeout(() => setLevelUpMessage(null), 4000);
        return newVal - nextLevelXp;
      }
      return newVal;
    });
  };

  return (
    <div className="space-y-12 pb-20 animate-fade-in">
      {/* Upper Grid Profile & System Latency */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Gamer Profile Card Component (Col: 1-6) */}
        <div className="col-span-1 lg:col-span-5 p-6 glass-panel rounded-3xl space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
          
          {/* Avatar and Info */}
          <div className="flex gap-4 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" 
                alt="Gamer Avatar" 
                className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 bg-green-500 w-4.5 h-4.5 rounded-full border border-black flex items-center justify-center text-[8px] text-white font-mono font-bold animate-pulse">
                •
              </span>
            </div>

            <div className="space-y-1">
              {editingGamerTag ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={gamerTag}
                    onChange={(e) => setGamerTag(e.target.value)}
                    className="bg-black/60 border border-cyan-500/30 rounded-lg px-2 py-1 text-xs font-mono text-white max-w-[140px]"
                  />
                  <button 
                    onClick={() => setEditingGamerTag(false)}
                    className="px-2 py-1 bg-cyan-500 text-black font-mono text-[9px] rounded-md font-bold uppercase cursor-pointer"
                  >
                    SAVE
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black font-mono text-white tracking-wide">
                    {gamerTag}
                  </h3>
                  <button 
                    onClick={() => setEditingGamerTag(true)}
                    className="text-[9px] text-cyan-400 font-mono underline uppercase cursor-pointer"
                  >
                    EDIT
                  </button>
                </div>
              )}
              <span className="text-xs text-gray-400 block font-mono">ID: #NEXUS-779693843</span>
            </div>
          </div>

          {/* User Level Rings Ticker */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-gray-400 uppercase">GAMER XP INDEX</span>
              <span className="font-mono font-bold text-white">LEVEL {gamerLevel}</span>
            </div>
            
            {/* Progress line */}
            <div className="h-2 bg-gray-950 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(0,243,255,0.4)] transition-all duration-500"
                style={{ width: `${(xp / nextLevelXp) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span>{xp} XP</span>
              <span>{nextLevelXp} XP FOR LEVEL UP</span>
            </div>
          </div>

          {/* Quick claim reward test simulation trigger */}
          <div className="space-y-2">
            <button 
              onClick={handleGainXp}
              className="w-full py-2.5 bg-white/5 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white text-xs font-mono font-bold tracking-widest rounded-xl transition-all uppercase cursor-pointer"
            >
              CLAIM COMPLETED MISSIONS (+350 XP)
            </button>
            {levelUpMessage && (
              <p className="text-[10px] text-center text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-lg animate-fade-in">{levelUpMessage}</p>
            )}
          </div>
        </div>

        {/* System Latency Diagnostics Graph (Col: 7-12) */}
        <div className="col-span-1 lg:col-span-7 p-6 glass-panel rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Live Network Health Panel
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono uppercase bg-cyan-500/5 px-2 py-0.5 rounded-md border border-cyan-500/20 animate-pulse">
              TELEMETRY LOG ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-black/45 hover:border-cyan-500/25 border border-white/5 rounded-2xl text-center space-y-1.5 transition-all">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">TCP PING</span>
              <span className="text-2xl font-black font-mono text-cyan-400">{ping} ms</span>
              <span className="text-[9px] text-slate-400 font-mono block">STABLE INTERCEPT</span>
            </div>
            <div className="p-4 bg-black/45 hover:border-cyan-500/25 border border-white/5 rounded-2xl text-center space-y-1.5 transition-all">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">JITTER FRAME</span>
              <span className="text-2xl font-black font-mono text-cyan-400">{jitter} ms</span>
              <span className="text-[9px] text-slate-400 font-mono block">EXCELLENT JITTER</span>
            </div>
            <div className="p-4 bg-black/45 hover:border-cyan-500/25 border border-white/5 rounded-2xl text-center space-y-1.5 transition-all">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">PACKET JAMS</span>
              <span className="text-2xl font-black font-mono text-emerald-400">{packetLoss}%</span>
              <span className="text-[9px] text-slate-400 font-mono block">ZERO DROPPED</span>
            </div>
          </div>

          {/* Real simulated diagnostics health list */}
          <div className="p-3.5 bg-black/35 rounded-2xl text-slate-300 space-y-2 text-xs border border-white/5">
            <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-1.5">
              <span className="font-mono text-gray-400 uppercase">SERVER GATEWAY REGIONS:</span>
              <span className="font-bold text-emerald-400">ONLINE</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-[10px]">
              <div>• US West: <span className="text-emerald-400 font-semibold">14ms</span></div>
              <div>• EU West: <span className="text-emerald-400 font-semibold">22ms</span></div>
              <div>• Asia South: <span className="text-cyan-400 font-semibold">8ms</span></div>
              <div>• SA East: <span className="text-amber-400 font-semibold">48ms</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Unlocked Keys / Purchases Storage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CD Keys Vault Library */}
        <div className="p-6 glass-panel rounded-3xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400 animate-pulse" />
              CD-KEYS & CODES LIBRARY
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Your purchased keys and promotional discount vouchers
            </p>
          </div>

          <div className="space-y-3">
            {/* Standard preloaded lifetime vip pass key */}
            <div className="p-4 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase">Membership Pass</span>
                <h4 className="text-xs font-black text-white uppercase">Nexus Season 4 Elite VIP Entry</h4>
              </div>
              <span className="text-xs font-mono font-bold bg-white/5 text-cyan-300 border border-white/10 px-3 py-1.5 rounded-lg select-all">
                NEXUS-VIP-PASSCODE-7422
              </span>
            </div>

            {/* Dynamically synchronized keys purchased in e-commerce */}
            {purchasedKeys.map((gameTitle, idx) => (
              <div key={idx} className="p-4 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-between gap-4 animate-fade-in">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase">REDEEM VOUCHER KEY</span>
                  <h4 className="text-xs font-black text-white uppercase">{gameTitle}</h4>
                </div>
                <span className="text-xs font-mono font-bold bg-white/5 text-cyan-400 border border-white/10 px-3 py-1.5 rounded-lg select-all">
                  NEX-DL7{Math.floor(Math.random()*89+10)}-CLAIM-{idx+1}
                </span>
              </div>
            ))}

            {purchasedKeys.length === 0 && (
              <p className="text-xs text-gray-500 text-center py-6 font-mono">
                No new CD-Keys purchased yet. Unlocked digital passcodes appear here immediately after Checkout.
              </p>
            )}
          </div>
        </div>

        {/* Filed Support Tickets Logs */}
        <div className="p-6 glass-panel rounded-3xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
              <Ticket className="w-5 h-5 text-cyan-400" />
              SUPPORT TELEMETRY RECORDS ({supportTickets.length})
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Historic tickets filed directly with Nexus automatic assistance bot
            </p>
          </div>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {supportTickets.map((tkt, idx) => (
              <div 
                key={idx}
                className="p-4 bg-black/40 border border-white/5 hover:border-cyan-500/25 rounded-2xl space-y-2.5 transition-all"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 uppercase font-semibold">{tkt.category}</span>
                  <span className="text-emerald-400">RESOLVED BY AI</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{tkt.subject}</h4>
                  <p className="text-[10px] text-gray-500 leading-normal line-clamp-1 italic mt-1 font-mono">"{tkt.message}"</p>
                </div>

                {/* Bot reply transcript */}
                <div className="p-2.5 bg-cyan-950/15 border border-cyan-500/15 rounded-xl font-mono text-[9px] text-cyan-300 leading-relaxed">
                  <span className="font-bold text-slate-400 block mb-1">AUTOMATIC ROBOT EVALUATION DIALOGUE:</span>
                  {tkt.botReply}
                </div>
              </div>
            ))}

            {supportTickets.length === 0 && (
              <p className="text-xs text-gray-500 text-center py-8 font-mono">
                No active support tickets found. Use the "Support" module to submit a troubleshooting request.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
