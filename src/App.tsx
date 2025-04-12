import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import PersonalDetailsForm from './pages/PersonalDetailsForm';
import IncomeDetailsForm from './pages/IncomeDetailsForm';
import ExpenseDetailsForm from './pages/ExpenseDetailsForm';
import LoanDetailsForm from './pages/LoanDetailsForm';
import InsuranceDetailsForm from './pages/InsuranceDetailsForm';
import InvestmentDetailsForm from './pages/InvestmentDetailsForm';
import Summary from './pages/Summary';
import Advisory from './pages/Advisory';
import Calculators from './pages/Calculators';
import BlogManagement from './pages/BlogManagement';
import AdminLogin from './pages/AdminLogin';
import BlogPost from './pages/BlogPost';
import { Analytics } from "@vercel/analytics/react";
import { useUserStore } from './store/userStore';
import { createGuestSession, createTrackingId } from './services/databaseService';

function AppContent() {
  const { currentUser, setCurrentUser, clearCurrentUser } = useUserStore();

  // Initialize a unique user ID for the session
  useEffect(() => {
    // Clear any existing user when the app first loads
    clearCurrentUser();

    // Create a new unique user ID for this session
    // Use standard UUID format for database compatibility
    const uniqueSessionId = createGuestSession();
    const trackingId = createTrackingId(); // For analytics tracking
    
    console.log('Created new app session user ID:', uniqueSessionId);
    console.log('Created tracking ID:', trackingId);
    
    // Set a default user that will be updated as the user progresses
    setCurrentUser({
      id: uniqueSessionId,
      email: `visitor_${uniqueSessionId.substring(0, 8)}@example.com`,
      fullName: 'New Session',
      trackingId: trackingId // Store tracking ID as a separate property
    });
  }, [clearCurrentUser, setCurrentUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/personal" element={<PersonalDetailsForm />} />
        <Route path="/income" element={<IncomeDetailsForm />} />
        <Route path="/expenses" element={<ExpenseDetailsForm />} />
        <Route path="/loans" element={<LoanDetailsForm />} />
        <Route path="/insurance" element={<InsuranceDetailsForm />} />
        <Route path="/investments" element={<InvestmentDetailsForm />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/blog/manage" element={<BlogManagement />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

function App() {
  return <AppContent />;
}

export default App;
