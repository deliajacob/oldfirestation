import { useState, useMemo } from 'react';
import { TIMELINE_EVENTS } from '../data';
import { Sparkles, Calendar, Award, Leaf, Trees, Coffee, Heart, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeritageMap() {
  // Sustainability Calculator State
  const [transportMode, setTransportMode] = useState<string>('walk'); // walk, rail, ev, gas
  const [hasReusableCup, setHasReusableCup] = useState<boolean>(true);
  const [coffeeCupsPerWeek, setCoffeeCupsPerWeek] = useState<number>(3);

  // Carbon compute logic based on environmental statistics
  const sustainabilityScores = useMemo(() => {
    // Emissions per km: gas = 180g, ev = 45g, rail = 35g, walk = 0g
    // Average Salford commute count as 3.5 km
    let transportSavedOfGasCommute = 0;
    if (transportMode === 'walk') transportSavedOfGasCommute = 180 * 3.5;
    else if (transportMode === 'rail') transportSavedOfGasCommute = (180 - 35) * 3.5;
    else if (transportMode === 'ev') transportSavedOfGasCommute = (180 - 45) * 3.5;
    else if (transportMode === 'gas') transportSavedOfGasCommute = 0;

    // Single cup waste saving: 15g carbon and prevents 0.05kg wood pulp deforestation
    const cupSavedCarbon = hasReusableCup ? 32 : 0;
    const weeklyCarbonSaved = (transportSavedOfGasCommute + (cupSavedCarbon * coffeeCupsPerWeek));
    const annualTreesSaving = (weeklyCarbonSaved * 52) / 22000; // 1 tree offsets about 22kg CO2 yearly

    return {
      gramsSavedWeekly: Math.round(weeklyCarbonSaved),
      treesOffsetEquivalent: annualTreesSaving.toFixed(3),
      cupDeforestPreventedGrams: hasReusableCup ? coffeeCupsPerWeek * 52 * 12 : 0,
      tier: weeklyCarbonSaved > 800 ? 'Deep Forest Guardian' :
            weeklyCarbonSaved > 400 ? 'Salford Eco Squire' :
            weeklyCarbonSaved > 100 ? 'Cardamom Sustainer' : 'Fledgling Sprout'
    };
  }, [transportMode, hasReusableCup, coffeeCupsPerWeek]);

  return (
    <div id="heritage-and-sustainability" className="space-y-8 py-4">
      
      {/* Sustainability Calculator Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left: Input parameters panel (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-brand-border shadow-none space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] bg-[#ecefe8] text-brand-sage font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1 w-max">
              <Leaf className="w-3.5 h-3.5 text-brand-earth" /> Environmental Tracker
            </span>
            <h3 className="text-lg font-serif font-bold text-brand-sage tracking-tight">
              Community Footprint Calculator
            </h3>
            <p className="text-xs text-brand-moss font-sans leading-relaxed">
              We focus heavily on reducing Salford’s industrial carbon load. See how your choices align with our circular economy.
            </p>
          </div>

          <div className="space-y-4">
            {/* Travel Choice */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-brand-sage font-mono">
                1. How are you commuting to the Fire Station?
              </label>
              <div className="space-y-1.5 text-xs font-sans">
                {[
                  { value: 'walk', label: '🚶 Walk, Run, or Bicycle (Pure Zero Carbon)' },
                  { value: 'rail', label: '🌿 Salford Transit Link / Omnibus / Train' },
                  { value: 'ev', label: '🚗 Rideshare Electric Taxi / EV' },
                  { value: 'gas', label: '🚘 Petrol Combustion Coach / Personal Car' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setTransportMode(opt.value)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      transportMode === opt.value
                        ? 'border-brand-sage bg-brand-cream/60 font-semibold text-brand-sage'
                        : 'border-brand-border hover:bg-brand-cream/20 text-brand-moss'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {transportMode === opt.value && <Leaf className="w-3.5 h-3.5 text-brand-earth" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Reusable cup toggle button */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-brand-sage font-mono">
                2. Do you bring your own Reusable Coffee Flask?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setHasReusableCup(true)}
                  className={`p-2.5 rounded-xl border font-sans font-medium transition-all cursor-pointer ${
                    hasReusableCup === true
                      ? 'border-brand-sage bg-brand-cream/60 text-brand-sage font-bold'
                      : 'border-brand-border hover:bg-brand-cream/20 text-brand-moss'
                  }`}
                >
                  Yes, I bring a cup (15p discount!)
                </button>
                <button
                  onClick={() => setHasReusableCup(false)}
                  className={`p-2.5 rounded-xl border font-sans font-medium transition-all cursor-pointer ${
                    hasReusableCup === false
                      ? 'border-brand-sage bg-brand-cream/60 text-brand-sage font-bold'
                      : 'border-brand-border hover:bg-brand-cream/20 text-brand-moss'
                  }`}
                >
                  No, I need a compostable box
                </button>
              </div>
            </div>

            {/* Commute frequency */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-brand-moss uppercase">Average Visits / Month:</span>
                <span className="text-brand-earth font-bold">{coffeeCupsPerWeek} visits</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={coffeeCupsPerWeek}
                onChange={(e) => setCoffeeCupsPerWeek(Number(e.target.value))}
                className="w-full accent-brand-sage h-1.5 bg-[#f2efe4] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: Results displays segment (3 Cols) */}
        <div className="lg:col-span-3 bg-brand-sage rounded-3xl p-6 text-brand-cream border border-brand-border/10 flex flex-col justify-between space-y-6 shadow-none">
          <div className="space-y-2 pb-4 border-b border-white/10">
            <h4 className="text-sm font-mono text-[#cad5cb] uppercase tracking-widest">
              Estimated Carbon Reduction Metrics
            </h4>
            <p className="text-xl font-serif font-bold text-[#faf8f4]">
              Sustaining Salford’s Urban Forest Tree Reserve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Weekly score box */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1 text-center md:text-left">
              <Leaf className="w-5 h-5 text-brand-earth mb-1.5 mx-auto md:mx-0" />
              <div className="text-[10px] font-mono text-[#cad5cb] font-bold uppercase">Weekly CO₂ Saved</div>
              <div className="text-xl font-mono font-bold text-white">
                {sustainabilityScores.gramsSavedWeekly}g
              </div>
              <p className="text-[9px] text-[#cad5cb]/80">Equivalent to active light-bulb emission reduction.</p>
            </div>

            {/* Annual forest trees offset equivalent */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1 text-center md:text-left">
              <Trees className="w-5 h-5 text-brand-earth mb-1.5 mx-auto md:mx-0" />
              <div className="text-[10px] font-mono text-[#cad5cb] font-bold uppercase">Trees Offset/Yr</div>
              <div className="text-xl font-mono font-bold text-white font-serif">
                {sustainabilityScores.treesOffsetEquivalent}
              </div>
              <p className="text-[9px] text-[#cad5cb]/80">Net photosynthesis offsets from Salford woods.</p>
            </div>

            {/* Paper waste prevented */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1 text-center md:text-left">
              <Coffee className="w-5 h-5 text-brand-earth mb-1.5 mx-auto md:mx-0" />
              <div className="text-[10px] font-mono text-[#cad5cb] font-bold uppercase">Paper Saved/Yr</div>
              <div className="text-xl font-mono font-bold text-white text-nowrap">
                {sustainabilityScores.cupDeforestPreventedGrams}g
              </div>
              <p className="text-[9px] text-[#cad5cb]/80">Virgin wood pulp prevented from landfills.</p>
            </div>
          </div>

          {/* Environmental Medal badge description */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-3 items-start">
            <div className="bg-[#faf8f4]/10 text-brand-earth p-1.5 rounded-lg shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-brand-earth uppercase font-bold">
                Your Eco Tier: {sustainabilityScores.tier}
              </p>
              <p className="text-xs text-[#cad5cb]/90 font-sans mt-0.5 leading-relaxed">
                By purchasing speciality coffee roasted raw within Salford and shifting commuter habits, you become an active preservation hub coordinator. We reward reusable cups with a **15p checkout discount** at our engine room counters!
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Heritage Converted fire station timeline Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-border shadow-none space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] bg-brand-earth/10 text-brand-earth font-mono font-bold uppercase py-0.5 px-2 rounded">
            Our Architectural Heritage
          </span>
          <h3 className="text-xl font-serif font-bold text-brand-sage tracking-tight">
            120 Years of Salford Community Safety & Flour
          </h3>
          <p className="text-xs text-brand-moss font-sans">
            How a crucial early-century firefighting emergency depot was transformed by the University of Salford into a home for local artisan cooking.
          </p>
        </div>

        {/* Timeline graphics list */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative mt-4">
          <div className="hidden md:block absolute top-[22px] left-[15%] right-[15%] h-[1px] bg-brand-border"></div>

          {TIMELINE_EVENTS.map((evt, index) => (
            <div key={evt.year} className="space-y-2.5 text-center relative group">
              {/* Year circle indicator */}
              <div className="w-11 h-11 bg-brand-earth text-brand-cream flex items-center justify-center font-serif font-bold text-[13px] rounded-full mx-auto relative z-10 border border-brand-border/40 group-hover:scale-105 transition-transform">
                {evt.year}
              </div>

              <div>
                <h4 className="text-xs font-serif font-bold text-brand-sage uppercase">
                  {evt.title}
                </h4>
                <p className="text-[11px] text-[#52574c] font-sans leading-relaxed mt-1.5 px-1">
                  {evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
