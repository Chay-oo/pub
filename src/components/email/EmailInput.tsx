import React from 'react';
import { Mail } from 'lucide-react';

interface EmailInputProps {
  email: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onErrorChange: (error: string) => void;
  placeholder?: string;
}

export default function EmailInput({
  email,
  error,
  onChange,
  onErrorChange,
  placeholder = "Enter your email address"
}: EmailInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          onChange(e);
          onErrorChange('');
        }}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
      />
      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}