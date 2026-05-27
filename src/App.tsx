import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Talent from './pages/Talent';
import Manifesto from './pages/Manifesto';

export default function App() {
  return (
    <Router>
      <div className="font-sans text-slate-900 bg-[#f8f9fa] min-h-screen flex flex-col selection:bg-orange-500/30">
        <Navbar />
        <main className="flex-grow pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/talent" element={<Talent />} />
            <Route path="/manifesto" element={<Manifesto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

