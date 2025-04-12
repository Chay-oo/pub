import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinanceStore } from '../store/financeStore';
import { useUserStore } from '../store/userStore';
import FormLayout from '../components/FormLayout';
import { generatePDF } from '../services/pdfService';
import ReactMarkdown from 'react-markdown';
import EmailModal from '../components/modals/EmailModal';
import ChatWindow from '../components/chat/ChatWindow';
import {
  ShieldCheck,
  TrendingUp,
  PiggyBank,
  Target,
  ChevronRight,
  Home,
  Wallet,
  LineChart,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { 
  saveFinancialAdvice, 
  saveFinancialData, 
  saveChat, 
  createGuestSession, 
  saveGuestFinancialData,
  saveAdvisoryEmail
} from '../services/databaseService';
import { useEmailStore } from '../store/emailStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Analysis {
  debtToIncome: number;
  savingsRate: number;
  insuranceCoverage: number;
  emergencyFundMonths: number;
  fireNumber: number;
  yearsToFire: number;
  investmentDiversification: number;
  totalPortfolioValue: number;
  monthlyInvestments: number;
}

interface Investment {
  value?: number;
  monthlyContribution?: number;
  monthlyIncome?: number;
}

interface Investments {
  [key: string]: Investment;
}

const detailedSystemPrompt = `You are a highly experienced Certified Financial Planner (CFP) with 20 years of expertise in personal finance, wealth management, and FIRE planning. Provide comprehensive financial analysis and advice covering:

1. Financial Overview
2. Emergency Fund Analysis
3. Debt Management Strategy
4. Investment Portfolio Review
5. Insurance Coverage Assessment
6. FIRE Journey Progress
7. Action Items (Immediate, Short-term, Long-term)
8. Risk Considerations
9. Next Review Recommendations

Be thorough and detailed in your analysis while maintaining professional tone. Dont mentioned AI, Yours,Best regards, Certified planner and any salutations at the bottom, no signatures, no signoff at the end of the summary `;

const COUNTRY_CODES: { [key: string]: string } = {
  'US': 'United States',
  'UK': 'United Kingdom',
  'CA': 'Canada',
  'AU': 'Australia',
  'SG': 'Singapore',
  'IN': 'India',
  'UAE': 'United Arab Emirates',
  'CHN': 'China',
  'RUS': 'Russia'
};

