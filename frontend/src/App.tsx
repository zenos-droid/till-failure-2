import React, { useEffect } from 'react';
import { useGymStore } from './store/gymStore';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages import
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Trainers from './pages/Trainers';
import Memberships from './pages/Memberships';
import Transformations from './pages/Transformations';
import BMICalculator from './pages/BMICalculator';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import JoinNow from './pages/JoinNow';

// Portal / Auth Pages imports
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PortalLayout from './pages/portal/PortalLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Scroll Restoration lock so page transitions always mount from x:0, y:0 position.
function ScrollRestore() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const initialize = useGymStore((state) => state.initialize);

  useEffect(() => {
    void initialize();
  }, [initialize]);
  const isPortalOrAuth = 
    location.pathname.startsWith('/portal') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/signup') ||
    location.pathname.startsWith('/forgot-password') ||
    location.pathname.startsWith('/reset-password');

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black">
      {/* Hide Navbar for portals and auth workflows */}
      {!isPortalOrAuth && <Navbar />}

      {/* Dynamic Route Switch */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-now" element={<JoinNow />} />

          {/* Authentication workflows */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Central SaaS Portal */}
          <Route 
            path="/portal font-bold" 
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            } 
          />
          {/* Support standard /portal as well */}
          <Route 
            path="/portal" 
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback routing back to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Hide Footer for portals and auth workflows */}
      {!isPortalOrAuth && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollRestore />
      <AppContent />
    </HashRouter>
  );
}
