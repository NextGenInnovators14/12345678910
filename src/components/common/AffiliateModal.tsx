import React, { useState } from 'react';
import { 
  Users, 
  X, 
  CheckCircle2, 
  Coins, 
  ArrowRight, 
  PhoneCall, 
  Sparkles,
  Share2,
  LockKeyhole,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { addAffiliateApplication } from '../../utils/affiliateStorage';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({ isOpen, onClose }) => {
  const { showToast, setActiveView } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [city, setCity] = useState('Chhatrapati Sambhajinagar');
  const [profession, setProfession] = useState('Individual / Citizen');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please enter your Name and WhatsApp Number', 'error');
      return;
    }
    if (!password || password.trim().length < 6) {
      showToast('Please create a password with at least 6 characters', 'error');
      return;
    }

    const cleanPhone = phone.trim();
    addAffiliateApplication({
      id: `af-${Date.now()}`,
      affiliateId: `AUR-AF-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      status: 'under_review',
      fullName: name.trim(),
      email: `${cleanPhone.replace(/[^0-9]/g, '')}@auricitypartners.in`,
      mobile: cleanPhone,
      password: password.trim(),
      city,
      state: 'Maharashtra',
      profession,
      referralCode: name.trim().split(' ')[0].toUpperCase() + Math.floor(100 + Math.random() * 900),
      submittedAt: new Date().toISOString(),
      adminNotes: 'Application submitted via Quick Partner Modal. Pending review.'
    });

    setSubmitted(true);
    showToast('Affiliate Application Submitted! Auricity admin will review your account.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[var(--surface)] max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[var(--secondary)] flex items-center justify-center border border-amber-200">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--secondary)]">
                Auricity Affiliate Partner
              </span>
              <h3 className="text-xl font-black text-[var(--text-primary)]">
                Earn ₹5,000 - ₹25,000 / Deal
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
              <h4 className="text-lg font-black text-[var(--text-primary)]">Application Received!</h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Welcome to Auricity Affiliate Network, {name}. Our Sambhajinagar team will WhatsApp your referral dashboard link within 2 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  setActiveView('affiliate-login');
                }}
                className="btn-theme-primary flex-1 py-2.5 text-xs font-black rounded-xl cursor-pointer"
              >
                Go to Partner Login
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              No real estate license required. Refer verified buyers, sellers, or renters in Chhatrapati Sambhajinagar and get direct UPI payouts when the transaction closes.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs bg-[var(--surface-secondary)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">WhatsApp Mobile Number</label>
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
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                  Create Account Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="Set password for your partner login"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[var(--border)] text-xs bg-[var(--surface-secondary)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">You will use this password to log in to your referral dashboard.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">Your Profession / Background</label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs bg-[var(--surface-secondary)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="Individual / Citizen">Individual Citizen / Homeowner</option>
                  <option value="Working Professional">IT / Industrial Professional</option>
                  <option value="Banker / Loan Agent">Banker / Loan DSA</option>
                  <option value="Chartered Accountant / Lawyer">CA / Legal Advocate</option>
                  <option value="Interior Designer / Architect">Architect / Interior Designer</option>
                  <option value="Student">Student / Freelancer</option>
                </select>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="btn-theme-secondary w-full py-3 text-xs sm:text-sm font-black rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Submit & Activate Affiliate Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setActiveView('affiliate-login');
                  }}
                  className="text-xs text-[var(--primary)] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <LockKeyhole className="w-3.5 h-3.5" /> Already registered as affiliate? Login here →
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
