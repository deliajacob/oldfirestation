import { useState, useMemo } from 'react';
import { BEERS } from '../data';
import { Beer } from '../types';
import { Wine, Percent, Award, Sparkles, Filter, ShieldCheck, Flame, RotateCcw, Heart, Check, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LarkHillBrewery() {
  // Taste Profiler state
  const [profileAbv, setProfileAbv] = useState<string>('any'); // any, session, standard, strong
  const [profileIbu, setProfileIbu] = useState<string>('any'); // any, low, med, high
  const [profileFlavor, setProfileFlavor] = useState<string>('any'); // any, citrus, malt, dark, crisp
  const [likedBeers, setLikedBeers] = useState<string[]>([]);
  const [matchingStatus, setMatchingStatus] = useState<boolean>(false);

  const toggleLikedBeer = (id: string) => {
    if (likedBeers.includes(id)) {
      setLikedBeers(likedBeers.filter(bId => bId !== id));
    } else {
      setLikedBeers([...likedBeers, id]);
    }
  };

  // Reset Taste Quiz
  const resetQuiz = () => {
    setProfileAbv('any');
    setProfileIbu('any');
    setProfileFlavor('any');
    setMatchingStatus(false);
  };

  // Calculate matching score for each beer based on quiz criteria
  const beerMatchScores = useMemo(() => {
    return BEERS.map(beer => {
      let score = 100;

      // 1. ABV match
      if (profileAbv === 'session' && beer.abv > 4.5) score -= 30;
      else if (profileAbv === 'standard' && (beer.abv <= 4.5 || beer.abv > 5.2)) score -= 30;
      else if (profileAbv === 'strong' && beer.abv <= 5.2) score -= 30;

      // 2. IBU match
      if (profileIbu === 'low' && beer.ibu > 25) score -= 30;
      else if (profileIbu === 'med' && (beer.ibu <= 25 || beer.ibu > 38)) score -= 30;
      else if (profileIbu === 'high' && beer.ibu <= 38) score -= 30;

      // 3. Flavor match
      if (profileFlavor === 'citrus' && !beer.description.toLowerCase().includes('fruit') && !beer.description.toLowerCase().includes('citrus') && !beer.description.toLowerCase().includes('tropical')) {
        score -= 40;
      } else if (profileFlavor === 'malt' && !beer.style.toLowerCase().includes('red') && !beer.description.toLowerCase().includes('malty') && !beer.description.toLowerCase().includes('caramel')) {
        score -= 40;
      } else if (profileFlavor === 'dark' && !beer.style.toLowerCase().includes('stout') && !beer.description.toLowerCase().includes('cocoa') && !beer.description.toLowerCase().includes('espresso')) {
        score -= 40;
      } else if (profileFlavor === 'crisp' && !beer.style.toLowerCase().includes('lager') && !beer.style.toLowerCase().includes('pilsner') && !beer.description.toLowerCase().includes('clean')) {
        score -= 40;
      }

      // bound score between 10 and 100
      const finalScore = Math.max(10, score);

      return {
        beer,
        score: finalScore
      };
    }).sort((a, b) => b.score - a.score);
  }, [profileAbv, profileIbu, profileFlavor]);

  const topMatch = beerMatchScores[0];

  return (
    <div id="brewery-experience-root" className="space-y-8 py-4">
      
      {/* Narrative Header Card on lark hill vaults */}
      <div className="bg-brand-sage rounded-3xl p-6 md:p-8 text-brand-cream relative overflow-hidden shadow-sm border border-brand-border/10">
        {/* Background visual graphics representing a vintage circular copper vat */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-earth/10 rounded-full blur-3xl pointer-events-none transform translate-y-24 translate-x-12"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-brand-earth text-brand-cream text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded">
              Lark Hill Brewery • Salford
            </span>
            <span className="text-[10px] text-brand-cream/65 font-mono">Vault 03 • Converted Site</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#faf8f4] tracking-tight">
            Micro-Brewing inside Salford’s Converted Fire Alarm Engine Bays
          </h2>
          
          <p className="text-brand-cream/80 text-sm leading-relaxed font-sans">
            Beneath the brick archways of the heritage station lies **Lark Hill Brewery**. We brew in extremely small batches of 2.5 barrels, centering high ingredient traceability, organic English malts, and zero-waste cooling. Because the brewery shares plumbing with our baking kitchen above, we recover excess heat to warm our sourdough proofer rooms!
          </p>

          <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-brand-cream/75">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/5">
              <ShieldCheck className="w-4 h-4 text-brand-earth" />
              <span>100% On-Site Fermentation</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/5">
              <Flame className="w-4 h-4 text-brand-earth" />
              <span>Heat Recycled to Bakery</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/5">
              <Award className="w-4 h-4 text-brand-earth" />
              <span>Part of Salford University</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive Tasting Profiler Quiz (1 Col) */}
        <div id="tasting-profiler-box" className="lg:col-span-1 bg-white rounded-3xl p-6 border border-brand-border shadow-none space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-brand-earth uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Pairing Gas
            </span>
            <h3 className="text-lg font-serif font-bold text-brand-sage tracking-tight">
              Lark Hill Taste Matcher
            </h3>
            <p className="text-xs text-brand-moss font-sans leading-relaxed">
              Answer 3 brief questions and we will crawl our draft menu to compute your ideal match.
            </p>
          </div>

          <div className="space-y-4">
            {/* Question 1: ABV Preference */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-brand-sage font-mono">
                1. Pick your preferred Alcohol strength:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { value: 'any', label: 'Any ABV %' },
                  { value: 'session', label: 'Session (< 4.5%)' },
                  { value: 'standard', label: 'Average (4.5 - 5.0%)' },
                  { value: 'strong', label: 'Powerful (5.0%+)' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setProfileAbv(opt.value);
                      setMatchingStatus(true);
                    }}
                    className={`text-[11px] font-sans text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      profileAbv === opt.value
                        ? 'border-brand-earth bg-brand-earth/5 font-semibold text-brand-earth'
                        : 'border-brand-border bg-white text-brand-moss hover:bg-brand-cream/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: bitterness level */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-brand-sage font-mono">
                2. Hops Bitter Intensity (IBU):
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { value: 'any', label: 'Any Bitter' },
                  { value: 'low', label: 'Smooth & Delicate' },
                  { value: 'med', label: 'Vibrant & Balanced' },
                  { value: 'high', label: 'Loud & Hop-Forward' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setProfileIbu(opt.value);
                      setMatchingStatus(true);
                    }}
                    className={`text-[11px] font-sans text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      profileIbu === opt.value
                        ? 'border-brand-earth bg-brand-earth/5 font-semibold text-brand-earth'
                        : 'border-brand-border bg-white text-brand-moss hover:bg-brand-cream/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: flavor profiles */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-brand-sage font-mono">
                3. Primary tasting note target:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { value: 'any', label: 'Open Surprise' },
                  { value: 'citrus', label: 'Zesty / Citrus Grapefruit' },
                  { value: 'malt', label: 'Amber Malt / Caramel' },
                  { value: 'dark', label: 'Roasted Cocoa / Stout' },
                  { value: 'crisp', label: 'Lager / Cold Crisp finish' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setProfileFlavor(opt.value);
                      setMatchingStatus(true);
                    }}
                    className={`text-[11px] font-sans text-left p-2 rounded-xl border transition-all cursor-pointer ${
                      profileFlavor === opt.value
                        ? 'border-brand-earth bg-brand-earth/5 font-semibold text-brand-earth'
                        : 'border-brand-border bg-white text-brand-moss hover:bg-brand-cream/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Matches outcomes simulation segment */}
          <div className="border-t border-brand-border pt-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-sage font-mono">Your Recommended Brew:</span>
              {matchingStatus && (
                <button
                  onClick={resetQuiz}
                  className="text-xs text-brand-earth hover:underline flex items-center gap-1 font-mono hover:text-brand-sage cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Clear Quiz
                </button>
              )}
            </div>

            {/* Showcase the top match with gorgeous layouts */}
            <div className="p-4 bg-brand-dark text-white rounded-xl space-y-3 border-l-4 border-brand-earth">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#cad5cb]">Match score match:</span>
                <span className="text-xs font-mono font-bold text-[#faf8f4] bg-[#faf8f4]/15 px-2 py-0.5 rounded-full">
                  {matchingStatus ? topMatch.score : 100}% Match
                </span>
              </div>

              <div>
                <h4 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                  <Wine className="w-4 h-4 text-brand-earth" />
                  <span>{topMatch.beer.name}</span>
                </h4>
                <p className="text-[10px] text-brand-earth font-mono font-medium tracking-wide mt-0.5">
                  {topMatch.beer.style} • {topMatch.beer.abv}% ABV
                </p>
                <p className="text-xs text-[#cad5cb] mt-2 line-clamp-2 leading-relaxed">
                  "{topMatch.beer.description}"
                </p>
              </div>

              <div id="quick-action" className="pt-2 flex items-center justify-between border-t border-white/5">
                <span className="text-[9px] text-[#cad5cb] uppercase font-mono">
                  {topMatch.beer.onTap ? '🟢 Currently On Tap' : '🍁 Cellar Age Bottles'}
                </span>
                <span className="text-[10px] text-[#faf8f4] font-mono">
                  £4.90 / pint
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Tap Board (2 Cols) */}
        <div id="live-taps-container" className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-none space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-sage tracking-tight">
                  Vault Taproom Board
                </h3>
                <p className="text-xs text-brand-moss font-sans">
                  Beers pumped fresh from the fermenting tanks right behind the serving bar.
                </p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-700 font-mono text-[10px] px-2.5 py-1 rounded-full font-bold">
                ● Fresh Status: Daily Verified
              </span>
            </div>

            {/* Loop over beers with details */}
            <div className="space-y-4">
              {BEERS.map(beer => {
                const isSelectedAsBest = matchingStatus && topMatch.beer.id === beer.id;

                return (
                  <div
                    key={beer.id}
                    className={`p-4 rounded-2xl border transition-all duration-350 flex flex-col md:flex-row justify-between gap-4 ${
                      isSelectedAsBest
                        ? 'border-brand-earth bg-brand-cream ring-1 ring-brand-earth'
                        : 'border-brand-border/40 hover:border-brand-border hover:bg-brand-cream/40 bg-white'
                    }`}
                  >
                    {/* Left: Glass avatar visual and info */}
                    <div className="flex gap-4 items-start md:max-w-md">
                      {/* Interactive pint element using css absolute borders to render a glass */}
                      <div className="relative w-10 h-14 bg-brand-cream rounded-b-md border border-brand-border overflow-hidden shrink-0 shadow-sm flex flex-col justify-end">
                        {/* Foam top */}
                        <div className="absolute top-0 left-0 right-0 h-3 bg-white border-b border-[#f2efe4] flex items-center justify-center">
                          <span className="block w-full h-1 bg-white rounded-full"></span>
                        </div>
                        {/* Beer liquid fill based on ABV strength */}
                        <div
                          style={{
                            height: `${(beer.abv / 7) * 100}%`,
                            backgroundColor: beer.colorHex,
                          }}
                          className="w-full transition-all duration-500"
                        ></div>
                        {/* Glass rib highlights */}
                        <div className="absolute inset-y-0 left-2 w-0.5 bg-white/20"></div>
                        <div className="absolute inset-y-0 right-2.5 w-0.5 bg-black/10"></div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-serif font-bold text-brand-sage">
                            {beer.name}
                          </h4>
                          {beer.onTap ? (
                            <span className="bg-emerald-50 text-emerald-700 font-mono text-[9px] px-1.5 py-0.5 rounded font-bold border border-emerald-200">
                              TAP
                            </span>
                          ) : (
                            <span className="bg-[#f2efe4]/60 text-brand-moss font-mono text-[9px] px-1.5 py-0.5 rounded uppercase border border-brand-border">
                              Bottle
                            </span>
                          )}

                          {isSelectedAsBest && (
                            <span className="bg-brand-earth text-brand-cream font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-0.5 animate-bounce">
                              <Check className="w-2.5 h-2.5" /> Best Match
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-mono font-bold text-brand-earth">
                          {beer.style} • {beer.colorName}
                        </p>

                        <p className="text-xs text-[#52574c] font-sans leading-relaxed mt-1">
                          {beer.description}
                        </p>

                        <p className="text-[10px] text-brand-moss/80 italic font-sans pt-1">
                          📋 {beer.notes}
                        </p>
                      </div>
                    </div>

                    {/* Right side: Beer specifications values (ABV, IBU, Hops) */}
                    <div className="flex flex-col justify-between items-end gap-2.5 shrink-0 text-right">
                      <div className="space-y-2">
                        {/* ABV & IBU bars */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-brand-moss block">ABV</span>
                            <span className="text-xs font-mono font-bold text-brand-sage">{beer.abv}%</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-brand-moss block">Bitter IBU</span>
                            <span className="text-xs font-mono font-bold text-brand-sage">{beer.ibu}</span>
                          </div>
                        </div>

                        {/* Hops list bubble */}
                        <div className="flex flex-wrap gap-1 justify-end max-w-44">
                          {beer.hops.map(hop => (
                            <span key={hop} className="text-[9px] font-mono bg-brand-cream border border-brand-border text-brand-moss px-1.5 py-0.5 rounded transition-colors">
                              #{hop}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quick rating simulator / Like action */}
                        <button
                          onClick={() => toggleLikedBeer(beer.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            likedBeers.includes(beer.id)
                              ? 'text-rose-600 bg-rose-50 border-rose-200'
                              : 'text-brand-moss/45 hover:text-rose-600 bg-white hover:bg-rose-50/50 border-brand-border'
                          }`}
                          title="Like beer"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>

                        <span className="text-xs font-mono font-bold text-brand-sage bg-brand-cream border border-brand-border px-2.5 py-1 rounded-lg">
                          £4.90 / Pint
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
