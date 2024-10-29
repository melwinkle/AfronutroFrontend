import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import CustomButton from "../common/CustomButton";
import { validateEmail } from "../../utils/helper";

const EmailVerificationModal = ({ onSubmit, onClose, isProcessing }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await onSubmit(email); // Call the onSubmit function with the email
    } catch (error) {
      setError('Failed to process registration. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        You need to register or login before proceeding to generate your meal plan. 
        Please enter your email address to get started.
      </p>
      <form onSubmit={handleSubmit} className="space-y-2"> {/* Wrap the inputs in a form */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <TextInput
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            error={error}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end space-x-2">
          <CustomButton 
            type="submit" // Set button type to submit
            variant="secondary"
          >
            {isProcessing ? 'Processing...' : 'Continue'}
          </CustomButton>
          <CustomButton 
            onClick={onClose} 
            variant="greenoutline"
          >
            Cancel
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default EmailVerificationModal;