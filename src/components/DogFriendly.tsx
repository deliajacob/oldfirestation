import { useState, FormEvent } from 'react';
import { INITIAL_DOGS } from '../data';
import { DogProfile } from '../types';
import { Award, Plus, Camera, Search, Heart, ShieldCheck, Flame, Gift, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DogFriendly() {
  const [dogs, setDogs] = useState<DogProfile[]>(INITIAL_DOGS);
  const [dogName, setDogName] = useState<string>('');
  const [dogBreed, setDogBreed] = useState<string>('Pug');
  const [dogVibe, setDogVibe] = useState<string>('Loves sleeping near warm radiator grills.');
  const [favoriteTreat, setFavoriteTreat] = useState<string>('Crunchy Cardamom Bun Crumbs');
  const [isCheckinSubmitted, setIsCheckinSubmitted] = useState<boolean>(false);
  const [dogHearts, setDogHearts] = useState<{ [id: string]: number }>({
    'd1': 24,
    'd2': 48,
    'd3': 19,
    'd4': 32
  });

  const availableBreeds = [
    { name: 'Pug', emoji: '🐶' },
    { name: 'Golden Retriever', emoji: '🐕' },
    { name: 'English Bulldog', emoji: '🐾' },
    { name: 'Jack Russell', emoji: '🐶' },
    { name: 'Sausage Dog (Dachshund)', emoji: '🐕' },
    { name: 'Pembroke Welsh Corgi', emoji: '🦊' },
    { name: 'Standard Poodle', emoji: '🐩' },
    { name: 'Siberian Husky', emoji: '🐺' }
  ];

  const availableTreats = [
    'Crunchy Cardamom Bun Crumbs',
    'Fallen Butter Croissant Flakes',
    'Ice Cold Salford Tap Water',
    'Warm Oat Milk Foam Spot',
    'Sourdough Starter Starter Sniffs',
    'Pure Unconditional Barista Cuddles'
  ];

  // Send cuddles / upvote hearts to a pup
  const heartDog = (id: string) => {
    setDogHearts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDogCheckin = (e: FormEvent) => {
    e.preventDefault();
    if (!dogName.trim()) return;

    const breedEmoji = availableBreeds.find(b => b.name === dogBreed)?.emoji || '🐶';
    const newDog: DogProfile = {
      id: `dog-${Date.now()}`,
      name: dogName,
      breed: dogBreed,
      vibe: `${breedEmoji} Checked-in with favorite treat: "${favoriteTreat}". ${dogVibe}`,
      avatarSeed: dogBreed.toLowerCase().replace(/[^a-z]/g, ''),
      addedByUser: true
    };

    setDogs([newDog, ...dogs]);
    setIsCheckinSubmitted(true);
    
    // Clear form fields
    setDogName('');
    setDogVibe('Loves sleeping near warm radiator grills.');
  };

  return (
    <div id="dog-friendly-gallery-root" className="space-y-8 py-4">
      
      {/* Dog Hero banner */}
      <div className="bg-brand-sage text-brand-cream rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-none border border-brand-border/10">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-brand-earth/10 rounded-full blur-2xl pointer-events-none transform translate-y-16"></div>
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-brand-earth text-brand-cream text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded w-max block">
            Four-Legged Community Welcomed
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#faf8f4] tracking-tight">
            Dog-Friendly Vaults & Sourdough Crust Inspectors
          </h2>
          <p className="text-brand-cream/85 text-sm leading-relaxed font-sans">
            Every room at The Old Fire Station is fully dog-friendly. Whether they prefer curl ups under the central long tables or sitting near the floor heat vents of the old engine bays, your canine companions represent the heart of our community! Check-in your pup to today's visitor log to join our Hall of Friendly Paws.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Puppy Check-in Board Form (1 Col) */}
        <div id="pup-checkin-box" className="lg:col-span-1 bg-white rounded-3xl p-6 border border-brand-border shadow-none space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-brand-earth uppercase tracking-wider flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" /> Canine Guest Log
            </span>
            <h3 className="text-lg font-serif font-bold text-brand-sage tracking-tight">
              Check-in Your Dog
            </h3>
            <p className="text-xs text-brand-moss font-sans leading-relaxed">
              Let the kitchen bakers know which furry companions are browsing the bakery floor today!
            </p>
          </div>

          <form onSubmit={handleDogCheckin} className="space-y-4 text-xs">
            {/* Dog Name */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-brand-sage font-mono">Dog’s First Name:</label>
              <input
                id="dog-name-input"
                type="text"
                required
                placeholder="e.g. Barnaby / Buster"
                value={dogName}
                onChange={(e) => {
                  setDogName(e.target.value);
                  setIsCheckinSubmitted(false);
                }}
                className="w-full font-sans text-xs px-3.5 py-2.5 border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-sage bg-white transition-all"
              />
            </div>

            {/* Breed Selector */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-brand-sage font-mono">Dog Breed Category:</label>
              <select
                id="dog-breed-select"
                value={dogBreed}
                onChange={(e) => setDogBreed(e.target.value)}
                className="w-full bg-white border border-brand-border px-3 py-2.5 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-brand-sage"
              >
                {availableBreeds.map(b => (
                  <option key={b.name} value={b.name}>
                    {b.emoji} {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Favorite baker treat */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-brand-sage font-mono">Target Treat Motivation:</label>
              <select
                id="dog-treat-select"
                value={favoriteTreat}
                onChange={(e) => setFavoriteTreat(e.target.value)}
                className="w-full bg-white border border-brand-border px-3 py-2.5 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-brand-sage"
              >
                {availableTreats.map(t => (
                  <option key={t} value={t}>
                    🥯 {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Vibe / Habits */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-brand-sage font-mono">Quirks / Daily Routine Habits:</label>
              <textarea
                id="dog-vibe-input"
                rows={3}
                placeholder="e.g. Master level snorer under table 2, or barista admirer."
                value={dogVibe}
                onChange={(e) => setDogVibe(e.target.value)}
                className="w-full bg-white font-sans text-xs p-3 border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-sage"
              ></textarea>
            </div>

            <button
              id="dog-submit-button"
              type="submit"
              className="w-full bg-brand-sage hover:bg-brand-dark text-white font-sans text-xs uppercase font-bold tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-brand-earth" /> Register Dog Profile
            </button>
          </form>

          {isCheckinSubmitted && (
            <div className="bg-emerald-500/5 border border-dashed border-emerald-500/20 p-3.5 rounded-xl text-center">
              <span className="text-xl">🦴🐕✨</span>
              <h5 className="text-xs font-bold text-emerald-800 font-mono mt-1">Pup added successfully!</h5>
              <p className="text-[10px] text-emerald-600 font-sans mt-0.5">
                Your dog is officially logged in! Scroll the Hall of Friendly Paws grid to view their profile.
              </p>
            </div>
          )}
        </div>

        {/* Dog Hall of Fame Grid List (2 Cols) */}
        <div id="dog-grid-contain" className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-none space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-4">
              <div>
                <h3 className="text-base font-serif font-bold text-brand-sage tracking-tight">
                  Hall of Friendly Paws Logs
                </h3>
                <p className="text-xs text-brand-moss font-sans">
                  The official directory of dogs that visited our converted vaults today.
                </p>
              </div>

              {/* Total counter */}
              <div id="dog-total-counter-stat" className="bg-brand-cream border border-brand-border rounded-xl p-3 flex gap-2.5 items-center shrink-0">
                <span className="text-xl">🐾</span>
                <div className="text-left font-mono">
                  <span className="text-[10px] text-brand-moss opacity-80 block uppercase font-bold leading-none">Total Dogs logged</span>
                  <span className="text-sm font-bold text-brand-earth leading-none">{dogs.length} Guests today</span>
                </div>
              </div>
            </div>

            {/* List Layout with visual avatars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {dogs.map(dog => {
                  const hearts = dogHearts[dog.id] || 0;
                  const firstLetter = dog.name.slice(0, 1).toUpperCase();

                  return (
                    <motion.div
                      key={dog.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-brand-cream/30 rounded-2xl border border-brand-border/60 p-5 flex flex-col justify-between hover:shadow-sm transition-all relative group"
                    >
                      <div>
                        {/* Breed logo and Name */}
                        <div className="flex items-center gap-3 mb-3">
                          {/* Illustrated placeholder icon */}
                          <div className="w-10 h-10 bg-brand-[#f2efe4]/40 border border-brand-border rounded-xl flex items-center justify-center font-serif font-bold text-brand-sage text-base shrink-0">
                            {firstLetter}
                          </div>

                          <div>
                            <h4 className="text-sm font-serif font-bold text-brand-sage group-hover:text-brand-earth transition-colors flex items-center gap-1">
                              <span>{dog.name}</span>
                              {dog.addedByUser && (
                                <span className="bg-yellow-105 text-yellow-800 text-[8px] font-mono px-1 py-0.2 rounded border border-yellow-200 animate-pulse">
                                  NEW
                                </span>
                              )}
                            </h4>
                            <p className="text-[10px] font-mono text-brand-moss opacity-80">
                              Breed: {dog.breed}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-[#52574c] font-sans leading-relaxed line-clamp-3">
                          "{dog.vibe}"
                        </p>
                      </div>

                      {/* Score interaction footer */}
                      <div className="flex items-center justify-between border-t border-brand-border/40 pt-3 mt-4">
                        <span className="text-[9px] text-brand-earth font-mono font-bold flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5" /> Barkery VIP
                        </span>

                        {/* Interactive heart rate checker click */}
                        <button
                          onClick={() => heartDog(dog.id)}
                          className="flex items-center gap-1 bg-white hover:bg-rose-50/50 border border-brand-border hover:border-rose-200 text-brand-moss hover:text-rose-600 py-1 px-2.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer"
                        >
                          <Heart className="w-3 h-3 fill-current text-rose-400 shrink-0" />
                          <span>{hearts} Cuddles</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
