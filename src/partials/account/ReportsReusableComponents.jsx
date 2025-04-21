import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BiSortAlt2 } from "react-icons/bi";
import {
  IoCalendarOutline,
  IoArrowDown,
  IoArrowUp,
  IoSearch,
} from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

// DatePicker Component
export const DatePicker = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-400 text-xs mb-1">{label}</label>
    <div className="bg-[#1d1e35] border border-blue-500/20 rounded-lg overflow-hidden flex items-center">
      <input
        type="date"
        className="bg-transparent text-gray-300 py-2 pl-3 pr-2 w-full placeholder-gray-500 focus:outline-none text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="bg-blue-500/10 h-full flex items-center px-2 text-blue-400">
        <IoCalendarOutline />
      </div>
    </div>
  </div>
);

// Dropdown Component
export const Dropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="flex flex-col relative">
        <label className="text-gray-400 text-xs mb-1">{label}</label>
        <div
          className="bg-[#1d1e35] border border-blue-500/20 rounded-lg py-1 sm:py-2 px-3 flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-gray-300 text-sm">{value}</span>
          <IoArrowDown
            className={`text-blue-400 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
  
        {isOpen && (
          <div className="fixed mt-1 bg-[#1d1e35] border border-blue-500/30 rounded-lg shadow-lg z-50 max-h-16 overflow-y-auto"
               style={{
                 width: 'inherit',
                 minWidth: '100%',
                 left: 0,
                 top: '100%',
                 transform: 'translateY(0)',
                 position: 'absolute'
               }}>
            {options.map((option, index) => (
              <div
                key={index}
                className="py-1 px-3 hover:bg-blue-500/10 cursor-pointer text-sm text-gray-300 border-b border-gray-700"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

//  Search Input Component
export const SearchInput = ({ value, onChange, placeholder, label }) => (
  <div className="lex flex-col relative">
    <label className="text-gray-400 text-xs mb-1">{label}</label>
    <input
      type="text"
      className="w-full bg-[#1d1e35] border border-blue-500/20 rounded-lg py-1 sm:py-2 pl-3 pr-10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 text-sm"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <IoSearch className="absolute right-3 top-10 transform -translate-y-1/2 text-blue-400" />
  </div>
);

//  Data Table Component
export const DataTable = ({
  columns,
  data,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onSortChange,
  sortConfig = { key: null, direction: "asc" },
}) => {
  // Function to render table data based on loading state
  const renderTableData = () => {
    if (loading) {
      return (
        <tr className="text-nowrap">
          <td colSpan={columns.length} className="text-center py-8 text-nowrap">
            <div className="flex justify-center items-center">
              <motion.div
                className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-3 text-gray-400">Loading data...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            className="text-center py-8 text-gray-400 text-nowrap "
          >
            No data found
          </td>
        </tr>
      );
    }

    return data.map((row, rowIndex) => (
      <motion.tr
        key={rowIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: rowIndex * 0.05 }}
        className={`border-b border-blue-500/10 ${
          rowIndex % 2 === 0 ? "bg-[#1d1e35]/30" : "bg-[#1d1e35]/10"
        }`}
      >
        {columns.map((column, colIndex) => (
          <td
            key={colIndex}
            className={`py-2 sm:py-3 px-2 text-[13px] sm:text-sm text-nowrap ${
              column.key === "amount"
                ? "text-right"
                : column.key === "status"
                ? "text-center"
                : ""
            }`}
          >
            {column.render
              ? column.render(row[column.key], row)
              : row[column.key]}
          </td>
        ))}
      </motion.tr>
    ));
  };

  return (
    <div className="bg-[#141529] border border-blue-500/10 rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-500/20">
          <thead className="bg-[#1d1e35] text-nowrap">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`py-3 px-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider ${
                    column.key === "amount"
                      ? "text-right"
                      : column.key === "status"
                      ? "text-center"
                      : ""
                  }`}
                >
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => column.sortable && onSortChange(column.key)}
                  >
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="ml-1">
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === "asc" ? (
                            <IoArrowUp className="text-blue-400" />
                          ) : (
                            <IoArrowDown className="text-blue-400" />
                          )
                        ) : (
                          <BiSortAlt2 className="text-gray-500" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-500/10">
            {renderTableData()}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="py-3 px-4 flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between border-t border-blue-500/10 bg-[#1d1e35]/50">
          <div className="flex items-center text-sm text-gray-400 text-nowrap">
            <span>
              Showing page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 rounded-md mx-1 ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-blue-400 hover:bg-blue-500/10"
              }`}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiChevronLeft className="text-lg" />
            </motion.button>

            {/* Page number buttons */}
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              // Simple pagination logic to show current page and surrounding pages
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-8 h-8 rounded-md mx-1 ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:bg-blue-500/10"
                  }`}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </motion.button>
              );
            })}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 rounded-md mx-1 ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-blue-400 hover:bg-blue-500/10"
              }`}
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              <HiChevronRight className="text-lg" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};
