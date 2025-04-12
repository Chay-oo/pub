import { FinanceData } from '../types/finance';

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

export const getFinancialAdvice = async (data: Partial<FinanceData>, analysis: Analysis): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: `You are a highly experienced Certified Financial Planner (CFP) with 20 years of expertise in personal finance, wealth management, and FIRE planning. Analyze the client's financial data and provide specific, actionable advice in the following format:

# Financial Overview
[Brief overview of current financial situation]

## Emergency Fund Analysis
[Analysis of emergency fund status and recommendations]

## Debt Management Strategy
[Analysis of current debt and management strategy]

## Investment Portfolio Review
[Review of investment allocation and recommendations]

## Insurance Coverage Assessment
[Analysis of insurance coverage and gaps]

## FIRE Journey Progress
[Analysis of progress towards FIRE goals]

## Action Items
### Immediate (Next 30 Days)
- [Action item 1]
- [Action item 2]

### Short-term (3-6 Months)
- [Action item 1]
- [Action item 2]

### Long-term (6+ Months)
- [Action item 1]
- [Action item 2]

## Risk Considerations
[Important risk factors to consider]

## Next Review
[Recommendation for next financial review]`
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
            })}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch advice');
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching advice:', error);
    throw error;
  }
};