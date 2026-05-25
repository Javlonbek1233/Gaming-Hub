import React, { useState } from 'react';
import { FAQS_DATA } from '../data';
import { HelpCircle, ChevronRight, ChevronDown, CheckCircle, Ticket, AlertCircle, Sparkles } from 'lucide-react';

interface SupportProps {
  onAddTicket: (subject: string, category: string, message: string, botReply: string) => void;
}

export default function Support({ onAddTicket }: SupportProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Ticket submission states
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Hardware & Logistics');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    subject: string;
    botReply: string;
  } | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSubmitting(true);

    // AI smart game support chatbot advice prompt replies based on selections
    let reply = `[NEXUS DIALOGUE LOG] Agent Delta is scanning your logs... `;
    const catLower = category.toLowerCase();
    
    if (catLower.includes('hardware') || catLower.includes('mouse') || catLower.includes('keyboard')) {
      reply += `We detected typical USB descriptor delays in firmware block B-5. Please hold down your mechanical keyboard's escape key for 5 seconds to reset the matrix lighting registers. Redelivery processed.`;
    } else if (catLower.includes('specs') || catLower.includes('lag') || catLower.includes('performance')) {
      reply += `Our latency monitors evaluated your diagnostic frame drops. We strongly recommend adding "+fps_max 144 -high" under your game startup launchers and ensuring Windows game-mode telemetry buffers are deactivated.`;
    } else if (catLower.includes('voucher') || catLower.includes('cd key') || catLower.includes('purchase')) {
      reply += `Our transaction validation hub verified your billing state. Your digital key is restored to standard. Copy your claim key index directly from the purchased library on your user Profile.`;
    } else {
      reply += `Your community telemetry file was successfully logged into District server queues. A support moderator is currently reviewing your lobby reporting and will take action against reported scrapers in 24 hours.`;
    }

    setTimeout(() => {
      const mockId = `TKT-${Math.floor(Math.random() * 900000 + 100000)}`;
      onAddTicket(subject, category, message, reply);
      setSubmittedTicket({
        id: mockId,
        subject,
        botReply: reply
      });
      setSubmitting(false);

      // Reset
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-20 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
          Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 neon-cyan animate-pulse">TERMINAL</span>
        </h1>
        <p className="text-sm text-cyan-400 font-mono tracking-widest uppercase mt-1">
          Resolve CD Key problems & troubleshoot hardware compatibility
        </p>
      </div>

      {/* Grid: FAQs & Ticket Submission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* FAQs Accordion Panel (Col: 1-7) */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              Frequently Troubleshoots FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="glass-panel rounded-2xl overflow-hidden transition-all hover:border-cyan-500/25"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-white font-bold hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <span className="text-sm">{faq.question}</span>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-cyan-400" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-white/5 animate-fade-in">
                       {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Ticket Creation Form (Col: 8-12) */}
        <div className="col-span-1 lg:col-span-5 p-6 glass-panel rounded-3xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-extrabold text-white uppercase flex items-center gap-2">
              <Ticket className="w-5 h-5 text-cyan-400" />
              Submit Direct Ticket
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              File queries directly with our automatic scanner bot
            </p>
          </div>

          {!submittedTicket ? (
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Category Group</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                >
                  <option value="Hardware & Logistics">Mechanical Hardware Errors</option>
                  <option value="Game Key & Subscriptions">Vouchers & CD key Redeem</option>
                  <option value="Framerate & Latency">Lag & Frame Latency Bottlenecks</option>
                  <option value="Player lobby match report">Report Active Hacker Lobbies</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Subject Summary</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                  placeholder="e.g. key won't activate"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Help Query Explanation</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                  placeholder="Explain your frame rate settings or order details..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold font-mono text-xs tracking-widest rounded-xl transition-all uppercase hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'GENERATING RESPONSE BUFFER...' : 'TRANSMIT TICKET'}
              </button>
            </form>
          ) : (
            <div className="p-5 bg-black/50 border border-cyan-500/20 rounded-2xl space-y-4 text-center animate-fade-in">
              <div className="w-12 h-12 bg-cyan-500/15 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-500">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">Ticket Queued: {submittedTicket.id}</span>
                <h4 className="text-sm font-bold text-white line-clamp-1">{submittedTicket.subject}</h4>
              </div>

              {/* Holographic reply box */}
              <div className="p-3 bg-cyan-950/15 border border-cyan-500/20 rounded-xl text-left font-mono text-[10px] text-cyan-300 leading-normal relative overflow-hidden">
                <div className="flex items-center gap-1 text-[9px] text-slate-400 mb-1.5 font-bold uppercase border-b border-cyan-500/10 pb-1">
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                  INSTANT BOT DIAGNOSIS RESOLVED
                </div>
                <span>{submittedTicket.botReply}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="py-2 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold"
                >
                  FILE NEW TICKET
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
