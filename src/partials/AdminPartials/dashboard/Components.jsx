import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  BarChart,
  Bell,
  Check,
  ChevronRight,
  Database,
  DollarSign,
  FileText,
  Gift,
  Lock,
  MessageSquare,
  PieChart,
  Scissors,
  Settings,
  Shield,
  Star,
  TrendingUp,
  User,
  UserCheck,
  Users,
  XCircle,
  Zap,
} from "lucide-react";

// Income Overview Card Component
export const IncomeCard = ({ title, amount, icon, change, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
        <div className={`p-2 rounded-full ${colorClasses[color] || colorClasses.blue}`}>
          {icon}
        </div>
      </div>
      <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
        {amount}
      </div>
      {change && (
        <div className="mt-2 text-xs flex items-center">
          <span className={change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            {change >= 0 ? "+" : ""}{change}% from previous period
          </span>
        </div>
      )}
    </div>
  );
};

// System Summary Card Component 
export const SystemSummaryCard = ({ title, value, icon, type = "default", subtitle }) => {
  const getCardStyle = () => {
    switch (type) {
      case "success":
        return "border-l-4 border-green-500";
      case "warning":
        return "border-l-4 border-yellow-500";
      case "danger":
        return "border-l-4 border-red-500";
      case "info":
        return "border-l-4 border-blue-500";
      default:
        return "";
    }
  };

  return (
    <div className={` bg-white h-full dark:bg-gray-800 rounded-lg p-2 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 ${getCardStyle()}`}>
      <div className="flex items-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">{value}</div>
          {subtitle && <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
};

// Alert Card Component
export const AlertCard = ({ 
  title, 
  color, 
  icon, 
  actionText = "View All",
  showMetrics = false,
  metrics = { today: 0, weekly: 0, monthly: 0 }
}) => {
  const bgColors = {
    red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  };

  const textColors = {
    red: "text-red-700 dark:text-red-300",
    amber: "text-amber-700 dark:text-amber-300",
    green: "text-green-700 dark:text-green-300",
    blue: "text-blue-700 dark:text-blue-300",
  };

  return (
    <div className={`p-4 rounded-lg border h-full flex flex-col ${bgColors[color] || bgColors.blue}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className={`mr-3 ${textColors[color] || textColors.blue}`}>{icon}</div>
          <div className="font-medium">{title}</div>
        </div>
        <div className={`flex items-center text-sm font-medium ${textColors[color] || textColors.blue}`}>
          {actionText}
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
      
      {showMetrics ? (
        <div className="mt-2 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Today</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Weekly</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Monthly</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mt-1">
            <div className="text-xl font-bold">{metrics.today}</div>
            <div className="text-xl font-bold">{metrics.weekly}</div>
            <div className="text-xl font-bold">{metrics.monthly}</div>
          </div>
        </div>
      ) : (
        <div className="text-2xl font-bold mt-1 flex-1 flex items-center">{metrics.total || 0}</div>
      )}
    </div>
  );
};

// Performance Card Component
export const PerformanceCard = ({ title, userName, value, icon, rank }) => {
  return (
    <Link to={`/user-performance/${userName.replace(/\s+/g, '-').toLowerCase()}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
          <div className="flex items-center">
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2 py-1 rounded-full">
              #{rank}
            </span>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
            {icon || <User size={18} className="text-indigo-600 dark:text-indigo-400" />}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{userName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{value}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Live Activity Feed Component
export const LiveActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "registration":
        return <User size={16} className="text-green-500" />;
      case "deposit":
        return <Database size={16} className="text-blue-500" />;
      case "withdrawal":
        return <Scissors size={16} className="text-purple-500" />;
      case "admin":
        return <Shield size={16} className="text-amber-500" />;
      case "support":
        return <MessageSquare size={16} className="text-pink-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const getActivityLink = (type) => {
    switch (type) {
      case "registration":
        return "/user-registrations";
      case "deposit":
        return "/deposits";
      case "withdrawal":
        return "/withdrawals";
      case "admin":
        return "/admin-logs";
      case "support":
        return "/support-tickets";
      default:
        return "/activity";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Live Activity</h2>
        <Link to="/all-activities" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          View All
        </Link>
      </div>
      
      <div className="space-y-3 p-2">
        {activities.map((activity, index) => (
          <Link key={index} to={getActivityLink(activity.type)} className="block">
            <div className="flex items-start p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">{activity.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.description}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Withdrawal & Deposit Stats Dashboard Component
export const WithdrawalDepositStats = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Withdrawal & Deposit Overview</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/pending-withdrawals" className="block">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Pending Withdrawals</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">$4,235</div>
            <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center mt-1">
              <AlertTriangle size={12} className="mr-1" />
              <span>12 requests waiting</span>
            </div>
          </div>
        </Link>
        
        <Link to="/approved-withdrawals" className="block">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Approved Today</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">$1,890</div>
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <Check size={12} className="mr-1" />
              <span>8 completed</span>
            </div>
          </div>
        </Link>
        
        <Link to="/declined-withdrawals" className="block">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Declined</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">$320</div>
            <div className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
              <XCircle size={12} className="mr-1" />
              <span>2 rejected</span>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Quick Actions</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Process pending withdrawals</div>
          </div>
          <Link to="/review-withdrawals">
            <button className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors">
              Review
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// System Controls Component
export const SystemControlsCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">System Controls</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <Link to="/roi-management">
          <button className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2">ROI Process</div>
              <div className="flex-shrink-0 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
                Active
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last run: 2 hours ago</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to manage
            </div>
          </button>
        </Link>
        
        <Link to="/maintenance-settings">
          <button className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2">Maintenance Mode</div>
              <div className="flex-shrink-0 flex items-center justify-center bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs px-2 py-0.5 rounded-full">
                Off
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">System fully operational</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to enable
            </div>
          </button>
        </Link>
        
        <Link to="/gateway-status">
          <button className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2">Gateway Status</div>
              <div className="flex-shrink-0 flex items-center justify-center bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full">
                Live
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Requires review</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to process
            </div>
          </button>
        </Link>
    
        <Link to="/announcements">
          <button className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2">Announcements</div>
              <div className="flex-shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                Draft
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 pending notification</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to publish
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

// Income Overview Dashboard Component
export const IncomeOverviewDashboard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Income Distribution</h2>
        <div className="flex flex-row gap-2">
          <button className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 md:px-3 py-1 rounded-xl md:rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
            Today
          </button>
          <button className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 md:px-3 py-1 rounded-xl md:rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
            This Week
          </button>
          <button className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 md:px-3 py-1 rounded-xl md:rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
            This Month
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <IncomeCard 
          title="Level Income" 
          amount="$12,675" 
          icon={<BarChart size={18} />}
          change={2.5}
          color="blue"
        />
        <IncomeCard 
          title="ROI Income" 
          amount="$28,450" 
          icon={<PieChart size={18} />}
          change={5.7}
          color="green"
        />
        <IncomeCard 
          title="Direct Income" 
          amount="$8,920" 
          icon={<Users size={18} />}
          change={-1.2}
          color="purple"
        />
        <IncomeCard 
          title="ODL Income" 
          amount="$5,340" 
          icon={<TrendingUp size={18} />}
          change={3.4}
          color="indigo"
        />
        <IncomeCard 
          title="Bounty Income" 
          amount="$1,275" 
          icon={<Gift size={18} />}
          change={12.3}
          color="orange"
        />
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-sm opacity-80 mb-3">Total Distributed</div>
          <div className="text-2xl font-bold mb-2">$56,660</div>
          <div className="text-xs opacity-80 flex items-center">
            <TrendingUp size={12} className="mr-1" />
            <span>+4.2% from last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Use this to render the Performance & Engagement section
export const PerformanceEngagementSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Top Performers</h2>
        <div className="flex space-x-2">
          <button className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
            Today
          </button>
          <button className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-colors">
            Week
          </button>
          <button className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-colors">
            Month
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/user-performance/sarah-johnson">
          <PerformanceCard 
            title="Top Earner" 
            userName="Sarah Johnson" 
            value="$3,240 earned today" 
            icon={<Award size={18} className="text-amber-500" />}
            rank="1"
          />
        </Link>
        <Link to="/user-performance/michael-chen">
          <PerformanceCard 
            title="Most Active Referrer" 
            userName="Michael Chen" 
            value="12 new referrals today" 
            icon={<UserCheck size={18} className="text-green-500" />}
            rank="1"
          />
        </Link>
        <Link to="/user-performance/team-apex">
          <PerformanceCard 
            title="Fastest Growing Team" 
            userName="Team Apex" 
            value="38 new members this week" 
            icon={<Users size={18} className="text-blue-500" />}
            rank="1"
          />
        </Link>
        <Link to="/user-performance/robert-frost">
          <PerformanceCard 
            title="Top ROI Earner" 
            userName="Robert Frost" 
            value="$1,890 ROI income today" 
            icon={<Star size={18} className="text-purple-500" />}
            rank="1"
          />
        </Link>
      </div>
    </div>
  );
};