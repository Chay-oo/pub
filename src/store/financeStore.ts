import { create } from 'zustand';
import type { FinanceData } from '../types/finance';

export interface InsuranceDetails {
  health?: {
    coverageAmount: number;
    annualPremium: number;
  };
  life?: {
    coverageAmount: number;
    annualPremium: number;
  };
  auto?: {
    coverageAmount: number;
    annualPremium: number;
  };
  home?: {
    coverageAmount: number;
    annualPremium: number;
  };
  disability?: {
    coverageAmount: number;
    annualPremium: number;
  };
  [key: string]: {
    coverageAmount: number;
    annualPremium: number;
  } | undefined;
}

interface FinanceStore {
  data: Partial<FinanceData>;
  setPersonalDetails: (details: FinanceData['personal']) => void;
  setIncomeDetails: (details: FinanceData['income']) => void;
  setExpenseDetails: (details: FinanceData['expenses']) => void;
  setLoanDetails: (details: FinanceData['loans']) => void;
  setInsuranceDetails: (details: FinanceData['insurance']) => void;
  setInvestmentDetails: (details: FinanceData['investments']) => void;
  resetData: () => void;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  data: {},
  setPersonalDetails: (details) =>
    set((state) => ({ data: { ...state.data, personal: details } })),
  setIncomeDetails: (details) =>
    set((state) => ({ data: { ...state.data, income: details } })),
  setExpenseDetails: (details) =>
    set((state) => ({ data: { ...state.data, expenses: details } })),
  setLoanDetails: (details) =>
    set((state) => ({ data: { ...state.data, loans: details } })),
  setInsuranceDetails: (details) =>
    set((state) => ({ data: { ...state.data, insurance: details } })),
  setInvestmentDetails: (details) =>
    set((state) => ({ data: { ...state.data, investments: details } })),
  resetData: () => set({ data: {} }),
}));