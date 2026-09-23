import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  getBrokerApplications, 
  setCurrentBroker, 
  BrokerAccount,
  approveBrokerAccount
} from '../../utils/brokerStorage';
import { 
  Building2, 
  LockKeyhole, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff, 
  MessageCircle, 
  UserPlus, 
  HelpCircle,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BrokerLogin: React.FC = () => {
  const { setActiveView, setActiveRole, setCurrentUser, showToast } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{
    type: 'under_review' | 'rejected' | 'not_found';
    account?: BrokerAccount;
  } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(null);

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanId || !cleanPass) {
      showToast('Please enter your registered mobile/email and password.', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const accounts = getBrokerApplications();
      const match = accounts.find(a => 
        a.personal.email.toLowerCase() === cleanId || 
        a.personal.mobile.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, '') ||
        a.applicationId.toLowerCase() === cleanId
      );

      if (!match) {
        setLoading(false);
        setStatusNotice({ type: 'not_found' });
        showToast('No broker account found with these credentials.', 'error');
        return;
      }

      // If user registered with a custom password, check it (or default sample password)
      if (match.password && match.password !== cleanPass) {
        setLoading(false);
        showToast('Incorrect password. Please verify and try again.', 'error');
        return;
      }

      // Check Status
      if (match.status === 'under_review') {
        setLoading(false);
        setStatusNotice({ type: 'under_review', account: match });
        return;
      }

      if (match.status === 'rejected') {
        setLoading(false);
        setStatusNotice({ type: 'rejected', account: match });
        return;
      }

      // Approved! Successful login
      setCurrentBroker(match);
      setActiveRole('broker');
      setCurrentUser({
        id: match.id,
        name: match.personal.fullName,
        email: match.personal.email,
        phone: match.personal.mobile,
        role: 'realtor',
        city: match.personal.city || 'Chhatrapati Sambhajinagar',
        createdAt: match.submittedAt,
        isVerified: true
      } as any);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      setLoading(false);
      showToast(`Welcome back, ${match.personal.fullName}!`, 'success');
      setActiveView('broker-dashboard');
    }, 350);
  };

  const handleInstantApproveAndLogin = (account: BrokerAccount) => {
    const updated = approveBrokerAccount(account.id, 'Instant Approved via Admin/Demo');
    if (updated) {
      setCurrentBroker(updated);
      setActiveRole('broker');
      setCurrentUser({
        id: updated.id,
        name: updated.personal.fullName,
        email: updated.personal.email,
        phone: updated.personal.mobile,
        role: 'realtor',
        city: updated.personal.city,
        createdAt: updated.submittedAt,
        isVerified: true
      } as any);
      confetti({ particleCount: 50, spread: 60 });
      showToast(`Broker "${updated.personal.fullName}" approved & logged in!`, 'success');
      setActiveView('broker-dashboard');
    }
  };

  const fillQuickDemo = (mobile: string, pass: string) => {
    setIdentifier(mobile);
    setPassword(pass);
    setStatusNotice(null);
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-10 sm:py-16 px-4">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-[#1E4FA8] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Auricity Broker & Realtor Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Broker Workspace Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Log in to manage your listed properties, upload new inventory, access buyer mandates, and coordinate deals with Sambhajinagar developers.
          </p>
        </div>

        {/* Status Notice Banners (Under Review / Rejected / Not Found) */}
        {statusNotice?.type === 'under_review' && statusNotice.account && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 space-y-3 animate-in fade-in">
            <div className="flex items-start space-x-3">
              <Clock className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Status: Under Admin Review
                </span>
                <h3 className="text-sm font-black text-amber-900">
                  Application Pending Approval ({statusNotice.account.applicationId})
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Namaste {statusNotice.account.personal.fullName}. Your Auricity Broker registration has been received. Our Sambhajinagar verification desk checks RERA & KYC details within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`https://wa.me/919822019988?text=Hello%20Auricity%20Admin,%20I%20have%20submitted%20my%20Broker%20application%20(ID:%20${statusNotice.account.applicationId})%20for%20${encodeURIComponent(statusNotice.account.personal.fullName)}.%20Please%20verify%20and%20approve%20my%20dashboard%20access.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Admin on WhatsApp for Instant Approval</span>
              </a>

              <button
                type="button"
                onClick={() => handleInstantApproveAndLogin(statusNotice.account!)}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer text-center"
              >
                Instant Test Approval (Demo Mode)
              </button>
            </div>
          </div>
        )}

        {statusNotice?.type === 'rejected' && statusNotice.account && (
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-5 space-y-2 animate-in fade-in">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-black text-red-900">Application Not Approved</h3>
                <p className="text-xs text-red-800">
                  {statusNotice.account.reviewerNotes || 'Your broker application could not be verified with current details. Please submit valid RERA certificate or contact Auricity broker desk.'}
                </p>
              </div>
            </div>
            <div className="pt-1">
              <button
                onClick={() => setActiveView('broker-register')}
                className="text-xs font-bold text-red-700 hover:underline cursor-pointer"
              >
                Re-apply with updated documents →
              </button>
            </div>
          </div>
        )}

        {statusNotice?.type === 'not_found' && (
          <div className="bg-slate-100 border border-slate-300 rounded-3xl p-5 space-y-2 animate-in fade-in">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-slate-600" />
              <span>No broker account found with this Mobile / Email</span>
            </div>
            <p className="text-xs text-slate-600">
              If you haven't joined Auricity Broker Network yet, please fill the registration form first.
            </p>
            <button
              onClick={() => setActiveView('broker-register')}
              className="mt-2 bg-[#1E4FA8] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
            >
              Fill Broker Registration Form →
            </button>
          </div>
        )}

        {/* Main Login Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Mobile or Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                Registered Mobile Number or Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. 9822019988 or broker@agency.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E4FA8] focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-900"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                  Password <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 font-medium">Default: password123</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your broker password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E4FA8] focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-900"
                />
                <LockKeyhole className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E4FA8] hover:bg-[#183f88] text-white font-black py-3.5 px-6 rounded-2xl shadow-blue-brand text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Checking Credentials…</span>
              ) : (
                <>
                  <span>Sign In to Broker Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Test Demo Accounts:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillQuickDemo('9822019988', 'password123')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left transition-all cursor-pointer"
              >
                <div className="font-black text-emerald-900 flex items-center justify-between">
                  <span>Rameshwar Patil</span>
                  <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-black">Approved</span>
                </div>
                <div className="text-[10px] text-emerald-700">Mob: 9822019988 • Pass: password123</div>
              </button>

              <button
                type="button"
                onClick={() => fillQuickDemo('9422114455', 'password123')}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-left transition-all cursor-pointer"
              >
                <div className="font-black text-amber-900 flex items-center justify-between">
                  <span>Ganesh Jadhav</span>
                  <span className="text-[9px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-black">Under Review</span>
                </div>
                <div className="text-[10px] text-amber-700">Mob: 9422114455 • Pass: password123</div>
              </button>
            </div>
          </div>

          {/* Register Callout */}
          <div className="text-center pt-2 space-y-2">
            <p className="text-xs text-slate-500">
              Not registered as an Auricity Broker yet?
            </p>
            <button
              type="button"
              onClick={() => setActiveView('broker-register')}
              className="text-xs font-black text-[#F2621E] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Apply for Broker Channel Partner Program →</span>
            </button>
          </div>

        </div>

        {/* Security & Support Note */}
        <div className="text-center text-xs text-slate-500 space-y-1">
          <p className="flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>MahaRERA compliant broker network in Chhatrapati Sambhajinagar</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Need help logging in? Call Broker Support at +91 98220 19988
          </p>
        </div>

      </div>
    </div>
  );
};
