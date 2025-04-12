import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import InputField from '../components/InputField';
import { useFinanceStore } from '../store/financeStore';
import { useUserStore } from '../store/userStore';
import { createGuestSession, createTrackingId } from '../services/databaseService';

export default function PersonalDetailsForm() {
  const navigate = useNavigate();
  const setPersonalDetails = useFinanceStore((state) => state.setPersonalDetails);
  const existingData = useFinanceStore((state) => state.data.personal);
  const { currentUser, setCurrentUser } = useUserStore();

  // Ensure we have a unique user ID, creating one if needed
  useEffect(() => {
    if (!currentUser) {
      // If somehow we don't have a current user at this point, create a new one
      console.log('No user ID found in PersonalDetailsForm, creating new unique ID');
      
      // Use standard UUID format for database compatibility
      const uniqueId = createGuestSession();
      const trackingId = createTrackingId(); // For analytics tracking
      
      console.log('Created new user ID:', uniqueId);
      console.log('Created tracking ID:', trackingId);
      
      setCurrentUser({
        id: uniqueId,
        email: `guest_${uniqueId.substring(0, 8)}@example.com`,
        fullName: 'New User',
        trackingId: trackingId
      });
    } else {
      console.log('Using existing user ID in PersonalDetailsForm:', currentUser.id);
    }
  }, [currentUser, setCurrentUser]);

  const [formData, setFormData] = useState({
    fullName: existingData?.fullName || '',
    email: existingData?.email || '',
    age: existingData?.age || '',
    occupation: existingData?.occupation || '',
    dependents: existingData?.dependents || '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const validateEmail = (email: string) => {
    // If no email is provided, it's valid (non-mandatory)
    if (!email) {
      return '';
    }
    
    // If email is provided, validate the format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handleSubmit = () => {
    // Only validate email format if it's provided
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    }

    // Update the personal details in the finance store
    setPersonalDetails({
      fullName: formData.fullName,
      email: formData.email,
      age: Number(formData.age),
      occupation: formData.occupation,
      dependents: Number(formData.dependents),
    });

    // Update the user store with the email and name while keeping the same ID
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        email: formData.email || currentUser.email,
        fullName: formData.fullName
      });
    }

    navigate('/income');
  };

  // Updated validation to not require email
  const isValid = formData.fullName && 
    formData.age && 
    formData.occupation && 
    formData.dependents !== '' && 
    !errors.email;

  return (
    <FormLayout
      title="Personal Details"
      subtitle="Let's start with some basic information about you"
      onNext={isValid ? handleSubmit : undefined}
    >
      <InputField
        label="Full Name"
        value={formData.fullName}
        onChange={(value) => setFormData({ ...formData, fullName: value })}
        required
        placeholder="John Doe"
      />
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleEmailChange}
        required={false}
        placeholder="john@example.com (optional)"
        error={errors.email}
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
      />
      <InputField
        label="Age"
        type="number"
        value={formData.age}
        onChange={(value) => setFormData({ ...formData, age: value })}
        required
        min={18}
      />
      <InputField
        label="Occupation"
        value={formData.occupation}
        onChange={(value) => setFormData({ ...formData, occupation: value })}
        required
        placeholder="Software Engineer"
      />
      <InputField
        label="Number of Dependents"
        type="number"
        value={formData.dependents}
        onChange={(value) => setFormData({ ...formData, dependents: value })}
        required
        min={0}
        placeholder="0"
      />
    </FormLayout>
  );
}