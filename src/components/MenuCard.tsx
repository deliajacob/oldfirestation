import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Plus, Minus, Check, Minimize2, Maximize2, Share2, HelpCircle, Heart, Flame } from 'lucide-react';

// Import newly generated photorealistic images
import coffeeBeansBg from '../assets/images/coffee_beans_border_1781258165737.jpg';
import latteCup from '../assets/images/latte_art_cup_1781258180932.jpg';
import milkshakeGlass from '../assets/images/whipped_milkshake_glass_1781258192682.jpg';
import teaCup from '../assets/images/green_tea_mint_cup_1781258205893.jpg';

interface MenuCardProps {
  onVisitSite: () => void;
  isExplorerOpen: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
}

export default function MenuCard({ onVisitSite, isExplorerOpen }: MenuCardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string; price: number; category: string } | null>(null);
  
  // Customization choices
  const [sweetness, setSweetness] = useState('Standard');
  const [milkOption, setMilkOption] = useState('Whole milk');
  const [extraShot, setExtraShot] = useState(false);

  // Hardcode exact matching menu structure from the screenshot
  const menuData = {
    coffee: {
      title: 'Coffee',
      items: [
        { id: 'c1', name: 'Espresso', price: 5.00 },
        { id: 'c2', name: 'Double Espresso', price: 5.00 },
        { id: 'c3', name: 'Latte', price: 6.00 },
        { id: 'c4', name: 'Americano', price: 5.00 },
        { id: 'c5', name: 'Macchiato', price: 7.00 },
        { id: 'c6', name: 'Cappuccino', price: 8.00 }
      ]
    },
    nonCoffee: {
      title: 'Non-Coffee',
      items: [
        { id: 'nc1', name: 'Milkshake', price: 5.00 },
        { id: 'nc2', name: 'Hot Chocolate', price: 5.00 },
        { id: 'nc3', name: 'Smoothie', price: 6.00 },
        { id: 'nc4', name: 'Vanilla Milkshake', price: 5.00 }
      ]
    },
    tea: {
      title: 'Tea',
      items: [
        { id: 't1', name: 'Lemon Tea', price: 5.00 },
        { id: 't2', name: 'Green Tea', price: 5.00 },
        { id: 't3', name: 'Mint Tea', price: 6.00 }
      ]
    }
  };

  const handleAddItemToOrder = () => {
    if (!selectedItem) return;
    
    setOrder(prev => {
      const idx = prev.findIndex(i => i.id === selectedItem.id);
      let customText = '';
      if (selectedItem.category === 'Coffee') {
        customText = `${milkOption}${extraShot ? ', +Shot' : ''}`;
      } else if (selectedItem.category === 'Tea' || selectedItem.category === 'Non-Coffee') {
        customText = `${sweetness} sweetness`;
      }

      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      } else {
        return [...prev, {
          id: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          quantity: 1,
          customization: customText
        }];
      }
    });

    setSelectedItem(null);
    resetCustomizations();
  };

  const resetCustomizations = () => {
    setSweetness('Standard');
    setMilkOption('Whole milk');
    setExtraShot(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setOrder(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromOrder = (id: string) => {
    setOrder(prev => prev.filter(item => item.id !== id));
  };

  const totalSum = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Simple highlight filter matches
  const isMatch = (name: string) => {
    if (!searchQuery) return true;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className={`relative transition-all duration-500 ease-in-out ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4' : 'w-full'}`}>
      
      {/* Absolute fullscreen escape button */}
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all cursor-pointer z-50 border border-white/20 shadow-lg"
          title="Exit Fullscreen Mode"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      )}

      {/* Main Printed Menu Sheet replica */}
      <div 
        id="printed-menu-sheet-container"
        className={`bg-[#faf8f4] border border-[#e2dfd4] rounded-[24px] overflow-hidden relative leading-normal font-serif select-none select-text ${
          isFullscreen 
            ? 'w-full max-w-[780px] min-h-[960px] shadow-2xl relative my-auto' 
            : 'w-full max-w-[800px] mx-auto min-h-[950px] shadow-sm'
        }`}
        style={{
          boxShadow: '0 10px 40px -15px rgba(115, 95, 75, 0.12), inset 0 0 40px rgba(184, 155, 125, 0.05)'
        }}
      >
        
        {/* Subtle, abstract guilloche wavy decorative curves overlaid */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none opacity-[0.22] z-0 overflow-hidden select-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            {/* Fine security mesh wave lines from top left spreading down */}
            <path d="M-50,150 C200,80 300,450 600,100" fill="none" stroke="#b08968" strokeWidth="0.75" />
            <path d="M-50,170 C220,100 320,470 600,120" fill="none" stroke="#b08968" strokeWidth="0.75" />
            <path d="M-50,190 C240,120 340,490 600,140" fill="none" stroke="#b08968" strokeWidth="0.75" />
            <path d="M-50,210 C260,140 360,510 600,160" fill="none" stroke="#b08968" strokeWidth="0.75" />
            <path d="M-50,230 C280,160 380,530 600,180" fill="none" stroke="#b08968" strokeWidth="0.75" />

            <path d="M-80,450 C180,300 400,600 700,400" fill="none" stroke="#b08968" strokeWidth="0.5" />
            <path d="M-80,470 C200,320 420,620 700,420" fill="none" stroke="#b08968" strokeWidth="0.5" />
            <path d="M-80,490 C220,340 440,640 700,440" fill="none" stroke="#b08968" strokeWidth="0.5" />
            <path d="M-80,510 C240,360 460,660 700,460" fill="none" stroke="#b08968" strokeWidth="0.5" />

            {/* Circular concentric watermarks */}
            <circle cx="150" cy="720" r="140" fill="none" stroke="#b08968" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="150" cy="720" r="180" fill="none" stroke="#b08968" strokeWidth="0.5" />
            <circle cx="150" cy="720" r="220" fill="none" stroke="#b08968" strokeWidth="0.25" />
          </svg>
        </div>

        {/* Outer subtle shadow overlay recreating the page curvature glow from the original photo */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/[0.015] via-transparent to-black/[0.04] z-10"></div>

        {/* Two column absolute body grid */}
        <div className="grid grid-cols-12 min-h-[950px] relative z-20">
          
          {/* LEFT/CENTER REGION: Main Menu Content (78% of card width) */}
          <div className="col-span-9 md:col-span-9 p-6 md:p-10 flex flex-col justify-between relative">
            
            {/* Header: Menu with ornament */}
            <div id="replicated-menu-heading-block" className="space-y-1 mb-6 relative">
              <span className="font-serif text-[44px] md:text-[52px] font-bold text-[#4e342e] tracking-tight leading-none block">
                Menu
              </span>
              {/* Elegant scroll double lines with tiny diamond star in the middle */}
              <div className="relative flex items-center justify-start max-w-[280px]">
                <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-[#bcaaa4]"></div>
                <div className="h-[3px] border-y border-[#8d6e63] w-full flex items-center justify-center relative py-[1.5px]">
                  <span className="text-[9px] text-[#8d6e63] px-2 bg-[#faf8f4] relative z-10 leading-none">♦</span>
                </div>
                <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent to-[#bcaaa4]"></div>
              </div>
            </div>

            {/* Menu Items Staged vertically with Staggered illustrations */}
            <div className="space-y-6 md:space-y-8 flex-grow">
              
              {/* Row 1: COFFEE SECTION */}
              <div id="menu-row-coffee" className="grid grid-cols-12 gap-4 md:gap-6 items-start">
                
                {/* Visual: Latte Cup (Left Side of Coffee list) */}
                <div className="col-span-5 md:col-span-5 flex flex-col items-center justify-center pt-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                    title="Add Latte to Order"
                    onClick={() => setSelectedItem({ id: 'c3', name: 'Latte', price: 6.00, category: 'Coffee' })}
                  >
                    <div className="absolute inset-0 rounded-full bg-black/5 blur-xl group-hover:bg-black/10 transition-all transform translate-y-3 px-2"></div>
                    <img 
                      src={latteCup} 
                      alt="Speciality hot latte cup with saucer" 
                      className="w-36 md:w-44 h-auto object-contain relative z-10 drop-shadow-xl select-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute right-2 bottom-2 bg-[#8d6e63] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 z-20 shadow-md transition-all">
                      <Plus className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Items Stack: Coffee (Right Side) */}
                <div className="col-span-7 md:col-span-7 pl-2 md:pl-4">
                  {/* Script Handwriting title "Coffee" */}
                  <div className="font-script text-[48px] md:text-[58px] text-[#795548] leading-none mb-3 -ml-4 select-none">
                    Coffee
                  </div>

                  {/* Coffee List */}
                  <div className="space-y-2 md:space-y-2.5 font-serif text-sm">
                    {menuData.coffee.items.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedItem({ ...item, category: 'Coffee' })}
                        className={`flex justify-between items-end group cursor-pointer p-1 rounded-lg transition-all hover:bg-[#8d6e63]/5 ${
                          !isMatch(item.name) ? 'opacity-20' : ''
                        }`}
                      >
                        <span className="text-[#3e2723] font-medium leading-tight group-hover:text-[#a1887f] transition-all relative">
                          {item.name}
                          {searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase()) && (
                            <span className="absolute inset-0 bg-[#e0f2f1] mix-blend-multiply rounded px-0.5"></span>
                          )}
                        </span>
                        <div className="border-b border-dotted border-[#d7ccc8] flex-grow mx-2 mb-1.5 opacity-50"></div>
                        <span className="text-[#8d6e63] font-bold text-nowrap select-all">
                          $ {item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Row 2: NON-COFFEE SECTION */}
              <div id="menu-row-non-coffee" className="grid grid-cols-12 gap-4 md:gap-6 items-start">
                
                {/* Visual: Milkshake/Smoothie (Left Side) */}
                <div className="col-span-5 md:col-span-5 flex flex-col items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                    title="Add Milkshake to Order"
                    onClick={() => setSelectedItem({ id: 'nc1', name: 'Milkshake', price: 5.00, category: 'Non-Coffee' })}
                  >
                    <div className="absolute inset-0 rounded-full bg-black/5 blur-xl group-hover:bg-black/10 transition-all transform translate-y-3 px-2"></div>
                    <img 
                      src={milkshakeGlass} 
                      alt="Gourmet milkshake with whipped cream" 
                      className="w-24 md:w-28 h-auto object-contain relative z-10 drop-shadow-xl select-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute right-2 bottom-2 bg-[#8d6e63] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 z-20 shadow-md transition-all">
                      <Plus className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Items Stack: Non-Coffee (Right side) */}
                <div className="col-span-7 md:col-span-7 pl-2 md:pl-4">
                  {/* Script Handwriting Title "Non-Coffee" */}
                  <div className="font-script text-[48px] md:text-[58px] text-[#795548] leading-none mb-3 -ml-4 select-none">
                    Non-Coffee
                  </div>

                  {/* Non-Coffee List */}
                  <div className="space-y-2 md:space-y-2.5 font-serif text-sm">
                    {menuData.nonCoffee.items.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedItem({ ...item, category: 'Non-Coffee' })}
                        className={`flex justify-between items-end group cursor-pointer p-1 rounded-lg transition-all hover:bg-[#8d6e63]/5 ${
                          !isMatch(item.name) ? 'opacity-20' : ''
                        }`}
                      >
                        <span className="text-[#3e2723] font-medium leading-tight group-hover:text-[#a1887f] transition-all">
                          {item.name}
                        </span>
                        <div className="border-b border-dotted border-[#d7ccc8] flex-grow mx-2 mb-1.5 opacity-50"></div>
                        <span className="text-[#8d6e63] font-bold text-nowrap select-all">
                          $ {item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Row 3: TEA SECTION */}
              <div id="menu-row-tea" className="grid grid-cols-12 gap-4 md:gap-6 items-start">
                
                {/* Visual: Hot tea cup with mint (Left Side) */}
                <div className="col-span-5 md:col-span-5 flex flex-col items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                    title="Add Lemon Tea to Order"
                    onClick={() => setSelectedItem({ id: 't1', name: 'Lemon Tea', price: 5.00, category: 'Tea' })}
                  >
                    <div className="absolute inset-0 rounded-full bg-black/5 blur-xl group-hover:bg-black/10 transition-all transform translate-y-3 px-2"></div>
                    <img 
                      src={teaCup} 
                      alt="Aesthetic cup of green tea with fresh mint leaves" 
                      className="w-32 md:w-36 h-auto object-contain relative z-10 drop-shadow-xl select-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute right-2 bottom-2 bg-[#8d6e63] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 z-20 shadow-md transition-all">
                      <Plus className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Items Stack: Tea (Right side) */}
                <div className="col-span-7 md:col-span-7 pl-2 md:pl-4">
                  {/* Script Handwriting Title "Tea" */}
                  <div className="font-script text-[48px] md:text-[58px] text-[#795548] leading-none mb-2 -ml-4 select-none">
                    Tea
                  </div>

                  {/* Tea List */}
                  <div className="space-y-2 md:space-y-2.5 font-serif text-sm">
                    {menuData.tea.items.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedItem({ ...item, category: 'Tea' })}
                        className={`flex justify-between items-end group cursor-pointer p-1 rounded-lg transition-all hover:bg-[#8d6e63]/5 ${
                          !isMatch(item.name) ? 'opacity-20' : ''
                        }`}
                      >
                        <span className="text-[#3e2723] font-medium leading-tight group-hover:text-[#a1887f] transition-all">
                          {item.name}
                        </span>
                        <div className="border-b border-dotted border-[#d7ccc8] flex-grow mx-2 mb-1.5 opacity-50"></div>
                        <span className="text-[#8d6e63] font-bold text-nowrap select-all font-serif">
                          $ {item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Overlay Replica: Pill button and arrow */}
            <div className="mt-8 flex items-center justify-between">
              
              {/* Bottom Left: "↗ Visit site" white pill button from screenshot */}
              <button 
                id="visit-site-trigger-overlay"
                onClick={onVisitSite}
                className="bg-white/95 backdrop-blur-md text-[#2f3b32] font-sans font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#ebdcc1]/40 flex items-center gap-2.5 z-40 cursor-pointer"
                style={{
                  boxShadow: '0 8px 24px -6px rgba(115, 95, 75, 0.18)'
                }}
              >
                <span className="text-base select-none">↗</span>
                <span className="tracking-wide">
                  {isExplorerOpen ? 'Hide Site Explorer' : 'Visit site'}
                </span>
              </button>

              <div className="text-[10px] text-[#8d6e63]/40 font-mono tracking-widest leading-none select-none">
                SALFORD HERITAGE VAULTS
              </div>
            </div>

          </div>

          {/* RIGHT REGION: Cascade of Coffee Beans (25% of card width) */}
          <div className="col-span-3 md:col-span-3 h-full relative overflow-hidden select-none">
            {/* Roasted Beans graphic covering right half perfectly */}
            <div 
              style={{ backgroundImage: `url(${coffeeBeansBg})` }}
              className="absolute inset-0 bg-cover bg-left h-full w-full select-none"
            ></div>
            
            {/* Shading/gradient matching the photograph lighting */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/5 to-transparent pointer-events-none"></div>
          </div>

        </div>

        {/* TOP RIGHT OVERLAY: Google Lens search scan trigger */}
        <div id="replicated-lens-box" className="absolute top-6 right-6 z-30 select-none flex items-center gap-2">
          {/* Quick Search toggle */}
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#795548] hover:text-[#3e2723] hover:scale-105 active:scale-95 transition-all border border-gray-100 cursor-pointer"
            title="Search menu items"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Realistic Lens circular layout */}
          <div 
            className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
            title="Google Lens Scan Photo Replica"
            onClick={() => {
              setShowSearch(true);
              const items = ['Latte', 'Espresso', 'Tea', 'Milkshake'];
              const randomItem = items[Math.floor(Math.random() * items.length)];
              setSearchQuery(randomItem);
            }}
          >
            {/* Hand-drawn lens camera target */}
            <span className="text-sm font-semibold select-none font-sans">🔍</span>
          </div>
        </div>

        {/* BOTTOM RIGHT OVERLAY: Expand glass icon */}
        <div className="absolute bottom-6 right-6 z-30 select-none">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center text-[#5d4037] hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Perfect Full View Replica"}
            style={{
              boxShadow: '0 6px 16px -4px rgba(93, 64, 55, 0.25)'
            }}
          >
            <span className="text-xl font-bold font-sans">⤢</span>
          </button>
        </div>

        {/* Mini interactive Search bar popover */}
        <AnimatePresence>
          {showSearch && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-18 right-6 bg-white rounded-2xl shadow-xl border border-[#ebdcc1] p-4 z-40 w-64 font-sans text-xs"
            >
              <div className="flex items-center gap-2">
                <input 
                  type="text"
                  placeholder="Type to highlight menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf8f4] border border-[#dedcb8] rounded-xl text-xs text-[#3e2723] focus:outline-none focus:ring-1 focus:ring-[#795548]"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[#8d6e63] font-semibold font-mono text-[10px] hover:underline shrink-0"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-[10px] text-[#8e8d89] mt-2 italic font-serif leading-none">
                Matching items stay highlighted, others fade away.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Cart Panel when order items are present */}
        <AnimatePresence>
          {order.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="absolute bottom-24 left-6 right-6 md:left-[5%] md:right-[5%] bg-[#faf8f4] border border-[#a1887f] rounded-2xl shadow-2xl p-4 md:p-5 z-40 max-w-[500px] mx-auto font-sans text-xs text-[#3e2723]"
            >
              <div className="flex items-center justify-between border-b border-[#ebdcc1] pb-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <ShoppingCart className="w-4 h-4 text-[#8d6e63]" />
                  <span className="font-serif font-bold text-sm text-[#4e342e]">
                    Your Salford Coffee Order
                  </span>
                </div>
                <button 
                  onClick={() => setOrder([])}
                  className="text-xs text-[#e53935] font-semibold hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Order Lists */}
              <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                {order.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b border-[#f5f2eb] pb-2 last:border-0">
                    <div className="space-y-0.5">
                      <div className="font-serif font-bold text-xs text-[#4e342e]">{item.name}</div>
                      {item.customization && (
                        <div className="text-[10px] text-[#8d6e63] font-mono">{item.customization}</div>
                      )}
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-[#8d6e63] font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="flex items-center gap-1 bg-[#ebdcc1]/20 border border-[#ebdcc1]/60 rounded-lg p-0.5">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-white hover:bg-gray-150 rounded"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-5 text-center font-mono font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-white hover:bg-gray-150 rounded"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="border-t border-[#ebdcc1] pt-3 mt-3 flex items-center justify-between font-serif text-sm font-bold">
                <span className="text-[#4e342e]">Total Price:</span>
                <span className="text-[#8d6e63] text-base">${totalSum.toFixed(2)}</span>
              </div>

              {/* Submit / Mock Checkout */}
              <button 
                onClick={() => {
                  alert(`Order simulation requested! An elegant tray is being prepared for pickup counters. Total: $${totalSum.toFixed(2)}`);
                  setOrder([]);
                }}
                className="w-full mt-3 bg-[#5c3a21] hover:bg-[#4a2c11] text-white py-2.5 px-4 rounded-xl font-sans text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Place Coffee Order
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Customization Details Dialog */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#faf8f4] border-2 border-[#a1887f] rounded-2xl shadow-2xl p-6 w-full max-w-sm font-sans"
              >
                <h3 className="font-serif font-bold text-lg text-[#3e2723] mb-1">
                  Customize Your Cup
                </h3>
                <p className="text-xs text-[#8d6e63] font-serif mb-4">
                  {selectedItem.name} — ${selectedItem.price.toFixed(2)}
                </p>

                {/* Specific option fields depending on item */}
                {selectedItem.category === 'Coffee' ? (
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-[#8d6e63] mb-1.5 font-mono">
                        Select Milk preference:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs text-[#3e2723]">
                        {['Whole milk', 'Oat milk (+50c)', 'Almond milk', 'No milk'].map(m => (
                          <button
                            key={m}
                            onClick={() => setMilkOption(m)}
                            className={`p-2 rounded-xl text-left border text-[11px] transition-all hover:bg-stone-50 ${
                              milkOption === m ? 'border-[#8d6e63] bg-[#8d6e63]/10 font-bold' : 'border-[#d7ccc8]'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#ebdcc1] pt-3">
                      <span className="text-xs font-serif font-medium text-[#4e342e]">Add extra espresso shot:</span>
                      <input 
                        type="checkbox" 
                        checked={extraShot}
                        onChange={(e) => setExtraShot(e.target.checked)}
                        className="accent-[#8d6e63] h-4 w-4"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-[#8d6e63] mb-1.5 font-mono">
                        Sweetness Level:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 text-xs text-[#3e2723]">
                        {['Less Sweet', 'Standard', 'Extra Sweet'].map(s => (
                          <button
                            key={s}
                            onClick={() => setSweetness(s)}
                            className={`p-2 rounded-xl text-center border text-[10px] transition-all ${
                              sweetness === s ? 'border-[#8d6e63] bg-[#8d6e63]/10 font-bold' : 'border-[#d7ccc8]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2.5 mt-6 border-t border-[#ebdcc1] pt-4">
                  <button 
                    onClick={() => { setSelectedItem(null); resetCustomizations(); }}
                    className="flex-1 border border-[#ebdcc1] text-[#795548] font-bold py-2 px-3 rounded-lg hover:bg-stone-50 transition-all text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddItemToOrder}
                    className="flex-1 bg-[#5c3a21] hover:bg-[#4a2c11] text-white font-bold py-2 px-3 rounded-lg transition-all text-xs"
                  >
                    Add to order
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
