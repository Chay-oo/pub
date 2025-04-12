import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import InputField from '../components/InputField';
import AddCustomField from '../components/AddCustomField';
import { useFinanceStore } from '../store/financeStore';

interface CustomLoan {
  name: string;
  totalAmount: string;
  pendingYears: string;
  emiPerMonth: string;
}

interface LoanErrors {
  [key: string]: {
    totalAmount?: string;
    pendingYears?: string;
    emiPerMonth?: string;
  };
}

export default function LoanDetailsForm() {
  const navigate = useNavigate();
  const setLoanDetails = useFinanceStore((state) => state.setLoanDetails);
  const existingData = useFinanceStore((state) => state.data.loans);
  const [customFieldsInitialized, setCustomFieldsInitialized] = useState(false);

  const [formData, setFormData] = useState({
    personal: {
      totalAmount: existingData?.personal?.totalAmount || '',
      pendingYears: existingData?.personal?.pendingYears || '',
      emiPerMonth: existingData?.personal?.emiPerMonth || '',
    },
    home: {
      totalAmount: existingData?.home?.totalAmount || '',
      pendingYears: existingData?.home?.pendingYears || '',
      emiPerMonth: existingData?.home?.emiPerMonth || '',
    },
    vehicle: {
      totalAmount: existingData?.vehicle?.totalAmount || '',
      pendingYears: existingData?.vehicle?.pendingYears || '',
      emiPerMonth: existingData?.vehicle?.emiPerMonth || '',
    },
  });

  const [customLoans, setCustomLoans] = useState<CustomLoan[]>([]);
  const [errors, setErrors] = useState<LoanErrors>({});

  // Initialize custom fields from existing data
  useEffect(() => {
    if (existingData && !customFieldsInitialized) {
      const standardLoans = ['personal', 'home', 'vehicle'];
      
      // Find custom loans in existing data
      const customLoanEntries = Object.entries(existingData)
        .filter(([key]) => !standardLoans.includes(key))
        .map(([key, value]) => ({
          name: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), // Convert snake_case to Title Case
          totalAmount: value?.totalAmount?.toString() || '',
          pendingYears: value?.pendingYears?.toString() || '',
          emiPerMonth: value?.emiPerMonth?.toString() || '',
        }));
      
      if (customLoanEntries.length > 0) {
        setCustomLoans(customLoanEntries);
        setCustomFieldsInitialized(true);
      }
    }
  }, [existingData, customFieldsInitialized]);

  const handleBack = () => navigate('/expenses');

  const validateLoanData = (
    loanType: string,
    { totalAmount, pendingYears, emiPerMonth }: { totalAmount: string | number; pendingYears: string | number; emiPerMonth: string | number }
  ) => {
    const newErrors: LoanErrors = { ...errors };
    const hasAnyValue = totalAmount || pendingYears || emiPerMonth;

    if (hasAnyValue) {
      if (!totalAmount) {
        newErrors[loanType] = { ...newErrors[loanType], totalAmount: 'Required if any loan detail is provided' };
      }
      if (!pendingYears) {
        newErrors[loanType] = { ...newErrors[loanType], pendingYears: 'Required if any loan detail is provided' };
      }
      if (!emiPerMonth) {
        newErrors[loanType] = { ...newErrors[loanType], emiPerMonth: 'Required if any loan detail is provided' };
      }
    }

    return newErrors;
  };

  const isFormValid = () => {
    let newErrors: LoanErrors = {};

    // Validate main loan types
    Object.entries(formData).forEach(([loanType, data]) => {
      newErrors = {
        ...newErrors,
        ...validateLoanData(loanType, data),
      };
    });

    // Validate custom loans
    customLoans.forEach((loan, index) => {
      newErrors = {
        ...newErrors,
        ...validateLoanData(`custom_${index}`, loan),
      };
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    // Process custom loans with proper error handling and data transformation
    const customLoansData = customLoans.reduce((acc, loan) => {
      // Skip entries with empty values
      if (!loan.totalAmount && !loan.pendingYears && !loan.emiPerMonth) {
        return acc;
      }
      
      // Create safe key name
      const key = loan.name.toLowerCase().replace(/\s+/g, '_');
      
      acc[key] = {
        totalAmount: Number(loan.totalAmount) || 0,
        pendingYears: Number(loan.pendingYears) || 0,
        emiPerMonth: Number(loan.emiPerMonth) || 0,
      };
      
      return acc;
    }, {} as Record<string, any>);

    const loanData = {
      personal: {
        totalAmount: Number(formData.personal.totalAmount) || 0,
        pendingYears: Number(formData.personal.pendingYears) || 0,
        emiPerMonth: Number(formData.personal.emiPerMonth) || 0,
      },
      home: {
        totalAmount: Number(formData.home.totalAmount) || 0,
        pendingYears: Number(formData.home.pendingYears) || 0,
        emiPerMonth: Number(formData.home.emiPerMonth) || 0,
      },
      vehicle: {
        totalAmount: Number(formData.vehicle.totalAmount) || 0,
        pendingYears: Number(formData.vehicle.pendingYears) || 0,
        emiPerMonth: Number(formData.vehicle.emiPerMonth) || 0,
      },
      ...customLoansData,
    };
    
    console.log('Saving loan data:', loanData);
    setLoanDetails(loanData);
    navigate('/investments');
  };

  const handleAddCustomLoan = (label: string) => {
    // Check if loan with similar name already exists
    const normalizedLabel = label.toLowerCase().trim();
    
    // Check standard loans
    if (['personal', 'home', 'vehicle'].includes(normalizedLabel)) {
      alert(`"${label}" is a default loan type. Please use a different name.`);
      return;
    }
    
    // Check custom loans
    const existingLoan = customLoans.find(
      loan => loan.name.toLowerCase().trim() === normalizedLabel
    );
    
    if (existingLoan) {
      alert(`A loan with name "${label}" already exists`);
      return;
    }
    
    setCustomLoans([
      ...customLoans,
      { name: label, totalAmount: '', pendingYears: '', emiPerMonth: '' },
    ]);
  };

  return (
    <FormLayout
      title="Loan Details"
      subtitle="Tell us about your loans (optional, but if providing loan details, all fields for that loan are required)"
      onBack={handleBack}
      onNext={handleSubmit}
    >
      <div className="space-y-6">
        {/* Personal Loan */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Personal Loan</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Total Amount"
              type="number"
              value={formData.personal.totalAmount}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, totalAmount: value },
                })
              }
              min={0}
              step="100"
              error={errors.personal?.totalAmount}
            />
            <InputField
              label="Pending Years"
              type="number"
              value={formData.personal.pendingYears}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, pendingYears: value },
                })
              }
              min={0}
              step="1"
              error={errors.personal?.pendingYears}
            />
            <InputField
              label="EMI per Month"
              type="number"
              value={formData.personal.emiPerMonth}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, emiPerMonth: value },
                })
              }
              min={0}
              step="10"
              error={errors.personal?.emiPerMonth}
            />
          </div>
        </div>

        {/* Home Loan */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Home Loan</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Total Amount"
              type="number"
              value={formData.home.totalAmount}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  home: { ...formData.home, totalAmount: value },
                })
              }
              min={0}
              step="1000"
              error={errors.home?.totalAmount}
            />
            <InputField
              label="Pending Years"
              type="number"
              value={formData.home.pendingYears}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  home: { ...formData.home, pendingYears: value },
                })
              }
              min={0}
              step="1"
              error={errors.home?.pendingYears}
            />
            <InputField
              label="EMI per Month"
              type="number"
              value={formData.home.emiPerMonth}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  home: { ...formData.home, emiPerMonth: value },
                })
              }
              min={0}
              step="100"
              error={errors.home?.emiPerMonth}
            />
          </div>
        </div>

        {/* Vehicle Loan */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Vehicle Loan</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Total Amount"
              type="number"
              value={formData.vehicle.totalAmount}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  vehicle: { ...formData.vehicle, totalAmount: value },
                })
              }
              min={0}
              step="100"
              error={errors.vehicle?.totalAmount}
            />
            <InputField
              label="Pending Years"
              type="number"
              value={formData.vehicle.pendingYears}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  vehicle: { ...formData.vehicle, pendingYears: value },
                })
              }
              min={0}
              step="1"
              error={errors.vehicle?.pendingYears}
            />
            <InputField
              label="EMI per Month"
              type="number"
              value={formData.vehicle.emiPerMonth}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  vehicle: { ...formData.vehicle, emiPerMonth: value },
                })
              }
              min={0}
              step="10"
              error={errors.vehicle?.emiPerMonth}
            />
          </div>
        </div>

        {/* Custom Loans */}
        {customLoans.map((loan, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">{loan.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Total Amount"
                type="number"
                value={loan.totalAmount}
                onChange={(value) => {
                  const updated = [...customLoans];
                  updated[index].totalAmount = value;
                  setCustomLoans(updated);
                }}
                min={0}
                step="100"
                error={errors[`custom_${index}`]?.totalAmount}
              />
              <InputField
                label="Pending Years"
                type="number"
                value={loan.pendingYears}
                onChange={(value) => {
                  const updated = [...customLoans];
                  updated[index].pendingYears = value;
                  setCustomLoans(updated);
                }}
                min={0}
                step="1"
                error={errors[`custom_${index}`]?.pendingYears}
              />
              <InputField
                label="EMI per Month"
                type="number"
                value={loan.emiPerMonth}
                onChange={(value) => {
                  const updated = [...customLoans];
                  updated[index].emiPerMonth = value;
                  setCustomLoans(updated);
                }}
                min={0}
                step="10"
                error={errors[`custom_${index}`]?.emiPerMonth}
              />
            </div>
          </div>
        ))}

        <AddCustomField onAdd={handleAddCustomLoan} />
      </div>
    </FormLayout>
  );
}