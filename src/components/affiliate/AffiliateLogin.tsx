import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  getAffiliateApplications, 
  setCurrentAffiliate, 
  AffiliateApplication 
} from '../../utils/affiliateStorage';
import { 
  LockKeyhole, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  UserPlus, 
  PhoneCall,
  Eye,
  EyeOff
} from 'lucide-react';

export const AffiliateLogin: React.FC = () => {
  const { setActiveView, showToast } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{
    type: 'under_review' | 'rejected' | 'not_found';
    app?: AffiliateApplication;
  } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(null);

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanIdentifier || !cleanPassword) {
      showToast('Please enter both registered mobile/email and password.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const apps = getAffiliateApplications();
      const match = apps.find(a => 
        a.email.toLowerCase() === cleanIdentifier || 
        a.mobile.replace(/[^0-9]/g, '') === cleanIdentifier.replace(/[^0-9]/g, '') ||
        a.affiliateId.toLowerCase() === cleanIdentifier
      );

      if (!match) {
        setLoading(false);
        setStatusNotice({ type: 'not_found' });
        showToast('No affiliate account found with these credentials.', 'error');
        return;
      }

      if (match.password && match.password !== cleanPassword) {
        setLoading(false);
        showToast('Invalid password. Please check your credentials.', 'error');
        return;
      }

      // Check Application Approval Status
      if (match.status === 'under_review') {
        setLoading(false);
        setStatusNotice({ type: 'under_review', app: match });
        return;
      }

      if (match.status === 'rejected' || match.status === 'suspended') {
        setLoading(false);
        setStatusNotice({ type: 'rejected', app: match });
        return;
      }

      // Approved!
      setCurrentAffiliate(match);
      setLoading(false);
      showToast(`Welcome back, ${match.fullName}!`, 'success');
      setActiveView('affiliate-dashboard');
    }, 400);
  };

  const handleQuickDemoLogin = (email: string) => {
    const apps = getAffiliateApplications();
    const app = apps.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (app) {
      setIdentifier(app.mobile);
      setPassword(app.password || 'password123');
      setCurrentAffiliate(app);
      showToast(`Logged in as ${app.fullName} (Demo)`, 'success');
      setActiveView('affiliate-dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1E4FA8] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Auricity Partner Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Affiliate Partner Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Sign in to send property leads, track closed deals, and view commission payouts.
          </p>
        </div>

        {/* Status Warning Banner (e.g. Under Review) */}
        {statusNotice?.type === 'under_review' && statusNotice.app && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
              <Clock className="w-5 h-5 text-amber-600 animate-spin" />
              Application Under Admin Review
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Hello <b>{statusNotice.app.fullName}</b>! Your application (ID: <span className="font-mono font-bold">{statusNotice.app.affiliateId}</span>) has been received and is currently being verified by the Auricity Admin Team.
            </p>
            <p className="text-[11px] text-amber-700">
              Once approved by admin, your affiliate dashboard and property referral submission portal will automatically activate.
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/918010506030?text=Hello%20Auricity%20Admin,%20please%20review%20my%20affiliate%20application%20ID:%20${statusNotice.app.affiliateId}%20(${statusNotice.app.fullName})`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-emerald-700"
              >
                <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Admin for Quick Approval
              </a>
            </div>
          </div>
        )}

        {statusNotice?.type === 'rejected' && (
          <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-5 space-y-2 text-xs text-rose-800">
            <div className="flex items-center gap-2 font-black text-sm text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              Application Not Active
            </div>
            <p>Your affiliate registration is currently not active or requires additional verification.</p>
            <p className="font-semibold">Reason / Note: {statusNotice.app?.adminNotes || 'Information criteria not met.'}</p>
          </div>
        )}

        {statusNotice?.type === 'not_found' && (
          <div className="bg-slate-100 border border-slate-200 rounded-3xl p-4 text-xs text-slate-700 space-y-2">
            <p>No affiliate account found with this mobile or email. If you have not registered yet, please submit your partner application first.</p>
            <button
              onClick={() => setActiveView('affiliate-register')}
              className="text-[#1E4FA8] font-black underline flex items-center gap-1"
            >
              Fill Affiliate Application Form <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                Registered Mobile Number or Email
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="e.g. 9822012345 or email@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1E4FA8] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                Password / PIN
              </label>
              <div className="relative">
                <LockKeyhole className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1E4FA8] focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-[#1E4FA8] hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating…' : 'Sign In to Affiliate Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration link */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">Not an affiliate yet?</span>
            <button
              onClick={() => setActiveView('affiliate-register')}
              className="font-black text-[#F2621E] hover:underline flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" /> Apply for Affiliate Partner
            </button>
          </div>
        </div>

        {/* Demo Fast-Switch Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs space-y-2">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            Quick Test Accounts
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleQuickDemoLogin('sunil.shinde@auricitypartners.in')}
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-left font-bold text-slate-800 text-[11px] shadow-xs flex items-center justify-between"
            >
              <span>Sunil Shinde <span className="text-[10px] text-emerald-600 font-extrabold">(Approved)</span></span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </button>

            <button
              onClick={() => {
                setIdentifier('9423188776');
                setPassword('password123');
                const apps = getAffiliateApplications();
                const app = apps.find(a => a.mobile === '9423188776');
                if (app) setStatusNotice({ type: 'under_review', app });
              }}
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-left font-bold text-slate-800 text-[11px] shadow-xs flex items-center justify-between"
            >
              <span>Pooja Joshi <span className="text-[10px] text-amber-600 font-extrabold">(Under Review)</span></span>
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
