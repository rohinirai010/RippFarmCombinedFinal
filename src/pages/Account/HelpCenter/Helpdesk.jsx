import React, { useState, useEffect } from "react";
import {
  Check,
  AlertCircle,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Plus,
  MessagesSquare,
  History,
  ChevronRight,
  Loader2,
} from "lucide-react";
import CommonTable from "../../../components/OverallCommonTable";
import Footer from "../../../partials/Footer";
import { motion } from "framer-motion";

const Helpdesk = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({
    key: "dateTime",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Simulate loading initial data
  useEffect(() => {
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setTickets([
        {
          id: 1,
          subject: "testing complaint",
          userId: "TOP",
          dateTime: "10/24/2020 12:00:55 PM",
          complaintTo: "Admin",
          status: "Pending",
          ticketNo: "8",
        },
        {
          id: 2,
          subject: "Payment Processing Error",
          userId: "MariaS",
          dateTime: "2024-02-22 14:15:00",
          complaintTo: "Billing Team",
          status: "Resolved",
          ticketNo: "TKT-002",
          priority: "Medium",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      key: "subject",
      label: "Subject",
      sortable: true,
      render: (row) => <div className="text-orange-400">{row.subject}</div>,
    },
    { key: "userId", label: "UserID", sortable: true },
    {
      key: "dateTime",
      label: "DateTime",
      sortable: true,
    },
    { key: "complaintTo", label: "Complaint To", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => {
        const statusStyles = {
          Pending: {
            textColor: "text-yellow-800",
            bgColor: "bg-yellow-100",
          },
          Resolved: {
            textColor: "text-green-800",
            bgColor: "bg-green-100",
          },
        };

        const { textColor, bgColor } = statusStyles[row.status] || {
          textColor: "text-gray-500", // Default text color 
          bgColor: "bg-gray-100", // Default background color 
        };

        return (
          <span className={`${textColor} ${bgColor} text-xs px-2 py-1 rounded-full`}>
            {row.status}
          </span>
        );
      },
    },

    { key: "ticketNo", label: "Ticket No", sortable: true },
  ];

  const stats = [
    {
      label: "Total Tickets",
      value: tickets.length,
      icon: AlertCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12% from last week",
    },
    {
      label: "Pending",
      value: tickets.filter((t) => t.status === "Pending").length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "-5% from last week",
    },
    {
      label: "Resolved",
      value: tickets.filter((t) => t.status === "Resolved").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+18% from last week",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const newTicket = {
      id: tickets.length + 1,
      subject: formData.get("subject"),
      userId: formData.get("username"),
      dateTime: new Date().toISOString(),
      complaintTo: "Support Team",
      status: "Pending",
      ticketNo: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      priority: "Medium",
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTickets([...tickets, newTicket]);
    setLoading(false);
    setActiveTab("dashboard");

    // Show success message
    alert("Ticket submitted successfully!");
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((row) => row.id)));
    }
  };

  const handleViewTicket = (id) => {
    // Implement view ticket details
    console.log("View ticket:", id);
  };

  const handleViewHistory = (id) => {
    // Implement view ticket history
    console.log("View history:", id);
  };

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`inline-flex items-center px-2 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
        activeTab === id
          ? "bg-blue-600 text-white"
          : "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
      }`}
    >
      <Icon className="w-4 h-4 mr-1 sm:mr-2" />
      {label}
      {count !== undefined && (
        <span
          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            activeTab === id
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      searchTerm === "" ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || ticket.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Export handler
  const handleExport = (type) => {
    const selectedData =
      selectedRows.size > 0
        ? filteredData.filter((row) => selectedRows.has(row.id))
        : filteredData;

    // Format data for export by removing unnecessary fields
    const formattedData = selectedData.map(({ id, status, ...row }) => ({
      ...row,
      totalCapital: `$${row.totalCapital}`, // Format currency
    }));

    switch (type) {
      case "copy":
        const success = copyToClipboard(formattedData);
        if (success) {
          toast.success("Copied to clipboard!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        break;

      case "excel":
        exportToExcel(formattedData, "referrals.xlsx");
        break;
      case "pdf":
        exportToPDF(formattedData, "referrals.pdf");
        break;
    }
  };

  return (
   

        <main className="max-w-xl mx-auto h-screen bg-gradient-to-b from-[#000621] via-[#0a0e2e] to-[#141539]">
          <div className="grow px-3 sm:px-6 py-6 ">
            <div className="flex flex-col gap-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Help Desk</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {activeTab === "dashboard" ? "Dashboard" : "New Ticket"}
                </span>
              </nav>

              {/* Page Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Support Center
                  </h1>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage and track your support tickets
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("new")}
                  className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Ticket
                </button>
              </div>

              {/* Navigation */}
              <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                <TabButton
                  id="dashboard"
                  label="Dashboard"
                  icon={AlertCircle}
                  count={tickets.length}
                />
                <TabButton id="new" label="Submit New Ticket" icon={Plus} />
              </div>

              {activeTab === "dashboard" && (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-2 shadow-sm"
                      >
                        <div className="flex items-center gap-4 sm:gap-3">
                          <div
                            className={`p-2 sm:p-1 rounded-full ${stat.bgColor} ${stat.color}`}
                          >
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                              {stat.value}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {stat.change}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Search and Filter */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4  mb-20">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by ticket ID or subject..."
                          className="w-full pl-10 pr-4 py-2 text-xs sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-2 sm:px-4 text-xs sm:text-base py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      </div>
                    ) : (
                      <CommonTable
                        data={filteredTickets}
                        columns={columns}
                        selectedRows={selectedRows}
                        onRowSelect={handleRowSelect}
                        selectAll={selectedRows.size === tickets.length}
                        onSelectAll={handleSelectAll}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        onExport={handleExport}
                      />
                    )}
                  </div>
                </>
              )}

              {activeTab === "new" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Complaint Registration Form
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Member Name
                        </label>
                        <input
                          type="text"
                          name="memberName"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Mobile No
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          EmailID
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium  text-gray-700 dark:text-gray-300 mb-1">
                          Upload File
                        </label>
                        <input
                          type="file"
                          name="file"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Grievance Description
                        </label>
                        <textarea
                          name="description"
                          rows="2"
                          required
                          placeholder="Enter Ticket Details"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab("dashboard")}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 bg-indigo-500 hover:bg-indigo-600 text-white border border-indigo-500 dark:bg-indigo-600 dark:border-indigo-700 dark:hover:bg-indigo-700 transition-colors"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Add Ticket"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
           {/* Footer */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="z-10"
      >
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
        </main>
     
  );
};

export default Helpdesk;
