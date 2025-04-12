import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import CurrencyInput from '../components/CurrencyInput';
import AddCustomField from '../components/AddCustomField';
import { useFinanceStore } from '../store/financeStore';

interface CustomField {
  label: string;
  value: string;
}

export default function IncomeDetailsForm() {
  const navigate = useNavigate();
  const setIncomeDetails = useFinanceStore((state) => state.setIncomeDetails);
  const existingData = useFinanceStore((state) => state.data.income);
  const [customFieldsInitialized, setCustomFieldsInitialized] = useState(false);

  const [formData, setFormData] = useState({
    monthlySalary: existingData?.monthlySalary || '',
    additionalIncome: existingData?.additionalIncome || '',
    annualBonus: existingData?.annualBonus || '',
    currentSavings: existingData?.currentSavings || '',
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  // Initialize custom fields from existing data
  useEffect(() => {
    if (existingData && !customFieldsInitialized) {
      const standardFields = ['monthlySalary', 'additionalIncome', 'annualBonus', 'currentSavings'];
      const customFieldEntries = Object.entries(existingData)
        .filter(([key]) => !standardFields.includes(key))
        .map(([key, value]) => ({
          label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), // Convert snake_case to Title Case
          value: value?.toString() || '',
        }));
      
      if (customFieldEntries.length > 0) {
        setCustomFields(customFieldEntries);
        setCustomFieldsInitialized(true);
      }
    }
  }, [existingData, customFieldsInitialized]);

  const handleBack = () => navigate('/personal');
  
  const handleSubmit = () => {
    // Convert custom fields to proper format for storage
    const customData = customFields.reduce((acc, field) => {
      // Skip empty fields
      if (!field.value) return acc;
      
      // Create a safe key (lowercase, replace spaces with underscores)
      const key = field.label.toLowerCase().replace(/\s+/g, '_');
      
      // Convert value to number
      const numericValue = Number(field.value);
      
      // Only add valid numeric values
      if (!isNaN(numericValue)) {
        acc[key] = numericValue;
      }
      
      return acc;
    }, {} as Record<string, number>);

    // Combine standard and custom fields
    const incomeData = {
      monthlySalary: Number(formData.monthlySalary) || 0,
      additionalIncome: Number(formData.additionalIncome) || 0,
      annualBonus: Number(formData.annualBonus) || 0,
      currentSavings: Number(formData.currentSavings) || 0,
      ...customData,
    };

    console.log('Saving income data:', incomeData);
    setIncomeDetails(incomeData);
    navigate('/expenses');
  };

  const handleAddCustomField = (label: string) => {
    // Check if field with similar name already exists
    const normalizedLabel = label.toLowerCase().trim();
    const existingField = customFields.find(
      field => field.label.toLowerCase().trim() === normalizedLabel
    );
    
    if (existingField) {
      alert(`A field with name "${label}" already exists`);
      return;
    }
    
    setCustomFields([...customFields, { label, value: '' }]);
  };

  const isValid = formData.monthlySalary && formData.currentSavings;

  return (
    <FormLayout
      title="Income Details"
      subtitle="Tell us about your income sources and savings"
      onBack={handleBack}
      onNext={isValid ? handleSubmit : undefined}
    >
      <CurrencyInput
        label="Monthly Salary"
        value={formData.monthlySalary}
        onChange={(value) => setFormData({ ...formData, monthlySalary: value })}
        required
        placeholder="5000.00"
      />
      <CurrencyInput
        label="Additional Monthly Income"
        value={formData.additionalIncome}
        onChange={(value) => setFormData({ ...formData, additionalIncome: value })}
        placeholder="1000.00"
      />
      <CurrencyInput
        label="Expected Annual Bonus"
        value={formData.annualBonus}
        onChange={(value) => setFormData({ ...formData, annualBonus: value })}
        placeholder="10000.00"
      />
      <CurrencyInput
        label="Current Savings"
        value={formData.currentSavings}
        onChange={(value) => setFormData({ ...formData, currentSavings: value })}
        required
        placeholder="25000.00"
      />

      {customFields.map((field, index) => (
        <CurrencyInput
          key={index}
          label={field.label}
          value={field.value}
          onChange={(value) => {
            const updatedFields = [...customFields];
            updatedFields[index].value = value;
            setCustomFields(updatedFields);
          }}
          placeholder="0.00"
        />
      ))}

      <AddCustomField onAdd={handleAddCustomField} />
    </FormLayout>
  );
}