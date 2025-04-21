import React from "react";
import FeatureSection from "../../components/MainWesiteComponents/FeatureSection";
import Testimonialcard from "../../components/MainWesiteComponents/Testimonialcard";
import joe from "../../images/joe.png"
import TeamCard from "../../components/MainWesiteComponents/TeamCard";
import Button from "../../components/MainWesiteComponents/Button";
import TabMessageSection from "../../components/MainWesiteComponents/TabMessageSection"
import firstsectionimg from "../../images/tabsection-logo/thirdtabimg.jpg"
import Footer from "../../components/MainWesiteComponents/Footer";
import Header from "../../components/MainWesiteComponents/Header";
import "../../../src/mainwebsitestyles.css"

const About = () => {
  return (
    <div className="bg-[#11203d]">
      <Header />
      <div className=" responsive-padding">
        <div className="max-w-[1280px] custom-margin pt-[200px]">
          <div className="grid gap-x-12 gap-y-12 grid-cols-1 md:grid-cols-2">
            <div className="component-lockup  max-w-[613px] ">
              <div className="lockup-content mb-[16px]">
                <h2 className="fnt-wt-500 line-ht-99 text-[1.875rem] md:text-[3.052rem] font-[Poppins] " data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                Blockchain-Powered. XRP-Fueled.<span className="text-color-gradient">  Community-Driven</span>
                </h2>
              </div>
              <div className="max-width-large ">
                <p className="text-size-medium mb-[32px] font-[Poppins] " data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                RippleFarm is a next-generation investment and validator platform built on the XRP Ledger (XRPL). Our mission is to deliver instant, low-cost, and highly secure global transactions while enabling everyone to participate in a decentralized, borderless financial system. As a future validator on the XRPL, we support network integrity and champion Ripple’s vision for a truly global economy.
                </p>


                {/* <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                  But a deeper mission also drives what we do. We see technology disrupting human interactions, fragmenting attention spans, and replacing human work. We are concerned about the trend toward AI that makes decisions opaquely and even “hallucinates”.
                </p>

                <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                  We’re actively choosing a different future. Read on!
                </p> */}

                <div>
                  <Button
                    text="Tell us your “why”"
                    link="#"
                    className='btnSecondary'
                    data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out"
                  />
                </div>
              </div>
            </div>
            <div>
              < TabMessageSection
                tabImageSrc={firstsectionimg}
              />
            </div>
          </div>

        </div>

      </div>



      <div className="our-why bg-[#0a1d45] text-white">
        <FeatureSection
          eyebrow="Global Impact"
          heading="At RippleFarm, we’re not just building a platform— <span>we’re shaping the future of global finance by:</span>"
          content="Promoting decentralized finance via the XRP Ledger

          Driving financial inclusion with instant cross-border transactions
          
          Enhancing global liquidity and scalability
          
          Empowering individuals and enterprises through blockchain innovation"

          
          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676eccb3f18c0ab6dae7d54e_Busy-Father-Looking-After-Son-Whilst-Doing-Household-Chores-510019102_727x484.jpeg"
          imageAlt="Father with child"
          isReversed={true}
        />
      </div>


      <div className="our-why bg-[#0a1d45] text-white">
        <FeatureSection
          eyebrow="Why Choose RippleFarm"
          heading="Validator on XRPL – Trusted,  <span>decentralized, and secure</span>"
          content="On-Demand Liquidity – Instant, borderless payments with no pre-funding Daily XRP Rewards – Earn passive income daily Global Accessibility – Open to everyone, everywhere Referral & Community Bonuses – Grow your earnings as you grow the network
          Enterprise-Grade Security – Built on XRPL’s robust infrastructure"
 
          buttonText="Unleash Your Team's Potential"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676eec537826ddda42605935_Office%2C-night-and-woman-with-thinking-for-phone-call-2188035603_818x431%20crop.jpeg"
          imageAlt="Father with child"
          isReversed={false}
        />
      </div>


      <div className="TestimonialCardSection responsive-padding">
        <Testimonialcard
          image={joe}
          name="Joe Malmuth"
          position="Chief Development Officer"
          company="Batteries Plus"
          paragraphs={["RippFarm is a force multiplier. It makes our sales team much, much more effective at what they do.”"]}
        />
      </div>


      <div className="our-why bg-[#0a1d45] text-white">
        <FeatureSection
          eyebrow="Our Mission"
          heading="Revolutionizing finance with speed, security, <span>and decentralization.</span>"
          content="We aim to strengthen the XRP ecosystem by:Providing real-time liquidity via On-Demand Liquidity (ODL) Becoming a trusted validator on the XRPL Offering consistent XRP rewards Bridging the gap between traditional finance and blockchain Supporting community-first growth through transparent operations"
          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676ef552ad7f4e1e69255e81_About%20Us%3A%20Brand%2C%20Legal%2C%20etc.png"
          imageAlt="Father with child"
          isReversed={true}
        />

      </div>


      {/* last section start */}

      <div className="pb-[50px]">
      <div className="max-w-[1280px] custom-margin responsive-padding">
        <div className="  py-[60px]">
          <div className="component-lockup   max-w-[613px]">
            <div className="lockup-content mb-[16px]">
              <h2 className="fnt-wt-500 line-ht-99 text-[1.875rem] md:text-[3.052rem] font-[Poppins] " data-aos="slide-up" data-aos-delay="300" data-aos-duration="700" data-aos-easing="ease-in-out">
              Join the <span className="text-color-gradient">XRP Revolution</span>
              </h2>
            </div>
            <div className="max-width-large custom-margin " data-aos="slide-up" data-aos-delay="350" data-aos-duration="750" data-aos-easing="ease-in-out">
              <p className="text-size-medium mb-[20px] font-[Poppins] ">
              Welcome to RippleFarm—where innovation meets opportunity. We’re part of a global movement transforming how money moves, grows, and empowers people. At RippleFarm, blockchain technology and smart investing come together to offer you a secure, seamless, and rewarding experience. Whether you're a crypto enthusiast or a financial visionary, you’ve found your place. Let’s build the future of finance—together.
              </p>

            </div>
          </div>
        </div>

        <div className="">

          <div className="grid gap-x-12 gap-y-12 grid-cols-1 md:grid-cols-2">
            <TeamCard
              profileUrl="https://www.RippFarm/team/tom-ngo"
              imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe07262/675110ca34f3a96ef6381656_Tom%20Ngo%20LinkedIn%20Image.jpeg"
              name="Tom Ngo"
              title="Founder & CEO"
              linkedinUrl="https://www.linkedin.com/in/tomngo/"
            />

            <TeamCard
              profileUrl="https://www.RippFarm/team/brian-kernohan"
              imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe07262/67511121353880729e74fc64_Brian%20Kernohan%20Image.jpeg"
              name="Brian Kernohan"
              title="Chief Revenue Officer"
              linkedinUrl="https://www.RippFarm/team/brian-kernohan"
            />
          </div>

        </div>

      </div>

      </div>

     

      {/* last section end */}

<Footer />
    </div>
  );
};

export default About;
