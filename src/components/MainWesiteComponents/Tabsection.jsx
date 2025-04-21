import React, { useState } from 'react';

import Home from "../../images/tabsection-logo/phone.svg";
import Phone from "../../images/tabsection-logo/Education.svg";
import Education from "../../images/tabsection-logo/Education.svg";
import Finance from "../../images/tabsection-logo/Finance.svg";
import Health from "../../images/tabsection-logo/Health.svg";
import Map from "../../images/tabsection-logo/Map.svg";

import firsttab from "../../images/tabsection-logo/firsttab.png";
import secondtab from "../../images/tabsection-logo/secondtab.png";
import thirdtab from "../../images/tabsection-logo/thirdtab.png";
import fourthtab from "../../images/tabsection-logo/fourthtabimg.jpeg";
import fifthtab from "../../images/tabsection-logo/lastatb.jpeg";

// import shapealoneimg from "../../images/tabsection-logo/shape-alone.svg";
import ripplogo from "../../images/ripplogo.png";

const FeatureTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: 'Boosts Local Economies',
      content: ' Empowers farmers with better income opportunities.',
      icon: Map,
      
      image: firsttab,
      messageBlue: "Does tmrw at 10 work?",
      messageWhite: "Yes! I've emailed you a calendar invite for tomorrow at 10 AM Central.",
    },
    {
      title: 'Modernizes Agriculture',
      content: 'Introduces tech-driven, sustainable farming methods',
      icon: Home,
  
      image: secondtab,
      messageBlue: "Hey! Are you free for a call?",
      messageWhite: "Sure! I’ll call you in 5 minutes.",
    },
    {
      title: 'Empowers Communities',
      content: 'Supports smallholders, women, and marginalized farmers.',
      icon: Phone,
      // link: '/education',
      image: thirdtab,
      messageBlue: "What would you charge for a door replacement?",
      messageWhite: "We'll have to come out and take a look at the job, but the estimate is free. Are you available today at 1:00 PM?",
    },
    {
      title: ' Improves Crop Yields',
      content: 'Promotes resilient practices for consistent production.',
      icon: Education,
      // link: '/finance',
      image: fourthtab,
      messageBlue: "Have you checked the new report?",
      messageWhite: "Yes, the Q2 numbers are looking strong!",
    },
    {
      title: 'Fosters Inclusive Growth',
      content: 'Builds equitable partnerships across the value chain.',
      icon: Finance,
      // link: '/finance',
      image: fourthtab,
      messageBlue: "Have you checked the new report?",
      messageWhite: "Yes, the Q2 numbers are looking strong!",
    },
    {
      title: 'Strengthens Climate Resilience',
      content: 'Encourages eco-friendly and adaptive solutions.',
      icon: Health,
      // link: '/health',
      image: fifthtab,
      messageBlue: "Time for your health check-up!",
      messageWhite: "Thanks for the reminder — booked it!",
    },
  ];

  const handleTabClick = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  return (
    <div className='feature-grid_tabs w-tabs'>
      {/* Tab Menu */}
      <div className='feature-grid_tabs-menu w-tab-menu w-node'>
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;

          return (
            <div 
              key={index}
              className={`feature-grid_tab-link cursor-pointer ${isActive ? 'w--current' : ''}`}
              onClick={() => handleTabClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTabClick(index)}
            >
              <div className='feature-grid_tab-icon-wrapper'>
                <div className='icon-wrapper'>
                  <img
                    src={tab.icon}
                    alt={tab.title}
                    className='z-index-2 icon-1x1-xsmall'
                  />
                  <div className="icon_blur"></div>
                </div>
              </div>

              <div className='feature-grid_tab-title'>
                <h5 className='text-[1.563rem]'>{tab.title}</h5>

                <div
                  className='feature-grid_paragraph'
                  style={{
                    maxHeight: isActive ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.6s ease',
                  }}
                >
                  <div className='mt-[4px] margin-tiny'>
                    <p className='text-color-secondary'>{tab.content}</p>
                    <div className='mt-[16px] margin-xsmall'>
                      {/* <div className='button-group'>
                        <a href={tab.link} className='solution_button'>
                          <div>See More</div>
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className='feature-grid_tabs-content w-tab-content' data-aos="slide-up" data-aos-delay="300" data-aos-duration="700" data-aos-easing="ease-in-out">
        <div className='feature-grid_tab-pane w-tab-pane'>
          <div className='feature-grid_image-wrapper'>
            <div className='message-wrapper'>
              <div className='hero_message-wrapper tab'>
                <div className='message-wrapper_component'>
                  <div className='message-wrapper_component relative z-[3] flex flex-col gap-3'>
                    <div className='msg-bubble_wrapper'>
                      <div className='msg blue !text-[12px] lg:text-size-small inline-block bg-[#277fff] rounded-[1rem] max-w-[70%] p-4'>
                        {tabs[activeIndex].messageBlue}
                      </div>
                    </div>
                    <div className='white-msg_wrapper gap-[0.125rem] text-size-medium flex-col justify-start items-end min-w-[20rem] flex relative'>
                      <div className='rounded-[1rem] msg white bg-[#f2f6fa] text-[#11203d] inline-block max-w-[70%] p-4 !text-[12px] lg:text-size-small'>
                        {tabs[activeIndex].messageWhite}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab_image-wrap">
              <img
                src={tabs[activeIndex].image}
                alt={tabs[activeIndex].title}
                className='firsttabimg tab_image'
              />
              <div className="glow middle"></div>
            </div>
            <img src={ripplogo} alt="" className='shape-alone tab_image-background' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTabs;
