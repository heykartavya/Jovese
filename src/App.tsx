import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Clients from './pages/Clients';
import ClientsSubmitted from './pages/ClientsSubmitted';
import Talent from './pages/Talent';
import Manifesto from './pages/Manifesto';
import Login from './pages/Login';
import RecruiterPortal from './pages/RecruiterPortal';
import TalentPortal from './pages/TalentPortal';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/recruiter') || location.pathname.includes('/talent/dashboard');
  
  if (isDashboard) {
    return <div className="font-sans antialiased text-slate-900 bg-[#f8f9fa] min-h-screen selection:bg-blue-500/30">{children}</div>;
  }

  return (
    <div className="font-sans antialiased text-slate-900 bg-[#f8f9fa] min-h-screen flex flex-col selection:bg-blue-500/30">
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/submitted" element={<ClientsSubmitted />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/about" element={<Manifesto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recruiter/dashboard" element={<RecruiterPortal />} />
          <Route path="/talent/dashboard" element={<TalentPortal />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

