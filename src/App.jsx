import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ReduxStateManagement/store.js";

import AOS from "aos";
import "aos/dist/aos.css";
import "./css/style.css";

// user panel imports
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WelcomePage from "./pages/WelcomePage";
import PackageDetail from "./pages/Package/PackageDetails.jsx";
import PackageStartPage from "./pages/Package/PackageStartPage.jsx";
import AccountPage from "./pages/Account/AccountPage.jsx";
import BotProfitPage from "./pages/Account/Reports/BotProfit.jsx";
import LevelIncomePage from "./pages/Account/Reports/LevelIncomeReport.jsx";
import DirectTeamPage from "./pages/Account/Reports/DirectTeamPage.jsx";
import DownlineTeamPage from "./pages/Account/Reports/DownlineTeamPage.jsx";
import TransactionReport from "./pages/Account/Reports/TransactionReport.jsx";
import MyEarningReportPage from "./pages/Account/Reports/MyEarningReport.jsx";
import DepositFlow from "./pages/Deposit/DepositPage.jsx";
import ODLClaimPage from "./pages/Odl/OdlPage.jsx";
import LevelPage from "./pages/Level/LevelPage.jsx";
import LivePackagePage from "./pages/Package/LivePackagePage.jsx";

// main website imports
import Loader from "./components/MainWesiteComponents/Loader.jsx";
import Home from "./pages/MainWebsite/Home.jsx";
import About from "./pages/MainWebsite/About.jsx";
import Product from "./pages/MainWebsite/Product.jsx";
import Unique from "./pages/MainWebsite/Unique.jsx";
import Support from "./pages/MainWebsite/Support.jsx";
import Termsandconditions from "./pages/MainWebsite/Terms-and-conditions.jsx";
import Termsofuse from "./pages/MainWebsite/Terms-of-use.jsx";
import PrivacyPolicy from "./pages/MainWebsite/Privacy-Policy.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

