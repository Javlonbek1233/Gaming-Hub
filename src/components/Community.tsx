import React, { useState, useEffect } from 'react';
import { FORUM_THREADS, TOURNAMENTS_DATA } from '../data';
import { MessageSquare, ThumbsUp, Send, Users, Award, Trophy, Zap, Radio, Terminal } from 'lucide-react';

export default function Community() {
  const [activeCategory, setActiveCategory] = useState<string>('All Discussions');
  const [forumThreads, setForumThreads] = useState(FORUM_THREADS);
  
  // Real-time Chat state
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: string;
    text: string;
    time: string;
    avatar: string;
    color: string;
  }>>([
    { id: 'm1', sender: 'Valkyria_XP', text: 'District 4 terminal hack is driving me CRAZY context!', time: '14:20', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80', color: 'text-pink-400' },
    { id: 'm2', sender: 'Zero_Cool', text: 'Bro you need to overload the sub-node prior to overriding the main console!', time: '14:21', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&auto=format&fit=crop&q=80', color: 'text-cyan-400' },
    { id: 'm3', sender: 'Shogun_Rider', text: 'Who is ready for the Synth Loop Racer brackets tonight? 🏎️🔥', time: '14:22', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80', color: 'text-yellow-400' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Tournament registration states
  const [tournaments, setTournaments] = useState(TOURNAMENTS_DATA);
  const [squadName, setSquadName] = useState('');
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  // Automatic mock chat messages arriving occasionally to show active status
  useEffect(() => {
    const mockReplies = [
      { sender: 'MechPrime', text: 'Hangar 9 Defense build is solid now!', color: 'text-purple-400', name: 'Prime' },
      { sender: 'GlitchGamer', text: 'Did anyone download the Neon 4 update yet?', color: 'text-emerald-400', name: 'Glitch' },
      { sender: 'Speedy_01', text: 'I hit a new record on track 3: 1:12.45!', color: 'text-cyan-400', name: 'Speedy' }
    ];

    const chatInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * mockReplies.length);
      const reply = mockReplies[idx];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: reply.sender,
          text: reply.text,
          time: timeStr,
          avatar: `https://picsum.photos/seed/${reply.name}/50/50`,
          color: reply.color
        }
      ].slice(-15)); // Keep only recent 15
    }, 9000);

    return () => clearInterval(chatInterval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMsg = {
      id: Math.random().toString(),
      sender: 'You_Master',
      text: newMessage,
      time: timeStr,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80',
      color: 'text-indigo-400'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage('');

    // Trigger instant cute simulated gamer response
    setTimeout(() => {
      const replyMsg = {
        id: Math.random().toString(),
        sender: 'GlitchGamer',
        text: `Epic post, @You_Master! Let's party up and complete that raid together or queue and match.`,
        time: timeStr,
        avatar: 'https://picsum.photos/seed/Glitch/50/50',
        color: 'text-emerald-400'
      };
      setChatMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const handleRegisterTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTourId || !squadName.trim()) return;
    setRegistrationMessage(null);
    setRegistrationError(null);

    let isSuccess = false;
    setTournaments(prev => prev.map(tour => {
      if (tour.id === selectedTourId) {
        if (tour.teamsCount >= tour.maxTeams) {
          setRegistrationError('This bracket is complete! All seats are unfortunately filled.');
          return tour;
        }
        isSuccess = true;
        setRegistrationMessage(`Squad "${squadName.toUpperCase()}" registered successfully!`);
        return {
          ...tour,
          teamsCount: tour.teamsCount + 1
        };
      }
      return tour;
    }));

    if (isSuccess) {
      setSquadName('');
      setTimeout(() => {
        setSelectedTourId(null);
        setRegistrationMessage(null);
      }, 3000);
    }
  };

  // Upvote/like forum thread simulation
  const handleLikeThread = (id: string) => {
    setForumThreads(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, likes: t.likes + 1 };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-12 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
          Lobby <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 neon-cyan">HQ</span>
        </h1>
        <p className="text-sm text-cyan-400 font-mono tracking-widest uppercase mt-1">
          Active global hubs, tournaments & chat decks
        </p>
      </div>

      {/* Grid structure: Chat deck on left, brackets & threads on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Real-time general chat deck (Col: 1-5 / 1-6) */}
        <div className="col-span-1 lg:col-span-4 p-5 glass-panel rounded-3xl h-[620px] flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
                Live Discord COMMS
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-full border border-emerald-500/10 animate-pulse">
                • 4.2k active online
              </span>
            </div>
          </div>

          {/* Message view terminal */}
          <div className="flex-1 my-4 space-y-4 overflow-y-auto pr-1 text-xs custom-scrollbar">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-3 items-start bg-black/20 p-2.5 rounded-xl border border-white/5">
                <img 
                  src={msg.avatar} 
                  alt="" 
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`font-black font-mono ${msg.color}`}>{msg.sender}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-gray-300 leading-normal">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input control deck */}
          <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-white/10 pt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-4 py-3 text-xs font-mono text-white flex-1"
              placeholder="Inject comms transcript here..."
            />
            <button
              type="submit"
              className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded-xl hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Tournaments ladder & Discussions on right (Col: 6-12) */}
        <div className="col-span-1 lg:col-span-8 space-y-8">
          
          {/* Active Tournament Brackets Selector */}
          <div className="p-6 glass-panel rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white uppercase flex items-center gap-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Active Arena Tournaments
              </h3>
              <span className="text-xs text-cyan-400 font-mono">Select a tour to register squad</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tournaments.map((tour) => (
                <div 
                  key={tour.id} 
                  onClick={() => {
                    if (tour.status === 'upcoming') {
                      setSelectedTourId(tour.id);
                    } else {
                      setRegistrationError('You can only register squads for upcoming tournament seasons.');
                      setTimeout(() => setRegistrationError(null), 3500);
                    }
                  }}
                  className={`p-4 bg-black/45 border rounded-2xl cursor-pointer space-y-3 transition-all ${
                    selectedTourId === tour.id
                      ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] bg-cyan-950/20'
                      : 'border-white/5 hover:border-cyan-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full ${
                      tour.status === 'upcoming' 
                        ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' 
                        : tour.status === 'ongoing'
                          ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium'
                          : 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
                    }`}>
                      {tour.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-yellow-400">{tour.prizePool}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">{tour.title}</h4>
                  <p className="text-[10px] text-gray-400 block">{tour.game}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-gray-400">
                    <span className="font-mono">{tour.date}</span>
                    <span className="font-semibold text-cyan-300">
                      {tour.teamsCount}/{tour.maxTeams} Squads
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Registration squad box */}
            {(selectedTourId || registrationError) && (
              <div className="space-y-2 animate-fade-in">
                {selectedTourId && (
                  <form onSubmit={handleRegisterTournament} className="p-5 bg-black/60 border border-cyan-500/30 rounded-2xl flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
                    <div className="space-y-1 w-full md:max-w-md">
                      <h4 className="text-xs font-bold text-cyan-400 uppercase font-mono tracking-wide">
                        Register Squad for: {tournaments.find(t => t.id === selectedTourId)?.title}
                      </h4>
                      <input
                        type="text"
                        required
                        value={squadName}
                        onChange={(e) => setSquadName(e.target.value)}
                        className="w-full bg-black/55 border border-white/10 focus:border-cyan-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                        placeholder="Enter Custom Esports Clan Name..."
                      />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={() => setSelectedTourId(null)}
                        className="px-4 py-2 text-xs font-bold text-gray-400 border border-white/5 rounded-xl hover:bg-white/5"
                      >
                        DISMISS
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded-xl text-xs tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(34,211,238,0.25)] flex-1 md:flex-initial"
                      >
                        CONFIRM SQUAD LOBBY
                      </button>
                    </div>
                  </form>
                )}
                {registrationMessage && (
                  <p className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">{registrationMessage}</p>
                )}
                {registrationError && (
                  <p className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">{registrationError}</p>
                )}
              </div>
            )}
          </div>

          {/* Message Thread Categories */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              Community Discussion Boards
            </h3>

            <div className="space-y-4">
              {forumThreads.map((thread) => (
                <div 
                  key={thread.id} 
                  className="p-5 glass-panel rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:bg-white/5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase">
                        {thread.category}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">• Posted {thread.timeAgo} by {thread.author}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors max-w-xl">
                      {thread.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/5 pt-3 md:pt-0 md:border-t-0 shrink-0">
                    <button 
                      onClick={() => handleLikeThread(thread.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-400 font-mono transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {thread.likes}
                    </button>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                      <MessageSquare className="w-4 h-4" />
                      {thread.replies}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
