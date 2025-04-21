import React from 'react';
import ArrowRight from '../../images/arrow-right-svgrepo-com.svg'; // Adjust path if needed

const Button = ({ text, link, className = '', withArrow = false ,}) => {
  return (
    <div className="button-group">
      <a
        href={link}
        className={`inline-flex font-['Poppins'] items-center border border-transparent text-white py-3 px-6 rounded-full hover:bg-white hover:text-[#0a1d45] transition ${className}`}
      >
        {text}
        {withArrow && (
          <img
            src={ArrowRight}
            alt="arrow right"
            className="ml-2 w-5 h-5"
          />
        )}
      </a>
    </div>
  );
};

export default Button;
