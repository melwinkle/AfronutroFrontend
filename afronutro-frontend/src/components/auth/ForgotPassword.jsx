import React, { useState, useEffect } from 'react';
import { Button, TextInput, Label, Spinner, Alert } from 'flowbite-react';
import CustomButton from '../common/CustomButton';
import { useParams } from 'react-router-dom';
import { passwordConfirmation, resetConfirmation } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    show: false,
    type: '',
    message: ''
  });

  const { resetStatus, resetError } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyLink = async () => {
      if (uid && token) {
        try {
          await dispatch(resetConfirmation({ uid, token })).unwrap();
          setAlertState({
            show: true,
            type: 'success',
            message: 'Link verified successfully. Please set your new password.'
          });
        } catch (error) {
          setAlertState({
            show: true,
            type: 'failure',
            message: error?.message || 'Invalid or expired reset link'
          });
        }
      }
    };
    verifyLink();
  }, [dispatch, uid, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setAlertState({
        show: true,
        type: 'failure',
        message: 'Passwords do not match'
      });
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(passwordConfirmation({ 
        uid, 
        token, 
        newpassword: newPassword 
      })).unwrap();
      
      setAlertState({
        show: true,
        type: 'success',
        message: 'Password reset successful. You can now login with your new password.'
      });
      
      // Clear form
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setAlertState({
        show: true,
        type: 'failure',
        message: error?.message || 'Failed to reset password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resetError case
  if (resetError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Alert color="failure">
          {typeof resetError === 'object' ? resetError.error || 'An error occurred' : resetError}
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Change your Password</h2>
        
        {alertState.show && (
          <Alert
            color={alertState.type}
            onDismiss={() => setAlertState({ ...alertState, show: false })}
            className="mb-4"
          >
            <span>{alertState.message}</span>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="newPassword">
              New Password
            </Label>
            <TextInput
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <TextInput
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Changing Password...
              </>
            ) : (
              'Change Password'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;