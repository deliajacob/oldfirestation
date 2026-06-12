import { useState, useEffect } from 'react';
import { Clock, MapPin, Sparkles, ChevronDown, Calendar, Phone } from 'lucide-react';
import { getStationStatus } from '../data';
import { TimeState } from '../types';

export default function StatusBanner() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showHoursDropdown, setShowHoursDropdown] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  const status: TimeState = getStationStatus(currentTime);

  const formatUKTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div id="status-banner-container" className="bg-brand-dark text-white border-b border-white/10 py-3 px-4 md:px-8 relative z-50">
      <div id="status-grid" className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
        {/* Left Side: Venue Location / Heritage Identity */}
        <div id="venue-info-section" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2 text-brand-earth font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-earth animate-pulse"></span>
            <span className="tracking-widest uppercase">The Old Fire Station, Salford</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-300">
            <MapPin className="w-3.5 h-3.5 text-brand-earth/80" />
            <span>Albert Street, M5 4NL • University of Salford</span>
          </div>
        </div>

        {/* Right Side: Quick opening indicators */}
        <div id="schedule-status-section" className="flex flex-wrap items-center gap-4">
          {/* Hour & Indicator */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-1.5 px-3.5">
            <Clock className="w-3.5 h-3.5 text-brand-earth" />
            <span className="text-gray-300">Local Time:</span>
            <span className="text-white font-semibold">{formatUKTime(currentTime)}</span>
          </div>

          {/* Dynamic Status Tag */}
          <div className="relative">
            <button
              id="hours-dropdown-toggle-btn"
              onClick={() => setShowHoursDropdown(!showHoursDropdown)}
              className={`flex items-center gap-2 rounded-full py-1.5 px-3.5 font-sans font-medium text-xs transition duration-200 cursor-pointer ${
                status.isOpen
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span>{status.statusText}</span>
              <span className="opacity-60">•</span>
              <span>{status.nextEventText}</span>
              <ChevronDown className="w-3 h-3 text-current ml-0.5" />
            </button>

            {showHoursDropdown && (
              <div
                id="hours-schedule-dropdown"
                className="absolute right-0 mt-2 w-72 bg-brand-dark border border-white/15 rounded-lg shadow-2xl p-4 text-gray-300 text-xs backdrop-blur-md z-50 animate-slide-down"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <span className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Weekly Fire Station Hours
                  </span>
                  <span className="text-[10px] text-brand-earth px-1.5 py-0.5 rounded bg-brand-earth/10 animate-fade-in font-bold">Dog Friendly</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-sans">
                    <span>Tuesday — Wednesday</span>
                    <span className="text-white font-mono">08:00 AM — 04:00 PM</span>
                  </div>
                  <div className="flex justify-between font-sans bg-white/5 p-1 rounded">
                    <span>Thursday (Late)</span>
                    <span className="text-white font-mono">08:00 AM — 08:00 PM</span>
                  </div>
                  <div className="flex justify-between font-sans bg-white/10 p-1 rounded border-l-2 border-brand-earth">
                    <span>Friday (Late Night)</span>
                    <span className="text-white font-mono">08:00 AM — 09:00 PM</span>
                  </div>
                  <div className="flex justify-between font-sans">
                    <span>Saturday</span>
                    <span className="text-white font-mono">09:00 AM — 04:00 PM</span>
                  </div>
                  <div className="flex justify-between font-sans text-gray-500 line-through">
                    <span>Sunday — Monday</span>
                    <span>Closed (Baking rest)</span>
                  </div>
                </div>
                <div className="border-t border-white/10 mt-3 pt-2 text-[10px] text-gray-400 font-sans flex items-center justify-between">
                  <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand-earth" /> Sourdough baked daily at 07:30am</span>
                  <a href="#preorder-section" className="text-brand-earth hover:underline uppercase font-mono font-bold">Pre-order</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
