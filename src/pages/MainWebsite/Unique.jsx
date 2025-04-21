import React from "react";
import FeatureSection from "../../components/MainWesiteComponents/FeatureSection";
import Testimonialcard from "../../components/MainWesiteComponents/Testimonialcard";
import joe from "../../images/joe.png"
// import TeamCard from "../components/TeamCard";
import Button from "../../components/MainWesiteComponents/Button";
import TabMessageSection from "../../components/MainWesiteComponents/TabMessageSection"
import firstsectionimg from "../../images/tabsection-logo/thirdtabimg.jpg";
import ComparisonTable from "../../components/MainWesiteComponents/ComparisonTable";
import Header from "../../components/MainWesiteComponents/Header";
import Footer from "../../components/MainWesiteComponents/Footer";
import "../../../src/mainwebsitestyles.css"

const Resources = () => {
  return (
    <div className="">
<Header />
      
<div>
        <div className="responsive-padding">
        <div className="pt-[150px] pb-[70px]">
            <ComparisonTable  />
            </div>
        </div>
      </div>
      <div className=" responsive-padding">
        <div className="max-w-[1280px] custom-margin pt-[30px] md:pt-[100px]">
          <div className="grid gap-x-12 gap-y-12 grid-cols-1 md:grid-cols-2" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
            <div className="component-lockup  max-w-[613px] ">
              <div className="lockup-content mb-[16px]">
                <h2 className="fnt-wt-500 line-ht-99 text-[1.875rem] md:text-[3.052rem]" >
                  What Makes <span className="text-color-gradient"> Ripp Farm Unique</span>
                </h2>
              </div>
              <div className="max-width-large ">
                <p className="text-size-medium mb-[32px]">
                  Not Just Another Crypto Platform—A Movement.
                </p>


                <p className="text-size-medium mb-[32px]">
                  At Ripp Farm, we don’t just follow trends—we set them. While others are focused on hype, we’re focused on impact. This page is a celebration of what makes us different, bold, and future-ready.
                </p>



                <div>
                  <Button
                    text="Tell us your “why”"
                    link="#"
                    className='btnPrimary'
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



      <div className="our-why bg-[#0a1d45] text-white" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
        <FeatureSection
          eyebrow="Built on Purpose, Not Just Profit"
          heading="Community-first. <span>Transparent. Ethical.</span>"
          content="We’re more than a tech company—we’re a purpose-driven initiative aiming to reshape global finance. Everything we build at Ripp Farm is rooted in creating financial freedom and fairness.

        No hidden fees
        Transparent reward system
        Real community support and governance"
          // subContent="When prospects recognize the courtesy of your strategy, they respond with trust — building bonds that drive long-term value."
          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676eccb3f18c0ab6dae7d54e_Busy-Father-Looking-After-Son-Whilst-Doing-Household-Chores-510019102_727x484.jpeg"
          imageAlt="Father with child"
          isReversed={true}
        />
      </div>


      <div className="our-why bg-[#0a1d45] text-white" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
        <FeatureSection
          eyebrow="Hybrid Ecosystem"
          heading="Validator + Rewards Platform
           <span>The Best of Both Worlds.</span>"

          content="Most platforms are either validators or passive income hubs—we’re both. Our dual-layer model combines XRPL validator services with a daily XRP reward system, offering unmatched utility and engagement."

          subContent="Validator node +
           Daily XRP rewards +
          On-demand liquidity = Game-changer"

          buttonText="Unleash Your Team's Potential"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676eec537826ddda42605935_Office%2C-night-and-woman-with-thinking-for-phone-call-2188035603_818x431%20crop.jpeg"
          imageAlt="Father with child"
          isReversed={false}
        />
      </div>


      <div className="TestimonialCardSection responsive-padding" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
        <Testimonialcard
          image={joe}
          name="Joe Malmuth"
          position="Chief Development Officer"
          company="Batteries Plus"
          paragraphs={["RippFarm is a force multiplier. It makes our sales team much, much more effective at what they do.”"]}
        />
      </div>


      <div className="our-why bg-[#0a1d45] text-white" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
        <FeatureSection
          eyebrow="Security Meets Simplicity"
          heading="Military-grade security with <span>beginner-friendly UI.</span>"
          content="We don’t sacrifice usability for safety. Whether you’re a seasoned investor or just starting, Ripp Farm is built for everyone—with intuitive design and enterprise-level security."
          subContent="Multi-sig wallets
          Regular audits
          Simple dashboard & wallet integrations"

          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676ef552ad7f4e1e69255e81_About%20Us%3A%20Brand%2C%20Legal%2C%20etc.png"
          imageAlt="Father with child"
          isReversed={true}
        />

      </div>

      <div className="our-why bg-[#0a1d45] text-white" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
      <FeatureSection
          eyebrow="15-Minute Smart Deposit Window"
          heading="Innovative, time-locked  <span>payment feature.</span>"
          content="Our custom deposit system generates a unique XRP wallet address with a 15-minute validity window—a feature designed for safety, speed, and peace of mind."
          subContent="Eliminates stale transactions,
          Prevents double payments,
          Activates instantly upon confirmation"

          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676ef552ad7f4e1e69255e81_About%20Us%3A%20Brand%2C%20Legal%2C%20etc.png"
          imageAlt="Father with child"
          isReversed={false}
        />

      </div>


      <div className="our-why bg-[#0a1d45] text-white" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
      <FeatureSection
          eyebrow=" Real People, Real Impact"
          heading="We’re not hiding behind avatars. <span>payment feature.</span>"
          content="Our team is public, our vision is clear, and our community is growing. From India to the world—we are bringing real value to real people through education, opportunity, and blockchain-powered growth."
          subContent=" Public team bios,
           Live AMAs and webinars,
          Focus on grassroots adoption"

          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676ef552ad7f4e1e69255e81_About%20Us%3A%20Brand%2C%20Legal%2C%20etc.png"
          imageAlt="Father with child"
          isReversed={true}
        />

      </div>


      {/* last section start */}

      <div className="pb-[100px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="900" data-aos-easing="ease-in-out">
        <div className="max-w-[1280px] responsive-padding  py-[60px]">
          <div className="component-lockup   max-w-[613px]">
            <div className="lockup-content mb-[16px]">
              <h2 className="fnt-wt-500 line-ht-99 text-[1.875rem] md:text-[3.052rem]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="700" data-aos-easing="ease-in-out">
                Listening to  <span className="text-color-gradient">Your Needs</span>
              </h2>
            </div>
            <div className="max-width-large custom-margin " data-aos="slide-up" data-aos-delay="350" data-aos-duration="750" data-aos-easing="ease-in-out">
              <p className="text-size-medium mb-[20px]">
                It’s deeply important to us to apply rigor from our respective disciplines. Even more crucial is using our ears: we are professional listeners.
              </p>

              <p className="text-size-medium">
                We will hear you out as if you were our only customer, yet apply our product insights from a hundred others.
              </p>
            </div>
          </div>
        </div>

        <div className="responsive-padding ">

          {/* <div className="grid gap-x-12 gap-y-12 grid-cols-1 md:grid-cols-2">
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
          </div> */}

        </div>

      </div>

      {/* last section end */}

<Footer />
    </div>
  );
};

export default Resources;
