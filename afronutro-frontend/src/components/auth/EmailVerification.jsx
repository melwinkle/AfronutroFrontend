import React, { useState } from 'react';
import { Alert, Spinner } from 'flowbite-react';
import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { resendVerificationEmail } from '../../redux/slices/authSlice';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    show: false,
    type: '',
    message: ''
  });

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(resendVerificationEmail({ email: localStorage.getItem('email') })).unwrap();
      setAlertState({
        show: true,
        type: 'success',
        message: 'Verification email has been resent successfully!'
      });
    } catch (error) {
      setAlertState({
        show: true,
        type: 'failure',
        message: error?.message || 'Failed to resend verification email'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center justify-center pt-4">
      <h3 className="text-xl font-bold">Email Verification Required</h3>
      
      {alertState.show && (
        <Alert
          color={alertState.type}
          onDismiss={() => setAlertState({ ...alertState, show: false })}
          className="max-w-md"
        >
          <span>{alertState.message}</span>
        </Alert>
      )}

      <p className="text-center max-w-md">
        We've sent a verification email to your registered email address.
        Please check your inbox and click on the verification link to activate your account.
      </p>
      <p className="text-sm text-gray-600 text-center max-w-md">
        If you haven't received the email, please check your spam folder.
        You can also request a new verification email if needed.
      </p>
      
      <CustomButton 
        variant="cta" 
        length="secondary"
        disabled={isLoading}
        onClick={handleResendEmail}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Sending...
          </>
        ) : (
          'Resend Verification Email'
        )}
      </CustomButton>
    </div>
  );
};

export default EmailVerification;