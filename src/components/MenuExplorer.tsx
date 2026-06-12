import { useState, useMemo, FormEvent } from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { Search, ShoppingBag, Trash2, Heart, Sparkles, Check, Flame, Award, Coffee, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bakery' | 'breakfast' | 'lunch' | 'drinks'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Bag State for Bakery Simulation
  const [preorderBag, setPreorderBag] = useState<{ item: MenuItem; quantity: number; sliceOption: string }[]>([]);
  const [customSlices, setCustomSlices] = useState<{ [itemId: string]: string }>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isBagSubmitted, setIsBagSubmitted] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');

  // Sourdough Toast Slicing choices
  const slicingOptions = ['Whole (No slice - keeps fresh longest)', 'Classic Medium Slice (Everyday)', 'Thick Country Toast Slice (Hearty)'];

  // Handle items favorites state
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Pre-order Bag Management
  const addToBag = (item: MenuItem) => {
    setIsBagSubmitted(false);
    const existingIndex = preorderBag.findIndex(bagItem => bagItem.item.id === item.id);
    const sliceOption = customSlices[item.id] || (item.name.toLowerCase().includes('sourdough') || item.name.toLowerCase().includes('loaf') ? slicingOptions[0] : 'N/A');

    if (existingIndex !== -1) {
      const updated = [...preorderBag];
      updated[existingIndex].quantity += 1;
      setPreorderBag(updated);
    } else {
      setPreorderBag([...preorderBag, { item, quantity: 1, sliceOption }]);
    }
  };

  const removeFromBag = (itemId: string) => {
    setPreorderBag(preorderBag.filter(bagItem => bagItem.item.id !== itemId));
  };

  const clearBag = () => {
    setPreorderBag([]);
    setIsBagSubmitted(false);
  };

  const changeQuantity = (itemId: string, delta: number) => {
    const updated = preorderBag.map(bagItem => {
      if (bagItem.item.id === itemId) {
        const newQty = bagItem.quantity + delta;
        return { ...bagItem, quantity: Math.max(1, newQty) };
      }
      return bagItem;
    });
    setPreorderBag(updated);
  };

  // Submit preorder
  const submitPreorder = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || preorderBag.length === 0) return;
    setIsBagSubmitted(true);
  };

  // Extract all available tags for filters under current selection
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MENU_ITEMS.forEach(item => {
      if (item.tags) {
        item.tags.forEach(t => tags.add(t));
      }
    });
    return Array.from(tags);
  }, []);

  // Filter Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || (item.tags && item.tags.includes(selectedTag));
      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  // Bag Totals
  const bagTotal = useMemo(() => {
    return preorderBag.reduce((total, bagItem) => total + bagItem.item.price * bagItem.quantity, 0);
  }, [preorderBag]);

  // Environmental impact stats for using preorder
  const co2SavedGrams = useMemo(() => {
    // 15g saved per preorder (avoids bakery waste, compostable paper packaging)
    return preorderBag.reduce((total, bagItem) => total + 18 * bagItem.quantity, 0);
  }, [preorderBag]);

  return (
    <div id="culinary-manifesto-root" className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
      {/* Menu Categories, Filters, Search & Grid (2 Cols on Desktop) */}
      <div id="menu-browsing-column" className="lg:col-span-2 space-y-6">
        
        {/* Category Filter and Search Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-border p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-serif font-bold text-brand-sage tracking-tight flex items-center gap-2">
              <Coffee className="w-5 h-5 text-brand-sage" />
              <span>Explore Today's Firehouse Servings</span>
            </h2>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-moss" />
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search sourdough, coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-cream/40 pl-9 pr-4 py-2 border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-sage focus:border-brand-sage transition-all"
              />
            </div>
          </div>

          {/* Categories Tab Selector */}
          <div id="category-tabs" className="flex flex-wrap gap-1.5 border-b border-brand-border pb-4">
            {['all', 'bakery', 'breakfast', 'lunch', 'drinks'].map((category) => (
              <button
                key={category}
                id={`cat-tab-${category}`}
                onClick={() => {
                  setSelectedCategory(category as any);
                  setSelectedTag(null); // clear tag filter
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-brand-sage text-brand-cream shadow-sm'
                    : 'bg-[#f2efe4]/60 text-brand-moss hover:bg-brand-border/60 hover:text-brand-sage'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Specialized tags quick filtering */}
          <div id="tag-filters" className="flex flex-wrap gap-2 items-center text-xs">
            <span className="text-brand-moss opacity-80 font-mono">Speciality filters:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                selectedTag === null
                  ? 'bg-brand-sage text-brand-cream border-brand-sage font-semibold'
                  : 'bg-white text-brand-moss border-brand-border hover:bg-[#faf8f3]'
              }`}
            >
              All Diets / Features
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
                  selectedTag === tag
                    ? 'bg-brand-earth/15 text-brand-earth border-brand-earth font-semibold'
                    : 'bg-white text-brand-moss border-brand-border hover:bg-[#faf8f3]'
                }`}
              >
                {tag.includes('Speciality') && <Sparkles className="w-3 h-3 text-brand-earth" />}
                {tag.includes('Bestseller') && <Flame className="w-3 h-3 text-brand-earth" />}
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Menu Grid */}
        <div id="menu-items-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-brand-border/60 p-5 hover:shadow-md hover:border-brand-sage/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      {/* Fresh hour badge */}
                      {item.freshHour && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-earth/10 text-brand-earth text-[10px] font-mono font-bold mb-1">
                          <Flame className="w-3 h-3" /> Fresh Out Of Deck at {item.freshHour}
                        </span>
                      )}
                      <h3 className="text-base font-serif font-bold text-brand-sage group-hover:text-brand-earth transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-sm font-mono font-bold text-brand-sage shrink-0 bg-brand-cream/50 border border-brand-border px-2.5 py-1 rounded-lg">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-brand-moss/90 line-clamp-3 mb-4 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-border/20 mt-auto">
                  {/* Item tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] bg-brand-cream text-brand-moss border border-brand-border/40 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions (Favorite + Add to pre-order container) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        favorites.includes(item.id)
                          ? 'text-rose-600 bg-rose-50 border-rose-200'
                          : 'text-brand-moss/60 hover:text-rose-500 bg-white hover:bg-rose-50/50 border-brand-border'
                      }`}
                      title="Add to Favorites"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {item.category === 'bakery' ? (
                      <button
                        onClick={() => addToBag(item)}
                        className="bg-brand-sage hover:bg-brand-dark hover:scale-[1.02] text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Pre-order</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToBag(item)}
                        className="bg-[#f2efe4]/60 hover:bg-brand-border/60 text-brand-moss hover:text-brand-sage text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-brand-moss" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sourdough custom Slicing settings shown right in the card for comfort */}
                {item.category === 'bakery' && (item.name.toLowerCase().includes('sourdough') || item.name.toLowerCase().includes('loaf')) && (
                  <div className="mt-3 bg-brand-cream border border-brand-border p-2.5 rounded-xl">
                    <label className="block text-[10px] font-mono font-bold text-brand-moss mb-1">
                      Choose Loaf Slicing:
                    </label>
                    <select
                      value={customSlices[item.id] || slicingOptions[0]}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomSlices(prev => ({ ...prev, [item.id]: val }));
                        // Also update item within bag if already added
                        setPreorderBag(prevBag => prevBag.map(bagItem => {
                          if (bagItem.item.id === item.id) {
                            return { ...bagItem, sliceOption: val };
                          }
                          return bagItem;
                        }));
                      }}
                      className="w-full bg-white text-brand-sage border border-brand-border text-[11px] py-1 px-2 rounded focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    >
                      {slicingOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full py-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No firehouse staples match your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedTag(null);
                }}
                className="text-brand-red font-mono text-xs hover:underline mt-2 font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sourdough & Pastry Pre-Order Bag Column */}
      <div id="pre-order-bag-column" className="lg:col-span-1">
        <div id="preorder-section" className="bg-white rounded-3xl shadow-sm border border-brand-border overflow-hidden sticky top-4">
          <div className="bg-brand-sage text-brand-cream p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-earth" />
              <h3 className="font-serif font-bold text-base tracking-tight">Your Breakfast Bag</h3>
            </div>
            {preorderBag.length > 0 && (
              <button
                onClick={clearBag}
                className="text-[#fbf9f4]/80 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
              >
                <Trash2 className="w-3.5 h-3.5 text-brand-earth" /> Clear
              </button>
            )}
          </div>

          <div className="p-5 space-y-4">
            {preorderBag.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-900 font-sans font-medium text-sm">Your bag is empty</p>
                  <p className="text-gray-400 text-xs mt-1 px-4">
                    Add sourdough, cardamom buns, or flat whites to pre-order for fresh-out-the-oven pickup at Salford!
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* List Items */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {preorderBag.map(bagItem => (
                    <div key={bagItem.item.id} className="flex gap-2.5 justify-between items-start border-b border-[#f2efe4] pb-3">
                      <div className="space-y-0.5">
                        <span className="font-serif font-bold text-xs text-brand-sage">
                          {bagItem.item.name}
                        </span>
                        {bagItem.sliceOption !== 'N/A' && (
                          <div className="text-[10px] text-brand-earth bg-brand-cream py-0.5 px-2 rounded border border-brand-border font-mono line-clamp-1">
                            Slice: {bagItem.sliceOption}
                          </div>
                        )}
                        <span className="text-[11px] text-brand-moss font-mono">
                          £{bagItem.item.price.toFixed(2)} each
                        </span>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => changeQuantity(bagItem.item.id, -1)}
                          className="w-5 h-5 bg-[#f2efe4]/60 hover:bg-brand-border border border-brand-border rounded text-brand-moss font-semibold text-xs flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold w-5 text-center text-brand-sage">
                          {bagItem.quantity}
                        </span>
                        <button
                          onClick={() => changeQuantity(bagItem.item.id, 1)}
                          className="w-5 h-5 bg-[#f2efe4]/60 hover:bg-brand-border border border-brand-border rounded text-brand-moss font-semibold text-xs flex items-center justify-center transition-colors"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeFromBag(bagItem.item.id)}
                          className="text-brand-moss/40 hover:text-[#b08968] p-1 rounded hover:bg-gray-50 ml-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Eco-efficiency Savings Badge */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 flex gap-2.5 items-start">
                  <div className="bg-emerald-500/10 text-emerald-600 p-1 rounded-lg shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-emerald-700 font-mono">Artisan Zero-Waste Pickup Saved!</h5>
                    <p className="text-[10px] text-emerald-600 font-sans mt-0.5 leading-relaxed">
                      By pre-ordering, you help us bake exactly what is needed, reducing flour waste.
                      <strong> Saving approx. {co2SavedGrams}g CO₂e</strong> in packaging.
                    </p>
                  </div>
                </div>

                {/* Subtotals & Form Checkout */}
                <div className="border-t border-brand-border/45 pt-4 space-y-3">
                  <div className="flex justify-between font-mono text-sm font-bold text-brand-sage">
                    <span>Grand Total:</span>
                    <span className="text-brand-earth">£{bagTotal.toFixed(2)}</span>
                  </div>

                  {!isBagSubmitted ? (
                    <form onSubmit={submitPreorder} className="space-y-3.5 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-brand-moss mb-1 font-mono">
                          Enter Name for Pickup Label:
                        </label>
                        <input
                          id="preorder-name-input"
                          type="text"
                          required
                          placeholder="e.g. Cordelia / Dr. John"
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            setIsBagSubmitted(false);
                          }}
                          className="w-full text-xs font-sans px-3 py-2 border border-brand-border bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-sage"
                        />
                      </div>

                      <button
                        id="preorder-submit-btn"
                        type="submit"
                        className="w-full bg-brand-sage hover:bg-brand-dark text-white font-sans text-xs uppercase font-bold tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4 text-brand-earth" /> Submit Breakfast Inquiry
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-brand-earth/5 border-2 border-dashed border-brand-earth/30 rounded-xl p-4 text-center mt-3"
                    >
                      <Sparkles className="w-5 h-5 text-brand-earth mx-auto mb-2" />
                      <h4 className="text-xs font-bold text-brand-sage font-mono">Pre-Order Inquired successfully!</h4>
                      <p className="text-[11px] text-brand-moss mt-1 leading-relaxed font-sans">
                        Thanks, <strong>{customerName}</strong>! We've reserved your freshly-baked items labeled under your name.
                      </p>
                      <div className="bg-white px-3 py-1.5 rounded-lg border border-brand-border text-[10px] inline-block mt-3 text-brand-moss font-mono text-left">
                        🎒 Label: #{customerName.slice(0,3).toUpperCase()}-{Math.floor(100 + Math.random() * 900)}
                        <br />
                        📍 Pick-up: Ground Bay Counter (Old Fire Station)
                      </div>
                      <button
                        onClick={() => {
                          setIsBagSubmitted(false);
                          clearBag();
                        }}
                        className="block w-full text-center text-xs font-semibold text-brand-earth hover:underline mt-4 cursor-pointer"
                      >
                        Build Another Bag
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
