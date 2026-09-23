import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  IndianRupee, 
  Percent, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { calculateEMI, formatPriceINR } from '../../utils/propertyUtils';
import { useApp } from '../../context/AppContext';

interface EMICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPrice?: number;
}

export const EMICalculatorModal: React.FC<EMICalculatorModalProps> = ({ 
  isOpen, 
  onClose,
  defaultPrice = 4500000 
}) => {
  const { showToast } = useApp();
  
  const [propertyPrice, setPropertyPrice] = useState<number>(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  if (!isOpen) return null;

  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const principalLoanAmount = Math.max(100000, propertyPrice - downPaymentAmount);
  
  const { monthlyEmi, totalInterest, totalPayment } = calculateEMI(
    principalLoanAmount, 
    interestRate, 
    tenureYears
  );

  const principalPercent = Math.round((principalLoanAmount / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] bg-gradient-to-r from-blue-50/80 via-white to-orange-50/50 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-[#1E4FA8] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Financial Toolkit
              </span>
              <span className="text-xs text-[#64748B]">All Banks Sambhajinagar</span>
            </div>
            <h2 className="text-xl font-black text-[#0F172A] flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-[#F2621E]" />
              <span>Smart Home Loan & Monthly EMI Calculator</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Calculate monthly installment, interest payout ratio, and down payment budget.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Main EMI Result Highlight Card */}
          <div className="bg-gradient-to-br from-[#1E4FA8] to-[#153B82] text-white p-6 rounded-3xl shadow-blue-brand space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-blue-200 tracking-wider">
                  Estimated Monthly Installment (EMI)
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight mt-0.5 text-white">
                  ₹{monthlyEmi.toLocaleString('en-IN')}<span className="text-sm font-normal text-blue-200">/month</span>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-[11px] text-blue-200 uppercase font-semibold block">Loan Amount</span>
                <span className="text-lg font-black text-amber-300">
                  {formatPriceINR(principalLoanAmount)}
                </span>
              </div>
            </div>

            {/* Breakdown Visual Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-blue-100 font-semibold">
                <span>Principal: {formatPriceINR(principalLoanAmount)} ({principalPercent}%)</span>
                <span>Interest: {formatPriceINR(totalInterest)} ({interestPercent}%)</span>
              </div>
              <div className="h-3 w-full bg-blue-950/60 rounded-full overflow-hidden flex">
                <div 
                  className="bg-[#F2621E] h-full transition-all duration-300" 
                  style={{ width: `${principalPercent}%` }} 
                  title="Principal"
                />
                <div 
                  className="bg-amber-400 h-full transition-all duration-300" 
                  style={{ width: `${interestPercent}%` }} 
                  title="Interest"
                />
              </div>
              <div className="flex justify-between text-[10px] text-blue-200">
                <span>Total Payment: {formatPriceINR(totalPayment)}</span>
                <span>Tenure: {tenureYears} Years ({tenureYears * 12} months)</span>
              </div>
            </div>
          </div>

          {/* Interactive Sliders & Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Property Cost */}
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                <span>Total Property Cost</span>
                <span className="text-[#1E4FA8] font-black">{formatPriceINR(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={30000000}
                step={100000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-[#1E4FA8]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B]">
                <span>₹5 Lakh</span>
                <span>₹3 Crore</span>
              </div>
            </div>

            {/* Down Payment % */}
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span className="text-[#F2621E] font-black">{formatPriceINR(downPaymentAmount)}</span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#F2621E]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B]">
                <span>10% (Min)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                <span>Interest Rate (% p.a.)</span>
                <span className="text-[#1E4FA8] font-black">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={6.5}
                max={14.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#1E4FA8]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B]">
                <span>6.5% (Repo linked)</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                <span>Loan Tenure (Years)</span>
                <span className="text-[#1E4FA8] font-black">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#1E4FA8]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B]">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Sambhajinagar Bank Guidance & 0% Processing Help */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-black text-[#0F172A] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F2621E]" />
                <span>Pre-Approved Bank Partnerships in Sambhajinagar</span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                SBI, HDFC Bank, ICICI Bank, and Bank of Maharashtra offer zero processing fees for verified Auricity buyers.
              </p>
            </div>

            <a
              href="https://wa.me/918010506030?text=Hi%20Auricity,%20I%20want%20Home%20Loan%20assistance%20for%20a%20property%20in%20Sambhajinagar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E4FA8] hover:bg-[#153B82] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-blue-brand shrink-0 text-center justify-center cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get 0% Fee Loan Advisor</span>
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F8FA] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span>Standard reducing balance amortisation formula applied.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0F172A] font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Calculator
          </button>
        </div>

      </div>
    </div>
  );
};
