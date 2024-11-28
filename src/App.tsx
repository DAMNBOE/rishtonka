import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import MatchesPage from './pages/MatchesPage';
import PricingPage from './pages/PricingPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/create" element={<ProfileCreationPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}