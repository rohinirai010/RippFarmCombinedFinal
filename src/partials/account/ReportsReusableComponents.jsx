import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BiSortAlt2 } from "react-icons/bi";
import {
  IoCalendarOutline,
  IoArrowDown,
  IoArrowUp,
  IoSearch,
  IoDownloadOutline,
} from "react-icons/io5";
import { FaFilePdf, FaFileExcel, FaFileCsv } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from 'xlsx';

export const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Dynamic grid patterns */}
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          </pattern>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </pattern>
          <radialGradient
            id="sphereGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="20%" cy="80%" r="100" fill="url(#sphereGradient)" />
        <circle cx="85%" cy="20%" r="120" fill="url(#sphereGradient)" />
      </svg>
    </div>

    {/* Animated data streams */}
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`absolute h-full w-0.5 opacity-10 left-${Math.floor(
          Math.random() * 100
        )}%`}
      >
        <motion.div
          className="w-full h-20 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
          animate={{ y: [-100, 1000] }}
          transition={{
            duration: 5 + Math.random() * 7,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      </div>
    ))}

    {/* Animated particles */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-blue-400"
        initial={{
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          opacity: 0.2 + Math.random() * 0.3,
        }}
        animate={{
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10 + Math.random() * 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}

    {/* Glowing orbs */}
    <motion.div
      className="absolute bottom-20 right-8 w-32 h-32 rounded-full bg-gradient-to-br from-blue-700/10 to-purple-700/5 blur-xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />

    <motion.div
      className="absolute top-40 left-5 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 blur-xl"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.1, 0.15, 0.1],
      }}
      transition={{ duration: 6, repeat: Infinity, delay: 2 }}
    />
  </div>
);

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
        <div
          className="fixed mt-1 bg-[#1d1e35] border border-blue-500/30 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto"
          style={{
            width: "inherit",
            minWidth: "100%",
            left: 0,
            top: "100%",
            transform: "translateY(0)",
            position: "absolute",
          }}
        >
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

// Export Dropdown Component
export const ExportDropdown = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);

  const exportOptions = [
    { label: "PDF", icon: <FaFilePdf className="mr-2" />, value: "pdf" },
    { label: "Excel", icon: <FaFileExcel className="mr-2" />, value: "excel" },
    { label: "CSV", icon: <FaFileCsv className="mr-2" />, value: "csv" },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoDownloadOutline className="w-4 h-4 mr-1" />
        Export
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 bg-[#1d1e35] border border-blue-500/30 rounded-lg shadow-lg z-50"
            style={{ minWidth: "150px" }}
          >
            {exportOptions.map((option, index) => (
              <div
                key={index}
                className="py-2 px-3 hover:bg-blue-500/10 cursor-pointer text-sm text-gray-300 border-b border-gray-700 flex items-center"
                onClick={() => {
                  onExport(option.value);
                  setIsOpen(false);
                }}
              >
                {option.icon}
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Search Input Component
export const SearchInput = ({ value, onChange, placeholder, label }) => (
  <div className="flex flex-col relative">
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

// Data Table Component
export const DataTable = ({
  columns,
  data,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onSortChange,
  sortConfig = { key: null, direction: "asc" },
  onExport,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Reset selections when data changes
  useEffect(() => {
    setSelectedRows([]);
    setSelectAll(false);
  }, [data]);

  // Toggle row selection
  const toggleRowSelection = (rowId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((id) => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  // Effect to update selectAll state based on selectedRows
  useEffect(() => {
    if (data.length > 0 && selectedRows.length === data.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, data]);

  // Handle export
  const handleExport = (format) => {
    // Get selected rows data
    const exportData =
      selectedRows.length > 0
        ? data.filter((row) => selectedRows.includes(row.id))
        : data;

    if (onExport) {
      onExport(format, exportData);
    } else {
      console.log(
        `Exporting ${
          selectedRows.length > 0 ? "selected" : "all"
        } data to ${format}`
      );
      console.log(exportData);
    }
  };

  // Function to render table data based on loading state
  const renderTableData = () => {
    if (loading) {
      return (
        <tr className="text-nowrap">
          <td
            colSpan={columns.length + 1}
            className="text-center py-8 text-nowrap"
          >
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
            colSpan={columns.length + 1}
            className="text-center py-8 text-gray-400 text-nowrap"
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
        } ${selectedRows.includes(row.id) ? "bg-blue-900/20" : ""}`}
      >
        <td className="py-2 sm:py-3 px-2 text-[13px] sm:text-sm text-center">
          <div className="flex justify-center">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-500 cursor-pointer rounded"
              checked={selectedRows.includes(row.id)}
              onChange={() => toggleRowSelection(row.id)}
            />
          </div>
        </td>
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
    <div className="space-y-3">
      {/* Export and Selection Info */}
      <div className="flex flex-row items-center justify-between  gap-2">
        <div className="text-sm text-gray-400">
          {selectedRows.length > 0 ? (
            <span>
              {selectedRows.length} of {data.length} rows selected
            </span>
          ) : (
            <span>No rows selected</span>
          )}
        </div>
        <ExportDropdown onExport={handleExport} />
      </div>

      {/* Table */}
      <div className="bg-[#141529] border border-blue-500/10 rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-500/20">
            <thead className="bg-[#1d1e35] text-nowrap">
              <tr>
                <th className="py-3 px-3 text-center">
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-500 cursor-pointer rounded"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
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
                      onClick={() =>
                        column.sortable && onSortChange(column.key)
                      }
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
    </div>
  );
};

// Export utilities
export const exportData = (data, format, fileName = "exported-data") => {
  switch (format) {
    case "pdf":
      const pdf = new jsPDF();
      pdf.autoTable({
        head: [Object.keys(data[0])],
        body: data.map((obj) => Object.values(obj)),
      });
      pdf.save(`${fileName}.pdf`);
      break;

    case "excel":
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bot Profit");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
      break;

    case "csv":
      if (data && data.length > 0) {
        const headers = Object.keys(data[0]);
        const csvContent = [
          headers.join(","),
          ...data.map((row) =>
            headers.map((header) => JSON.stringify(row[header])).join(",")
          ),
        ].join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `${fileName}.csv`);
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      break;

    default:
      console.error("Unsupported export format:", format);
  }
};