// admin panel imports
import MembersList from "./pages/AdminPages/Members/MembersList.jsx";
import CreateSubAdmin from "./pages/AdminPages/subAdmin/CreateSubAdmin.jsx";
import AddQRCode from "./pages/AdminPages/Deposit/AddQRCode.jsx";
import DepositHistory from "./pages/AdminPages/Deposit/DepositHistory.jsx";
import WithdrawalHistory from "./pages/AdminPages/Withdrawal/WithdrawalHistory.jsx";
import DepositBonus from "./pages/AdminPages/Reports/DepositBonusReport.jsx";
import InvitationBonus from "./pages/AdminPages/Reports/InvitationBonus.jsx";
import LevelBonus from "./pages/AdminPages/Reports/LevelBonus.jsx";
import TeamWinningBonus from "./pages/AdminPages/Reports/TeamWinningBonus.jsx";
import RoyaltyBonus from "./pages/AdminPages/Bonanza/RoyaltyBonus.jsx";
import SpecialReward from "./pages/AdminPages/Bonanza/SpecialReward.jsx";
import AdminLogin from "./pages/AdminPages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminPages/AdminDashboard.jsx";
import ReferralLink from "./pages/Account/ReferralProgram/ReferralLink.jsx";
import AccountInfo from "./pages/Account/AccountPrivileges/AccountInfo.jsx";
import AccountChangePassword from "./pages/Account/AccountPrivileges/accountChangePassword.jsx";
import WithdrawPage from "./pages/Account/Withdraw/WithdrawPage.jsx";
import Helpdesk from "./pages/Account/HelpCenter/Helpdesk.jsx";
import AddressDetailPage from "./pages/Account/AccountPrivileges/AddressDetailPage.jsx";
import MyNetwork from "./pages/Account/Reports/MyNetwork.jsx";
import MyHistory from "./pages/Account/Reports/MyHistory.jsx";
import CappingDetailPage from "./pages/Account/Capping/CappingDetailPage.jsx";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  const mainWebsitePaths = [
    "/",
    "/About",
    "/Product",
    "/Unique",
    "/Support",
    "/terms-and-conditions",
    "/Terms-of-use",
    "/Privacy-Policy",
  ];

  const isMainWebsiteRoute = mainWebsitePaths.includes(location.pathname);

  return (
    <Provider store={store}>
      {/* Show loader only on main website routes */}
      {isMainWebsiteRoute && isLoading ? (
        <Loader onLoaderComplete={handleLoaderComplete} />
      ) : (
        <Routes>
          {/* ---------------------- Main Website Routes ---------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Unique" element={<Unique />} />
          <Route path="/Support" element={<Support />} />
          <Route
            path="/terms-and-conditions"
            element={<Termsandconditions />}
          />
          <Route path="/Terms-of-use" element={<Termsofuse />} />
          <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />

          {/*---------------------- User Panel Routes -------------------------*/}
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/welcome" element={<WelcomePage />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route
            path="/user/package/start/:packageType"
            element={<PackageStartPage />}
          />
          <Route
            path="/user/package/:packageType"
            element={<PackageDetail />}
          />
          <Route path="/user/account" element={<AccountPage />} />
          <Route path="/user/account/account-info" element={<AccountInfo />} />
          <Route
            path="/user/account/change-password"
            element={<AccountChangePassword />}
          />
          <Route
            path="/user/account/address-detail"
            element={<AddressDetailPage />}
          />

          {/* User Panel accounts --> Reports section routes */}
          <Route path="/user/report/bot-profit" element={<BotProfitPage />} />
          <Route
            path="/user/report/level-income"
            element={<LevelIncomePage />}
          />
          <Route path="/user/report/direct" element={<DirectTeamPage />} />
          <Route path="/user/report/downline" element={<DownlineTeamPage />} />

          <Route
            path="/user/report/my-earning"
            element={<MyEarningReportPage />}
          />

          {/* User Panel accounts --> transaction section routes */}
          <Route
            path="/user/transaction/transaction-report"
            element={<TransactionReport />}
          />

          <Route path="/user/account/withdraw" element={<WithdrawPage />} />

          <Route path="/user/account/my-network" element={<MyNetwork />} />
          <Route path="/user/account/history" element={<MyHistory />} />
          <Route path="/user/account/capping" element={<CappingDetailPage />} />

          {/* User Panel accounts --> Referral Program section routes */}
          <Route
            path="/user/referral/share-referral-link"
            element={<ReferralLink />}
          />

          {/* User Panel accounts --> Referral Program section routes */}
          <Route path="/user/account/helpdesk" element={<Helpdesk />} />

          <Route path="/user/deposit" element={<DepositFlow />} />
          <Route path="/user/odl" element={<ODLClaimPage />} />
          <Route path="/user/level" element={<LevelPage />} />
          <Route path="/user/packages" element={<LivePackagePage />} />

          {/*--------------------------- admin routes ------------------------*/}
          <Route exact path="/anjo/login" element={<AdminLogin />} />
          <Route
            path="/anjo/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route exact path="/anjo/members-list" element={<MembersList />} />

          <Route
            exact
            path="/anjo/create-subadmin"
            element={<CreateSubAdmin />}
          />
          <Route exact path="/anjo/add-qr" element={<AddQRCode />} />
          <Route
            exact
            path="/anjo/deposit-history"
            element={<DepositHistory />}
          />
          <Route
            exact
            path="/anjo/withdraw-history"
            element={<WithdrawalHistory />}
          />

          {/* admin report routes */}
          <Route exact path="/anjo/deposit-bonus" element={<DepositBonus />} />
          <Route
            exact
            path="/anjo/invitation-bonus"
            element={<InvitationBonus />}
          />
          <Route exact path="/anjo/level-bonus" element={<LevelBonus />} />
          <Route
            exact
            path="/anjo/team-winning-bonus"
            element={<TeamWinningBonus />}
          />
          <Route exact path="/anjo/royalty-bonus" element={<RoyaltyBonus />} />
          <Route
            exact
            path="/anjo/special-reward"
            element={<SpecialReward />}
          />
        </Routes>
      )}
    </Provider>
  );
}

export default App;
