import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { motion } from 'motion/react';
import { 
  Users, 
  DollarSign, 
  Flame, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  UserPlus, 
  Edit, 
  MessageSquare,
  TrendingUp,
  Award,
  Lock,
  Grid
} from 'lucide-react';
import { SaasMember, SaasTrainer, SaasReceptionist, NoticeInfo } from '../../types';

export default function AdminDashboard() {
  const store = useGymStore();
  
  // Tab within Admin Workspace: 'overview' | 'members' | 'trainers' | 'receptionists' | 'notices'
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'members' | 'trainers' | 'receptionists' | 'notices'>('overview');
  
  // Search state
  const [memberSearch, setMemberSearch] = useState('');
  const [memberFilter, setMemberFilter] = useState<'ALL' | 'Active' | 'Expired' | 'Suspended'>('ALL');

  // Modals / Drawers states
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [showAssignTrainerModal, setShowAssignTrainerModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Form Inputs: Member Action
  const [mName, setMName] = useState('');
  const [mEmail, setMEmail] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mGender, setMGender] = useState<'Male' | 'Female'>('Male');
  const [mPlan, setMPlan] = useState('Discipline Quarterly Lock');
  const [mSlot, setMSlot] = useState('Evening Frame (5PM - 10PM)');

  // Form Inputs: Trainer Action
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPhone, setTPhone] = useState('');
  const [tSpecialty, setTSpecialty] = useState('');

  // Form Inputs: Notice Action
  const [nTitle, setNTitle] = useState('');
  const [nContent, setNContent] = useState('');
  const [nTarget, setNTarget] = useState<'ALL' | 'MEMBERS' | 'TRAINERS'>('ALL');

  // Assign Coach states
  const [targetTrainerId, setTargetTrainerId] = useState('');

  // Notifications
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Submit handlings
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName || !mEmail || !mPhone) {
      triggerToast('Please complete all fields for corporate admissions.');
      return;
    }
    const today = new Date();
    const expiry = new Date();
    expiry.setMonth(today.getMonth() + (mPlan.includes('Quarterly') ? 3 : mPlan.includes('Annual') ? 12 : 1));
    
    store.addMember({
      name: mName,
      email: mEmail,
      phone: mPhone,
      membershipName: mPlan,
      startDate: today.toISOString().split('T')[0],
      endDate: expiry.toISOString().split('T')[0],
      gender: mGender,
      activeSlot: mSlot
    });

    triggerToast(`Admissions Clear: Installed new member profile`);
    setShowMemberModal(false);
    // Reset
    setMName('');
    setMEmail('');
    setMPhone('');
  };

  const handleCreateTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName || !tEmail || !tPhone || !tSpecialty) {
      triggerToast('Complete trainer bio parameters first.');
      return;
    }
    store.addTrainer({
      name: tName,
      email: tEmail,
      phone: tPhone,
      specialty: tSpecialty,
      status: 'Active'
    });
    triggerToast(`Trainer Installed: ${tName} has joined the roster.`);
    setShowTrainerModal(false);
    setTName('');
    setTEmail('');
    setTPhone('');
    setTSpecialty('');
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nTitle || !nContent) {
      triggerToast('Notice structure is empty.');
      return;
    }
    store.addNotice({
      title: nTitle,
      content: nContent,
      author: 'Biplab Singh (Director)',
      targetRole: nTarget
    });
    triggerToast('Notice logged to live board.');
    setNTitle('');
    setNContent('');
  };

  const handleAssignTrainerCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || !targetTrainerId) {
      triggerToast('Please select an active trainer.');
      return;
    }
    store.assignTrainer(selectedMemberId, targetTrainerId);
    triggerToast('Trainer assigned successfully.');
    setShowAssignTrainerModal(false);
    setSelectedMemberId(null);
    setTargetTrainerId('');
  };

  // Metrics Calculations
  const activeCount = store.members.filter(m => m.status === 'Active').length;
  const expiredCount = store.members.filter(m => m.status === 'Expired').length;
  const grossRevenue = store.payments
    .filter(p => p.status === 'Success')
    .reduce((sum, current) => sum + current.amount, 0);
  const checkedInTodayCount = store.attendance.filter(a => {
    const todayStr = new Date().toISOString().split('T')[0];
    return a.date === todayStr;
  }).length;

  // Filter Members
  const filteredMembers = store.members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase()) || 
                          m.phone.includes(memberSearch) || m.id.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesFilter = memberFilter === 'ALL' ? true : m.status === memberFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Alert overlay */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-zinc-900 border border-[#FFE259] text-[#FFE259] rounded-xl shadow-2xl text-xs font-mono animate-bounce uppercase">
          ⚡ {toastMessage}
        </div>
      )}

      {/* Overview stats board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900/60 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:border-[#FFE259]/30 transition-all">
          <div>
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Members</span>
            <span className="block text-xl sm:text-2xl font-sans font-black text-white mt-1">{activeCount} / {store.members.length}</span>
            <span className="block text-[9px] font-mono text-green-500 mt-1">Concentric Retention +8.2%</span>
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFE259]">
            <Users className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:border-[#FFE259]/30 transition-all">
          <div>
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Financial Gross</span>
            <span className="block text-xl sm:text-2xl font-sans font-black text-[#FFE259] mt-1">₹{grossRevenue.toLocaleString('en-IN')}</span>
            <span className="block text-[9px] font-mono text-amber-500 mt-1">Razorpay Inbound Pipeline</span>
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFE259]">
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:border-[#FFE259]/30 transition-all">
          <div>
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Today Outlets</span>
            <span className="block text-xl sm:text-2xl font-sans font-black text-zinc-200 mt-1">{checkedInTodayCount} lifters</span>
            <span className="block text-[9px] font-mono text-zinc-500 mt-1">Checked in at Rishra Desk</span>
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFE259]">
            <Flame className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
          </div>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:border-[#FFE259]/30 transition-all">
          <div>
            <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Global Coaches</span>
            <span className="block text-xl sm:text-2xl font-sans font-black text-white mt-1">{store.trainers.length} active</span>
            <span className="block text-[9px] font-mono text-amber-500 mt-1">Rishra Specialty Leaders</span>
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFE259]">
            <Award className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </div>

      {/* Internal Navigation tabs */}
      <div className="flex border-b border-zinc-900 overflow-x-auto gap-2 py-1 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview Metrics' },
          { id: 'members', label: 'Member Directory' },
          { id: 'trainers', label: 'Coaching Roster' },
          { id: 'receptionists', label: 'Front Office' },
          { id: 'notices', label: 'Notice Broadcasting' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-lg text-[11px] font-mono font-black tracking-widest uppercase shrink-0 transition-all ${
              activeSubTab === tab.id 
                ? 'bg-[#FFE259] text-black border border-[#FFE259] shadow shadow-yellow-500/10' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40 border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Sub-tab views */}
      
      {/* 1. OVERVIEW GRAPHICAL VIEW */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Visual Custom Chart for Subscriptions */}
            <div className="lg:col-span-2 p-6 bg-zinc-900/40 border border-zinc-900/80 rounded-2xl relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase">
                    MEMBERSHIP REVENUE METRICS
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5 uppercase">Inbound subscriptions (last 4 months)</p>
                </div>
                <div className="flex gap-2 text-[10px] font-mono">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#FFE259]" /> Subscribers</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-600" /> Revenue Inflow</span>
                </div>
              </div>

              {/* Unique layout bar chart using raw styling */}
              <div className="h-56 flex items-end gap-3 sm:gap-6 pt-4 border-b border-zinc-800">
                {[
                  { month: 'February', users: 12, revenue: 14000, pct: '30%' },
                  { month: 'March', users: 20, revenue: 24000, pct: '50%' },
                  { month: 'April', users: 34, revenue: 41200, pct: '85%' },
                  { month: 'May (Peak)', users: 42, revenue: 50800, pct: '100%' },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                    <div className="w-full flex items-end gap-1.5 justify-center">
                      {/* Subscription count vertical representing bar */}
                      <div 
                        style={{ height: item.pct }} 
                        className="w-5 bg-[#FFE259] rounded-t-sm transition-all group-hover:brightness-110 shadow-lg relative tooltip"
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-[#FFE259] px-2 py-0.5 rounded uppercase shrink-0 transition-opacity whitespace-nowrap z-20">
                          {item.users} active
                        </span>
                      </div>
                      
                      {/* Revenue column vertical representing bar */}
                      <div 
                        style={{ height: `cols-${item.pct}` === 'cols-100%' ? '100%' : `calc(${item.pct} * 0.9)` }}
                        className="w-5 bg-amber-600 rounded-t-sm transition-all group-hover:bg-amber-500 shadow"
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-amber-500 px-2 py-0.5 rounded uppercase shrink-0 transition-opacity whitespace-nowrap z-20">
                          ₹{item.revenue.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Tick Label */}
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1 group-hover:text-zinc-200">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-900 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase mb-4">
                  OPERATIONAL ACCELERATORS
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                  Perform secure front office installations, add trainers to rosters, or update general notice boards live.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowMemberModal(true)}
                  className="w-full py-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-[#FFE259] transition-all flex items-center justify-between px-4"
                >
                  <span className="text-xs font-mono font-black tracking-widest text-zinc-300 uppercase">Onboard Member</span>
                  <UserPlus className="h-4 w-4 text-[#FFE259]" />
                </button>
                <button
                  onClick={() => setShowTrainerModal(true)}
                  className="w-full py-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-[#FFE259] transition-all flex items-center justify-between px-4"
                >
                  <span className="text-xs font-mono font-black tracking-widest text-zinc-300 uppercase">Appoint Coach</span>
                  <Plus className="h-4 w-4 text-[#FFE259]" />
                </button>
              </div>
            </div>

          </div>

          {/* Historical Logs summary */}
          <div className="p-6 bg-zinc-900/40 border border-zinc-900/80 rounded-2xl">
            <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase mb-4">
              LATEST SUBSCRIPTION RECEIPTS INBOUND
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    <th className="py-3 px-4">Receipt Num</th>
                    <th className="py-3 px-4">Member Name</th>
                    <th className="py-3 px-4">Selected plan</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Gross Amt</th>
                    <th className="py-3 px-4 text-right">Gateway</th>
                  </tr>
                </thead>
                <tbody>
                  {store.payments.slice(0, 4).map((pay) => (
                    <tr key={pay.id} className="border-b border-zinc-900/60 font-mono text-xs hover:bg-zinc-950/20">
                      <td className="py-3 px-4 text-[#FFE259]">{pay.receiptNumber}</td>
                      <td className="py-3 px-4 font-sans font-bold">{pay.memberName}</td>
                      <td className="py-3 px-4 text-zinc-400">{pay.planName}</td>
                      <td className="py-3 px-4 text-zinc-500">{pay.paymentDate}</td>
                      <td className="py-3 px-4 text-white">₹{pay.amount}</td>
                      <td className="py-3 px-4 text-right text-zinc-500 uppercase">{pay.paymentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. MEMBERS DIRECTORY TAB */}
      {activeSubTab === 'members' && (
        <div className="space-y-4">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-zinc-900/30 p-4 rounded-xl border border-zinc-900">
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-zinc-500" />
              </span>
              <input
                type="text"
                placeholder="Search by name, ID or mobile..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-white pl-9 pr-3 py-2 rounded-xl focus:border-[#FFE259] outline-none"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              {['ALL', 'Active', 'Expired', 'Suspended'].map((st) => (
                <button
                  key={st}
                  onClick={() => setMemberFilter(st as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold border ${
                    memberFilter === st 
                      ? 'bg-zinc-800 border-[#FFE259] text-[#FFE259]' 
                      : 'border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-950/40 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-900">
                    <th className="p-4">Lifter ID</th>
                    <th className="p-4">Name / Contact</th>
                    <th className="p-4">Assigned Coach</th>
                    <th className="p-4">Lifting Slot</th>
                    <th className="p-4">Plan & Expiry</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-zinc-900 hover:bg-zinc-950/20 font-mono">
                      <td className="p-4 text-zinc-500">{member.id}</td>
                      <td className="p-4">
                        <div className="font-sans font-bold text-white text-sm">{member.name}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{member.email}  |  {member.phone}</div>
                      </td>
                      <td className="p-4 font-sans text-zinc-300">
                        {member.assignedTrainerName ? (
                          <span className="text-[#FFE259] bg-[#FFE259]/5 px-2 py-0.5 rounded-md text-xs border border-[#FFE259]/20 font-bold">
                            Coached by {member.assignedTrainerName}
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-xs italic">Unassigned</span>
                        )}
                      </td>
                      <td className="p-4 text-zinc-400 text-[10px]">{member.activeSlot}</td>
                      <td className="p-4">
                        <div className="text-zinc-300">{member.membershipName}</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">Ends: {member.endDate}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          member.status === 'Active' 
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                            : member.status === 'Expired' 
                              ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                              : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedMemberId(member.id);
                            setShowAssignTrainerModal(true);
                          }}
                          className="px-2 py-1 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-[#FFE259] text-zinc-300 rounded font-bold uppercase text-[9px] tracking-wider transition-all cursor-pointer"
                        >
                          ASSIGN COACH
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-zinc-500 uppercase tracking-widest font-mono text-xs">
                        No active registered lifters match your parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. COACH ROSTER */}
      {activeSubTab === 'trainers' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-sans font-black tracking-widest text-[#FFE259] uppercase">
              CERTIFIED ATHLETE COACHES
            </h3>
            <button
              onClick={() => setShowTrainerModal(true)}
              className="px-3.5 py-1.5 bg-[#FFE259] text-black text-xs font-mono font-black tracking-widest uppercase rounded-lg flex items-center gap-1 hover:brightness-110 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Appoint Coach
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {store.trainers.map(tr => (
              <div key={tr.id} className="bg-zinc-900/50 border border-zinc-900 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{tr.id}</span>
                    <h4 className="text-base font-sans font-black text-white uppercase mt-0.5">{tr.name}</h4>
                    <p className="text-[11px] font-mono text-amber-500/95 mt-1">{tr.specialty}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-green-500/10 text-green-400 border border-green-500/20 font-bold">
                    {tr.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-805/40 text-xs font-mono space-y-1.5 text-zinc-400">
                  <div>📞 {tr.phone}</div>
                  <div>✉️ {tr.email}</div>
                  <div className="pt-2 text-white font-bold font-sans">
                    👥 Currently coaching: {store.members.filter(m => m.assignedTrainerId === tr.id).length} lifters
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. RECEPTIONISTS / FRONT DESK */}
      {activeSubTab === 'receptionists' && (
        <div className="space-y-4">
          <h3 className="text-sm font-sans font-black tracking-widest text-white uppercase">
            FRONT OFFICE MANAGEMENT OFFICERS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {store.receptionists.map(rec => (
              <div key={rec.id} className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex items-center gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#FFE259] font-mono font-bold text-sm">
                  {rec.id}
                </div>
                <div>
                  <h4 className="text-sm font-sans font-black text-white hover:text-[#FFE259] transition-colors">{rec.name}</h4>
                  <div className="text-xs font-mono text-zinc-400 mt-1">Shift: {rec.shift}</div>
                  <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Contact: {rec.phone}  |  {rec.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. NOTICE BOARD CREATION */}
      {activeSubTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left panel: Add notice form */}
          <div className="p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl">
            <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase mb-4">
              LAUNCH BROADCAST INFO
            </h3>
            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Notice Headline
                </label>
                <input
                  type="text"
                  placeholder="Sattu shaker machines back in service..."
                  value={nTitle}
                  onChange={(e) => setNTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:border-[#FFE259]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Notice Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe detailed specifications..."
                  value={nContent}
                  onChange={(e) => setNContent(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:border-[#FFE259]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Target Audience
                </label>
                <select
                  value={nTarget}
                  onChange={(e: any) => setNTarget(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-[#FFE259]"
                >
                  <option value="ALL">All Portal Enrollees</option>
                  <option value="MEMBERS">Gym Members Only</option>
                  <option value="TRAINERS">Coaches Roster Only</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#FFE259] text-black text-xs font-mono font-black tracking-widest uppercase rounded-xl hover:brightness-110 transition-all cursor-pointer"
              >
                DISPATCH LIVE NOTICE
              </button>
            </form>
          </div>

          {/* Right panel: Active notices display */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-sans font-black tracking-widest text-[#FFE259] uppercase">
              LIVE BROADCAST FEED ({store.notices.length})
            </h3>
            {store.notices.map(no => (
              <div key={no.id} className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl space-y-2 relative">
                <button
                  onClick={() => {
                    store.deleteNotice(no.id);
                    triggerToast('Notice incinerated.');
                  }}
                  className="absolute top-4 right-4 text-zinc-550 hover:text-red-500 transition-colors cursor-pointer"
                  title="Remove from board"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <div className="flex gap-2 items-center">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-zinc-800 text-[#FFE259] font-bold">
                    Recipient: {no.targetRole}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{no.date}</span>
                </div>
                <h4 className="text-sm font-sans font-black text-white uppercase">{no.title}</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">{no.content}</p>
                <div className="text-[9px] font-mono text-zinc-600 uppercase text-right pt-2">— Posted by {no.author}</div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* MODAL 1: ADD TRAINER/COACH */}
      {showTrainerModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative"
          >
            <h3 className="text-base font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
              APPOINT CERTIFIED COACH
            </h3>
            <form onSubmit={handleCreateTrainer} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">FullName</label>
                <input
                  type="text"
                  value={tName}
                  onChange={(e) => setTName(e.target.value)}
                  placeholder="Amit Pal (Strength)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Corporate Email</label>
                <input
                  type="email"
                  value={tEmail}
                  onChange={(e) => setTEmail(e.target.value)}
                  placeholder="amit@tillfailure.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={tPhone}
                  onChange={(e) => setTPhone(e.target.value)}
                  placeholder="+91 90021 XXXXX"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Specialty Focus</label>
                <input
                  type="text"
                  value={tSpecialty}
                  onChange={(e) => setTSpecialty(e.target.value)}
                  placeholder="Concentric deadlift thresholds, HIIT nutrition"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTrainerModal(false)}
                  className="flex-1 py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded-lg cursor-pointer"
                >
                  ABORT
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase rounded-lg cursor-pointer hover:brightness-110"
                >
                  APPOINT
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: ASSIGN TRAINER TO MEMBER */}
      {showAssignTrainerModal && selectedMemberId && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative"
          >
            <h3 className="text-base font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
              ASSIGN PERFORMANCE COACH
            </h3>
            <p className="text-xs text-zinc-400 mb-4 font-mono">
              Link Athlete ID: <span className="text-white font-bold">{selectedMemberId}</span> with our professional coaching staff.
            </p>
            <form onSubmit={handleAssignTrainerCommit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">Select Coach</label>
                <select
                  value={targetTrainerId}
                  onChange={(e) => setTargetTrainerId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white h-11"
                >
                  <option value="">-- Choose Coach --</option>
                  {store.trainers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.specialty})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignTrainerModal(false);
                    setSelectedMemberId(null);
                  }}
                  className="flex-1 py-2.5 bg-zinc-950 border border-zinc-850 text-zinc-400 font-mono text-[10px] rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase rounded-xl cursor-pointer hover:brightness-110"
                >
                  ASSIGN ROSTER
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 3: ADMIN ADD MEMBER FORM */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <h3 className="text-base font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
              SECURE SPECTRAL ADMISSIONS
            </h3>
            <form onSubmit={handleCreateMember} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">FullName</label>
                  <input
                    type="text"
                    value={mName}
                    onChange={(e) => setMName(e.target.value)}
                    placeholder="Sujit Shaw"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Communication Email</label>
                  <input
                    type="email"
                    value={mEmail}
                    onChange={(e) => setMEmail(e.target.value)}
                    placeholder="sujit.shaw@outlook.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Indian Mobile</label>
                  <input
                    type="text"
                    value={mPhone}
                    onChange={(e) => setMPhone(e.target.value)}
                    placeholder="+91 8240 XXXXX"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Gender</label>
                  <select
                    value={mGender}
                    onChange={(e: any) => setMGender(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Membership Plan Selection</label>
                  <select
                    value={mPlan}
                    onChange={(e) => setMPlan(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                  >
                    <option value="Sprint Monthly Starter">Sprint Monthly Starter (₹1,200/mo)</option>
                    <option value="Discipline Quarterly Lock">Discipline Quarterly Lock (3mo @ ₹3,200)</option>
                    <option value="Absolute Warrior Club">Absolute Warrior Club (12mo @ ₹10,000)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Preferred Lift Frame</label>
                  <select
                    value={mSlot}
                    onChange={(e) => setMSlot(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white h-10"
                  >
                    <option value="Morning Frame (6AM - 10AM)">Morning Frame (6AM - 10AM)</option>
                    <option value="Afternoon Frame (11AM - 4PM)">Afternoon Frame (11AM - 4PM)</option>
                    <option value="Evening Frame (5PM - 10PM)">Evening Frame (5PM - 10PM)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="flex-1 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-850 text-zinc-400 font-mono text-[10px] rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase rounded-xl cursor-pointer hover:brightness-110"
                >
                  SUBMIT REGISTRATION
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
