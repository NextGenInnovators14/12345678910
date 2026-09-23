import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, ShieldAlert, Eye, EyeOff, X, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AuricityLogo } from './AuricityLogo';

export const SuperAdminPinModal: React.FC = () => {
  const { 
    showPinModal, 
    setShowPinModal, 
    verifyAdminPin, 
    setActiveRole, 
    setActiveView, 
    showToast 
  } = useApp();

  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!showPinModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setError('Please enter the administrative master PIN');
      return;
    }

    if (attempts >= 5) {
      setError('Too many failed attempts. Access temporarily locked.');
      showToast('Super Admin access locked due to failed attempts', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isValid = verifyAdminPin(pin);
      if (isValid) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
        showToast('Super Admin Access Granted', 'success');
        setActiveRole('admin');
        setActiveView('admin-hub');
        setShowPinModal(false);
        setPin('');
        setError('');
        setAttempts(0);
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setError(`Invalid administrative PIN. (${5 - nextAttempts} attempts remaining)`);
        showToast('Incorrect Super Admin PIN', 'error');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#E2E8F0] text-[#0F172A] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowPinModal(false);
            setPin('');
            setError('');
          }}
          className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A] p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="flex justify-center">
            <AuricityLogo variant="compact" size="md" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1E4FA8]/10 border border-[#1E4FA8]/20 flex items-center justify-center mx-auto shadow-xs text-[#1E4FA8]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#1E4FA8] tracking-tight">
            Super Admin Access
          </h3>
          <p className="text-xs text-[#64748B] max-w-xs mx-auto">
            Authorized administrators only. Enter your secure master PIN (e.g. 9999) to unlock the central administrative hub.
          </p>
        </div>

        {/* PIN Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 text-center">
              Master Access PIN
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={8}
                value={pin}
                autoComplete="current-password"
                onChange={e => {
                  setPin(e.target.value);
                  setError('');
                }}
                placeholder="••••"
                autoFocus
                className="w-full bg-[#F7F8FA] border border-[#E2E8F0] focus:border-[#1E4FA8] focus:bg-white text-[#0F172A] rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest outline-none transition-all placeholder:text-slate-400 min-h-[48px]"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-xs mt-2 flex items-center justify-center space-x-1 font-semibold bg-red-50 py-2 px-3 rounded-lg border border-red-100">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full bg-[#1E4FA8] hover:bg-[#153B82] active:bg-[#153B82] disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-sm shadow-blue-brand transition-all flex items-center justify-center space-x-2 min-h-[48px] cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Unlock Hub</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#64748B]">
            Protected administrative portal with session auditing.
          </p>
        </div>
      </div>
    </div>
  );
};
