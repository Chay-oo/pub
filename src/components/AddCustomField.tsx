import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddCustomFieldProps {
  onAdd: (label: string) => void;
}

export default function AddCustomField({ onAdd }: AddCustomFieldProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [fieldLabel, setFieldLabel] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // Reset any previous errors
    setError('');
    
    // Validate the field label
    if (!fieldLabel.trim()) {
      setError('Field name cannot be empty');
      return;
    }
    
    // Check for special characters that might cause issues
    if (!/^[a-zA-Z0-9 ]+$/.test(fieldLabel.trim())) {
      setError('Field name can only contain letters, numbers, and spaces');
      return;
    }
    
    // Submit the custom field
    onAdd(fieldLabel.trim());
    
    // Reset the form
    setFieldLabel('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        type="button"
        onClick={() => setIsAdding(true)}
        className="flex items-center text-indigo-600 hover:text-indigo-700 mt-4"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Custom Field
      </button>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2">
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Enter field name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            autoFocus
          />
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}