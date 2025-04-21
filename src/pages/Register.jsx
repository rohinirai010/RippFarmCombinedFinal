import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError, clearSuccessMessage } from '../ReduxStateManagement/slices/authSlice';
import { AuthLayout, FormInput, PasswordInput, FormButton, InternationalPhoneInput } from '../components/Authentication/AuthCommonComponents';
import "../../src/commonStyle.css";
import { Shield, X } from 'lucide-react';

// SponsorInput component with auto-verification
const SponsorInput = ({ value, onChange, error, isSponsorVerified, isVerifying, sponsorName }) => {
  return (
    <div className="relative pb-2">
      <div className="flex items-center">
        <input
          type="text"
          name="sponsorId"
          value={value}
          onChange={onChange}
          placeholder="Referral/Sponsor ID"
          className={`input-field w-full text-sm tracking-wide bg-[#0a1631] bg-opacity-90 border ${
            error ? 'border-red-500' : (isSponsorVerified ? 'border-green-500' : 'border-gray-700')
          } rounded-full px-6 py-3 text-white pr-12`}
        />
        
        {/* Status indicator */}
        <div className="absolute right-4">
          {isVerifying && (
            <div className='flex items-center gap-1'>
            <svg className="animate-spin h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className='text-sm text-yellow-500'>Verifying</h2>
</div>
          )}
          {!isVerifying && isSponsorVerified && (
            <div className='flex items-center gap-1'>

              <Shield className='w-4 h-4 text-green-500' />
              <h2 className='text-sm text-green-500'>Verified</h2>
            </div>
          )}
          {!isVerifying && !isSponsorVerified && value && (
            <div className='flex items-center gap-1'>
            <X className='w-4 h-4 text-red-500'/>
          
             <h2 className='text-sm text-red-500'>Invalid</h2>
            </div>
          )}
        </div>
      </div>
      
      {/* Sponsor name display */}
      {isSponsorVerified && sponsorName && (
        <p className="text-xs tracking-wider text-green-400 mt-1 ml-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Sponsor: {sponsorName}
        </p>
      )}
      
      {/* Error message */}
      {error && (
        <p className="text-xs tracking-wider text-red-400 mt-1 ml-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default function CryptoRegisterPage() {
  //dummy data
  const sponsorData = {
    'SPON1234': 'Ajay Kumar',
    'REF5678': 'Ritesh Agarwal',
    'CRYPT9012': 'Danny Wilson',
    'TRADE4321': 'David Wilson'
  };
  
  const validSponsorIds = Object.keys(sponsorData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, successMessage } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    // Visible fields
    username: '',
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    sponsorId: '',
    agreeToTerms: false, 
    
    // Hidden fields
    panCardNo: '',
    firstName: '',
    lastName: '',
    gender: '',
    birthdate: '',
    blindPin: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSponsorVerified, setIsSponsorVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  
  // states for username validation
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null); // null, 'checking', 'available', 'taken', 'invalid'
  
  // Clear Redux errors and success messages when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccessMessage());
    };
  }, [dispatch]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && successMessage) {
      navigate('/user/welcome');
    }
  }, [isAuthenticated, successMessage, navigate]);

  // Set API errors in local state
  useEffect(() => {
    if (error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        apiError: error
      }));
    }
  }, [error]);
  
  // Auto-verify sponsor ID when it changes
  useEffect(() => {
    // Clear verified status if sponsor ID is empty
    if (!formData.sponsorId.trim()) {
      setIsSponsorVerified(false);
      setSponsorName('');
      
      // Clear sponsor error if it was set
      if (errors.sponsorId) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.sponsorId;
          return newErrors;
        });
      }
      return;
    }
    
    // Only verify if length is at least 4 chars
    if (formData.sponsorId.length < 4) {
      return;
    }
    
    // Start verification process
    setIsVerifying(true);
    
    // Create a debounce function for checking sponsor ID
    const debounceTimer = setTimeout(() => {
      verifySponsorId(formData.sponsorId);
    }, 500); 
    
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [formData.sponsorId]);

  // Username validation effect
  useEffect(() => {
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    
    // Clear the status when username is empty
    if (!formData.username.trim()) {
      setUsernameStatus(null);
      return;
    }
    
    // Check if username contains only alphanumeric characters
    if (!alphanumericRegex.test(formData.username)) {
      setUsernameStatus('invalid');
      return;
    }
    
    // Minimum length check
    if (formData.username.length < 3) {
      setUsernameStatus(null);
      return;
    }
    
    // Create a debounce function for checking username availability
    const debounceTimer = setTimeout(() => {
      checkUsernameAvailability(formData.username);
    }, 500); // Waiting 500ms after typing stops
    
    // Clean up the timer if the component unmounts or username changes again
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [formData.username]);

  const checkUsernameAvailability = (username) => {
    setIsCheckingUsername(true);
    setUsernameStatus('checking');
    
    //  to check if username exists
    setTimeout(() => {
      //  users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const usernameExists = users.some(user => user.username.toLowerCase() === username.toLowerCase());
      
      setUsernameStatus(usernameExists ? 'taken' : 'available');
      setIsCheckingUsername(false);
      
      // Update form errors
      if (usernameExists) {
        setErrors(prev => ({
          ...prev,
          username: 'Username already taken'
        }));
      } else {
        // Clear username error if it was set
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
        });
      }
    }, 600);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For username
    if (name === 'username') {
      // Reset username status when editing
      if (usernameStatus === 'available' || usernameStatus === 'taken') {
        setUsernameStatus(null);
      }
    }
    
    const newValue = name === 'mobile' && e.country ? value : value;
  
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : newValue
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle username input
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    
    // Only update if empty or alphanumeric
    if (value === '' || alphanumericRegex.test(value)) {
      handleChange(e);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleMobileKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      e.preventDefault();  
    }
  };
  
  const verifySponsorId = (sponsorId) => {
    // Simulate API call with timeout
    setTimeout(() => {
      const isValid = validSponsorIds.includes(sponsorId);
      
      if (isValid) {
        setIsSponsorVerified(true);
        setSponsorName(sponsorData[sponsorId]);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.sponsorId;
          return newErrors;
        });
      } else {
        setIsSponsorVerified(false);
        setSponsorName('');
        setErrors({
          ...errors,
          sponsorId: 'Invalid Sponsor ID. Please check and try again.'
        });
      }
      
      setIsVerifying(false);
    }, 800);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Visible fields validation
    
    // Username validation 
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (usernameStatus === 'taken') {
      newErrors.username = 'Username already taken';
    } else if (usernameStatus === 'invalid') {
      newErrors.username = 'Username can only contain letters and numbers';
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length < 8) { // Minimum length for international numbers
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password at least 8 chars';
    } 
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Sponsorid validation
    if (!formData.sponsorId) {
      newErrors.sponsorId = 'Referral Id is required';
    } 
      
    // Sponsor ID validation - must be verified
    if (formData.sponsorId && !isSponsorVerified) {
      newErrors.sponsorId = 'Invalid Sponsor ID. Please check and try again.';
    }
    
    // Terms and conditions validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms and Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
      // Dispatch the register action with user data
      dispatch(registerUser(formData));
    } else {
      console.log('Form validation failed');
    }
  };

  // Generate username status feedback UI
  const renderUsernameStatus = () => {
    if (!formData.username || formData.username.length < 3) {
      return null;
    }
    
    if (usernameStatus === 'checking') {
      return (
        <div className="flex items-center text-yellow-400 text-xs mt-1 ml-3">
          <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Checking availability...
        </div>
      );
    }
    
    if (usernameStatus === 'available') {
      return (
        <div className="flex items-center text-green-400 text-xs mt-1 ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Username available
        </div>
      );
    }
    
    if (usernameStatus === 'taken') {
      return (
        <div className="flex items-center text-red-400 text-xs mt-1 ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Username already taken
        </div>
      );
    }
    
    if (usernameStatus === 'invalid') {
      return (
        <div className="flex items-center text-red-400 text-xs mt-1 ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Only letters and numbers allowed
        </div>
      );
    }
    
    return null;
  };

  return (
    <AuthLayout title="Create Your Account">
      {errors.apiError && (
        <div className="mb-4 mx-4 px-3 py-1 text-center  bg-red-600/80 opacity-70 border border-red-400 rounded-3xl text-gray-100 font-medium text-sm">
          {errors.apiError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
          {/* Username field*/}
          <div className="relative pb-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleUsernameChange}
              placeholder="Create Username"
              className={`input-field w-full text-sm tracking-wide bg-[#0a1631] bg-opacity-90 border mb-1 ${
                errors.username ? 'border-red-500' : (usernameStatus === 'available' ? 'border-green-500' : 'border-gray-700')
              } rounded-full px-6 py-3 text-white`}
            />
            {renderUsernameStatus()}
            {errors.username && !['taken', 'invalid'].includes(usernameStatus) && (
              <p className="absolute text-xs tracking-wider text-red-400  ml-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.username}
              </p>
            )}
          </div>

          {/* Full Name field */}
          <FormInput
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            error={errors.fullName}
          />

          {/* Email field */}
          <FormInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            error={errors.email}
          />

          {/* Mobile field */}
          <InternationalPhoneInput
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
          />

          {/* Password field  */}
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            showPassword={showPassword}
            togglePasswordVisibility={() => togglePasswordVisibility('password')}
          />

          {/* Confirm Password field */}
          <PasswordInput
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => togglePasswordVisibility('confirmPassword')}
          />
        </div>

        {/* Sponsor ID field with auto-verification */}
        <SponsorInput
          value={formData.sponsorId}
          onChange={handleChange}
          error={errors.sponsorId}
          isSponsorVerified={isSponsorVerified}
          isVerifying={isVerifying}
          sponsorName={sponsorName}
        />

        {/* Terms and Conditions Checkbox */}
        <div className="relative pb-2">
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-700 rounded bg-transparent"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-gray-300">
                I agree to the <Link to="/terms" className="text-blue-400 hover:text-blue-300">Terms and Conditions</Link>
              </label>
            </div>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs tracking-wider text-red-400 mt-1 ml-7 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        {/* Hidden fields - included in form but not visible */}
        <div className="hidden">
          <FormInput
            name="panCardNo"
            value={formData.panCardNo}
            onChange={handleChange}
            placeholder="PAN Card Number"
            error={errors.panCardNo}
          />
          
          <FormInput
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            error={errors.firstName}
          />
          
          <FormInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            error={errors.lastName}
          />
          
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`input-field w-full text-sm tracking-wide bg-[#0a1631] bg-opacity-90 border ${errors.gender ? 'border-red-500' : 'border-gray-700'} rounded-full px-6 py-3 text-white`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="absolute text-xs tracking-wider text-red-400 mt-1 ml-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.gender}
              </p>
            )}
          </div>
          
          <FormInput
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            placeholder="Birthdate"
            error={errors.birthdate}
          />
        </div>

        {/* Register Button */}
        <FormButton text="Register" isLoading={isLoading} />
      </form>

      {/* Sign In Link */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Already have an account? <Link to="/user/login" className="text-blue-400 hover:text-blue-300">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  );
}