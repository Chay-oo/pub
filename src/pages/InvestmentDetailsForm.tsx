import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import InputField from '../components/InputField';
import AddCustomField from '../components/AddCustomField';
import { useFinanceStore } from '../store/financeStore';

interface CustomInvestment {
  name: string;
  value: string;
  monthlyContribution: string;
}

export default function InvestmentDetailsForm() {
  const navigate = useNavigate();
  const setInvestmentDetails = useFinanceStore((state) => state.setInvestmentDetails);
  const existingData = useFinanceStore((state) => state.data.investments);
  const [customFieldsInitialized, setCustomFieldsInitialized] = useState(false);

  const [formData, setFormData] = useState({
    stocks: {
      value: existingData?.stocks?.value || '',
      monthlyContribution: existingData?.stocks?.monthlyContribution || '',
    },
    mutualFunds: {
      value: existingData?.mutualFunds?.value || '',
      monthlyContribution: existingData?.mutualFunds?.monthlyContribution || '',
    },
    bonds: {
      value: existingData?.bonds?.value || '',
      monthlyContribution: existingData?.bonds?.monthlyContribution || '',
    },
    realEstate: {
      value: existingData?.realEstate?.value || '',
      monthlyIncome: existingData?.realEstate?.monthlyIncome || '',
    },
    retirement: {
      value: existingData?.retirement?.value || '',
      monthlyContribution: existingData?.retirement?.monthlyContribution || '',
    },
    crypto: {
      value: existingData?.crypto?.value || '',
      monthlyContribution: existingData?.crypto?.monthlyContribution || '',
    },
  });

  const [customInvestments, setCustomInvestments] = useState<CustomInvestment[]>([]);

  // Initialize custom fields from existing data
  useEffect(() => {
    if (existingData && !customFieldsInitialized) {
      const standardInvestments = ['stocks', 'mutualFunds', 'bonds', 'realEstate', 'retirement', 'crypto'];
      
      // Find custom investments in existing data
      const customInvestmentEntries = Object.entries(existingData)
        .filter(([key]) => !standardInvestments.includes(key))
        .map(([key, value]) => ({
          name: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), // Convert snake_case to Title Case
          value: value?.value?.toString() || '',
          monthlyContribution: value?.monthlyContribution?.toString() || '',
        }));
      
      if (customInvestmentEntries.length > 0) {
        setCustomInvestments(customInvestmentEntries);
        setCustomFieldsInitialized(true);
      }
    }
  }, [existingData, customFieldsInitialized]);

  const handleBack = () => navigate('/loans');

  const handleSubmit = () => {
    // Process custom investments with proper error handling and data transformation
    const customData = customInvestments.reduce((acc, investment) => {
      // Skip entries with empty values
      if (!investment.value && !investment.monthlyContribution) {
        return acc;
      }
      
      // Create safe key name
      const key = investment.name.toLowerCase().replace(/\s+/g, '_');
      
      acc[key] = {
        value: Number(investment.value) || 0,
        monthlyContribution: Number(investment.monthlyContribution) || 0,
      };
      
      return acc;
    }, {} as Record<string, any>);

    const investmentData = {
      stocks: {
        value: Number(formData.stocks.value) || 0,
        monthlyContribution: Number(formData.stocks.monthlyContribution) || 0,
      },
      mutualFunds: {
        value: Number(formData.mutualFunds.value) || 0,
        monthlyContribution: Number(formData.mutualFunds.monthlyContribution) || 0,
      },
      bonds: {
        value: Number(formData.bonds.value) || 0,
        monthlyContribution: Number(formData.bonds.monthlyContribution) || 0,
      },
      realEstate: {
        value: Number(formData.realEstate.value) || 0,
        monthlyIncome: Number(formData.realEstate.monthlyIncome) || 0,
      },
      retirement: {
        value: Number(formData.retirement.value) || 0,
        monthlyContribution: Number(formData.retirement.monthlyContribution) || 0,
      },
      crypto: {
        value: Number(formData.crypto.value) || 0,
        monthlyContribution: Number(formData.crypto.monthlyContribution) || 0,
      },
      ...customData,
    };
    
    console.log('Saving investment data:', investmentData);
    setInvestmentDetails(investmentData);
    navigate('/insurance');
  };

  const handleAddCustomInvestment = (label: string) => {
    // Check if investment with similar name already exists
    const normalizedLabel = label.toLowerCase().trim();
    
    // Check standard investments
    if (['stocks', 'mutualfunds', 'bonds', 'realestate', 'retirement', 'crypto'].includes(normalizedLabel.replace(/\s+/g, ''))) {
      alert(`"${label}" is a default investment type. Please use a different name.`);
      return;
    }
    
    // Check custom investments
    const existingInvestment = customInvestments.find(
      investment => investment.name.toLowerCase().trim() === normalizedLabel
    );
    
    if (existingInvestment) {
      alert(`An investment with name "${label}" already exists`);
      return;
    }
    
    setCustomInvestments([
      ...customInvestments,
      { name: label, value: '', monthlyContribution: '' },
    ]);
  };

  return (
    <FormLayout
      title="Investment Details"
      subtitle="Tell us about your investment portfolio"
      onBack={handleBack}
      onNext={handleSubmit}
    >
      <div className="space-y-6">
        {/* Stocks */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Stocks</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Current Value"
              type="number"
              value={formData.stocks.value}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  stocks: { ...formData.stocks, value: value },
                })
              }
              min={0}
              step="100"
            />
            <InputField
              label="Monthly Contribution"
              type="number"
              value={formData.stocks.monthlyContribution}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  stocks: { ...formData.stocks, monthlyContribution: value },
                })
              }
              min={0}
              step="10"
            />
          </div>
        </div>

        {/* Mutual Funds */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Mutual Funds</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Current Value"
              type="number"
              value={formData.mutualFunds.value}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  mutualFunds: { ...formData.mutualFunds, value: value },
                })
              }
              min={0}
              step="100"
            />
            <InputField
              label="Monthly Contribution"
              type="number"
              value={formData.mutualFunds.monthlyContribution}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  mutualFunds: { ...formData.mutualFunds, monthlyContribution: value },
                })
              }
              min={0}
              step="10"
            />
          </div>
        </div>

        {/* Bonds */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Bonds</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Current Value"
              type="number"
              value={formData.bonds.value}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  bonds: { ...formData.bonds, value: value },
                })
              }
              min={0}
              step="100"
            />
            <InputField
              label="Monthly Contribution"
              type="number"
              value={formData.bonds.monthlyContribution}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  bonds: { ...formData.bonds, monthlyContribution: value },
                })
              }
              min={0}
              step="10"
            />
          </div>
        </div>

        {/* Real Estate */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Real Estate</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Current Value"
              type="number"
              value={formData.realEstate.value}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  realEstate: { ...formData.realEstate, value: value },
                })
              }
              min={0}
              step="1000"
            />
            <InputField
              label="Monthly Rental Income"
              type="number"
              value={formData.realEstate.monthlyIncome}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  realEstate: { ...formData.realEstate, monthlyIncome: value },
                })
              }
              min={0}
              step="100"
            />
          </div>
        </div>

        {/* Retirement Accounts */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Retirement Accounts</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Current Value"
              type="number"
              value={formData.retirement.value}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  retirement: { ...formData.retirement, value: value },
                })
              }
              min={0}
              step="100"
            />
            <InputField
              label="Monthly Contribution"
              type="number"
              value={formData.retirement.monthlyContribution}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  retirement: { ...formData.retirement, monthlyContribution: value },
                })
              }
              min={0}
              step="10"
            />
          </div>
        </div>

        {/* Cryptocurrency */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Cryptocurrency</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Current Value"
              type="number"
              value={formData.crypto.value}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  crypto: { ...formData.crypto, value: value },
                })
              }
              min={0}
              step="100"
            />
            <InputField
              label="Monthly Contribution"
              type="number"
              value={formData.crypto.monthlyContribution}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  crypto: { ...formData.crypto, monthlyContribution: value },
                })
              }
              min={0}
              step="10"
            />
          </div>
        </div>

        {/* Custom Investments */}
        {customInvestments.map((investment, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">{investment.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Current Value"
                type="number"
                value={investment.value}
                onChange={(value) => {
                  const updated = [...customInvestments];
                  updated[index].value = value;
                  setCustomInvestments(updated);
                }}
                min={0}
                step="100"
              />
              <InputField
                label="Monthly Contribution"
                type="number"
                value={investment.monthlyContribution}
                onChange={(value) => {
                  const updated = [...customInvestments];
                  updated[index].monthlyContribution = value;
                  setCustomInvestments(updated);
                }}
                min={0}
                step="10"
              />
            </div>
          </div>
        ))}

        <AddCustomField onAdd={handleAddCustomInvestment} />
      </div>
    </FormLayout>
  );
}