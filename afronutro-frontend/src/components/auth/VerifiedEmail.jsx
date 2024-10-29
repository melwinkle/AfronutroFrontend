import React, { useEffect, useState } from 'react';
import { Alert } from 'flowbite-react';
import CustomButton from '../common/CustomButton';
import confetti from "../../assets/images/Confetti.svg"
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../redux/slices/authSlice';
import { useParams, Link } from 'react-router-dom';

const VerifiedEmail = () => {
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { verificationStatus, verificationError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (uid && token) {
      dispatch(verifyEmail({ uid, token }));
    }
  }, [dispatch, uid, token]);

  if (verificationError) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center pt-4">
        <Alert color="failure" className="max-w-md">
          {typeof verificationError === 'object' ? verificationError.message || 'Verification failed' : verificationError}
        </Alert>
        <Link to="/">
          <CustomButton variant="cta" length="secondary">
            Back to Home
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col items-center justify-center pt-4">
      <img src={confetti} alt="Confetti celebration" />
      <h3 className="text-xl font-bold">Email Verified</h3>
      <p className="text-sm text-gray-600">
        You can now log in by clicking on get started
      </p>
    
       
    </div>
  );
};

export default VerifiedEmail;