import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, clearSuccessMessage } from "../ReduxStateManagement/slices/authSlice";
import {
  AuthLayout,
  FormInput,
  PasswordInput,
  FormButton,
  InternationalPhoneInput,
} from "../components/Authentication/AuthCommonComponents";
import "../../src/commonStyle.css";

export default function CryptoLoginPage() {
  const [formData, setFormData] = useState({
    mobile: "",
    username: "",
    email: "",
    password: "",
    captchaInput: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState({ text: "", solved: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, successMessage } = useSelector(state => state.auth);

  // Generate a random captcha text
  const generateCaptcha = useCallback(() => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    const length = 6;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha({ text: result, solved: false });
    // Clear captcha input when generating new captcha
    setFormData(prev => ({ ...prev, captchaInput: "" }));
  }, []);

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

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
      navigate('/user/dashboard');
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = name === 'mobile' && e.country ? value : value;
  
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : newValue
    });

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Check captcha on input change
    if (name === "captchaInput" && value === captcha.text) {
      setCaptcha(prev => ({ ...prev, solved: true }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMobileKeyDown = (e) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    // Captcha validation
    if (!formData.captchaInput) {
      newErrors.captchaInput = "Captcha is required";
    } else if (formData.captchaInput !== captcha.text) {
      newErrors.captchaInput = "Incorrect captcha";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted for login", formData);
      // Remove captchaInput from the data sent to the server
      const { captchaInput, ...loginData } = formData;
      dispatch(loginUser(loginData));
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <AuthLayout title="Login to Your Account">
      {errors.apiError && (
        <div className="mb-4 mx-4 px-3 py-1 text-center bg-red-600/80 opacity-70 border border-red-400 rounded-3xl text-gray-100 font-medium text-sm">
          {errors.apiError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Mobile field */}
                 <InternationalPhoneInput
         name="mobile"
         value={formData.mobile}
         onChange={handleChange}
         error={errors.mobile}
        
       />

        {/* Hidden fields for future use */}
        <div className="hidden">
          <FormInput
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            error={errors.username}
          />
          
          <FormInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            error={errors.email}
          />
        </div>
        
        {/* Password field with eye icon */}
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

       {/* Captcha Container */}
<div className="mt-3">
  <div className="relative">
    {/* Captcha display area */}
    <div className="flex items-center justify-between mb-2">
      <div className="flex-1 mr-2">
        <div 
          className="w-full h-14 flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-r from-[#0a1631] to-[#172648] border border-gray-700"
        >
          {/* Captcha text with styling */}
          <div 
            className="px-4 py-2 font-mono text-xl tracking-widest select-none text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300"
            style={{
              fontFamily: 'monospace',
              letterSpacing: '0.25em',
              textShadow: '0 0 5px rgba(59, 130, 246, 0.7), 0 0 15px rgba(59, 130, 246, 0.5)',
              transform: 'skew(-5deg)',
              position: 'relative'
            }}
          >
            {captcha.text}
          </div>
          
          {/* Decorative elements for the captcha */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Random dots and lines for captcha security appearance */}
            <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-40">
              <line x1="10%" y1="20%" x2="30%" y2="65%" stroke="#4f6bfd" strokeWidth="1" />
              <line x1="40%" y1="10%" x2="60%" y2="90%" stroke="#4f9dfd" strokeWidth="1" />
              <line x1="75%" y1="15%" x2="95%" y2="75%" stroke="#4fdffd" strokeWidth="1" />
              
              <circle cx="15%" cy="30%" r="1" fill="#4f6bfd" />
              <circle cx="25%" cy="60%" r="1" fill="#4f9dfd" />
              <circle cx="65%" cy="25%" r="1" fill="#4fdffd" />
              <circle cx="85%" cy="70%" r="1" fill="#4f6bfd" />
              <circle cx="45%" cy="45%" r="1" fill="#4f9dfd" />
              <circle cx="95%" cy="35%" r="1" fill="#4fdffd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Refresh button */}
      <button 
        type="button" 
        onClick={generateCaptcha}
        className="button-glow h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all duration-300 hover:from-blue-500 hover:to-cyan-400"
        aria-label="Refresh captcha"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    {/* Captcha input field */}
    <FormInput
      name="captchaInput"
      value={formData.captchaInput}
      onChange={handleChange}
      placeholder="Enter captcha text"
      error={errors.captchaInput}
    />
    
    {captcha.solved && (
      <div className="text-green-400 text-xs mt-1 ml-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Captcha verified
      </div>
    )}
  </div>
</div>

        {/* Login Button with shine effect */}
        <FormButton text="Login" isLoading={isLoading} />
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Don't have an Account?{" "}
          <Link to="/user/register" className="text-blue-400 hover:text-blue-300">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}