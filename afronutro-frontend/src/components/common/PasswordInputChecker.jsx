import { TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';


const PasswordInputChecker = ({ password, onChange }) => {
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    special: false,
    uppercase: false,
    lowercase: false
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password)
    });
  }, [password]);
  const isAllValid = Object.values(validations).every(value => value);

  const ValidationItem = ({ isValid, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (

        <svg class="w-4 h-4 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
</svg>

      ) : (

        <svg class="w-4 h-4 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

      )}
      <span className={isValid ? 'text-green-500' : 'text-gray-500'}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="relative">
        <TextInput
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => onChange(e.target.value)}
          className="w-full   rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter password"
        />
        <a
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? 'Hide' : 'Show'}
        </a>
      </div>
      
      {!isAllValid && password.length > 0 && (
        <div className="bg-gray-50 p-3 rounded-md space-y-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Password Requirements:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ValidationItem 
              isValid={validations.length} 
              text="At least 8 characters" 
            />
            <ValidationItem 
              isValid={validations.number} 
              text="Contains a number" 
            />
            <ValidationItem 
              isValid={validations.special} 
              text="Contains a special character" 
            />
            <ValidationItem 
              isValid={validations.uppercase} 
              text="Contains uppercase letter" 
            />
            <ValidationItem 
              isValid={validations.lowercase} 
              text="Contains lowercase letter" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInputChecker;