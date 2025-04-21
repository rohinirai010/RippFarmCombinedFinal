import React from "react";
import FeatureSection from "../../components/MainWesiteComponents/FeatureSection";
import Testimonialcard from "../../components/MainWesiteComponents/Testimonialcard";
import joe from "../../images/joe.png"
import TeamCard from "../../components/MainWesiteComponents/TeamCard";
import Button from "../../components/MainWesiteComponents/Button";
import TabMessageSection from "../../components/MainWesiteComponents/TabMessageSection"
import firstsectionimg from "../../images/tabsection-logo/thirdtabimg.jpg"
import Header from "../../components/MainWesiteComponents/Header";
import Footer from "../../components/MainWesiteComponents/Footer";
import "../../../src/mainwebsitestyles.css"

const Support = () => {
  return (
    <div className="">
      <Header />
      <div className=" responsive-padding">
        <div className="max-w-[1280px] custom-margin pt-[200px]">
          <div className="grid gap-x-12 gap-y-12 grid-cols-1 md:grid-cols-2">
            <div className="component-lockup  max-w-[613px] ">
              <div className="lockup-content mb-[16px]">
                <h2 className="fnt-wt-500 line-ht-99 text-[1.875rem] md:text-[3.052rem]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                  What We<span className="text-color-gradient"> Believe In</span>
                </h2>
              </div>
              <div className="max-width-large ">
                <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                  Yes, we’re all about boosting your sales. Your success energizes us every day.
                </p>


                <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                  But a deeper mission also drives what we do. We see technology disrupting human interactions, fragmenting attention spans, and replacing human work. We are concerned about the trend toward AI that makes decisions opaquely and even “hallucinates”.
                </p>

                <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                  We’re actively choosing a different future. Read on!
                </p>

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
          eyebrow="Courtesy at Scale"
          heading="Honoring the Desire to <span>Control One’s Time</span>"
          content="We prize letting others devote undivided attention to the moments that matter most. Through respect for their time, we allow them to be present, purposeful, and free from pressure."
          subContent="When prospects recognize the courtesy of your strategy, they respond with trust — building bonds that drive long-term value."
          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676eccb3f18c0ab6dae7d54e_Busy-Father-Looking-After-Son-Whilst-Doing-Household-Chores-510019102_727x484.jpeg"
          imageAlt="Father with child"
          isReversed={true}
        />
      </div>


      <div className="our-why bg-[#0a1d45] text-white">
        <FeatureSection
          eyebrow="People First"
          heading="Supporting <span>Human Talent</span>"
          content="Popular culture frames AI as replacing humans. While some job functions are more vulnerable to replacement than others, we view the relationship between AI and humans as an intentional choice."
          subContent="We’re delighted every time we help a team spend less time fruitlessly chasing leads, and more time actively furthering meaningful relationships."
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
          eyebrow="Courtesy at Scale"
          heading="Honoring the Desire to <span>Control One’s Time</span>"
          content="We prize letting others devote undivided attention to the moments that matter most. Through respect for their time, we allow them to be present, purposeful, and free from pressure."
          subContent="When prospects recognize the courtesy of your strategy, they respond with trust — building bonds that drive long-term value."
          buttonText="Let's discuss your strategy"
          buttonLink="#"
          imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676ef552ad7f4e1e69255e81_About%20Us%3A%20Brand%2C%20Legal%2C%20etc.png"
          imageAlt="Father with child"
          isReversed={true}
        />

      </div>


      {/* last section start */}

      <div className="pb-[100px]">
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

      {/* last section end */}

      <Footer />

    </div>
  );
};

export default Support;
