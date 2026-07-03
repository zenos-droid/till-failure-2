import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  FileText, 
  UserCheck, 
  PhoneCall, 
  CreditCard,
  History,
  TrendingUp,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { SaasMember, Lead, PaymentRecord } from '../../types';

export default function ReceptionistDashboard() {
  const store = useGymStore();

  // Tasks switching: 'checkin' | 'renew' | 'leads' | 'payments'
  const [activeSegment, setActiveSegment] = useState<'checkin' | 'renew' | 'leads' | 'payments'>('checkin');

  // Search member for checkin or renew
  const [deskSearch, setDeskSearch] = useState('');

  // Receipt viewing overlay state
  const [invoiceRecord, setInvoiceRecord] = useState<PaymentRecord | null>(null);

  // New Lead states
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadInterest, setLeadInterest] = useState('Discipline Quarterly Lock');

  // Renewal helper states
  const [renewMemberId, setRenewMemberId] = useState('');
  const [renewPlan, setRenewPlan] = useState('Discipline Quarterly Lock');
  const [renewCost, setRenewCost] = useState(3200);

  // Notification Toast state
  const [successToast, setSuccessToast] = useState('');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // 1. Process Member checkout/checkin
  const handleScanCheckin = (memberId: string) => {
    const success = store.checkInMember(memberId);
    if (success) {
      const activeMem = store.members.find(m => m.id === memberId);
      triggerToast(`CHECK-IN SUCCESS: ${activeMem?.name} authorized.`);
    } else {
      triggerToast(`DENIED: Inactive or suspended membership!`);
    }
  };

  // 2. Commit a lead
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      triggerToast('Provide lead name and phone.');
      return;
    }
    store.addLead({
      name: leadName,
      phone: leadPhone,
      interest: leadInterest,
      status: 'New'
    });
    triggerToast(`Lead capture logged for ${leadName}`);
    setLeadName('');
    setLeadPhone('');
  };

  // 3. Process Renewal
  const handleRenewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renewMemberId) {
      triggerToast('Select a lifter membership first.');
      return;
    }
    const months = renewPlan.includes('Quarterly') ? 3 : renewPlan.includes('Annual') ? 12 : 1;
    store.renewMembership(renewMemberId, renewPlan, months, renewCost);
    
    // Grab the latest payment log to generate a receipt preview
    const latestPay = store.payments[0]; // because addPaymentRecord prepends
    triggerToast(`RENEWED COMPLETED: Receipt created!`);
    
    // Auto preview receipt
    if (latestPay) {
      setInvoiceRecord(latestPay);
    }
    setRenewMemberId('');
  };

  // Match plans cost
  const handlePlanChangeSelect = (plan: string) => {
    setRenewPlan(plan);
    if (plan.toLowerCase().includes('quarterly')) {
      setRenewCost(3200);
    } else if (plan.toLowerCase().includes('annual') || plan.toLowerCase().includes('warrior')) {
      setRenewCost(10000);
    } else {
      setRenewCost(1200);
    }
  };

  // Printable Download simulate
  const handlePrintDownload = () => {
    triggerToast('Receipt formatted. Dispatched to local Rishra Desk printer!');
    window.print();
  };

  // Filter members by search for desk tools
  const searchMatchMembers = store.members.filter(m => {
    return m.name.toLowerCase().includes(deskSearch.toLowerCase()) || 
           m.phone.includes(deskSearch) || 
           m.id.toLowerCase().includes(deskSearch.toLowerCase());
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Overlay */}
      {successToast && (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-zinc-900 border border-[#FFE259] text-[#FFE259] rounded-xl shadow-2xl text-xs font-mono animate-bounce uppercase">
          🔥 {successToast}
        </div>
      )}

      {/* Header bar desk coordinates */}
      <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <span className="text-[10px] font-mono text-[#FFE259] uppercase tracking-widest">Logged: Rita Ghosh (Front Desk)</span>
          <h2 className="text-base font-sans font-black text-white uppercase mt-0.5">RISHRA RECEPTION CONTROL DESK</h2>
        </div>
        <div className="flex gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">SYSTEM STABLE</span>
        </div>
      </div>

      {/* Reception Navigation Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: 'checkin', label: 'Check-In Terminal', icon: UserCheck },
          { id: 'renew', label: 'Renew Member', icon: CreditCard },
          { id: 'leads', label: 'Lead Management', icon: PhoneCall },
          { id: 'payments', label: 'Desk Invoices', icon: FileText },
        ].map((sec) => {
          const Icon = sec.icon;
          const isSelected = activeSegment === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSegment(sec.id as any)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-[#FFE259] text-black border-[#FFE259] shadow-lg shadow-yellow-500/5' 
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-900 hover:text-white hover:border-[#FFE259]/30'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-black">{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. CHECK-IN TERMINAL VIEW */}
      {activeSegment === 'checkin' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl">
              <h3 className="text-sm font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
                SCAN OR REGISTER ATHLETE ACCESS
              </h3>
              
              <div className="relative mb-5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-zinc-500" />
                </span>
                <input
                  type="text"
                  placeholder="Enter Lifter ID, exact email, or phone identifier..."
                  value={deskSearch}
                  onChange={(e) => setDeskSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-9 py-3 rounded-xl text-xs font-mono text-white focus:border-[#FFE259] outline-none"
                />
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {searchMatchMembers.map(m => {
                  const todayStr = new Date().toISOString().split('T')[0];
                  const alreadyPresent = store.attendance.some(a => a.memberId === m.id && a.date === todayStr);

                  return (
                    <div 
                      key={m.id} 
                      className="p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl flex justify-between items-center hover:border-zinc-800"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-zinc-500">[{m.id}]</span>
                          <span className="text-sm font-sans font-black text-white uppercase">{m.name}</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 mt-1">
                          Slot: {m.activeSlot} | Status:{' '}
                          <span className={m.status === 'Active' ? 'text-green-400' : 'text-red-400'}>
                            {m.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {alreadyPresent ? (
                          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-850 rounded text-[10px] font-mono text-zinc-400 uppercase font-bold">
                            ALREADY IN
                          </span>
                        ) : (
                          <button
                            onClick={() => handleScanCheckin(m.id)}
                            disabled={m.status !== 'Active'}
                            className="px-3 py-1.5 bg-[#FFE259] text-black hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed rounded text-[10px] font-mono uppercase font-black transition-all cursor-pointer"
                          >
                            CHECK-IN DESK
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {searchMatchMembers.length === 0 && (
                  <p className="text-xs font-mono text-zinc-500 text-center py-4 uppercase">No matching enrollees found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar: Recent attendance list */}
          <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl relative">
            <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase mb-4 flex items-center gap-1.5">
              <History className="h-4 w-4 text-[#FFE259]" /> TODAY CHECK-INS LOGGED
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {store.attendance.map(att => (
                <div key={att.id} className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-sans font-black text-white uppercase">{att.memberName}</h4>
                    <span className="text-[10px] font-mono text-zinc-500">Member ID: {att.memberId}</span>
                  </div>
                  <span className="text-xs font-mono text-[#FFE259] bg-[#FFE259]/5 px-2 py-0.5 rounded border border-[#FFE259]/10 font-bold">
                    🕒 {att.checkInTime}
                  </span>
                </div>
              ))}
              {store.attendance.length === 0 && (
                <p className="text-xs font-mono text-zinc-500 text-center py-8 uppercase">No check-ins logged today yet.</p>
              )}
            </div>
          </div>

        </div>
      )}

      {/* 2. RENEW MEMBERSHIP VIEW */}
      {activeSegment === 'renew' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl">
            <h3 className="text-sm font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
              LAUNCH BULK RENEWAL PIPELINE
            </h3>
            
            <form onSubmit={handleRenewSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  1. Target Member Selection
                </label>
                <select
                  value={renewMemberId}
                  onChange={(e) => setRenewMemberId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-mono text-white"
                >
                  <option value="">-- Choose Member to Extend --</option>
                  {store.members.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.id}) — current status: {m.status} | expires: {m.endDate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    2. New Membership Tier
                  </label>
                  <select
                    value={renewPlan}
                    onChange={(e) => handlePlanChangeSelect(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-mono text-white"
                  >
                    <option value="Sprint Monthly Starter">Sprint Monthly Starter (1 Month)</option>
                    <option value="Discipline Quarterly Lock">Discipline Quarterly Lock (3 Months)</option>
                    <option value="Absolute Warrior Club">Absolute Warrior Club (12 Months)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    3. Fee Configured (INR)
                  </label>
                  <input
                    type="number"
                    value={renewCost}
                    onChange={(e) => setRenewCost(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FFE259] text-black text-xs font-mono font-black tracking-widest uppercase rounded-xl hover:brightness-110 transition-all cursor-pointer"
              >
                COMMIT RENEWAL EXTENSION
              </button>
            </form>
          </div>

          {/* Guidelines on plans */}
          <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl relative">
            <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase mb-3">
              SUBSCRIPTION AUDITS
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4">
              Upon submitting, the system extends active expiry dates, sets the status back to Active, and writes standard corporate payment receipts in the database.
            </p>
            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-850 text-[10px] font-mono text-zinc-400 space-y-1">
              <span className="block text-amber-500 font-bold uppercase">Rishra Pricing:</span>
              <div>• Sprint Monthly: ₹1,200</div>
              <div>• Discipline Quarterly: ₹3,200</div>
              <div>• Absolute Warrior (1Yr): ₹10,000</div>
            </div>
          </div>

        </div>
      )}

      {/* 3. LEAD MANAGEMENT BOARD */}
      {activeSegment === 'leads' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl">
            <h3 className="text-sm font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
              CAPTURE NEW PROSPECT LEAD
            </h3>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Prospect Name</label>
                <input
                  type="text"
                  placeholder="E.g., Subham Dawn"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs font-mono text-white h-10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Mobile Contact</label>
                <input
                  type="text"
                  placeholder="+91 9330 XXXXX"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs font-mono text-white h-10"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Interested Bundle</label>
                <select
                  value={leadInterest}
                  onChange={(e) => setLeadInterest(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                >
                  <option value="Sprint Monthly Starter">Sprint Monthly Starter (₹1,200/mo)</option>
                  <option value="Discipline Quarterly Lock">Discipline Quarterly Lock (3mo @ ₹3,200)</option>
                  <option value="Absolute Warrior Club">Absolute Warrior Club (12mo @ ₹10,000)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#FFE259] text-black text-xs font-mono font-black tracking-widest uppercase rounded-lg hover:brightness-110 transition-all cursor-pointer"
              >
                LOG PROSPECT METRICS
              </button>
            </form>
          </div>

          {/* Prospective list boards with dynamic status adjustments */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase">
              ACTIVE RISHRA WALKIN LEADS ({store.leads.length})
            </h3>
            
            <div className="space-y-2">
              {store.leads.map(ld => (
                <div key={ld.id} className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500">[{ld.id}]</span>
                      <h4 className="text-sm font-sans font-black text-white uppercase">{ld.name}</h4>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 mt-1">📞 {ld.phone} | Interest: {ld.interest}</div>
                    <div className="text-[10px] font-mono text-zinc-600 mt-0.5">Date logged: {ld.date}</div>
                  </div>

                  <div className="flex gap-1">
                    {['New', 'Contacted', 'Converted', 'Lost'].map(st => {
                      const isActive = ld.status === st;
                      return (
                        <button
                          key={st}
                          onClick={() => {
                            store.updateLeadStatus(ld.id, st as any);
                            triggerToast(`Lead status updated to ${st}`);
                          }}
                          className={`px-2 py-1 text-[9px] font-mono rounded font-bold uppercase transition-all ${
                            isActive 
                              ? 'bg-amber-500/20 border border-[#FFE259] text-[#FFE259]' 
                              : 'bg-zinc-950 text-zinc-500 hover:text-zinc-300 border border-transparent'
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 4. DESK PAYMENTS & INVOICES VIEW */}
      {activeSegment === 'payments' && (
        <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
          <h3 className="text-sm font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
            LIVE TRANSACTIONS STREAM
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/20">
                  <th className="p-3">Receipt ID</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Time Date</th>
                  <th className="p-3">Method</th>
                  <th className="p-3 text-right">Invoicing</th>
                </tr>
              </thead>
              <tbody>
                {store.payments.map(py => (
                  <tr key={py.id} className="border-b border-zinc-900 hover:bg-zinc-950/40">
                    <td className="p-3 text-[#FFE259] font-bold">{py.receiptNumber}</td>
                    <td className="p-3 font-sans font-bold text-white uppercase">{py.memberName}</td>
                    <td className="p-3 text-zinc-400">{py.planName}</td>
                    <td className="p-3 text-white">₹{py.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-zinc-500">{py.paymentDate}</td>
                    <td className="p-3 text-zinc-400 uppercase text-[10px]">{py.paymentMethod}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setInvoiceRecord(py)}
                        className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-[#FFE259] hover:border-[#FFE259] rounded font-bold text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                      >
                        VIEW INVOICE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAILED RECEIPT GENERATOR OVERLAY */}
      {invoiceRecord && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {/* Header border decor */}
            <div className="h-1 bg-gradient-to-r from-amber-600 via-[#FFE259] to-amber-600 w-full" />
            
            {/* Close trigger */}
            <button
              onClick={() => setInvoiceRecord(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-mono text-sm uppercase font-bold cursor-pointer"
            >
              [Dismiss]
            </button>

            <div className="p-6 md:p-8 space-y-6" id="printable-invoice">
              
              {/* Branding Section */}
              <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                <div>
                  <span className="block font-sans font-black tracking-widest text-[#FFE259] leading-none uppercase text-base">
                    TILL FAILURE
                  </span>
                  <span className="block font-mono text-[8px] tracking-widest text-zinc-400 mt-1 uppercase">
                    EST. 2021 | CORE STRENGTH
                  </span>
                  <span className="block font-mono text-[8px] text-zinc-500 mt-0.5">RISHRA, R.K. STREET, WEST BENGAL</span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest">OFFICIAL SUB RECEIPT</span>
                  <span className="block text-xs font-mono text-[#FFE259] font-bold mt-1">{invoiceRecord.receiptNumber}</span>
                </div>
              </div>

              {/* Invoice details */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
                <div>
                  <span className="block text-[9px] text-zinc-500 uppercase">ISSUED FOR ATHLETE:</span>
                  <span className="block text-white font-sans font-black uppercase text-sm mt-0.5">{invoiceRecord.memberName}</span>
                  <span className="block text-[9px] text-zinc-500 mt-1">CLIENT ID: {invoiceRecord.memberId}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] text-zinc-500 uppercase">TRANSACTION SECURED ON:</span>
                  <span className="block text-white mt-0.5">{invoiceRecord.paymentDate}</span>
                  <span className="block text-[9px] text-zinc-500 mt-1">STATUS: <span className="text-green-400 font-bold">PAID (SUCCESS)</span></span>
                </div>
              </div>

              {/* Items listing */}
              <div className="border-t border-b border-zinc-900 py-3 text-xs font-mono space-y-2">
                <div className="flex justify-between text-[9px] text-zinc-550 uppercase">
                  <span>DESCR / PACKAGE EXTENSION</span>
                  <span>SUBTOTAL</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>{invoiceRecord.planName} subscription</span>
                  <span>₹{(invoiceRecord.amount * 0.82).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>CGST 9% (Local State Levy)</span>
                  <span>₹{(invoiceRecord.amount * 0.09).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>SGST 9% (Rishra District)</span>
                  <span>₹{(invoiceRecord.amount * 0.09).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-900 pt-2 text-[#FFE259] font-bold text-sm">
                  <span>TOTAL AMOUNT RECORDED</span>
                  <span>₹{invoiceRecord.amount}.00</span>
                </div>
              </div>

              {/* Bottom detail card */}
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-900 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-[#FFE259] mt-0.5 shrink-0" />
                <p className="text-[10px] font-mono text-zinc-500 leading-relaxed uppercase">
                  This cryptographic invoice secures active access permission tags until: <span className="text-white font-bold">{invoiceRecord.expiryExtendedDate}</span>. No refunds permitted.
                </p>
              </div>

              {/* Print CTA */}
              <div className="flex gap-2 font-mono text-xs pt-2">
                <button
                  onClick={() => setInvoiceRecord(null)}
                  className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold uppercase rounded-xl cursor-pointer border border-zinc-800"
                >
                  DISMISS
                </button>
                <button
                  onClick={handlePrintDownload}
                  className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black uppercase text-xs tracking-widest rounded-xl hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer shadow shadow-amber-500/10"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>PRINT RECEIPT</span>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
