import { useState, FormEvent } from 'react';
import { Flame, Landmark, Heart, MapPin, Coffee, ShieldCheck, HelpCircle, Utensils, Beer } from 'lucide-react';
import StatusBanner from './components/StatusBanner';
import MenuExplorer from './components/MenuExplorer';
import LarkHillBrewery from './components/LarkHillBrewery';
import DoughEngine from './components/DoughEngine';
import HeritageMap from './components/HeritageMap';
import DogFriendly from './components/DogFriendly';
import MenuCard from './components/MenuCard';
import { motion, AnimatePresence } from 'motion/react';

type ActiveTab = 'bakery' | 'brewery' | 'engine' | 'dogs' | 'heritage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bakery');
  const [tableInquirySubmitted, setTableInquirySubmitted] = useState<boolean>(false);
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryGuests, setInquiryGuests] = useState<number>(2);
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);

  const handleTableInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim()) return;
    setTableInquirySubmitted(true);
  };

  if (!isExplorerOpen) {
    return (
      <div className="min-h-screen bg-[#ece9e0] flex flex-col items-center justify-center p-4 md:p-8 font-sans transition-all duration-300">
        <MenuCard onVisitSite={() => setIsExplorerOpen(true)} isExplorerOpen={false} />
      </div>
    );
  }

  return (
    <div id="app-root-container" className="min-h-screen bg-brand-cream text-[#3a3d34] font-sans flex flex-col selection:bg-brand-sage/20 selection:text-brand-sage">
      
      
      {/* Top operational hours status strip */}
      <StatusBanner />

      {/* Hero Header Area */}
      <header id="main-firehouse-header" className="bg-brand-cream border-b border-brand-border py-6 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Brand logo & title */}
          <div className="flex items-center gap-4">
            {/* Custom SVG logo representing a stylized fire bell or firefighter hydromixer in artisan green */}
            <div className="w-13 h-13 bg-brand-sage hover:bg-brand-dark transition-colors text-white flex items-center justify-center rounded-2xl shadow-md shadow-brand-sage/10 shrink-0">
              <span className="font-serif font-semibold text-2xl tracking-tighter italic">F</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono bg-brand-sage/15 text-brand-sage px-2 py-0.5 rounded font-extrabold tracking-wider uppercase">
                  Est. 1903 • Salford
                </span>
                <span className="text-[10px] font-mono bg-brand-border/40 text-brand-moss px-2 py-0.5 rounded uppercase">
                  Artisan Bakery & Bar
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-sage tracking-tight mt-1">
                The Old Fire Station
              </h1>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-earth shrink-0" />
              <div className="text-left">
                <span className="text-brand-moss block text-[9px] uppercase leading-none opacity-80">Location</span>
                <span className="text-brand-sage font-semibold leading-none">University of Salford Grounds</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-brand-moss block text-[9px] uppercase leading-none opacity-80">Fresh Sourdough</span>
                <span className="text-[#59785f] font-bold leading-none">✓ Daily at 07:30 AM</span>
              </div>
              <div className="text-right">
                <span className="text-brand-moss block text-[9px] uppercase leading-none opacity-80">Atmosphere</span>
                <span className="text-brand-earth font-bold leading-none">🐾 Fully Dog Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation Menu (Single View layout constraint) */}
      <nav id="room-tabs-navbar" className="bg-brand-cream border-b border-brand-border sticky top-0 z-40 px-4">
        <div className="max-w-7xl mx-auto flex overflow-x-auto scrollbar-none gap-2.5 py-3.5">
          {[
            { id: 'bakery', label: '🥐 Sourdough & Café', subtitle: 'Artisan Menu & Preorder' },
            { id: 'brewery', label: '🍺 Lark Hill Brewery', subtitle: 'Live Drafts & Beer Matcher' },
            { id: 'engine', label: '🔥 The Baking Chamber', subtitle: 'Live Oven Deck Simulator' },
            { id: 'dogs', label: '🐾 Hall of Paws', subtitle: 'Canine Check-in Log' },
            { id: 'heritage', label: '📜 Heritage & Eco', subtitle: '1903 Timeline & Saving Tracker' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex flex-col items-start px-4.5 py-2.5 rounded-2xl text-left transition-all min-w-[170px] shrink-0 cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-brand-sage text-brand-cream border-brand-sage shadow-sm'
                  : 'bg-white hover:bg-[#faf8f3] text-brand-moss border-brand-border/60 hover:text-brand-sage'
              }`}
            >
              <span className="text-xs font-serif font-bold leading-none">{tab.label}</span>
              <span className={`text-[9px] font-mono mt-1 ${activeTab === tab.id ? 'text-brand-earth font-semibold' : 'text-brand-moss/60'}`}>
                {tab.subtitle}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Workspace Frame */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {activeTab === 'bakery' && (
              <div className="space-y-12">
                {/* Embedded gorgeous replicated menu card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-border/60 shadow-sm">
                  <div className="max-w-3xl mx-auto space-y-4">
                    <span className="text-[10px] bg-brand-sage/12 text-[#907a65] font-mono font-bold uppercase py-0.5 px-2 rounded">
                      Premium Masterpiece Mode
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-sage tracking-tight">
                      Salford Heritage Café Printed Menu
                    </h3>
                    <p className="text-brand-moss text-xs font-sans leading-relaxed">
                      This is a real-time replica of our physical, table-printed menu cards. Hover or tap on items to customize sweeteners or milks and register your order. For sourdough loaves, pastries, and lunch pies, see the Sourdough Pre-order builder below the card!
                    </p>
                  </div>
                  <div className="mt-8">
                    <MenuCard onVisitSite={() => setIsExplorerOpen(false)} isExplorerOpen={true} />
                  </div>
                </div>

                {/* Sourdough preorder module */}
                <div id="standard-preorder-container">
                  <MenuExplorer />
                </div>
              </div>
            )}
            {activeTab === 'brewery' && <LarkHillBrewery />}
            {activeTab === 'engine' && <DoughEngine />}
            {activeTab === 'dogs' && <DogFriendly />}
            {activeTab === 'heritage' && <HeritageMap />}
          </motion.div>
        </AnimatePresence>

        {/* Double-duty interactive segment: Salford Community Evening Table Inquiry (Sits cleanly below tabs) */}
        <section id="community-curiosities" className="mt-12 bg-white rounded-3xl border border-brand-border p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] bg-brand-sage/12 text-brand-sage font-mono font-bold uppercase py-0.5 px-2 rounded">
              Community Space Focus
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-sage tracking-tight">
              Looking to host a local study session or social meetup?
            </h3>
            <p className="text-brand-moss text-xs md:text-sm leading-relaxed font-sans">
              As part of the University of Salford, we love fostering cross-disciplinary workspace meetups and sourdough masterclasses. Ask us about reservation schedules or group workspace setups in the engine bays. Sourdough loaf platters and fresh Lark Hill pale ale pints can be prepared in advance for your community!
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-brand-moss">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#59785f]" />
                <span>Student Discounts & study spaces</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-brand-earth" />
                <span>Underground Brick vaults available</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f2efe4]/60 border border-brand-border p-5 rounded-2xl shadow-none">
            {!tableInquirySubmitted ? (
              <form onSubmit={handleTableInquiry} className="space-y-3.5 text-xs">
                <h4 className="text-xs font-mono font-bold text-brand-sage uppercase tracking-wider pb-1 ml-0.5">
                  Host Inquiry Form
                </h4>
                <div>
                  <label className="block text-[10px] uppercase text-brand-moss font-mono mb-1">Your Full Name:</label>
                  <input
                    id="table-inquiry-name"
                    type="text"
                    required
                    placeholder="e.g. Cordelia O."
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full text-xs font-sans px-3 py-2 border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-brand-sage focus:border-brand-sage"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-brand-moss font-mono mb-1">Estimated Attending guests:</label>
                  <select
                    id="table-inquiry-guests"
                    value={inquiryGuests}
                    onChange={(e) => setInquiryGuests(Number(e.target.value))}
                    className="w-full bg-white border border-brand-border px-3 py-2 rounded-lg font-sans text-xs focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  >
                    {[2, 4, 6, 8, 12, 20].map(cnt => (
                      <option key={cnt} value={cnt}>{cnt} Study Companions</option>
                    ))}
                  </select>
                </div>
                <button
                  id="submit-inquiry-btn"
                  type="submit"
                  className="w-full bg-brand-sage hover:bg-brand-dark text-white font-mono uppercase text-[10px] tracking-wider py-2.5 px-4 rounded-xl font-bold transition-all cursor-pointer"
                >
                  Request Meetup Space
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-2">
                <span className="text-2xl">⚡🏛️🎟️</span>
                <h4 className="text-xs font-bold text-brand-sage font-mono">Inquiry Requested!</h4>
                <p className="text-[11px] text-brand-moss font-sans px-1">
                  Thanks, <strong>{inquiryName}</strong>! We’ve reserved slot projection notes for <strong>{inquiryGuests} people</strong>. A Student Union coordinator will email you instructions details!
                </p>
                <button
                  onClick={() => setTableInquirySubmitted(false)}
                  className="text-[10px] font-mono text-brand-earth underline hover:text-brand-sage block mx-auto pt-2"
                >
                  Send another request
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Pristine human/nature theme footer */}
      <footer id="main-firehouse-footer" className="bg-brand-dark text-[#d0ebd6]/70 py-10 px-4 md:px-8 border-t border-brand-sage/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-serif font-bold text-[#faf8f4] tracking-tight flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-brand-earth rounded-sm inline-block"></span>
              The Old Fire Station Salford
            </h4>
            <p className="text-xs text-[#cad5cb] max-w-lg leading-relaxed font-sans">
              Artisan sourdough baking, workspace lounges, and craft fermentation inside Salford’s 1903 heritage emergency depot. Operated in proud partnership with the University of Salford. Fully dog-friendly, sustainably-minded.
            </p>
          </div>

          <div className="space-y-2 text-right md:text-left text-xs font-mono text-brand-border/80">
            <div>
              Tue - Wed: <span className="text-white">8:00 AM — 4:00 PM</span>
            </div>
            <div>
              Thu: <span className="text-white">8:00 AM — 8:00 PM</span>
            </div>
            <div>
              Fri: <span className="text-white font-semibold text-brand-earth">8:00 AM — 9:00 PM (Lark Hill Night)</span>
            </div>
            <div>
              Sat: <span className="text-white">9:00 AM — 4:00 PM</span>
            </div>
            <div className="text-brand-earth font-semibold">
              Sun - Mon: Closed for sourdough culture resting
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center border-t border-white/5 mt-8 pt-4 text-[10px] text-zinc-500 font-mono">
          © {new Date().getFullYear()} The Old Fire Station, Salford. All sourdough culture genomes protected.
        </div>
      </footer>

    </div>
  );
}
