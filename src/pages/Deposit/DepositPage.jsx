import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Copy, AlertTriangle, CheckCircle, ArrowLeft, Upload, ChevronDown } from 'lucide-react';

const FormField = ({ label, error, children }) => (
  <div className="space-y-2">
    <label className="block text-sm text-gray-300 dark:text-gray-400">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const Button = ({ children, className = "", onClick, type = "button", disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);

const Alert = ({ children, variant = "info" }) => {
  const bgColors = {
    info: "bg-blue-900/20 border-blue-800",
    warning: "bg-amber-900/20 border-amber-800",
    danger: "bg-red-900/20 border-red-800",
    success: "bg-green-900/20 border-green-800"
  };

  return (
    <div className={`rounded-lg border p-3 ${bgColors[variant]}`}>
      {children}
    </div>
  );
};

// Main deposit component that manages the flow
const DepositFlow = () => {
  const navigate = useNavigate();
  const packageType = "standard"; 
  
  const accounts = React.useMemo(() => [
    { id: "acc1", name: "Main Account" }
  ], []); 
  
  const [step, setStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [formData, setFormData] = useState({
    account: "",
    amount: "",
    receipt: null,
    isChecked: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const accountValue = accounts[0].id !== undefined ? accounts[0].id : accounts[0];
      setFormData(prev => ({ ...prev, account: accountValue }));
    }
  }, []); 

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for the field
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Go back to previous step or to the package page on final back
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(`/user/dashboard`);
    }
  };

  // Handle wallet selection
  const selectWallet = (wallet) => {
    setSelectedWallet(wallet);
    setStep(2);
  };

  // Copy address to clipboard
  const copyAddress = () => {
    const address = "THzNbZZCXJJ4jnZgJLVAuwwQN1qtSVJwDF";
    
    try {
      navigator.clipboard.writeText(address)
        .then(() => {
          setCopyMessage('Address copied to clipboard!');
          setTimeout(() => setCopyMessage(''), 3000);
        })
        .catch(() => fallbackCopyTextToClipboard(address));
    } catch (err) {
      fallbackCopyTextToClipboard(address);
    }
  };

  // Fallback copy method
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      setCopyMessage(successful ? 'Address copied to clipboard!' : 'Failed to copy address');
    } catch (err) {
      setCopyMessage('Failed to copy address');
    }
    
    document.body.removeChild(textArea);
    setTimeout(() => setCopyMessage(''), 3000);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      errors.amount = 'Please enter a valid amount';
    } else if (Number(formData.amount) < 10) {
      errors.amount = 'Minimum deposit amount is $10';
    }
    
    if (!formData.account) {
      errors.account = 'Please select an account';
    }
    
    if (!formData.isChecked) {
      errors.terms = 'Please accept the terms';
    }
    
    return errors;
  };

  // Handle final submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setSubmitted(true);
    
    // Simulate form submission
    setTimeout(() => {
      setStep(4);
      setSubmitted(false);
    }, 1500);
  };

  // Step components
  const steps = {
    // Step 1: Select payment method
    1: (
      <div className="space-y-4 px-4 sm:px-6 py-4 sm:py-8">
        <p className="text-gray-300 text-sm sm:text-base dark:text-gray-300 mb-4">
          Select your preferred payment method to deposit funds
        </p>
        
        {[
          { id: 'usdt_trc20', name: 'USDT TRC20', iconType: 'crypto' },
          { id: 'usdt_bep20', name: 'USDT BEP20', iconType: 'crypto' },
          { id: 'bank', name: 'Bank Transfer', iconType: 'bank' }
        ].map(wallet => (
          <div 
            key={wallet.id}
            onClick={() => selectWallet(wallet)}
            className="flex items-center justify-between p-2 sm:p-4 border border-gray-700 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-[#0a1631] dark:hover:bg-[#0a1631] cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center">
              <div className={`w-8 sm:w-10 h-8 sm:h-10 ${wallet.iconType === 'crypto' ? 'bg-blue-500' : 'bg-blue-500'} rounded-full flex items-center justify-center text-white font-bold`}>
                {wallet.iconType === 'crypto' ? 'T' : 'B'}
              </div>
              <span className="ml-3 text-sm sm:text-base font-medium text-gray-200 dark:text-gray-200">{wallet.name}</span>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:bg-indigo-700 text-white rounded-xl">
              Pay Now
            </Button>
          </div>
        ))}
        
        <div className="mt-6 text-xs sm:text-sm text-gray-300 dark:text-gray-400 bg-gray-800/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-700 dark:border-gray-700">
          <p><strong>Note:</strong> You can add any amount to your account (minimum value of $10), with no maximum limit. Once the deposit is made, it will reflect in your system in some time and you can activate accounts/upgrade slots for yourself or your team members.</p>
        </div>
      </div>
    ),
    
    // Step 2: Display QR code for payment
    2: (
      <div className="flex flex-col items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-gray-700 dark:bg-gray-700 p-4 rounded-xl mb-6 w-52 h-52 flex items-center justify-center">
          <QrCode className="w-40 h-40 text-gray-200 dark:text-gray-200" />
        </div>
        
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-300 dark:text-gray-400">Address:</label>
            <div className="flex items-center">
              <div className="flex-1 bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 dark:text-gray-300 font-mono overflow-hidden truncate">
                THzNbZZCXJJ4jnZgJLVAuwwQN1qtSVJwDF
              </div>
              <Button 
                onClick={copyAddress}
                className="ml-2 p-2 bg-gray-700 dark:bg-gray-700 hover:bg-[#0a1631] dark:hover:bg-[#0a1631] text-gray-300 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-400 border border-gray-700 dark:border-gray-700"
              >
                <Copy className="w-5 h-5" />
              </Button>
            </div>
            {copyMessage && (
              <div className="text-xs text-blue-400 dark:text-blue-400 mt-1 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                {copyMessage}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-300 dark:text-gray-400">Payment Mode:</label>
            <div className="bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 dark:text-gray-300">
              {selectedWallet?.name || 'USDT Payment'}
            </div>
          </div>
          
          <Alert variant="warning">
            <div className="flex items-start text-sm text-amber-300 dark:text-amber-300">
              <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm">This is not a payment gateway. You need to manually send funds to the address above.</p>
                <p className="mt-1 text-xs sm:text-sm">After sending, click "Proceed" to confirm your payment details.</p>
              </div>
            </div>
          </Alert>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => setStep(3)}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:bg-indigo-700 text-white px-8"
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    ),
    
    // Step 3: Confirm deposit details and upload receipt
    3: (
      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-6 p-4">
        <InstructionsAccordion />
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 dark:text-gray-200">Payment Details</h3>
            
            <FormField label="Amount In USD" error={formErrors.amount}>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => updateFormData('amount', e.target.value)}
                placeholder="Enter amount"
                className={`w-full px-4 py-2 border ${formErrors.amount ? 'border-red-500' : 'border-gray-700 dark:border-gray-700'} rounded-lg bg-gray-800 dark:bg-gray-800 text-gray-200 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                min="10"
              />
              {!formErrors.amount && formData.amount && Number(formData.amount) < 10 && (
                <p className="text-xs text-amber-500 mt-1">Minimum deposit amount is $10</p>
              )}
            </FormField>
            
            <FormField label="Select Account" error={formErrors.account}>
              <select
                value={formData.account}
                onChange={(e) => updateFormData('account', e.target.value)}
                className={`w-full px-4 py-2 border ${formErrors.account ? 'border-red-500' : 'border-gray-700 dark:border-gray-700'} rounded-lg bg-gray-800 dark:bg-gray-800 text-gray-200 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {accounts.length > 0 ? (
                  accounts.map((account, index) => (
                    <option key={index} value={account.id || account}>
                      {account.id || ''} {account.name ? `- ${account.name}` : account}
                    </option>
                  ))
                ) : (
                  <option value="">No accounts available</option>
                )}
              </select>
            </FormField>
            
            <FormField label="Mode Of Payment">
              <select className="w-full px-4 py-2 border border-gray-700 dark:border-gray-700 rounded-lg bg-gray-800 dark:bg-gray-800 text-gray-200 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>USDT</option>
              </select>
            </FormField>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 dark:text-gray-200">Reference Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 dark:text-blue-400">
                <Upload className="w-5 h-5" />
                <span className="text-sm font-semibold">Upload Payment Receipt</span>
              </div>
              
              <label className="block text-sm text-gray-300 dark:text-gray-400 mb-1">
                If you have a receipt scan copy, kindly attach it here:
              </label>
              <div className="flex flex-col gap-1">
                <label className="flex items-center px-4 py-2 bg-[#0f2c5c] dark:bg-[#0f2c5c] text-blue-400 dark:text-blue-400 rounded-lg border border-blue-700 dark:border-blue-700 cursor-pointer hover:bg-[#051428] dark:hover:bg-[#051428] transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Choose file</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateFormData('receipt', e.target.files[0]);
                      }
                    }}
                    accept="image/jpeg,image/jpg" 
                  />
                </label>
                <span className="ml-1 text-sm text-gray-400 dark:text-gray-400">
                  {formData.receipt ? formData.receipt.name : 'No file chosen'}
                </span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-400">Only JPG files will be uploaded</p>
            </div>
          </div>
        </div>

        <Alert variant="danger">
          <div className="flex items-center text-red-400 dark:text-red-400 text-xs">
            <AlertTriangle className="w-5 h-5 mr-2" />
            WARNING: If you submit this payment information without depositing the amount in the bank, your ID will be permanently blocked.
          </div>
        </Alert>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="terms" 
            className={`w-4 h-4 ${formErrors.terms ? 'ring-2 ring-red-500' : ''} text-black border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600`}
            checked={formData.isChecked}
            onChange={() => updateFormData('isChecked', !formData.isChecked)}
          />
          <label 
            htmlFor="terms" 
            className={`ml-2 text-sm ${formErrors.terms ? 'text-red-500' : 'text-gray-400 dark:text-gray-400'}`}
          >
            I accept the above terms.
          </label>
        </div>
        {formErrors.terms && <p className="text-xs text-red-500 ">{formErrors.terms}</p>}

        <div className="flex justify-center">
          <Button 
            type="submit"
            disabled={submitted}
            className={`${submitted ? 'bg-indigo-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:bg-indigo-700'} text-white px-10 py-3 rounded-lg`}
          >
            {submitted ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : 'Submit'}
          </Button>
        </div>
      </form>
    ),
    
    // Step 4: Confirmation screen
    4: (
      <div className="flex flex-col items-center py-6 px-4">
        <div className="w-16 h-16 bg-green-900/30 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-400 dark:text-green-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-100 dark:text-gray-100 mb-2">Deposit Submitted Successfully</h3>
        <p className="text-center text-gray-400 dark:text-gray-400 mb-6">
          Your payment information has been recorded. We'll process your deposit shortly.
        </p>
        
        <Button
          onClick={() => navigate(`/user/dashboard`)}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:bg-indigo-700 text-white px-6"
        >
          Back to Dashboard
        </Button>
      </div>
    )
  };

  function InstructionsAccordion() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="space-y-2">
        <div
          className="cursor-pointer flex items-center justify-between p-3 rounded-lg border bg-gray-800 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 hover:bg-gray-700 dark:hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-base font-semibold text-gray-300 dark:text-gray-300 flex items-center space-x-2">
            <ChevronDown 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              style={{ width: '20px', height: '20px' }}
            />
            <span className="text-sm">Instructions to Update Payment Information</span>
          </span>
        </div>

        {isOpen && (
          <div className="transition-all ease-in-out pl-6 mt-2 text-sm text-gray-400 dark:text-gray-400 space-y-3">
            <ol className="list-decimal">
              <li>After you deposit money in the company account, only then should you update this payment information.</li>
              <li>If we haven't received your funds, please send the scanned copy of your deposit slip for verification with our banker.</li>
              <li>This is NOT a payment gateway. Money from your account is NOT transferred automatically.</li>
              <li>If you have a receipt, please scan and upload it to speed up the process of crediting your funds to your account.</li>
            </ol>
          </div>
        )}
      </div>
    );
  }

  // Step indicators
  const StepIndicators = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3].map((s) => (
        <div 
          key={s} 
          className={`h-2 w-2 rounded-full ${s === step ? 'bg-white' : 'bg-blue-400 dark:bg-blue-400'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/90 dark:bg-black/90 flex items-center justify-center z-50 backdrop-blur-xs max-w-xl mx-auto h-full">
      <div className="w-full max-w-xl mx-auto h-full bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539] shadow-2xl overflow-auto">
        {/* Header */}
        <div className="px-2 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-400 dark:bg-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={goBack} 
              className="mr-1 sm:mr-3 p-1 rounded-full hover:bg-[#0a1631] dark:hover:bg-[#0a1631] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold">
              {step === 1 ? 'Select Payment Method' : 
               step === 2 ? 'Payment Details' :
               step === 3 ? 'Confirm Deposit' : 'Deposit Confirmed'}
            </h2>
          </div>
          {step < 4 && <StepIndicators />}
        </div>
        
        {/* Content */}
        <div>{steps[step]}</div>
      </div>
    </div>
  );
};

export default DepositFlow;