import React from "react";
import Header from "../../components/MainWesiteComponents/Header";
import Footer from "../../components/MainWesiteComponents/Footer";
import "../../../src/mainwebsitestyles.css"

const Termsandconditions = () => {
  return (
    <>
      <div className="responsive-padding pt-[200px]">
        <Header />
        <div className="max-w-[1280px] pb-24">
          <div>
            <div className="mb-[40px]">
              <h2 className="mb-[20px] text-[1.875rem] md:text-[3.052rem]">
                {" "}
                Terms & Conditions{" "}
              </h2>
              <p className="text-[17px]">
                Welcome to RippFarm. By using our website, app, or services, you
                agree to these Terms and Conditions.
              </p>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">1.Eligibility</p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  You must be at least 18 years old and legally capable of using
                  our services.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                2.Account Responsibility
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  You are responsible for securing your account and wallet.
                  Never share your login credentials or private keys.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">3.Platform Usage</p>
              <ul>
                <li className="text-[17px] mb-[10px]">Users agree to:</li>
                <li className="text-[17px] mb-[10px]">
                  Use RippFarm for legal purposes only
                </li>
                <li className="text-[17px] mb-[10px]">
                  Not exploit the system for fraud or hacking
                </li>
                <li className="text-[17px] mb-[10px]">
                  Abide by referral and reward policies
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                4.Rewards & Staking
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  Daily rewards are subject to system performance and liquidity.
                  We do not guarantee fixed returns, and performance may vary
                  due to blockchain dynamics.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">5.Termination</p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  RippFarm reserves the right to suspend or terminate accounts
                  that violate our terms, involve fraud, or pose risk to our
                  system.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                6.Limitation of Liability
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  RippFarm shall not be liable for losses due to:
                </li>
                <li>Market volatility</li>
                <li>External hacks or force majeure events</li>
                <li>User errors or unauthorized access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Termsandconditions;
