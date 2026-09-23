import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Users, 
  IndianRupee, 
  Calculator, 
  PhoneCall, 
  MessageCircle, 
  CheckCircle2, 
  PlusCircle, 
  Award,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { formatPriceINR } from '../../utils/propertyUtils';
import confetti from 'canvas-confetti';

export const BrokerHub: React.FC = () => {
  const { leads, addLead, allProperties, showToast, setActiveView } = useApp();

  // Commission Calculator State
  const [dealValue, setDealValue] = useState<number>(5000000);
  const [commissionPercent, setCommissionPercent] = useState<number>(1.0);

  // New Lead Modal
  const [newLeadModal, setNewLeadModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientBudget, setClientBudget] = useState('₹45 - 60 Lakh');
  const [clientLocality, setClientLocality] = useState('CIDCO');

  const brokerEarnings = Math.round(dealValue * (commissionPercent / 100));

  const handleAddClientLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    addLead({
      name: clientName,
      phone: clientPhone,
      status: 'new',
      budget: clientBudget,
      preferredLocality: clientLocality,
      source: 'Broker CRM Portal'
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    showToast(`Client Lead "${clientName}" saved to Broker CRM!`, 'success');
    setNewLeadModal(false);
    setClientName('');
    setClientPhone('');
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Hub Header */}
        <div className="bg-[#1E4FA8] text-white p-6 sm:p-8 rounded-3xl border border-blue-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="bg-[#F2621E] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Broker CRM & Partner Desk
              </span>
              <span className="text-xs text-blue-200">Sambhajinagar Realtor Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center space-x-2">
              <Building2 className="w-7 h-7 text-blue-200" />
              <span>Auricity Broker & Channel Partner Ecosystem</span>
            </h1>
            <p className="text-xs text-blue-100">
              Manage client requirements, co-brokerage mandates, RERA developer inventory, and instant commission forecasting.
            </p>
          </div>

          <button
            onClick={() => setNewLeadModal(true)}
            className="bg-[#F2621E] hover:bg-[#E0520F] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-orange-brand transition-all cursor-pointer flex items-center space-x-1.5 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Client Mandate</span>
          </button>
        </div>

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-xs">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Active Client Mandates</span>
            <p className="text-2xl font-black text-[#1E4FA8] mt-1">{leads.length}</p>
            <span className="text-[10px] text-[#16A34A] font-bold">100% Verified Buyer Pool</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-xs">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Direct Developer Inventory</span>
            <p className="text-2xl font-black text-[#F2621E] mt-1">{allProperties.length}</p>
            <span className="text-[10px] text-[#64748B]">Across CIDCO, Garkheda, Samarth Nagar</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-xs">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Commission Payout Velocity</span>
            <p className="text-2xl font-black text-[#16A34A] mt-1">48 Hours</p>
            <span className="text-[10px] text-[#64748B]">Instant Builder Direct Settlements</span>
          </div>
        </div>

        {/* Main 2-Col Grid: Commission Calculator & Client Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Commission Forecasting Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-[#F2621E]" />
              <h3 className="font-black text-sm uppercase tracking-wider text-[#0F172A]">
                Broker Commission Forecaster
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#0F172A] block mb-1">
                  Expected Deal Value: {formatPriceINR(dealValue)}
                </label>
                <input
                  type="range"
                  min={1000000}
                  max={30000000}
                  step={500000}
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="w-full accent-[#1E4FA8]"
                />
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">
                  Commission Bracket: {commissionPercent}%
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={3.0}
                  step={0.25}
                  value={commissionPercent}
                  onChange={(e) => setCommissionPercent(Number(e.target.value))}
                  className="w-full accent-[#F2621E]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center space-y-1">
                <span className="text-[11px] font-bold text-[#1E4FA8] uppercase">Estimated Broker Payout</span>
                <p className="text-2xl font-black text-[#1E4FA8]">{formatPriceINR(brokerEarnings)}</p>
                <span className="text-[10px] text-[#64748B]">Direct from RERA Developer / Channel Desk</span>
              </div>
            </div>
          </div>

          {/* Client Pipeline & Leads (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-wider text-[#0F172A]">
                Client Buyer Requirements ({leads.length})
              </h3>
              <button
                onClick={() => setNewLeadModal(true)}
                className="text-xs font-bold text-[#1E4FA8] hover:underline"
              >
                + Add Client
              </button>
            </div>

            <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto pr-1">
              {leads.map(lead => (
                <div key={lead.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#0F172A]">{lead.name}</div>
                    <div className="text-[#64748B] text-[11px]">
                      Locality: <strong>{lead.preferredLocality}</strong> • Budget: <strong>{lead.budget || '₹50L'}</strong>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center space-x-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* New Lead Modal */}
      {newLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 space-y-4">
            <h3 className="text-lg font-black text-[#0F172A]">Add Buyer Mandate to CRM</h3>
            
            <form onSubmit={handleAddClientLead} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">Buyer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sunil Patil"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0F172A] block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 9822019988"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">Locality</label>
                  <input
                    type="text"
                    value={clientLocality}
                    onChange={(e) => setClientLocality(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#0F172A] block mb-1">Budget</label>
                  <input
                    type="text"
                    value={clientBudget}
                    onChange={(e) => setClientBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setNewLeadModal(false)}
                  className="flex-1 bg-slate-100 text-[#0F172A] font-bold text-xs py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1E4FA8] text-white font-bold text-xs py-2.5 rounded-xl shadow-blue-brand cursor-pointer"
                >
                  Save Mandate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
