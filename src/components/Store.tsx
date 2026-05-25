import React, { useState } from 'react';
import { STORE_DATA } from '../data';
import { StoreItem, CartItem } from '../types';
import { ShoppingBag, Star, Trash2, Tag, ShieldCheck, Gamepad2, CreditCard, ChevronRight, CheckCircle, Flame, Gift } from 'lucide-react';

interface StoreProps {
  cart: CartItem[];
  addToCart: (item: StoreItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  onPurchaseComplete: (gamesPurchased: string[], itemsPurchased: string[]) => void;
}

export default function Store({ cart, addToCart, removeFromCart, clearCart, onPurchaseComplete }: StoreProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hardware' | 'apparel' | 'membership'>('all');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [generatedVoucher, setGeneratedVoucher] = useState('');

  // Coupon inline status states instead of window alerts
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState('142 Cyber Boulevard Suite 3A');
  const [cardName, setCardName] = useState('Valkyria XP');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4022');

  const categories = [
    { name: 'All Gear', id: 'all' },
    { name: 'High-Tech Hardware', id: 'hardware' },
    { name: 'Apparel & Wear', id: 'apparel' },
    { name: 'Tokens & Membership', id: 'membership' }
  ];

  const filteredItems = STORE_DATA.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoMessage(null);
    setPromoError(null);
    if (promoCode.toUpperCase() === 'NEON20') {
      setDiscountPercent(20);
      setPromoMessage('Promo code "NEON20" applied! 20% discount subtracted.');
    } else if (promoCode.toUpperCase() === 'GAMER50') {
      setDiscountPercent(50);
      setPromoMessage('Elite promo "GAMER50" applied! 50% discount subtracted.');
    } else {
      setPromoError('Invalid coupon. Try applying NEON20 or GAMER50');
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const discountAmount = subtotal * (discountPercent / 100);
  const tax = subtotal * 0.08;
  const delivery = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal - discountAmount + tax + delivery;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Generate random mock CD-Key or voucher code
    const keyParts = Array.from({ length: 4 }, () => 
      Math.random().toString(36).substring(2, 6).toUpperCase()
    );
    const mockKey = `NEXUS-${keyParts.join('-')}`;
    setGeneratedVoucher(mockKey);

    // Filter dynamic item purchases to send back to Dashboard state
    const gameList: string[] = [];
    const itemList: string[] = [];

    cart.forEach(cartItem => {
      if (cartItem.item.category === 'membership') {
        gameList.push(cartItem.item.title);
      } else {
        itemList.push(`${cartItem.item.title} (x${cartItem.quantity})`);
      }
    });

    onPurchaseComplete(gameList, itemList);
    setCheckoutComplete(true);
    clearCart();
  };

  return (
    <div className="space-y-12 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-8 md:p-12 glass-panel overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,243,255,0.05)]">
        <div className="space-y-3 z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-current" />
            Mega Promo Deal
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            NEXUS SEASON 4 LAUNCH GEAR
          </h2>
          <p className="text-sm text-gray-300">
            Apply coupon <span className="text-cyan-400 font-mono font-bold tracking-wider underline">NEON20</span> on check out to receive instant 20% discount on hyper-linear keyboards and spatial surround headsets.
          </p>
        </div>
        <div className="shrink-0 z-10 hidden md:block">
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center gap-3">
            <Gift className="w-8 h-8 text-cyan-400 animate-bounce" />
            <div>
              <span className="text-xs text-gray-400 font-mono block">UP TO</span>
              <span className="text-2xl font-black text-white font-mono leading-none">50% OFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Store Items Selector & Quick Cart summary panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Store Catalog (Col: 1-8 / 1-9) */}
        <div className="col-span-1 lg:col-span-8 space-y-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 border border-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="glass-panel rounded-3xl overflow-hidden hover:border-cyan-500/35 hover:shadow-[0_0_20px_rgba(0,243,255,0.08)] flex flex-col justify-between transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80" />

                  {/* Badges */}
                  {item.isHot && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1 shadow-lg border border-red-500/20">
                      <Flame className="w-3 h-3 fill-current" />
                      HOT DEAL
                    </span>
                  )}
                  {item.originalPrice && (
                    <span className="absolute bottom-4 right-4 bg-emerald-500/95 text-white font-mono text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                      -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-cyan-400 font-mono uppercase">
                      <span>{item.category}</span>
                      <div className="flex items-center gap-0.5 text-yellow-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {item.rating}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-xl font-bold text-white">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">${item.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 bg-white/5 hover:bg-cyan-500 text-white hover:text-black border border-white/10 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick checkout block (Col: 9-12) */}
        <div className="col-span-1 lg:col-span-4 p-6 glass-panel rounded-3xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-extrabold text-white uppercase flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400 animate-pulse" />
              Checkout Cart
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Select key details & complete mock payment
            </p>
          </div>

          {/* Cart itemized items list */}
          {cart.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <span className="text-gray-400 block text-xs">No items currently drafted in cart.</span>
              <span className="text-[10px] text-cyan-400 font-mono block">HINT: click "ADD TO CART" on listings.</span>
            </div>
          ) : (
            <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
              {cart.map((cartItem) => (
                <div 
                  key={cartItem.item.id} 
                  className="flex items-center justify-between gap-3 p-3 bg-black/40 border border-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={cartItem.item.imageUrl} 
                      alt="" 
                      className="w-10 h-10 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{cartItem.item.title}</h4>
                      <span className="text-[10px] font-mono text-gray-400">${cartItem.item.price} x {cartItem.quantity}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(cartItem.item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Promo Code Form - Custom Inline Feedback */}
          <form onSubmit={applyPromoCode} className="flex flex-col gap-2 border-t border-white/10 pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white flex-1"
                placeholder="PROMO CODE"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold"
              >
                APPLY
              </button>
            </div>
            {promoMessage && (
              <p className="text-[10px] text-emerald-400 font-mono mt-1">{promoMessage}</p>
            )}
            {promoError && (
              <p className="text-[10px] text-red-400 font-mono mt-1">{promoError}</p>
            )}
          </form>

          {/* Checkout Costs Row Summary */}
          <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span>Subtotal:</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex items-center justify-between text-pink-400">
                <span>Promo Discount (-{discountPercent}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span>Tax (8%):</span>
              <span className="text-white">${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery Fee:</span>
              <span className="text-white">{delivery === 0 ? 'FREE' : `$${delivery}`}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold border-t border-white/10 pt-2 text-white">
              <span>TOTAL COST:</span>
              <span className="text-cyan-400">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Trigger slide-over/modal */}
          <button 
            disabled={cart.length === 0}
            onClick={() => {
              setIsCheckoutOpen(true);
              setCheckoutComplete(false);
            }}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-45 disabled:cursor-not-allowed text-black font-extrabold text-xs tracking-widest rounded-xl transition-all uppercase hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>

      {/* Slide-over Mock Checkout Panel */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-[#050507] border-l border-white/10 h-full p-8 overflow-y-auto space-y-8 flex flex-col justify-between">
            
            {/* Upper Frame */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-cyan-400" />
                  NEXUS TRANSMISSION PAY
                </h3>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-3 py-1 bg-white/5 text-gray-400 hover:text-white rounded-lg text-xs"
                >
                  CANCEL
                </button>
              </div>

              {!checkoutComplete ? (
                <form onSubmit={handleCheckout} className="space-y-5">
                  <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/25 space-y-2">
                    <span className="text-[10px] text-cyan-400 font-mono font-bold block">CONFIRM SUMMARY</span>
                    <span className="text-2xl font-black text-white font-mono">${total.toFixed(2)} USD</span>
                    <span className="text-xs text-gray-300 block">Transaction proxies securely verified by Sandbox Bank Gateway.</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Delivery Destination</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full bg-black/55 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Billing ID Name</label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-black/55 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 font-bold">Credit Card</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black/55 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-widest rounded-xl transition-all uppercase shadow-[0_0_20px_rgba(0,243,255,0.25)] cursor-pointer"
                  >
                    AUTHORIZE SECURED ORDER
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest font-mono text-emerald-400">Transaction Successful</span>
                    <h3 className="text-2xl font-black text-white">NEXUS ORDER PROCESSED</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      Your premium accessories have processed delivery queues. Purchased key codes have synced back onto your live **Gamer Dashboard**.
                    </p>
                  </div>

                  {generatedVoucher && (
                    <div className="p-4 bg-black/60 border border-white/10 rounded-2xl select-all">
                      <span className="text-[10px] font-mono text-cyan-400 block mb-1">YOUR CD-KEY ACCESS PASSCODE</span>
                      <span className="text-lg font-mono font-bold tracking-widest text-cyan-300">{generatedVoucher}</span>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCheckoutComplete(false);
                      setGeneratedVoucher('');
                    }}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold"
                  >
                    RETURN TO STORE
                  </button>
                </div>
              )}
            </div>

            {/* Footer diagnostics check */}
            <div className="border-t border-white/10 pt-4 flex items-center gap-3 text-slate-400 text-xs">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>SSL Holographic Enforced Sandbox Connection</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
