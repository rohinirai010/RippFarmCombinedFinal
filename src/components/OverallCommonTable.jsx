import React from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const OverallCommonTable = ({
  data,
  columns,
  selectedRows,
  onRowSelect,
  selectAll,
  onSelectAll,
  sortConfig,
  onSort
}) => {
  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Checkbox component matching the original design
  const Checkbox = ({ checked, onChange, className = "" }) => (
    <div
      className={`w-4 h-4 border-2 rounded-md cursor-pointer flex items-center justify-center transition-colors ${
        checked
          ? "bg-green-600 border-green-700 shadow-sm shadow-green-400 dark:shadow-amber-100"
          : "bg-white border-gray-300 hover:border-blue-500"
      } ${className}`}
      onClick={onChange}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </div>
  );

  // Determine if the column is sortable
  const isSortable = (column) => {
    return column.sortable !== false; // Sortable by default unless explicitly set to false
  };

  return (
    <div className="overflow-x-auto rounded-t-xl">
      <table className="w-full">
        <thead className="w-full bg-gray-200 dark:bg-gray-700">
          <tr>
            {/* Selection column */}
            <th className="px-2 py-[10px] text-xs font-medium text-gray-500 dark:text-gray-300">
              <Checkbox
                checked={selectAll}
                onChange={onSelectAll}
                className="mx-auto"
              />
            </th>
            {/* Data columns */}
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-2 py-[10px] text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider whitespace-nowrap"
                onClick={() => isSortable(column) && onSort(column.key)}
                style={{ cursor: isSortable(column) ? 'pointer' : 'default' }}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {isSortable(column) && <SortIcon column={column.key} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row) => (
            <tr
              key={row.id}
              className="w-full text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {/* Selection cell */}
              <td className="px-2 py-[9px] whitespace-nowrap">
                <Checkbox
                  checked={selectedRows.has(row.id)}
                  onChange={() => onRowSelect(row.id)}
                  className="mx-auto"
                />
              </td>
              {/* Data cells */}
              {columns.map((column) => (
                <td key={column.key} className="px-2 py-[9px] whitespace-nowrap">
                  {column.render ? (
                    column.render(row)
                  ) : (
                    <span
                      className={column.className ? 
                        typeof column.className === 'function' ? 
                          column.className(row[column.key]) : 
                          column.className 
                        : ''}
                    >
                      {row[column.key]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverallCommonTable;