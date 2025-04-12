export interface PersonalDetails {
  fullName: string;
  email: string;
  age: number;
  occupation: string;
  dependents: number;
}

export interface IncomeDetails {
  monthlySalary: number;
  additionalIncome: number;
  annualBonus: number;
  currentSavings: number;
}

export interface ExpenseDetails {
  housing: number;
  utilities: number;
  groceries: number;
  transportation: number;
  entertainment: number;
  miscellaneous: number;
}

export interface LoanDetails {
  personal: {
    totalAmount: number;
    pendingYears: number;
    emiPerMonth: number;
  };
  home: {
    totalAmount: number;
    pendingYears: number;
    emiPerMonth: number;
  };
  vehicle: {
    totalAmount: number;
    pendingYears: number;
    emiPerMonth: number;
  };
}

export interface InsuranceDetails {
  health: {
    coverage: number;
    premiumPerMonth: number;
  };
  life: {
    coverage: number;
    premiumPerMonth: number;
  };
  vehicle: {
    coverage: number;
    premiumPerMonth: number;
  };
}

export interface InvestmentDetails {
  stocks: {
    value: number;
    monthlyContribution: number;
  };
  mutualFunds: {
    value: number;
    monthlyContribution: number;
  };
  bonds: {
    value: number;
    monthlyContribution: number;
  };
  realEstate: {
    value: number;
    monthlyIncome: number;
  };
  retirement: {
    value: number;
    monthlyContribution: number;
  };
  crypto: {
    value: number;
    monthlyContribution: number;
  };
}

export interface FinanceData {
  personal: PersonalDetails;
  income: IncomeDetails;
  expenses: ExpenseDetails;
  loans: LoanDetails;
  insurance: InsuranceDetails;
  investments: InvestmentDetails;
}