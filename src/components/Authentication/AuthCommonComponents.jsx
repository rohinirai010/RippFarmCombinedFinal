
import loginBgImage from "../../images/bg_rf.jpg";
// import userLoginLogo from "../../images/AuthLogo.png";
import userLoginLogo from "../../images/AuthLogo.png";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../../src/commonStyle.css"

export const InternationalPhoneInput = ({
  value,
  onChange,
  error,
  placeholder = "Phone Number",
  disabled = false,
  inputClass = "",
  containerClass = ""
}) => {
  const handleChange = (phone, country) => {
    // Format the phone number with country code
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    onChange({
      target: {
        name: 'mobile',
        value: formattedPhone,
        country: country
      }
    });
  };

  return (
    <div className={`relative pb-2 ${containerClass}`}>
      <PhoneInput
        country={'us'} // Default country
        value={value}
        onChange={handleChange}
        inputProps={{
          name: 'mobile',
          placeholder: placeholder,
          disabled: disabled,
          className: `input-field w-full text-sm tracking-wide bg-[#0a1631] bg-opacity-90 border mb-1 ${
            error ? 'border-red-500' : 'border-gray-700'
          } rounded-full pl-16 pr-4 py-3 text-white ${inputClass}`
        }}
        buttonStyle={{
          background: '#0a1631',
          border: 'none',
          borderRight: '1px solid #374151',
          borderTopLeftRadius: '9999px',
          borderBottomLeftRadius: '9999px',
          padding: '0 8px 0 12px'
        }}
        dropdownStyle={{
          background: '#0a1631',
          border: '1px solid #374151',
          color: '#fff',
          marginTop: '8px'
        }}
        searchStyle={{
          background: '#0a1631',
          color: '#fff',
          padding: '8px'
        }}
        enableSearch
        searchPlaceholder="Search countries..."
        disableSearchIcon
      />
      {error && (
        <p className="absolute text-xs tracking-wider text-red-400  ml-3 flex items-center pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export const FormInput = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  error, 
  className = '',
  maxLength,
  onKeyDown
}) => {
  return (
    <div className="relative pb-2">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`input-field w-full text-sm tracking-wide bg-[#0a1631] bg-opacity-90 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-full px-6 py-3 text-white ${className}`}
      />
      {error && (
        <p className="absolute text-xs tracking-wider text-red-400 mt-1 ml-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};


export const PasswordInput = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  className = '',
  showPassword,
  togglePasswordVisibility
}) => {
  return (
    <div className="relative pb-2">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field w-full text-sm tracking-wide bg-[#0a1631] bg-opacity-90 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-full px-6 py-3 text-white ${className}`}
      />
      <button 
        type="button"
        onClick={togglePasswordVisibility} 
        className="absolute right-4 top-[15px] transform text-gray-400"
      >
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 eye-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 eye-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        )}
      </button>
      {error && (
        <p className="absolute text-xs tracking-wider text-red-400 mt-1 ml-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export const AuthLayout = ({ children, title }) => {
  return (
    <div className="relative max-w-xl mx-auto min-h-screen flex items-center justify-center bg-black overflow-hidden py-16 sm:py-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black">
        <img src={loginBgImage} alt="Authentication background" className="w-full h-full bg-cover" />
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-gray-900/50 backdrop-blur-xs rounded-3xl border-t border-gray-500 border-l px-3 sm:px-4 py-4 sm:py-6 shadow-xl">
          {/* User Icon */}
          {/* <div className="absolute -top-7 right-1/3 ">
                    <img src={userLoginLogo} alt="User Logo" className="h-15 w-42" />
                  </div> */}

<div className="flex justify-center absolute -top-7 sm:-top-8 right-[26%] ">
 <div className="relative  ">
   <div className=" bg-gradient-to-bl from-blue-800 via-blue-200 to-blue-800 bg-blue-900 bg-opacity-50 rounded-3xl flex items-center justify-center logo-glow">
     <div className="h-13 sm:h-17 w-40 sm:w-52 bg-[#1d1e35] rounded-3xl relative">
       <div className="absolute -top-4 -left-6">
         <span className="text-yellow-300 text-xl star">✦</span>
       </div>
       <div className="absolute -top-4 -left-2">
         <span className="text-yellow-300 text-xs star">✦</span>
       </div>
       <div className="absolute -top-1 -left-3">
         <span className="text-yellow-300 text-sm star">✦</span>
       </div>
       <div className="absolute top-0 right-0">
         <img src={userLoginLogo} alt="User Logo" className="h-13 sm:h-17 w-40 sm:w-52" />
       </div>
     </div>
   </div>
   <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-blue-500 blur-md opacity-50"></div>
 </div>
</div>

          <h1 className="text-2xl text-center title-glow mb-5 sm:mb-8 mt-12">{title}</h1>
          
          {children}
        </div>
      </div>
    </div>
  );
};


export const FormButton = ({ text, onClick, type = "submit" }) => {
  return (
    <button 
      type={type} 
      onClick={onClick}
      className="button-glow w-full text-white font-medium py-3 px-4 rounded-full transition duration-200 cursor-pointer mt-2"
    >
      <span className="relative z-10">{text}</span>
    </button>
  );
};


export const SponsorInput = ({ 
  value, 
  onChange, 
  error, 
  isSponsorVerified, 
  isVerifying, 
  verifySponsorId 
}) => {
  return (
    <div className="relative pb-2">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            name="sponsorId"
            value={value}
            onChange={onChange}
            placeholder="Sponsor ID / Referral ID"
            className={`input-field w-full text-sm tracking-wide bg-[#0a1631] bg-opacity-90 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-full px-6 py-3 text-white pr-24`}
          />
          
          {/* Modern sleek verify button */}
          {value && !isSponsorVerified && (
            <button 
              type="button" 
              onClick={verifySponsorId}
              disabled={isVerifying}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-xs font-medium rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 flex items-center justify-center"
            >
              {isVerifying ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying</span>
                </div>
              ) : (
                <span>Verify</span>
              )}
            </button>
          )}
          
          {/* Verified indicator */}
          {isSponsorVerified && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center text-green-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 text-xs">Verified</span>
            </div>
          )}
        </div>
      </div>
      {error && (
        <p className="absolute text-xs tracking-wider text-red-400 mt-1 ml-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};











 {/* User Icon */}
//  <div className="flex justify-center mb-6">
//  <div className="relative">
//    <div className="w-14 h-14 bg-gradient-to-bl from-blue-800 via-blue-200 to-blue-800 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center logo-glow">
//      <div className="w-13 h-13 bg-[#1d1e35] rounded-full relative">
//        <div className="absolute -top-2 -left-4">
//          <span className="text-yellow-300 text-xl star">✦</span>
//        </div>
//        <div className="absolute -top-4 -left-1">
//          <span className="text-yellow-300 text-xs star">✦</span>
//        </div>
//        <div className="absolute top-1 -left-0">
//          <span className="text-yellow-300 text-sm star">✦</span>
//        </div>
//        <div className="absolute top-3 right-3">
//          <img src={userLoginLogo} alt="User Logo" className="h-6 w-6" />
//        </div>
//      </div>
//    </div>
//    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-blue-500 blur-md opacity-50"></div>
//  </div>
// </div>