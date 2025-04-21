import React from "react";
import Footer from "../../components/MainWesiteComponents/Footer";
import Header from "../../components/MainWesiteComponents/Header";
import "../../../src/mainwebsitestyles.css"

const Termsofuse = () => {
  return (
    <>
      <div className="responsive-padding pt-[200px]">
        <Header />
        <div className="max-w-[1280px] pb-24">
          <div>
            <div className="mb-[40px]">
              <h2 className="mb-[20px] text-[1.875rem] md:text-[3.052rem]">
                {" "}
                Terms of Use
              </h2>
              {/* <p className='text-[17px]'>Welcome to RippFarm. By using our website, app, or services, you agree to these Terms and Conditions.</p> */}
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                1.Acceptance of Terms
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  By accessing RippFarm, you confirm that you accept these terms
                  and agree to comply with them.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                2.Intellectual Property
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  All content, trademarks, logos, and systems are the
                  intellectual property of RippFarm. Unauthorized use is
                  prohibited.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                3.Third-Party Links
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  Our platform may include links to third-party sites. We are
                  not responsible for the content or practices of external
                  platforms.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                4.Financial Disclaimer
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  RippFarm is not a financial advisor. Users are responsible for
                  understanding crypto investment risks. Past performance is not
                  indicative of future results.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                5.Dispute Resolution
              </p>
              <ul>
                <li className="text-[17px] mb-[10px]">
                  Disputes shall be resolved through arbitration in accordance
                  with applicable digital commerce laws.
                </li>
              </ul>
            </div>

            <div className="mb-[40px]">
              <p className="mb-[10px] text-2xl md:text-3xl">
                For questions or concerns about these policies, contact:
              </p>
              <a href="mailto:support@rippfarm.com">support@rippfarm.com</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Termsofuse;
