import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinanceStore } from '../store/financeStore';
import FormLayout from '../components/FormLayout';
import InputField from '../components/InputField';
import { InsuranceDetails } from '../types/finance';

interface CustomInsurance {
  name: string;
  coverage: number;
  premiumPerMonth: number;
}

const InsuranceDetailsForm = () => {
  const { data, setInsuranceDetails } = useFinanceStore();
  const navigate = useNavigate();
  const [healthCoverage, setHealthCoverage] = useState(data.insurance?.health?.coverage || '');
  const [healthPremium, setHealthPremium] = useState(data.insurance?.health?.premiumPerMonth || '');
  const [lifeCoverage, setLifeCoverage] = useState(data.insurance?.life?.coverage || '');
  const [lifePremium, setLifePremium] = useState(data.insurance?.life?.premiumPerMonth || '');
  const [vehicleCoverage, setVehicleCoverage] = useState(data.insurance?.vehicle?.coverage || '');
  const [vehiclePremium, setVehiclePremium] = useState(data.insurance?.vehicle?.premiumPerMonth || '');
  
  const [customInsurances, setCustomInsurances] = useState<CustomInsurance[]>([]);
  const [customName, setCustomName] = useState("");
  const [customCoverage, setCustomCoverage] = useState<string>('');
  const [customPremium, setCustomPremium] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [valueError, setValueError] = useState<string | null>(null);

  const handleBack = () => navigate('/investments');

  const handleNext = () => {
    const insuranceDetails: InsuranceDetails = {
      health: {
        coverage: Number(healthCoverage) || 0,
        premiumPerMonth: Number(healthPremium) || 0
      },
      life: {
        coverage: Number(lifeCoverage) || 0,
        premiumPerMonth: Number(lifePremium) || 0
      },
      vehicle: {
        coverage: Number(vehicleCoverage) || 0,
        premiumPerMonth: Number(vehiclePremium) || 0
      }
    };

    setInsuranceDetails(insuranceDetails);
    navigate('/summary');
  };

  const handleAddCustomInsurance = () => {
    // Reset previous errors
    setNameError(null);
    setValueError(null);
    
    // Validate name
    if (!customName.trim()) {
      setNameError("Please enter an insurance name");
      return;
    }
    
    // Check if name already exists
    const standardTypes = ['health', 'life', 'vehicle'];
    if (standardTypes.includes(customName.toLowerCase())) {
      setNameError(`"${customName}" is a standard insurance type. Please use the form fields above.`);
      return;
    }
    
    if (customInsurances.some(i => i.name.toLowerCase() === customName.toLowerCase())) {
      setNameError(`Insurance named "${customName}" already exists`);
      return;
    }
    
    // Validate at least one value is provided
    if (!customCoverage && !customPremium) {
      setValueError("Please enter at least coverage amount or monthly premium");
      return;
    }
    
    const newInsurance: CustomInsurance = {
      name: customName,
      coverage: Number(customCoverage) || 0,
      premiumPerMonth: Number(customPremium) || 0
    };
    
    setCustomInsurances([...customInsurances, newInsurance]);
    setCustomName("");
    setCustomCoverage('');
    setCustomPremium('');
  };

  const removeCustomInsurance = (index: number) => {
    const updatedInsurances = [...customInsurances];
    updatedInsurances.splice(index, 1);
    setCustomInsurances(updatedInsurances);
  };

  return (
    <FormLayout
      title="Insurance Details"
      subtitle="Tell us about your insurance coverage"
      onBack={handleBack}
      onNext={handleNext}
    >
      <div className="space-y-6">
        {/* Health Insurance */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Health Insurance</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Coverage Amount"
              type="number"
              value={healthCoverage}
              onChange={(value) => setHealthCoverage(value)}
              min={0}
              step="1000"
            />
            <InputField
              label="Monthly Premium"
              type="number"
              value={healthPremium}
              onChange={(value) => setHealthPremium(value)}
              min={0}
              step="10"
            />
          </div>
        </div>

        {/* Life Insurance */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Life Insurance</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Coverage Amount"
              type="number"
              value={lifeCoverage}
              onChange={(value) => setLifeCoverage(value)}
              min={0}
              step="1000"
            />
            <InputField
              label="Monthly Premium"
              type="number"
              value={lifePremium}
              onChange={(value) => setLifePremium(value)}
              min={0}
              step="10"
            />
          </div>
        </div>
        
        {/* Vehicle Insurance */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Vehicle Insurance</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Coverage Amount"
              type="number"
              value={vehicleCoverage}
              onChange={(value) => setVehicleCoverage(value)}
              min={0}
              step="1000"
            />
            <InputField
              label="Monthly Premium"
              type="number"
              value={vehiclePremium}
              onChange={(value) => setVehiclePremium(value)}
              min={0}
              step="10"
            />
          </div>
        </div>
        
        <hr className="my-6 border-gray-200" />
        
        {/* Custom Insurances */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Additional Insurance Types</h3>
          
          {customInsurances.map((insurance, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{insurance.name}</h4>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Coverage: ${insurance.coverage.toLocaleString()}</p>
                    <p>Monthly Premium: ${insurance.premiumPerMonth.toLocaleString()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeCustomInsurance(index)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
            <h4 className="font-medium mb-3">Add Custom Insurance</h4>
            
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Insurance Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className={`w-full p-2 border rounded-md ${nameError ? 'border-red-500' : 'border-gray-300'}`}
                />
                {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Coverage Amount"
                    value={customCoverage}
                    onChange={(e) => setCustomCoverage(e.target.value)}
                    className={`w-full p-2 border rounded-md ${valueError ? 'border-red-500' : 'border-gray-300'}`}
                    min="0"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Monthly Premium"
                    value={customPremium}
                    onChange={(e) => setCustomPremium(e.target.value)}
                    className={`w-full p-2 border rounded-md ${valueError ? 'border-red-500' : 'border-gray-300'}`}
                    min="0"
                  />
                </div>
              </div>
              {valueError && <p className="text-red-500 text-sm">{valueError}</p>}
              
              <button
                type="button"
                onClick={handleAddCustomInsurance}
                className="w-full p-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-100"
              >
                Add Insurance
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default InsuranceDetailsForm;