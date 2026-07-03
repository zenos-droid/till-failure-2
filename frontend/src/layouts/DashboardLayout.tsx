import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useGymStore } from '../store/gymStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Settings, 
  Bell, 
  Menu, 
  X, 
  ShieldAlert, 
  Compass, 
  Grid 
} from 'lucide-react';
import Logo from '../components/Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const currentUser = useGymStore((state) => state.currentUser);
  const notices = useGymStore((state) => state.notices);
  const logout = useGymStore((state) => state.logout);
  const updateProfile = useGymStore((state) => state.updateProfile);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Settings profile form inputs
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Sync state with store updates
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name);
      setProfilePhone(currentUser.phone || '');
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-6">
        <ShieldAlert className="h-10 w-10 text-red-500 animate-bounce mb-3" />
        <h3 className="text-sm font-mono text-zinc-100 uppercase tracking-widest">SECURE CREDENTIAL TIMEOUT</h3>
        <p className="text-xs text-zinc-500 mt-2">Please authenticate your digital keys at login gateway first.</p>
        <Link to="/login" className="mt-4 px-4 py-2 bg-[#FFE259] text-black text-xs font-mono font-black rounded-lg uppercase">
          LOGIN BRIDGE
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    await AuthService.logout();
    navigate('/');
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await AuthService.updateProfile(profileName, profilePhone);
    setSettingsSuccess('Corporate files compiled and updated.');
    setTimeout(() => {
      setSettingsSuccess('');
      setShowSettingsModal(false);
    }, 1200);
  };

  // Resolve role tag styles
  const getRoleBadgeClasses = () => {
    switch (currentUser.role) {
      case 'ADMIN':
        return 'bg-[#FFE259] text-black ring-1 ring-[#FFE259]/30';
      case 'RECEPTIONIST':
         return 'bg-amber-600/10 text-[#FFE259] border border-amber-600/30';
      case 'TRAINER':
        return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case 'MEMBER':
        return 'bg-zinc-800 text-zinc-300 border border-zinc-750';
      default:
        return 'bg-zinc-900 text-zinc-500';
    }
  };

  const getRoleLabel = () => {
    switch (currentUser.role) {
      case 'ADMIN': return 'ADMIN DIRECTOR';
      case 'RECEPTIONIST': return 'FRONT Desk MANAGER';
      case 'TRAINER': return 'ATHLETE COACH';
      case 'MEMBER': return 'ACTIVE LIFTER';
      default: return 'GUEST ACCESS';
    }
  };

  // Grab role-matching notice banner
  const roleMatchingNotices = notices.filter(n => {
    if (currentUser.role === 'MEMBER') return n.targetRole === 'ALL' || n.targetRole === 'MEMBERS';
    if (currentUser.role === 'TRAINER') return n.targetRole === 'ALL' || n.targetRole === 'TRAINERS';
    return n.targetRole === 'ALL';
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col lg:flex-row relative">
      
      {/* 1. SIDEBAR NAVIGATION FOR DESKTOP */}
      <aside className="hidden lg:flex w-72 bg-zinc-950 border-r border-zinc-900 flex-col justify-between shrink-0 sticky top-0 h-screen z-10">
        <div className="flex flex-col flex-1">
          
          {/* Brand header panel */}
          <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
            <Link to="/" className="scale-95 transition-transform hover:scale-100">
              <Logo size="md" variant="full" />
            </Link>
          </div>

          {/* User badge center */}
          <div className="p-6 border-b border-zinc-900 bg-zinc-900/20 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-bold text-white text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="truncate flex-1">
                <span className="block text-xs font-sans font-black text-zinc-100 uppercase truncate leading-none">
                  {currentUser.name}
                </span>
                <span className="block text-[9px] font-mono text-zinc-500 mt-1 truncate">
                  {currentUser.email}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-black tracking-widest uppercase ${getRoleBadgeClasses()}`}>
                {getRoleLabel()}
              </span>
              <button
                onClick={() => {
                  setProfileName(currentUser.name);
                  setProfilePhone(currentUser.phone || '');
                  setShowSettingsModal(true);
                }}
                className="text-zinc-500 hover:text-[#FFE259] transition-colors p-1 cursor-pointer"
                title="Profile Settings"
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Sidebar functional navigation menus (ROLE-BASED NAVIGATION COMPLIANCE) */}
          <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <span className="block text-[9px] font-mono text-zinc-650 uppercase tracking-widest px-3 mb-2">OPERATIONAL CONTROL SHEETS</span>
            
            <button
              onClick={() => navigate('/portal')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-zinc-900/60 border border-[#FFE259]/10 text-[#FFE259] text-xs font-mono font-bold uppercase tracking-wider text-left transition-all"
            >
              <Grid className="h-4 w-4" />
              <span>DASHBOARD LIVE</span>
            </button>
            
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-zinc-900/40 hover:text-white text-xs font-mono font-bold uppercase tracking-wider text-left transition-all"
            >
              <Compass className="h-4 w-4 text-zinc-500" />
              <span>MARKETING HOME</span>
            </Link>
          </div>

        </div>

        {/* Logout bottom strip */}
        <div className="p-4 border-t border-zinc-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900/40 hover:bg-red-500/10 border border-zinc-900 hover:border-red-500/20 text-zinc-400 hover:text-red-400 font-mono text-xs font-black tracking-wider uppercase rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>DISCHARGE SESSION</span>
          </button>
        </div>
      </aside>

      {/* 2. RESPONSIVE MOBILE TOP BAR HEADER */}
      <nav className="lg:hidden sticky top-0 z-40 bg-zinc-950 border-b border-zinc-900 px-4 py-3.5 flex items-center justify-between">
        <Link to="/">
          <Logo size="sm" variant="full" />
        </Link>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-black ${getRoleBadgeClasses()}`}>
            {currentUser.role}
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-zinc-850 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#FFE259]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950 border-b border-zinc-900 px-6 py-4 space-y-4 z-30 relative"
          >
            <div className="space-y-1">
              <span className="block text-xs font-sans font-bold text-white uppercase">{currentUser.name}</span>
              <span className="block text-[10px] font-mono text-zinc-500">{currentUser.email}</span>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/portal');
                }}
                className="w-full text-left px-3 py-2 bg-zinc-900 text-[#FFE259] text-xs font-mono font-black rounded-lg uppercase"
              >
                LIVE PORTAL DASHBOARD
              </button>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-left px-3 py-2 text-zinc-400 hover:text-white text-xs font-mono font-black rounded-lg uppercase"
              >
                VISIT PUBLIC SITE
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSettingsModal(true);
                }}
                className="w-full text-left px-3 py-2 text-zinc-400 hover:text-white text-xs font-mono font-black rounded-lg uppercase"
              >
                PROFILE SETTINGS
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-black rounded-lg uppercase"
            >
              DISCHARGE SESSION
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE CONTENT AREA SWITCHER */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Real-time Matching Notice Banner feed */}
        {roleMatchingNotices.length > 0 && (
          <div className="bg-[#FFE259]/5 border-l-4 border-[#FFE259] p-4 rounded-r-xl flex items-start gap-3">
            <Bell className="h-5 w-5 text-[#FFE259] shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span className="text-[10px] font-mono text-[#FFE259] tracking-widest uppercase font-bold">LATEST DESK DIRECTIVE:</span>
              <h5 className="text-xs font-sans font-black text-zinc-100 uppercase mt-0.5">{roleMatchingNotices[0].title}</h5>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">{roleMatchingNotices[0].content}</p>
            </div>
          </div>
        )}

        {/* Dynamic injection of designated dashboards */}
        <div className="animate-in fade-in duration-300">
          {children}
        </div>
      </main>

      {/* PROFILE SETTINGS DRAWER/MODAL ELEMENT */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative"
          >
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-mono text-sm uppercase font-bold cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-base font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
              LIFTER SETTINGS MATRIX
            </h3>

            {settingsSuccess && (
              <div className="p-3 bg-[#FFE259]/10 border border-[#FFE259]/20 rounded-xl text-xs font-mono text-zinc-300 mb-4 text-center">
                ✅ {settingsSuccess}
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">FullName Title</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 px-3 text-xs font-mono text-white h-11"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Phone Mobile</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 px-3 text-xs font-mono text-white h-11"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-550 uppercase mb-1">Security Privilege</label>
                <input
                  type="text"
                  value={`${currentUser.role} ACCESS LEVEL`}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-2 px-3 text-xs font-mono text-zinc-500 h-11 cursor-not-allowed"
                  disabled
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="flex-1 py-2.5 bg-zinc-950 border border-zinc-850 text-zinc-450 font-mono text-xs rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase rounded-xl hover:brightness-110 cursor-pointer shadow shadow-amber-500/10"
                >
                  SAVE SPECS
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
