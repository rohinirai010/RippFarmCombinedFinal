import { useState, useEffect } from 'react';
import { Zap, LogOut, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../ReduxStateManagement/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = ({ username }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/user/login');
      });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full backdrop-blur-sm bg-[#1d1e35]/30 z-20 px-4 py-3 relative"
    >
      <div className="max-w-lg mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            className="bg-[#5b60b2] h-8 w-8 rounded-full flex items-center justify-center mr-2"
          >
            <Zap size={18} className="text-white" />
          </motion.div>
          <span className="font-bold text-xl text-white">RippFarm</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center px-4 py-2 rounded-full bg-[#5563c8] hover:bg-[#4351b4] text-white font-medium text-sm transition-colors"
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-[#1d1e35]/90 backdrop-blur-md z-20"
        >
          <div className="max-w-lg mx-auto py-3 px-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg bg-[#5563c8]/50 hover:bg-[#5563c8] text-white font-medium text-sm transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;