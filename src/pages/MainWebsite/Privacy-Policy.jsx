import React from "react";
import Header from "../../components/MainWesiteComponents/Header";
import Footer from "../../components/MainWesiteComponents/Footer";
import "../../../src/mainwebsitestyles.css"

const PrivacyPolicy = () => {
  return (
    <>
      <div className="responsive-padding pt-[200px]">
        <Header />
        <div className="max-w-[1280px] pb-24">
          <div>
            <div className="mb-[40px]">
              <h2 className="font-[Poppins]  mb-[20px] text-[1.875rem] md:text-[3.052rem]">
                Privacy Policy
              </h2>
              <p className="text-[17px] font-[Poppins] ">
                At RippFarm, your privacy is important to us. This Privacy
                Policy outlines how we collect, use, and protect your personal
                information while using our services.
              </p>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl font-[Poppins] ">
                1.Information We Collect
              </p>
              <ul>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  Personal Data: Name, email, wallet address, and contact info.
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  Usage Data: Pages visited, time spent, IP address, device
                  type.
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  Cookies: To enhance user experience and save preferences.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                2.How We Use Your Data
              </p>
              <ul>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  To create and manage user accounts
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  To process rewards, referrals, and transactions
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  To improve our services and support
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  To comply with legal obligations
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                3.Sharing of Information
              </p>
              <ul>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  We do not sell, trade, or rent your data. We may share info
                  only:
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  With trusted partners under strict confidentiality
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  To comply with laws or respond to legal requests
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">4.Data Security </p>
              <ul>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  We use advanced encryption and blockchain-level security
                  protocols to safeguard your information.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">5.User Rights </p>
              <ul>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  You have the right to:
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  Access or update your personal data
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  Delete your account and data
                </li>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  Opt out of marketing communication
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl font-[Poppins] ">
                6.Changes to This Policy{" "}
              </p>
              <ul>
                <li className="text-[17px] mb-[10px] font-[Poppins] ">
                  We may update this policy periodically. Continued use of
                  RippFarm means you accept the changes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
