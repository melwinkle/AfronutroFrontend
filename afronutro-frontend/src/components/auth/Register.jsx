import React, { useState, useEffect } from 'react';
import { Button, TextInput, Label, Spinner, Select,Datepicker } from 'flowbite-react';
import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../redux/slices/authSlice.js';
import { validateEmail, validatePassword, validateUsername } from '../../utils/helper.js';
import { calculateBMI, calculateTDEE } from '../../utils/helper.js';
import { format } from 'date-fns';
import PasswordInputChecker from '../common/PasswordInputChecker.jsx';


const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date()); // Changed from age to dateOfBirth
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


  const dob=format(new Date(dateOfBirth), 'yyyy-MM-dd')


  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const customTheme = {
    root: {
      base: "relative",
    },
    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-2",
        inline: "relative top-0 z-auto",
        inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
      },
      header: {
        base: "",
        title: "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
            prev: "",
            next: "",
            view: "",
          },
        },
      },
      view: {
        base: "p-1",
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
          today: "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
          clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
        },
      },
    },
    views: {
      days: {
        header: {
          base: "mb-1 grid grid-cols-7",
          title: "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
        },
        items: {
          base: "grid w-64 grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 bg-white hover:none outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600", // Updated normal state
            selected: "bg-afro-green text-white text-center text-right leading-9 outline-none shadow-none", // Selected state
            disabled: "text-gray-500", // Disabled state
          },
        },
      },
      months: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 bg-white hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600", // Normal state
            selected: "bg-afro-green text-white hover:bg-blue-600", // Selected state
            disabled: "text-gray-500", // Disabled state
          },
        },
      },
      years: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 bg-white hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600", // Normal state
            selected: "bg-afro-green text-white hover:bg-blue-600", // Selected state
            disabled: "text-gray-500", // Disabled state
          },
        },
      },
      decades: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 bg-white hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600", // Normal state
            selected: "bg-afro-green text-white hover:bg-blue-600", // Selected state
            disabled: "text-gray-500", // Disabled state
          },
        },
      },
    },
  };
  
  
  
  

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

  const isPasswordValid = () => {
    return password.length >= 8 && 
           /\d/.test(password) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password);
  };

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
    if (!isPasswordValid()) {
      setValidationError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number');
      return;
    }
    if (password !== password2) {
      setValidationError('Passwords do not match');
      return;
    }

    const registrationData = {
      email: email,
      username: username,
      date_of_birth: dob, // Updated to use date_of_birth
      gender: gender,
      weight: weight,
      height: height,
      activity_levels: activity_level,
      password: password,
      password2: password2,
      bmi: calculateBMI(height, weight),
      tdee: calculateTDEE(weight, height, dateOfBirth, gender, activity_level), // Updated to pass dateOfBirth
    };

    dispatch(registerUser(registrationData));
  };

  const handleDateOfBirthChange = (selectedDate) => {
    setDateOfBirth(selectedDate);
    
    // Age validation
    if (selectedDate) {
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear(); // Change const to let
      const monthDiff = today.getMonth() - selectedDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }

      if (age < 12) {
        setValidationError('You must be at least 12 years old to register');
      } else {
        setValidationError(''); // Clear the error if the age is valid
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      {validationError && <div className="text-red-500">{validationError}</div>}
      {error && <div className="text-red-500">Error with the registration. please try again!</div>}
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

      {/* Date of Birth and Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Datepicker id="dob"
          autoHide={false}
          selected={dateOfBirth}
          theme={customTheme}
          onChange={handleDateOfBirthChange}
          className="bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500" // Customize with Tailwind CSS classes
          placeholderText="Select a date"/>
          
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

      {/* Activity Level */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="activity_level">Activity Level </Label>
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
        <PasswordInputChecker
        password={password}
        onChange={setPassword}
      />
       
      </div>

      {/* Re-enter Password */}
      <div>
        <Label htmlFor="password2">Re-enter Password</Label>
        <PasswordInputChecker
        password={password2}
        onChange={setPassword2}
      />
        
      </div>

      <CustomButton onClick={handleSubmit}  variant='cta'>
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
