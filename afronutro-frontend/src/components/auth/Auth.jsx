import React, { useState } from 'react';
import { Modal, Button, Spinner, Alert } from 'flowbite-react';
import logo from "../../assets/images/afronutrologov2.png"
import { useNavigate } from 'react-router-dom';
import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegistrationSuccess, resendVerificationEmail } from '../../redux/slices/authSlice';

const AuthModal = ({ isOpen, onClose, LoginComponent, RegisterComponent }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendAlert, setResendAlert] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get the pending verification email from Redux
  const pendingVerificationEmail = useSelector(state => state.auth.pendingVerificationEmail);

  const resetForm = () => {
    setIsRegistered(false);
    setIsLogin(true);
    setResendAlert({ show: false, type: '', message: '' });
  };

  const handleRegisterSuccess = () => {
    setIsRegistered(true);
    dispatch(handleRegistrationSuccess());
  };

  const handleLoginSuccess = () => {
    onClose();
  };

  const handleResendVerification = async () => {
    if (!pendingVerificationEmail) {
      setResendAlert({
        show: true,
        type: 'failure',
        message: 'Email address not found. Please try registering again.'
      });
      return;
    }

    setIsResending(true);
    try {
      await dispatch(resendVerificationEmail({ email: pendingVerificationEmail })).unwrap();
      setResendAlert({
        show: true,
        type: 'success',
        message: 'Verification email has been resent successfully!'
      });
    } catch (error) {
      setResendAlert({
        show: true,
        type: 'failure',
        message: error?.message || 'Failed to resend verification email'
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={() => { onClose(); resetForm(); }}>
      <Modal.Header className='flex items-center justify-between p-1 border-none rounded-t dark:border-gray-600'>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4 pt-0 space-y-4">
        <div className='flex flex-col space-y-1 items-center justify-center w-full'>
          <img src={logo} className='w-16 h-16' alt="AfroNutro Logo"/>
          <p className='text-2xl text-afro-gray-dark dark:text-gray-400 font-bold'>
            Welcome to AfroNutro
          </p>
          <p className='text-sm text-afro-gray-mid-light'>
            {isLogin ? 'Login and continue gaining more help in your nutrition journey' : 
             (isRegistered ? 'Registration Successful' : 
             'Register to create your account and start gaining more help in your nutrition journey')}
          </p>
        </div>

        {isRegistered ? (
          <div className="text-center space-y-4">
            <p className="text-xl mb-4">Your account has been successfully created!</p>
            <p>We've sent a verification email to {pendingVerificationEmail}.</p>
            <p className="text-sm text-gray-600">
              Please check your inbox and click on the verification link to activate your account.
            </p>

            {resendAlert.show && (
              <Alert
                color={resendAlert.type}
                onDismiss={() => setResendAlert({ ...resendAlert, show: false })}
              >
                {resendAlert.message}
              </Alert>
            )}

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Haven't received the email? Check your spam folder or click below to resend.
              </p>
              <CustomButton 
                onClick={handleResendVerification}
                disabled={isResending}
                variant="orangeoutline"
              >
                {isResending ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Resending...
                  </>
                ) : (
                  'Resend Verification Email'
                )}
              </CustomButton>
            </div>

            <CustomButton 
              onClick={resetForm}
              variant="cta"
              className="mt-4"
            >
              Proceed to Login
            </CustomButton>
          </div>
        ) : (
          isLogin ? (
            <LoginComponent onLoginSuccess={handleLoginSuccess}/>
          ) : (
            <RegisterComponent onRegisterSuccess={handleRegisterSuccess} />
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        {!isRegistered && (
          <p className="text-sm text-gray-500 text-center w-full">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <a
              href="#"
              className="text-afro-brown font-bold hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register' : 'Login'}
            </a>
          </p>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;