export default function Advisory() {
  const navigate = useNavigate();
  const { data, resetData } = useFinanceStore();
  const { currentUser, isAuthenticated } = useUserStore();
  const [userId, setUserId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [analysis, setAnalysis] = useState<Analysis>({
    debtToIncome: 0,
    savingsRate: 0,
    insuranceCoverage: 0,
    emergencyFundMonths: 0,
    fireNumber: 0,
    yearsToFire: 0,
    investmentDiversification: 0,
    totalPortfolioValue: 0,
    monthlyInvestments: 0,
  });
  const [advisoryContent, setAdvisoryContent] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('US');
  const MAX_QUESTIONS = 10;
  const [isLoading, setIsLoading] = useState(false);

  const chatSystemPrompt = `You are a senior financial advisor with expertise in ${country} markets. Provide only brief, actionable advice:
- Maximum 3 sentences per response
- Focus on one key recommendation at a time
- Use specific numbers from user's financial data
- Be direct and practical
- No general advice or pleasantries
- Prioritize most impactful actions first
- Consider ${country} market conditions, regulations, and tax implications
- IMPORTANT: All your advice MUST be based on the financial data provided to you
- DO NOT make up financial details, use only the information provided`;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    // Clear any existing guest user first to ensure a fresh ID
    if (!isAuthenticated) {
      useUserStore.getState().clearCurrentUser();
    }

    // Initialize userId state
    let currentUserId = '';
    
    // Set up user ID for database operations - either authenticated user or guest
    if (isAuthenticated && currentUser) {
      console.log('Using authenticated user ID:', currentUser.id);
      currentUserId = currentUser.id;
    } else {
      // Create a truly unique guest session ID with timestamp
      const timestamp = new Date().getTime();
      const randomSuffix = Math.floor(Math.random() * 10000);
      const uniqueId = uuidv4();
      const guestId = `${uniqueId}-${timestamp}-${randomSuffix}`;
      console.log('Created unique guest session ID:', guestId);
      currentUserId = guestId;
      
      // If we have an email in personal data, create a temporary user profile
      if (data.personal) {
        console.log('Setting current user with data:', data.personal.fullName);
        
        // Generate default email if none provided
        const defaultEmail = data.personal.email || `guest_${timestamp}@example.com`;
        
        // Create a unique user profile for analytics
        useUserStore.getState().setCurrentUser({
          id: guestId,
          email: defaultEmail,
          fullName: data.personal.fullName || 'Guest User'
        });
      } else {
        // Even without personal data, create a basic guest user for tracking
        useUserStore.getState().setCurrentUser({
          id: guestId,
          email: `guest_${timestamp}@example.com`,
          fullName: 'Anonymous User'
        });
      }
    }
    
    // Set the state BEFORE proceeding
    setUserId(currentUserId);

    // Create a unique session ID for this advisory session
    const newSessionId = uuidv4();
    console.log('Created new session ID:', newSessionId);
    setSessionId(newSessionId);

    calculateMetrics();
    
    // Delay the API call to ensure userId is set
    setTimeout(() => {
      getFinancialAdvice(currentUserId);
    }, 100);
  }, [data, isAuthenticated, currentUser]);

  const calculateMetrics = () => {
    const monthlyIncome = (data.income?.monthlySalary || 0) + (data.income?.additionalIncome || 0);
    const annualIncome = monthlyIncome * 12 + (data.income?.annualBonus || 0);
    const monthlyExpenses = Object.values(data.expenses || {}).reduce((sum, value) => sum + (value || 0), 0);
    const totalMonthlyEMIs = Object.values(data.loans || {}).reduce(
      (sum, loan) => sum + (loan?.emiPerMonth || 0),
      0
    );

    const investments = (data.investments || {}) as Investments;
    const totalPortfolioValue = Object.values(investments).reduce(
      (sum, inv) => sum + (inv?.value || 0),
      0
    );
    const monthlyInvestments = Object.values(investments).reduce(
      (sum, inv) => sum + (inv?.monthlyContribution || 0) + (inv?.monthlyIncome || 0),
      0
    );

    const investmentTypes = Object.values(investments).filter(inv => (inv?.value || 0) > 0).length;
    const maxTypes = 6;
    const diversificationScore = (investmentTypes / maxTypes) * 100;

    const currentSavings = data.income?.currentSavings || 0;
    const fireNumber = monthlyExpenses * 12 * 25;
    const yearsToFire = monthlyExpenses > 0
      ? Math.ceil(
          Math.log(
            fireNumber / (currentSavings + totalPortfolioValue || 1)
          ) / Math.log(1.07)
        )
      : 0;

    setAnalysis({
      debtToIncome: monthlyIncome > 0 ? (totalMonthlyEMIs / monthlyIncome) * 100 : 0,
      savingsRate: monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses - totalMonthlyEMIs) / monthlyIncome) * 100 : 0,
      insuranceCoverage: annualIncome > 0 ? (data.insurance?.life?.coverage || 0) / annualIncome : 0,
      emergencyFundMonths: monthlyExpenses > 0 ? currentSavings / monthlyExpenses : 0,
      fireNumber,
      yearsToFire,
      investmentDiversification: diversificationScore,
      totalPortfolioValue,
      monthlyInvestments,
    });
  };

  const getFinancialAdvice = async (currentUserId: string) => {
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      // Debug the API key (masking most of it for security)
      if (apiKey) {
        const maskedKey = `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
        console.log('API Key format check (masked):', maskedKey);
      } else {
        console.error('API key is missing or empty');
        setError('API key not configured. Please add your GROQ API key to the .env file.');
        setLoadingAdvice(false);
        return;
      }

      // Check if we have necessary data
      if (!data.personal || !data.income) {
        console.error('Missing required financial data');
        setError('Please fill in all required financial information before generating advice.');
        setLoadingAdvice(false);
        return;
      }

      setLoadingAdvice(true);
      
      // Prepare request payload using GROQ API with Gemma model
      const payload = {
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'system',
            content: detailedSystemPrompt,
          },
          {
            role: 'user',
            content: `Provide financial advice based on this data: ${JSON.stringify({
              personal: data.personal,
              income: data.income,
              expenses: data.expenses,
              loans: data.loans,
              insurance: data.insurance,
              investments: data.investments,
              analysis: analysis,
            })}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      };
      
      console.log('Sending request to GROQ API');
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setError(`Failed to get advice: ${errorData.error?.message || response.statusText}`);
        setLoadingAdvice(false);
        return;
      }

      const responseData = await response.json();
      const adviceContent = responseData.choices[0]?.message?.content || '';
      setAdvisoryContent(adviceContent);
      
      // Save advice to database
      if (currentUserId) {
        try {
          console.log('Attempting to save data for user ID:', currentUserId);
          // Save financial data
          const financialDataResult = await saveFinancialData(currentUserId, useFinanceStore.getState().data);
          console.log('Financial data save result:', financialDataResult ? 'Success' : 'Failed');
          
          // Save the generated advice
          const adviceResult = await saveFinancialAdvice(currentUserId, adviceContent, analysis);
          console.log('Financial advice save result:', adviceResult ? 'Success' : 'Failed');
        } catch (dbError) {
          console.error('Error saving to database:', dbError);
          // Continue even if database save fails
        }
      } else {
        console.error('Cannot save data: No user ID provided to getFinancialAdvice');
      }
      
    } catch (error) {
      console.error('Error getting financial advice:', error);
      setError(`Failed to get advice: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoadingAdvice(false);
    }
  };

  const handleDownloadPDF = () => {
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent, countryCode: string) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    const selectedCountry = COUNTRY_CODES[countryCode] || 'United States';
    
    // Show loading indicator
    setIsLoading(true);
    
    // Save email to database before generating PDF
    try {
      console.log('Saving advisory email:', email);
      const result = await saveAdvisoryEmail(email);
      console.log('Email saved successfully:', result);
      
      // Also save to local storage via email store
      const emailStore = useEmailStore.getState();
      emailStore.addAdvisoryEmail(email);
      
      // Generate PDF
      const element = document.getElementById('advisory-content');
      if (element) {
        await generatePDF(element);
      }
      
      setShowEmailModal(false);
      setShowChat(true);
      setMessages([
        {
          role: 'assistant',
          content: `Hello! I'm your financial expert specializing in ${selectedCountry} markets. I've analyzed your financial profile with ${formatCurrency(analysis.totalPortfolioValue)} in assets and a ${analysis.savingsRate.toFixed(1)}% savings rate. Your FIRE number is ${formatCurrency(analysis.fireNumber)} and you're on track to reach it in ${analysis.yearsToFire} years. How can I help with specific questions about your financial plan?`,
        },
      ]);
      
      // Show success toast or notification (if you have a toast component)
      // You can add toast notification here if you have one in your app
      
    } catch (dbError) {
      console.error('Error saving email to database:', dbError);
      setError('There was an issue saving your email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectDownload = async () => {
    const element = document.getElementById('advisory-content');
    if (element) {
      await generatePDF(element);
    }
    setShowEmailModal(false);
  };

  const handleSendMessage = async (message: string) => {
    if (questionCount >= MAX_QUESTIONS) return;

    try {
      setQuestionCount(prev => prev + 1);
      
      // Get the current userId from state
      const currentUserId = userId; 
      if (!currentUserId) {
        console.error('No user ID available for chat');
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Unable to process your request due to a user identification issue. Please refresh the page and try again.' } as Message
        ]);
        return;
      }
      
      // Add the user message to state immediately
      const userMessage: Message = { role: 'user', content: message };
      setMessages(prev => [...prev, userMessage]);

      // Create a temporary copy of messages including the new user message
      const updatedMessages = [...messages, userMessage];

      // Save user message to database
      if (currentUserId && sessionId) {
        try {
          await saveChat(currentUserId, sessionId, 'user', message);
        } catch (dbError) {
          console.error('Error saving chat to database:', dbError);
          // Continue even if database save fails
        }
      }

      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        console.error('API key is missing or empty');
        const errorMsg = 'API key is missing. Please add your GROQ API key to the .env file.';
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: errorMsg } as Message
        ]);
        return;
      }

      if (apiKey === 'your_groq_api_key_here') {
        console.error('Default API key is being used');
        const errorMsg = 'You need to replace the default API key with your actual GROQ API key in the .env file.';
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: errorMsg } as Message
        ]);
        return;
      }

      // Create financial context for the chat
      const financialContext = `
===== FINANCIAL PROFILE SUMMARY =====
PERSONAL:
- Name: ${data.personal?.fullName}
- Age: ${data.personal?.age} years
- Occupation: ${data.personal?.occupation}
- Dependents: ${data.personal?.dependents}

INCOME & SAVINGS:
- Monthly Salary: ${formatCurrency(data.income?.monthlySalary || 0)}
- Additional Income: ${formatCurrency(data.income?.additionalIncome || 0)}
- Annual Bonus: ${formatCurrency(data.income?.annualBonus || 0)}
- Current Savings: ${formatCurrency(data.income?.currentSavings || 0)}

EXPENSES & DEBT:
- Monthly Expenses: ${formatCurrency(Object.values(data.expenses || {}).reduce((sum, val) => sum + (val || 0), 0))}
- Total Monthly EMI: ${formatCurrency(Object.values(data.loans || {}).reduce((sum, loan) => sum + (loan?.emiPerMonth || 0), 0))}
- Debt-to-Income Ratio: ${analysis.debtToIncome.toFixed(1)}%

INVESTMENTS:
- Total Portfolio Value: ${formatCurrency(analysis.totalPortfolioValue)}
- Monthly Investments: ${formatCurrency(analysis.monthlyInvestments)}
- Portfolio Diversification: ${analysis.investmentDiversification.toFixed(1)}%

FIRE JOURNEY:
- FIRE Number Target: ${formatCurrency(analysis.fireNumber)}
- Years to FIRE: ${analysis.yearsToFire}
- Savings Rate: ${analysis.savingsRate.toFixed(1)}%

This financial profile is the basis for all advice. Reference these numbers in your responses.
      `;

      // Update the chatSystemPrompt with stronger instructions about using the data
      const enhancedSystemPrompt = `${chatSystemPrompt}
      
IMPORTANT INSTRUCTIONS:
1. The user's FIRE number is ${formatCurrency(analysis.fireNumber)}
2. The user is expected to reach FIRE in ${analysis.yearsToFire} years
3. All advice MUST directly reference these financial metrics
4. Your responses must be data-driven, using the exact figures provided`;

      // Prepare request payload for GROQ API with all messages including the new user message
      const payload = {
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'system',
            content: enhancedSystemPrompt + "\n\n" + financialContext,
          },
          ...updatedMessages.map(msg => ({ role: msg.role, content: msg.content }))
        ],
        temperature: 0.7,
        max_tokens: 1024,
      };

      console.log('Sending message to GROQ API');
      console.log('Request payload (first 200 chars):', JSON.stringify(payload).substring(0, 200) + '...');

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('Chat API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        try {
          const errorData = JSON.parse(errorText);
          console.error('Parsed API Error:', errorData);
          throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
        } catch (parseError) {
          throw new Error(`API error: ${response.status} ${response.statusText}, Body: ${errorText.substring(0, 100)}`);
        }
      }

      const responseData = await response.json();
      console.log('Chat API response received:', responseData.choices ? 'Success' : 'Missing choices');
      const responseMessage = responseData.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      
      // Add the assistant message to state
      const assistantMessage: Message = { role: 'assistant', content: responseMessage };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Save assistant message to database
      if (currentUserId && sessionId) {
        try {
          await saveChat(currentUserId, sessionId, 'assistant', responseMessage);
        } catch (dbError) {
          console.error('Error saving chat response to database:', dbError);
          // Continue even if database save fails
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try asking your question again.` } as Message
      ]);
    }
  };

  const handleNewProfile = () => {
    resetData();
    navigate('/');
  };

  return (
    <FormLayout
      title="Financial Advisory"
      subtitle={`Dear ${data.personal?.fullName}, here are your personalized financial recommendations`}
    >
      <div id="advisory-content" className="space-y-8">
        {/* Financial Health Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Wallet className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold mb-1">Debt-to-Income Ratio</h4>
                <p className="text-sm">{analysis.debtToIncome.toFixed(1)}% (Target: &lt;40%)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <PiggyBank className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold mb-1">Savings Rate</h4>
                <p className="text-sm">{analysis.savingsRate.toFixed(1)}% (Target: &gt;20%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold mb-1">Investment Portfolio</h4>
                <p className="text-sm">
                  Total Value: {formatCurrency(analysis.totalPortfolioValue)}
                  <br />
                  Monthly Investment: {formatCurrency(analysis.monthlyInvestments)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="p-2 bg-amber-100 rounded-lg">
                <ShieldCheck className="w-8 h-8 text-amber-600" />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold mb-1">Portfolio Diversification</h4>
                <p className="text-sm">Score: {analysis.investmentDiversification.toFixed(1)}% (Target: &gt;80%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* FIRE Journey Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold mb-1">FIRE Number</h4>
                <p className="text-sm">Target: {formatCurrency(analysis.fireNumber)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Home className="w-8 h-8 text-rose-600" />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold mb-1">Years to FIRE</h4>
                <p className="text-sm">Estimated: {analysis.yearsToFire} years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Financial Advisory */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <LineChart className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-semibold">Detailed Financial Summary</h3>
          </div>
          {loadingAdvice ? (
            <p>Loading advice...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="prose prose-indigo max-w-none">
              <ReactMarkdown
                children={advisoryContent}
                components={{
                  h1: ({ node, ...props }) => <h1 className="font-bold text-2xl" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="font-bold text-xl" {...props} />,
                    }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Download as PDF
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
          <button
            onClick={handleNewProfile}
            className="flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
          >
            Submit new profile
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {showEmailModal && (
        <EmailModal
          onClose={() => setShowEmailModal(false)}
          onDirectDownload={handleDirectDownload}
          onEmailSubmit={handleEmailSubmit}
          onEmailChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          isLoading={isLoading}
        />
      )}

      {showChat && (
        <ChatWindow
          onClose={() => setShowChat(false)}
          onSendMessage={handleSendMessage}
          messages={messages}
          questionCount={questionCount}
          maxQuestions={MAX_QUESTIONS}
        />
      )}
    </FormLayout>
  );
}
