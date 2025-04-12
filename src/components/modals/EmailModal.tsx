import React, { useState } from 'react';
import { X, Mail, Download, Loader } from 'lucide-react';
import { useEmailSubscription } from '../../hooks/useEmailSubscription';
import EmailInput from '../email/EmailInput';

interface EmailModalProps {
  onClose: () => void;
  onDirectDownload: () => void;
  onEmailSubmit: (e: React.FormEvent, country: string) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

export default function EmailModal({
  onClose,
  onDirectDownload,
  onEmailSubmit,
  onEmailChange,
  isLoading = false,
}: EmailModalProps) {
  const {
    email,
    setEmail,
    error,
    setError,
    handleAdvisorySubscription,
  } = useEmailSubscription();

  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) {
      setError('Please select a country');
      return;
    }
    onEmailSubmit(e, country);
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'IN', name: 'India' },
    { code: 'UAE', name: 'United Arab Emirates' },
    { code: 'CHN', name: 'China' },
    { code: 'RUS', name: 'Russia' },
    // Add more countries as needed
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Choose Your Option</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-lg">Enhanced Experience</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get your financial summary via email and unlock access to our expert chat service - completely free!
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <EmailInput
                email={email}
                error={error}
                onChange={(e) => {
                  setEmail(e.target.value);
                  onEmailChange(e);
                }}
                onErrorChange={setError}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue with Email'
                )}
              </button>
            </form>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Download className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="font-semibold text-lg">Quick Download</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Download your financial summary directly as a PDF file.
            </p>
            <button
              onClick={onDirectDownload}
              className="w-full border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Download PDF Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}