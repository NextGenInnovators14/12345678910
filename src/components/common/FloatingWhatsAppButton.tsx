import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FloatingWhatsAppButton: React.FC = () => {
  const { navigationConfig } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('Hi Auricity, I would like to know more about property services in Chhatrapati Sambhajinagar.');

  const rawPhone = navigationConfig?.headerPhoneText || navigationConfig?.footerPhone || '+91 8010506030';
  const phoneNumber = rawPhone.replace(/\D/g, '');
  const displayPhone = navigationConfig?.headerPhoneDisplay || rawPhone;
  const encodedText = encodeURIComponent(userMsg);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  const quickPrompts = [
    'Looking to buy a 2/3 BHK flat in CIDCO',
    'Want to list my property for FREE',
    'Need 0% Interest Home Loan assistance',
    '30-Year Title Search & Legal verification'
  ];

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end">
      {/* WhatsApp Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-[#1E4FA8] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1E4FA8] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Auricity WhatsApp Desk</h4>
                <p className="text-[11px] text-emerald-300 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Online • Sambhajinagar Office</span>
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            {/* Agent Greeting Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-slate-200/80 text-xs text-slate-800 space-y-1 max-w-[85%]">
              <div className="font-bold text-blue-900 text-[11px] flex items-center space-x-1">
                <span>Auricity Relationship Desk</span>
                <CheckCircle2 className="w-3 h-3 text-blue-600" />
              </div>
              <p className="leading-relaxed">
                Namaste! Welcome to <strong>Auricity.com</strong>. How can our verified local property experts help you today?
              </p>
              <span className="text-[9px] text-slate-400 block text-right font-mono">Just now</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Inquiries:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUserMsg(prompt)}
                    className="text-[11px] text-left bg-white hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 px-2.5 py-1 rounded-xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Send Action */}
            <div className="pt-2">
              <textarea
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                rows={2}
                placeholder="Type your message..."
                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none font-medium text-slate-800"
              />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp (+91 8010506030)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating mobile conversion actions */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${phoneNumber}`}
          aria-label={`Call Auricity at ${displayPhone}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E4FA8] text-white shadow-2xl transition-transform hover:scale-105"
        >
          <PhoneCall className="h-5 w-5" />
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center space-x-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-600 animate-pulse"></span>
          </div>
          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="text-[10px] text-emerald-100 font-medium leading-none">Instant WhatsApp</span>
            <span className="text-xs font-black tracking-tight leading-tight">Chat with Auricity</span>
          </div>
        </button>
      </div>
    </div>
  );
};
