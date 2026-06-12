import { useState, useEffect } from 'react';
import { INITIAL_BAKING_ITEMS } from '../data';
import { BakingProgress } from '../types';
import { Flame, Clock, Award, Play, RotateCcw, Sliders, Compass, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DoughEngine() {
  const [bakingGoods, setBakingGoods] = useState<BakingProgress[]>(INITIAL_BAKING_ITEMS);
  const [bakingSpeed, setBakingSpeed] = useState<number>(1); // simulation speed multiplier
  
  // Custom Bake Simulator State
  const [simName, setSimName] = useState<string>('Heritage Sourdough Bread');
  const [simTemp, setSimTemp] = useState<number>(240); // 180 to 250 degrees
  const [simHydration, setSimHydration] = useState<number>(78); // 65% to 85% hydration
  const [simState, setSimState] = useState<'idle' | 'mixing' | 'proofing' | 'baking' | 'fresh'>('idle');
  const [simProgress, setSimProgress] = useState<number>(0);
  const [simLog, setSimLog] = useState<string[]>([]);

  // Simulation timer for the custom bake
  useEffect(() => {
    let interval: any = null;
    if (simState !== 'idle' && simState !== 'fresh') {
      interval = setInterval(() => {
        setSimProgress(prev => {
          const next = prev + (4 * bakingSpeed);
          
          if (next >= 100) {
            // Stage advance logic matching progress
            if (simState === 'mixing') {
              setSimState('proofing');
              addSimLog('Kneading complete. Wild yeast is resting. Proofing stage initialized.');
              return 0;
            } else if (simState === 'proofing') {
              setSimState('baking');
              addSimLog(`Steam injected! Sourdough placed in oven at ${simTemp}°C with ${simHydration}% hydration.`);
              return 0;
            } else if (simState === 'baking') {
              setSimState('fresh');
              addSimLog('Fresh Country Sourdough pulled from the stone deck! Crumb structure set successfully.');
              return 100;
            }
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [simState, bakingSpeed, simTemp, simHydration]);

  const addSimLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSimLog(prev => [`[${timestamp}] ${message}`, ...prev]);
  };

  const startCustomBake = () => {
    setSimState('mixing');
    setSimProgress(0);
    setSimLog([]);
    addSimLog(`Baking series initialized for: "${simName}"`);
    addSimLog(`Hydration calculated: ${simHydration}% of Salford organic rye. Deck target Temp: ${simTemp}°C.`);
  };

  const resetCustomBake = () => {
    setSimState('idle');
    setSimProgress(0);
    setSimLog([]);
  };

  const handleBakingPreset = (presetName: string, hydration: number, temp: number) => {
    setSimName(presetName);
    setSimHydration(hydration);
    setSimTemp(temp);
    resetCustomBake();
  };

  const getStageLabel = (stage: 'mixing' | 'proofing' | 'baking' | 'fresh') => {
    switch (stage) {
      case 'mixing': return 'Mixing & Autolyse (Chewy structure formulation)';
      case 'proofing': return 'Bulk Proofing (Fermenting under wild yeast)';
      case 'baking': return 'Deck Baking (Stone-hearth caramelization)';
      case 'fresh': return 'Freshly Baked (Cooling on copper wire racks)';
    }
  };

  return (
    <div id="dough-engine-root" className="space-y-8 py-4">
      
      {/* Intro info card on baking sciences */}
      <div className="bg-brand-cream rounded-3xl p-6 md:p-8 border border-brand-border grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-3">
          <span className="text-[10px] bg-brand-earth/10 text-brand-earth font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded">
            Our Mother Dough • "The Salford Yeaster"
          </span>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-sage tracking-tight">
            Fermentation Under the Command of Natural Atmospheric Microbes
          </h2>
          <p className="text-brand-moss text-xs md:text-sm leading-relaxed font-sans">
            We don’t use fast-rising industrial brewer’s yeast. Each morning sourdough loaf is formulated using a wild starter created from local Salford plums and raw stoneground flour. Because our dough undergoes a slow cold-retard fermentation for 24+ hours, the organic proteins break down naturally, resulting in beautiful bubbles, a rich blistered crust, and high digestion tolerability.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-none space-y-3 text-center md:text-left">
          <h4 className="text-xs font-mono font-bold text-brand-sage uppercase">
            Baker Stats & Hydromatics
          </h4>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between border-b border-[#f2efe4] pb-1.5">
              <span className="text-brand-moss opacity-80">Mother Age:</span>
              <span className="text-brand-earth font-bold">3 Years</span>
            </div>
            <div className="flex justify-between border-b border-[#f2efe4] pb-1.5">
              <span className="text-brand-moss opacity-80">Bake temperature:</span>
              <span className="text-brand-sage font-bold">225°C - 245°C</span>
            </div>
            <div className="flex justify-between border-b border-[#f2efe4] pb-1.5">
              <span className="text-brand-moss opacity-80">Salt Proportion:</span>
              <span className="text-brand-sage">2.1% Sea Salt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-moss opacity-80">Average Hydration:</span>
              <span className="text-brand-sage font-bold">76% - 82%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left: Live Kitchen Board (2/5 size) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-none space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <h3 className="text-base font-serif font-bold text-brand-sage tracking-tight">
                  Kitchen Live Board
                </h3>
                <p className="text-xs text-brand-moss font-sans">
                  The current physical schedule of our sourdough and pastry batches.
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-[#f2efe4]/60 text-brand-sage font-mono text-[10px] px-2.5 py-1 rounded-full font-bold">
                <Flame className="w-3.5 h-3.5 text-brand-earth" /> Oven Deck Live
              </span>
            </div>

            {/* Stage items mapping */}
            <div className="space-y-4">
              {bakingGoods.map(good => (
                <div key={good.id} className="space-y-2 border-b border-[#f2efe4] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-brand-sage">{good.name}</span>
                    <span className="font-mono text-[10px] text-brand-moss bg-brand-cream px-2 py-0.5 rounded border border-brand-border">
                      Expected {good.readyTime}
                    </span>
                  </div>

                  {/* Progress bar visual */}
                  <div className="relative w-full h-2 bg-[#f2efe4]/65 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${good.progress}%` }}
                      className={`h-full rounded-full transition-all duration-1000 ${
                        good.stage === 'fresh' ? 'bg-emerald-600' :
                        good.stage === 'baking' ? 'bg-brand-earth animate-pulse' :
                        good.stage === 'proofing' ? 'bg-orange-500' : 'bg-brand-moss'
                      }`}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className={`capitalize ${
                      good.stage === 'fresh' ? 'text-emerald-700 font-bold' :
                      good.stage === 'baking' ? 'text-brand-earth font-bold' : 'text-brand-moss'
                    }`}>
                      {good.stage === 'fresh' ? '✓ Fresh Out of Oven' : `${good.stage}...`}
                    </span>
                    <span className="text-brand-moss/70">Step started: {good.startTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Active Firehouse Bake Simulator (3/5 size) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-brand-sage text-brand-cream rounded-3xl p-6 border border-brand-border/10 shadow-none space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-serif font-bold text-white tracking-tight flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-brand-earth" />
                  <span>Interactive Sourdough Baking Chamber</span>
                </h3>
                <p className="text-xs text-[#cad5cb] font-sans mt-0.5">
                  Tune moisture, oven temperature, and bake your own virtual fire station loaf!
                </p>
              </div>

              {/* Simulation speed multiplier */}
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10 shrink-0 font-mono text-[10px]">
                <span className="text-[#cad5cb] px-1">Speed:</span>
                {[1, 2, 4].map(s => (
                  <button
                    key={s}
                    onClick={() => setBakingSpeed(s)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${bakingSpeed === s ? 'bg-brand-earth text-brand-cream font-bold' : 'text-zinc-300 hover:text-white'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Controls panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Baked goods preset buttons */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono font-bold text-[#cad5cb] uppercase">
                    Select Flour Recipe Base:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { name: 'Heritage Sourdough', hydration: 78, temp: 240 },
                      { name: 'Danish Cinnamon Swirl', hydration: 65, temp: 200 },
                      { name: 'Salford Stout Rye Bread', hydration: 82, temp: 235 },
                      { name: 'Artisan Baguette', hydration: 72, temp: 245 }
                    ].map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => handleBakingPreset(preset.name, preset.hydration, preset.temp)}
                        className={`text-[10px] font-sans font-medium p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          simName === preset.name
                            ? 'border-brand-earth bg-brand-earth/15 text-white font-semibold'
                            : 'border-white/5 bg-white/5 text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slices Hydration Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#cad5cb] uppercase">Hydration Percentage:</span>
                    <span className="text-brand-earth font-bold">{simHydration}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="85"
                    value={simHydration}
                    disabled={simState !== 'idle' && simState !== 'fresh'}
                    onChange={(e) => setSimHydration(Number(e.target.value))}
                    className="w-full accent-brand-earth h-1.5 bg-white/10 rounded-lg cursor-pointer disabled:opacity-50"
                  />
                  <p className="text-[9px] text-[#cad5cb]/70 font-sans leading-none">
                    Higher hydration produces irregular bubbles; lower produces uniform light density.
                  </p>
                </div>

                {/* Oven Deck Temperature Target */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#cad5cb] uppercase">Steam-Heated Temp:</span>
                    <span className="text-[#faf8f4] font-bold">{simTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="180"
                    max="255"
                    value={simTemp}
                    disabled={simState !== 'idle' && simState !== 'fresh'}
                    onChange={(e) => setSimTemp(Number(e.target.value))}
                    className="w-full accent-brand-earth h-1.5 bg-white/10 rounded-lg cursor-pointer disabled:opacity-50"
                  />
                  <p className="text-[9px] text-[#cad5cb]/70 font-sans leading-none">
                    Extreme temperatures crisp the sourdough outer skin; lower temperatures cook rich soft crumbs.
                  </p>
                </div>
              </div>

              {/* Status Simulator visualizer */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-[#cad5cb]">
                    Oven Status Monitoring
                  </span>
                  <div>
                    <h5 className="text-sm font-serif font-bold text-white uppercase tracking-tight">
                      {simName}
                    </h5>
                    <p className="text-[10px] font-mono text-brand-earth mt-1 font-bold">
                      {simState === 'idle' ? 'Ready to preheat' : getStageLabel(simState as any)}
                    </p>
                  </div>
                </div>

                {/* Simulated thermal glowing ring representing oven state */}
                <div className="relative h-24 bg-black/40 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {simState === 'idle' && (
                      <motion.div
                        key="idle-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center font-mono text-xs text-[#cad5cb]"
                      >
                        [Chamber Empty]
                      </motion.div>
                    )}

                    {simState === 'mixing' && (
                      <motion.div
                        key="mixing-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-1.5"
                      >
                        <div className="w-6 h-6 border-2 border-dashed border-brand-earth rounded-full animate-spin mx-auto"></div>
                        <p className="text-[10px] font-mono text-[#cad5cb]">Rotating sourdough planetary hooks...</p>
                      </motion.div>
                    )}

                    {simState === 'proofing' && (
                      <motion.div
                        key="proofing-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-1"
                      >
                        <div className="text-2xl animate-pulse">🍞</div>
                        <p className="text-[10px] font-mono text-brand-earth">Wild acid expansion (Proving)...</p>
                      </motion.div>
                    )}

                    {simState === 'baking' && (
                      <motion.div
                        key="baking-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-1"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-earth/10 via-[#b85b46]/10 to-brand-earth/10 animate-pulse"></div>
                        <div id="oven-glow-ring" className="text-2xl animate-bounce">🔥</div>
                        <p className="text-[10px] font-mono text-[#faf8f4]">Stone Oven Baking at {simTemp}°C...</p>
                      </motion.div>
                    )}

                    {simState === 'fresh' && (
                      <motion.div
                        key="fresh-view"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-1"
                      >
                        <div id="finished-sourdough-logo" className="text-3xl">🥖✨</div>
                        <p className="text-[10px] font-mono text-emerald-300">Bake complete! Crunchy blisters ready.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tiny simulated log layer */}
                  {simState !== 'idle' && (
                    <div id="baker-thermometer-readout" className="absolute bottom-1 right-2 text-[8px] font-mono text-zinc-400">
                      Thermometer: {simState === 'baking' ? simTemp : '26'}°C
                    </div>
                  )}
                </div>

                {/* Progress actions */}
                <div className="flex items-center gap-2">
                  {simState === 'idle' ? (
                    <button
                      onClick={startCustomBake}
                      className="w-full bg-brand-earth hover:bg-[#a67c5c] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer font-mono"
                    >
                      <Play className="w-3.5 h-3.5 text-brand-cream" /> Bake Now
                    </button>
                  ) : (
                    <button
                      onClick={resetCustomBake}
                      className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer font-mono"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Oven
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Baking logs list */}
            {simLog.length > 0 && (
              <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-1.5">
                <h5 className="text-[10px] font-mono text-[#cad5cb] uppercase tracking-widest pl-1 font-bold">
                  Hourly Baking Log:
                </h5>
                <div className="h-28 overflow-y-auto font-mono text-[10px] text-[#cad5cb] space-y-1 pr-1">
                  {simLog.map((log, index) => (
                    <div key={index} className="border-l border-brand-earth/40 pl-2 leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
