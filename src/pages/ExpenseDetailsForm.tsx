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

export default function ExpenseDetailsForm() {
  const navigate = useNavigate();
  const setExpenseDetails = useFinanceStore((state) => state.setExpenseDetails);
  const existingData = useFinanceStore((state) => state.data.expenses);
  const [customFieldsInitialized, setCustomFieldsInitialized] = useState(false);

  const [formData, setFormData] = useState({
    housing: existingData?.housing || '',
    utilities: existingData?.utilities || '',
    groceries: existingData?.groceries || '',
    transportation: existingData?.transportation || '',
    entertainment: existingData?.entertainment || '',
    miscellaneous: existingData?.miscellaneous || '',
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  // Initialize custom fields from existing data
  useEffect(() => {
    if (existingData && !customFieldsInitialized) {
      const standardFields = ['housing', 'utilities', 'groceries', 'transportation', 'entertainment', 'miscellaneous'];
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
 
  const handleBack = () => navigate('/income');
  
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
    const expensesData = {
      housing: Number(formData.housing) || 0,
      utilities: Number(formData.utilities) || 0,
      groceries: Number(formData.groceries) || 0,
      transportation: Number(formData.transportation) || 0,
      entertainment: Number(formData.entertainment) || 0,
      miscellaneous: Number(formData.miscellaneous) || 0,
      ...customData,
    };

    console.log('Saving expense data:', expensesData);
    setExpenseDetails(expensesData);
    navigate('/loans');
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

  const isValid = formData.housing && formData.utilities && formData.groceries;

  return (
    <FormLayout
      title="Monthly Expenses"
      subtitle="Let's break down your monthly expenses"
      onBack={handleBack}
      onNext={isValid ? handleSubmit : undefined}
    >
      <CurrencyInput
        label="Housing (Rent/Mortgage)"
        value={formData.housing}
        onChange={(value) => setFormData({ ...formData, housing: value })}
        required
        placeholder="1500.00"
      />
      <CurrencyInput
        label="Utilities"
        value={formData.utilities}
        onChange={(value) => setFormData({ ...formData, utilities: value })}
        required
        placeholder="200.00"
      />
      <CurrencyInput
        label="Groceries"
        value={formData.groceries}
        onChange={(value) => setFormData({ ...formData, groceries: value })}
        required
        placeholder="400.00"
      />
      <CurrencyInput
        label="Transportation"
        value={formData.transportation}
        onChange={(value) => setFormData({ ...formData, transportation: value })}
        placeholder="300.00"
      />
      <CurrencyInput
        label="Entertainment"
        value={formData.entertainment}
        onChange={(value) => setFormData({ ...formData, entertainment: value })}
        placeholder="200.00"
      />
      <CurrencyInput
        label="Miscellaneous"
        value={formData.miscellaneous}
        onChange={(value) => setFormData({ ...formData, miscellaneous: value })}
        placeholder="150.00"
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