export const calculateMetrics = (data: any) => {
  const monthlyIncome = (data.income?.monthlySalary || 0) + (data.income?.additionalIncome || 0);
  const annualIncome = monthlyIncome * 12 + (data.income?.annualBonus || 0);
  const monthlyExpenses = Object.values(data.expenses || {}).reduce((sum: number, value: any) => sum + (value || 0), 0);
  const totalMonthlyEMIs = Object.values(data.loans || {}).reduce(
    (sum: number, loan: any) => sum + (loan?.emiPerMonth || 0),
    0
  );

  const investments = data.investments || {};
  const totalPortfolioValue = Object.values(investments).reduce(
    (sum: number, inv: any) => sum + (inv?.value || 0),
    0
  );
  const monthlyInvestments = Object.values(investments).reduce(
    (sum: number, inv: any) => sum + (inv?.monthlyContribution || 0) + (inv?.monthlyIncome || 0),
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

  return {
    debtToIncome: monthlyIncome > 0 ? (totalMonthlyEMIs / monthlyIncome) * 100 : 0,
    savingsRate: monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses - totalMonthlyEMIs) / monthlyIncome) * 100 : 0,
    insuranceCoverage: annualIncome > 0 ? (data.insurance?.life?.coverage || 0) / annualIncome : 0,
    emergencyFundMonths: monthlyExpenses > 0 ? currentSavings / monthlyExpenses : 0,
    fireNumber,
    yearsToFire,
    investmentDiversification: diversificationScore,
    totalPortfolioValue,
    monthlyInvestments,
  };
};