import { Home, Activity, BarChart2, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const TabButton = ({ activeTab, setActiveTab, tab, Icon, label, to }) => {
  const isActive = activeTab === tab;
  return (
    <Link to={to}>
    <button 
      onClick={() => setActiveTab(tab)} 
      className={`flex flex-col items-center ${isActive ? 'text-blue-300 font-medium' : 'text-gray-200'} transition-all duration-200 ease-in-out transform`}
    >
      <div 
        className={`w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center mb-1 
          ${isActive ? ' border-2 border-blue-300 shadow-lg shadow-blue-500 bg-[#2f3059]' : 'bg-[#2f3059]'} 
          ${isActive ? 'scale-110' : 'scale-100'} transition-all duration-300 ease-in-out`}
      >
        <Icon size={20} />
      </div>
      <span className="text-xs">{label}</span>
    </button>
    </Link>
  );
};

const Footer = ({ activeTab, setActiveTab }) => {
  return (
    <div className="max-w-xl z-50 mx-auto flex justify-around py-2 bg-blue-900/10  backdrop-blur-xs shadow-lg shadow-blue-900/30 rounded-t-2xl  fixed bottom-0 w-full">
      <TabButton 
      to="/user/dashboard"
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tab="dashboard" 
        Icon={Home} 
        label="Dashboard" 
      />
      <TabButton 
      to="/user/packages"
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tab="live" 
        Icon={Activity} 
        label="Live" 
      />
      <TabButton 
      to="/user/level"
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tab="level" 
        Icon={BarChart2} 
        label="Level" 
      />
      <TabButton 
      to="/user/account"
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tab="account" 
        Icon={User} 
        label="Account" 
      />
    </div>
  );
};

export default Footer;


