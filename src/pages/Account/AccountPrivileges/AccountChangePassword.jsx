import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, EyeOff, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Button, Alert, AlertDescription } from '../../../components/CommonCard';
import { clearError, clearSuccessMessage, updatePassword } from '../../../ReduxStateManagement/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AccountChangePassword = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user, isLoading, error, successMessage } = useSelector(state => state.auth);
  
  const [step, setStep] = useState(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Console log the user from the Redux store for debugging
  useEffect(() => {
    console.log("Current user in Redux store:", user);
  }, [user]);

  // Password validation criteria
  const passwordCriteria = {
    capital: /[A-Z]/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    length: newPassword.length >= 8
  };

  // Check if all password criteria are met
  const allCriteriaMet = Object.values(passwordCriteria).every(criterion => criterion);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccessMessage());
    };
  }, [dispatch]);

  // Update local errors when Redux error changes
  useEffect(() => {
    if (error) {
      setErrors(prev => ({ ...prev, api: error }));
      setSubmitted(false);
    }
  }, [error]);
  
  // Move to success screen when password update succeeds
  useEffect(() => {
    if (successMessage && successMessage.includes('success')) {
      setStep(2);
      setSubmitted(false);
    }
  }, [successMessage]);
  
  

  // Send verification code
  const sendVerificationCode = () => {
    // In a real app, you would call an API to send a verification code
    // For this demo, we'll simulate sending a code
    setCodeSent(true);
    
    // Mock code sending with a timeout to reset the button after 30 seconds
    setTimeout(() => {
      setCodeSent(false);
    }, 30000);
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!allCriteriaMet) {
      newErrors.newPassword = 'Password does not meet all requirements';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!verificationCode) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (verificationCode !== '123456') { // Mock verification code
      newErrors.verificationCode = 'Invalid verification code';
    }
    
    if (!confirmCheckbox) {
      newErrors.confirmCheckbox = 'Please confirm this password change';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setErrors(prev => ({
        ...prev,
        api: 'You must be logged in to change your password'
      }));
      return;
    }
    
    if (validateForm()) {
      setSubmitted(true);
      
      try {
        // Dispatch action to update password
        await dispatch(updatePassword({
          userId: user.id,
          currentPassword,
          newPassword
        }));
      } catch (err) {
        console.error("Error updating password:", err);
        setSubmitted(false);
        setErrors(prev => ({
          ...prev,
          api: 'Failed to update password. Please try again.'
        }));
      }
    }
  };


  // Render the appropriate step
  const renderStep = () => {
    // Check if user is authenticated
    if (!user) {
      return (
        <div className="flex flex-col items-center p-6">
          <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            User Not Authenticated
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            You need to be logged in to change your password.
          </p>
          <Button
            onClick={() => navigate("/user/login")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
          >
            Log In (Demo)
          </Button>
        </div>
      );
    }
    
    switch (step) {
      case 1:
        return renderPasswordForm();
      case 2:
        return renderConfirmation();
      default:
        return renderPasswordForm();
    }
  };

  const renderPasswordForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 h-full overflow-y-auto p-4 sm:p-6">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Change Account Password</h3>
            
            {errors.api && (
              <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <AlertDescription className="text-sm text-red-800 dark:text-red-300">
                  {errors.api}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.currentPassword ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 pr-10`}
                  required
                />
                <div 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? 
                    <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : 
                    <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  }
                </div>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.currentPassword}</p>
              )}
            </div>
            
            {/*  form fields */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">New Master Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.newPassword ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 pr-10`}
                  required
                />
                <div 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? 
                    <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : 
                    <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  }
                </div>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.newPassword}</p>
              )}
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Must Contain 1 Capital, 1 Special Character And 1 Number and 8+ Characters
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className={`flex items-center text-xs ${passwordCriteria.capital ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordCriteria.capital ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  1 Capital Letter
                </div>
                <div className={`flex items-center text-xs ${passwordCriteria.special ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordCriteria.special ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  1 Special Character
                </div>
                <div className={`flex items-center text-xs ${passwordCriteria.number ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordCriteria.number ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  1 Number
                </div>
                <div className={`flex items-center text-xs ${passwordCriteria.length ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordCriteria.length ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  8+ Characters
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 pr-10`}
                  required
                />
                <div 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 
                    <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : 
                    <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  }
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600 dark:text-gray-400">Verification Code</label>
                <Button 
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={codeSent}
                  className="ml-2 text-xs bg-purple-600 hover:bg-purple-700 text-white px-4 py-1"
                >
                  {codeSent ? 'Code Sent' : 'Send Code'}
                </Button>
              </div>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className={`w-full px-4 py-2 border ${errors.verificationCode ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400`}
                required
              />
              {errors.verificationCode && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.verificationCode}</p>
              )}
              {codeSent && !errors.verificationCode && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  For demo purposes, use code: 123456
                </p>
              )}
            </div>
            
            <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 mt-4">
              <AlertDescription className="flex items-start text-sm text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm">Changing your acoount password will require re-authentication on all your devices. Make sure to remember your new password.</p>
                </div>
              </AlertDescription>
            </Alert>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="terms" 
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600"
                checked={confirmCheckbox}
                onChange={(e) => setConfirmCheckbox(e.target.checked)}
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I understand and confirm this password change.
              </label>
            </div>
            {errors.confirmCheckbox && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.confirmCheckbox}</p>
            )}

            <div className="flex justify-center">
              <Button 
                type="submit"
                disabled={submitted || isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg w-full sm:w-auto"
              >
                {(submitted || isLoading) ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </span>
                ) : 'Update Password'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const renderConfirmation = () => {
    return (
      <div className="flex flex-col items-center py-6 h-[18rem] sm:h-[22rem] px-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Password Changed Successfully</h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Your account password has been updated. You'll need to use your new password for future logins.
        </p>
        
        <Button
          onClick={() => navigate("/user/dashboard")}
          className="flex flex-row items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-bold button-glow shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Back to Dashboard
        </Button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/90 dark:bg-black/70 flex items-center justify-center z-50 backdrop-blur-xs max-w-xl mx-auto">
      <div className="max-w-xl mx-auto h-full bg-white bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] rounded-xl shadow-2xl overflow-auto">
        {/* Header */}
        <div className="px-2 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-400 dark:bg-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/user/account')}
              className="mr-1 sm:mr-3 p-1 rounded-full hover:bg-[#0a1631] dark:hover:bg-[#0a1631] transition-colors"
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold">
              {step === 1 ? 'Change Master Password' : 'Password Changed'}
            </h2>
          </div>
          {step < 2 && (
            <div className="flex items-center space-x-1">
              {[1].map((s) => (
                <div 
                  key={s} 
                  className={`h-2 w-2 rounded-full ${s === step ? 'bg-white' : 'bg-indigo-300 dark:bg-indigo-400'}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default AccountChangePassword;