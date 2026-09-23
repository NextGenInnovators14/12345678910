import React, { useState } from 'react';
import { 
  Megaphone, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Sparkles,
  Building2,
  BadgePercent
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdvertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvertiseModal: React.FC<AdvertiseModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [brandName, setBrandName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Real Estate Builder / Developer');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !phone) {
      addToast('Please enter your Brand Name and Phone Number', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Advertising inquiry submitted! Our corporate desk will contact you with media kits.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[var(--surface)] max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                Auricity Brand Media
              </span>
              <h3 className="text-xl font-black text-[var(--text-primary)]">
                Advertise With Auricity
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-[var(--text-primary)]">Media Request Received!</h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Thank you, {brandName}. Our Chhatrapati Sambhajinagar ad operations manager will share the rate card & banner slot availability on WhatsApp within 1 hour.
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn-theme-primary px-6 py-2.5 text-xs font-black rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Reach over 50,000+ monthly verified property buyers, investors, and homeowners actively looking across CIDCO, Garkheda, Beed Bypass, and Shendra DMIC.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">Company / Project / Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kalyani Developers / Asian Paints"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs bg-[var(--surface-secondary)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">Contact Person Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma (Marketing Head)"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs bg-[var(--surface-secondary)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs bg-[var(--surface-secondary)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">Advertising Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs bg-[var(--surface-secondary)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="Real Estate Builder / Developer">Real Estate Builder / Township Project</option>
                  <option value="Home Loan & Banking">Home Loan / Banking / Finance</option>
                  <option value="Home Interiors & Modular Kitchen">Home Interiors / Architect / Furniture</option>
                  <option value="Building Materials & Hardware">Building Materials & Construction</option>
                  <option value="Packers & Movers">Packers, Movers & Logistics</option>
                  <option value="Other Corporate Brand">Other Corporate Brand</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-theme-primary w-full py-3 text-xs sm:text-sm font-black rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Media Kit & Ad Slots</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
