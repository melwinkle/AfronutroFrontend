import React, { useState,useEffect } from 'react';
import { Button, TextInput, Label, Spinner, Select } from 'flowbite-react';
import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../redux/slices/authSlice.js';
import { validateEmail, validatePassword, validateUsername } from '../../utils/helper.js';
import { calculateBMI,calculateTDEE } from '../../utils/helper.js';

const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity_level, setLevel] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      onRegisterSuccess();
    }
  }, [isAuthenticated, onRegisterSuccess]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');


    // Validate inputs
    if (!validateEmail(email)) {
      setValidationError('Invalid email format');
      return;
    }
    if (!validateUsername(username)) {
      setValidationError('Username must be 3-20 characters long and contain only letters and numbers');
      return;
    }
    if (!validatePassword(password)) {
      setValidationError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number');
      return;
    }
    if (password !== password2) {
      setValidationError('Passwords do not match');
      return;
    }

    const registrationData = {
      email:email,
      username:username,
      age:age,
      gender:gender,
      weight:weight,
      height:height,
      activity_levels:activity_level,
      password:password,
      password2:password2,
      tdee:calculateBMI(height,weight),
      bmi:calculateTDEE(weight, height, age, gender,activity_level),
    };

    dispatch(registerUser(registrationData));
  };

  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      {validationError && <div className="text-red-500">{validationError}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
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

         <div>
          <Label htmlFor="username">Username</Label>
          <TextInput
            id="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      {/* Username and Age */}
      <div className="grid grid-cols-2 gap-4">
        
        <div>
          <Label htmlFor="age">Age</Label>
          <TextInput
            id="age"
            type="number"
            placeholder="Age"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
        <Label htmlFor="gender">Gender</Label>
        <Select
          id="gender"
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </div>
      </div>

  
     

      {/* Weight and Height */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <TextInput
            id="weight"
            type="number"
            placeholder="Weight in kg"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <TextInput
            id="height"
            type="number"
            placeholder="Height in cm"
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>
      {/* Weight and Height */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="weight">Activity Level </Label>
          <Select
          id="activity_level"
          required
          value={activity_level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">Select Activity Level</option>
          <option value={1.2}>Sedentary</option>
          <option value={1.375}>Lightly Active</option>
          <option value={1.55}>Moderately Active</option>
          <option value={1.725}>Very Active</option>
          <option value={1.9}>Extra Active</option>
  

         
        </Select>

        </div>
       
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <TextInput
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? "Hide" : "Show"}
          </a>
        </div>
      </div>

      {/* Re-enter Password */}
      <div>
        <Label htmlFor="password2">Re-enter Password</Label>
        <div className="relative">
          <TextInput
            id="password2"
            type={showPassword2 ? "text" : "password"}
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <a
            type="button"
            onClick={() => setShowPassword2(!showPassword2)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword2 ? "Hide" : "Show"}
          </a>
        </div>
      </div>

      

      <CustomButton onClick={handleSubmit} agreed={!loading} variant='cta'>
        {loading ? (
          <>
            <Spinner size="sm" className="mr-3" />
            Registering...
          </>
        ) : 'Register'}
      </CustomButton>
    </form>
  );
};

export default Register;
