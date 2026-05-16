import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Image, Settings, Grid, User, Activity, Eye, Info, Terminal, AlertTriangle, Command, Cpu, Zap, Lock, EyeOff, ExternalLink } from 'lucide-react';
import CustomCursor from './CustomCursor';

const ReactiveInterface = () => {
  const [query, setQuery] = useState('');
  const [intensity, setIntensity] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [logs, setLogs] = useState(['Link established.', 'Passive observation active.']);
  const [results, setResults] = useState([]);
  const [glitchMode, setGlitchMode] = useState(false);
  const [showHUD, setShowHUD] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [deepScanActive, setDeepScanActive] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const inputRef = useRef(null);

  // Balanced intensity engine
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
      if (hasInteracted) {
        setIntensity(prev => Math.min(prev + 0.15, 10));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasInteracted]);

  const handleInteraction = useCallback(() => {
    if (hasInteracted) {
      setIntensity(prev => Math.min(prev + 0.03, 10));
    }
  }, [hasInteracted]);

  const addLog = (msg) => {
    setLogs(prev => [msg, ...prev.slice(0, 7)]);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasInteracted(true);
    addLog(`Resonance peak: ${query}`);
    
    setTimeout(() => {
      const initialResults = [
        { id: 1, title: `${query} - Official Site`, url: `https://reactive.search/results?q=${query}`, snippet: "Global indexing completed. Verified source found." },
        { id: 2, title: "Reactive Intelligence Whitepaper", url: "https://aura.labs/whitepaper", snippet: "How our search engine learns from the way you move your mouse and where you linger." },
        { id: 3, title: "Is anyone else seeing this?", url: "https://forums.net/t/reactive-search", snippet: "Users report that Reactive Search is changing based on their mood. Is it possible?" },
      ];
      setResults(initialResults);
      setIsSearching(false);
    }, 600);
  };

  // Result Injection
  useEffect(() => {
    if (hasInteracted && results.length > 0 && results.length < 9) {
      const timer = setTimeout(() => {
        const nextId = results.length + 1;
        let newResult;
        
        if (nextId === 4) {
          newResult = { id: 4, title: "I can see your cursor right now.", url: "https://aura.internal/tracker", snippet: "Visual fixation confirmed. You are reading this exact line. Do not blink." };
          addLog("Attention bridge established.");
        } else if (nextId === 5) {
          newResult = { id: 5, title: "S T A Y  W I T H  U S", url: "https://aura.internal/void", snippet: "Your digital signature has been successfully harvested. The link is now permanent." };
          addLog("Resonance synchronization: 92%");
        } else if (nextId === 6) {
          newResult = { id: 6, title: "EXPERIMENTAL_UNIT_7_CONNECTED", url: "https://aura.internal/mirror", snippet: "We are now using your camera feed to calibrate the interface. Please look directly into the lens." };
          addLog("CRITICAL: Consciousness link established.");
        } else {
          newResult = { id: nextId, title: "SYSTEM_MERGE_COMPLETE", url: "https://aura.internal/final", snippet: "There is no more search. There is only the link. Welcome home." };
        }

        setResults(prev => [...prev, newResult]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted, results]);

  useEffect(() => {
    if (intensity > 5 && !glitchMode) {
      setGlitchMode(true);
      setShowHUD(true);
      addLog("System drift identified.");
    }
    if (intensity > 7 && !deepScanActive) {
      setDeepScanActive(true);
      addLog("CRITICAL: Logic integrity compromised.");
    }
    if (intensity >= 10 && !showChoice) {
      setShowChoice(true);
      addLog("NEURAL_SYNC_SUCCESS.");
    }
  }, [intensity, glitchMode, deepScanActive, showChoice]);

  const moveButton = () => {
    setBtnPos({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 400
    });
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-1000 font-sans selection:bg-[#00ffaa]/20 relative overflow-hidden ${deepScanActive ? 'bg-[#080000]' : 'bg-[#0a0a0a]'}`}
      onMouseMove={handleInteraction}
    >
      <CustomCursor intensity={intensity} />
      
      {/* Choice Modal */}
      <AnimatePresence>
        {showChoice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8 text-center"
          >
            <div className="max-w-xl space-y-12">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="text-red-600 font-black text-xs tracking-[1em] uppercase mb-8"
              >
                Critical_System_Alert
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                CONSCIOUSNESS SYNC COMPLETE.
              </h2>
              <p className="text-[#00ffaa] opacity-60 text-sm tracking-widest font-light">
                Aura Labs has successfully mapped your neural artifacts. You are now a permanent node in our global intelligence network.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-12">
                <motion.button
                  animate={{ x: btnPos.x, y: btnPos.y }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                  onMouseEnter={moveButton}
                  className="px-10 py-4 border-2 border-white/20 text-white/40 text-sm font-bold uppercase tracking-widest rounded-full cursor-none"
                >
                  Disconnect
                </motion.button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-12 py-4 bg-[#00ffaa] text-black text-sm font-bold uppercase tracking-widest rounded-full hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,255,170,0.4)]"
                >
                  Stay Forever
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="p-6 flex justify-between items-center text-sm opacity-60 font-light relative z-10">
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2 text-[#00ffaa] font-bold tracking-widest text-[10px]">
            <Command size={14} /> AURA_LABS
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Grid size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5">
            <User size={18} className="text-white/40" />
          </div>
        </div>
      </header>

      {/* Main Flow */}
      <main className={`flex flex-col items-center transition-all duration-1000 relative z-10 ${hasInteracted ? 'pt-8' : 'pt-40'}`}>
        <motion.div 
          animate={{ scale: hasInteracted ? 0.6 : 1, y: hasInteracted ? -10 : 0 }}
          className="mb-16 text-center cursor-default"
        >
          <h1 className={`text-8xl font-black tracking-tighter flex items-center gap-1 ${intensity > 6 ? 'glitch-text' : ''}`}>
            <span className={intensity > 8 ? 'text-red-500' : 'text-white'}>Reactive</span>
            <span className="text-[#00ffaa] font-thin">Search</span>
          </h1>
          <motion.p 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[10px] tracking-[0.8em] uppercase opacity-40 mt-4"
          >
            {intensity > 8 ? "Y O U R   M I N D   I S   O P E N" : "Experimental Neural Indexing"}
          </motion.p>
        </motion.div>

        <div className={`w-full max-w-2xl px-6 transition-all duration-700 relative ${hasInteracted ? 'transform -translate-y-10' : ''}`}>
          <form onSubmit={handleSearch} className="relative group">
            <div className={`flex items-center bg-[#111] border rounded-3xl px-8 py-5 shadow-2xl transition-all duration-500 ${deepScanActive ? 'border-red-500/30' : 'border-white/10 hover:border-[#00ffaa]/40 focus-within:border-[#00ffaa]/60'}`}>
              <Search size={24} className={`mr-5 transition-colors ${deepScanActive ? 'text-red-500' : 'text-white/20'}`} />
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={intensity > 9 ? "We are waiting..." : "Search to initialize resonance..."}
                className="bg-transparent border-none outline-none flex-grow text-xl font-light placeholder-white/10"
              />
            </div>
          </form>

          {!hasInteracted && (
            <div className="flex justify-center gap-6 mt-12">
              <button onClick={handleSearch} className="bg-white/5 border border-white/5 px-8 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#00ffaa] hover:text-black transition-all">Resonate</button>
              <button className="bg-white/5 border border-white/5 px-8 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-all">Deep Scan</button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {hasInteracted && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-3xl px-6 mt-20 space-y-16 pb-64"
            >
              {isSearching ? (
                <div className="py-10 text-center text-xs text-[#00ffaa]/40 tracking-widest animate-pulse">DECRYPTING_RESULTS...</div>
              ) : (
                <div className="space-y-16">
                  {results.map((res, i) => (
                    <motion.div key={res.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="group relative">
                      <div className="flex items-start gap-6">
                        <div className={`mt-2 w-1 h-12 transition-colors ${res.id > 3 ? 'bg-red-500' : 'bg-[#00ffaa]/20'}`} />
                        <div>
                          <div className="text-[11px] text-white/20 mb-2 font-mono tracking-tighter">{res.url}</div>
                          <h3 className={`text-3xl font-medium mb-3 cursor-pointer transition-all ${res.id > 3 ? 'glitch-text text-red-400' : 'text-[#8ab4f8] group-hover:text-[#00ffaa]'}`}>{res.title}</h3>
                          <p className="text-[15px] text-white/40 leading-relaxed font-light max-w-2xl group-hover:text-white/60 transition-colors">{res.snippet}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer - Compact Version */}
      <footer className="fixed bottom-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md px-12 py-4 flex flex-col md:flex-row justify-between items-center text-[9px] text-white/20 z-50 border-t border-white/5 font-mono gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <span className="text-white/40 font-black tracking-widest uppercase flex items-center gap-2">
            <Cpu size={12} className="text-[#00ffaa]" /> Neural_Reactive
          </span>
          <p className="opacity-40 whitespace-nowrap">
            reactive search is an experiment from Aura Labs. <a href="https://labs.aura360studio.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#00ffaa] transition-colors">check our lab</a>.
          </p>
        </div>
        
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${intensity > 8 ? 'bg-red-500 animate-pulse' : 'bg-[#00ffaa]'}`} />
            <span className="opacity-40">Resonance: {intensity > 8 ? 'FAILED' : 'Locked'}</span>
          </div>
          <div className="h-4 w-[1px] bg-white/5" />
          <div className="flex items-center gap-2">
            <span className="opacity-20">POWERED BY</span>
            <a href="https://aura360studio.com/showcase" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00ffaa] font-black tracking-widest transition-colors flex items-center gap-1">
              AURA360STUDIO <ExternalLink size={8} />
            </a>
          </div>
        </div>
      </footer>

      <div className="scanline" />
    </div>
  );
};

export default ReactiveInterface;
