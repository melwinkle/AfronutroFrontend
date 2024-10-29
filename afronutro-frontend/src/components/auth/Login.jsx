import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import CustomButton from '../common/CustomButton';
import { loginUser, clearError,getProfile } from '../../redux/slices/authSlice.js';
import { validateEmail } from '../../utils/helper.js';

const Login = ({onLoginSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [validationError, setValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
        dispatch(getProfile({ token: localStorage.getItem("token") }));
        onLoginSuccess();
    }
  }, [isAuthenticated, dispatch,onLoginSuccess]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit =  () => {
    // e.preventDefault();
    setValidationError('');

    if (!validateEmail(email)) {
      setValidationError('Invalid email format');
      return;
    }
    setCredentials({ email:email, password:password });
    let credential={
        email:email,
        password:password
    }


    dispatch(loginUser(credential));
  };


  return (
    <form  className="space-y-6">
        {validationError && <div className="text-red-500">{validationError}</div>}
        {error && <div className="text-red-500">{error}</div>}
      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput
          id="email"
          type="email"
          placeholder="name@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <Label htmlFor="password">Password</Label>
        <TextInput
          id="password"
          type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-8 text-sm text-gray-500 underline bg-transparent"
        >
          {showPassword ? "Hide" : "Show"}
        </a>
      </div>
      <div className='flex justify-end'>
        <a href="#" className="underline text-afro-gray-mid">Forgot Password?</a>

      </div>
    
      <CustomButton onClick={handleSubmit} agreed={!loading} variant='cta'>
        {loading ? (
          <>
            <Spinner size="sm" className="mr-3" />
            Logging in...
          </>
        ) : 'Login'}
      </CustomButton>
        


    </form>
  );
};

export default Login;