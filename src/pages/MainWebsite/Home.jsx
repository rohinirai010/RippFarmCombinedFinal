import React from 'react';
import ContentSlider from "../../components/MainWesiteComponents/ContentSlider";
import Cardcomponent from "../../components/MainWesiteComponents/Cardcomponent";
import cardsvg1 from "../../images/cardsvg/card-svg-1.svg";
import cardsvg2 from "../../images/cardsvg/card-svg-2.svg";
import cardsvg3 from "../../images/cardsvg/card-svg-3.svg";
import cardsvg4 from "../../images/cardsvg/card-svg-4.svg";
import cardsvg5 from "../../images/cardsvg/card-svg-5.svg";
import cardsvg6 from "../../images/cardsvg/card-svg-6.svg";
import Button from "../../components/MainWesiteComponents/Button";
import Tabsection from "../../components/MainWesiteComponents/Tabsection";
import Mike from "../../images/Mike_2.png";
import Casestudycard from '../../components/MainWesiteComponents/Casestudycard';
import casestudy1 from "../../images/casestudycard/case1.jpg"
import casestudy2 from "../../images/casestudycard/case2.jpg"
import casestudy3 from "../../images/casestudycard/case3.jpg"
import Logoslider from '../../components/MainWesiteComponents/Logoslider';
import TestimonialCard from '../../components/MainWesiteComponents/Testimonialcard';
import "../../../src/mainwebsitestyles.css"
import Header from '../../components/MainWesiteComponents/Header';
import Footer from '../../components/MainWesiteComponents/Footer';
import "../../../src/mainwebsitestyles.css"

// common cards

const cardData = [
  {
    imageSrc: cardsvg1,
    heading: " Delayed Settlements",
    text: "Settle transactions in seconds, not days. Say goodbye to cross-border delays and high conversion losses."
  },
  {
    imageSrc: cardsvg2,
    heading: "Limited Accessibility",
    text: "Reach unbanked and remote users with blockchain-powered accessibility."
  },
  {
    imageSrc: cardsvg3,
    heading: "Intense Market Competition",
    text: "Speed is power. Win deals faster with instant crypto rewards and seamless transactions."
  },
  {
    imageSrc: cardsvg4,
    heading: "Underutilized Teams",
    text: "Automate repetitive tasks, letting your team focus on strategy—not manual follow-ups."
  },
  {
    imageSrc: cardsvg5,
    heading: "Fragmented Data Sources",
    text: "Unify payment data for better insights, faster decision-making, and reduced fraud risk."
  },
  {
    imageSrc: cardsvg6,
    heading: "Long Transaction Cycles",
    text: "Reduce turnaround times and increase trust through transparent, immutable transactions."
  }
];

const Home = () => {
  return (
    <div>
      <Header />
      <div className="pt-[182px] responsive-padding mb-16">
        <div className="custom-max-w custom-margin ">
          <div className="mb-6">
            <h1 className="text-[2.4375rem] md:text-[3.875rem] MainTitle fnt-wt-600 text-center line-ht-99 text-white font-['Poppins']" data-aos="slide-up" data-aos-delay="30" data-aos-duration="700" data-aos-easing="ease-in-out">
              Accelerate Crypto Growth with
              <span className="text-color-gradient"> Real-Time XRP Rewards & Liquidity</span>
            </h1>
          </div>

          <div className="max-width-large custom-margin text-center" data-aos="slide-up" data-aos-delay="200" data-aos-duration="800" data-aos-easing="ease-in-out">
            <p className="text-size-medium text-white font-['Poppins']">
              RippleFarm empowers the XRP ecosystem by providing instant, low-cost global transactions and daily XRP rewards. As an upcoming validator on the XRP Ledger, we ensure transparency, security, and seamless liquidity—making your financial journey faster, smarter, and more rewarding.
            </p>
          </div>
        </div>
      </div>

      {/* second section slider section start*/}
      <div className="sliderSection relative" data-aos="fade-up" data-aos-delay="300" data-aos-duration="600" data-aos-easing="ease-in-out">
        <ContentSlider />
        <div className='glow-25'></div>
      </div>
      {/* second section  slider section end*/}


      {/* third section slider section start */}
      <div className="TestimonialCardSection mt-[80px] responsive-padding">


        <TestimonialCard
          image={Mike}
          name="Anaya Verma"
          position="Global Operations Lead"
          company="FinGlobe International"
          paragraphs={["“RippleFarm transformed the way we manage cross-border payments. With daily XRP rewards and zero pre-funding, we’ve scaled faster and more securely than ever.”"]}
        />

      </div>
      {/* third section-- slider section end */}



      {/* fourth section card section start */}
      <div className="section_feature-cards responsive-padding mt-[110px]">
        <div className="max-w-[1280px] custom-margin">
          <div className="component-lockup text-center custom-margin max-w-[613px]">
            <div className="lockup-content mb-[16px]">
              <h2 className="fnt-wt-500 line-ht-99 text-[1.875rem] md:text-[3.052rem] font-['Poppins']" data-aos="slide-up" data-aos-delay="300" data-aos-duration="700" data-aos-easing="ease-in-out">
                Overcome Global Payment Barriers <span className="text-color-gradient">with RippleFarm</span>
              </h2>
            </div>
            <div className="max-width-large custom-margin text-center" data-aos="slide-up" data-aos-delay="350" data-aos-duration="750" data-aos-easing="ease-in-out">
              <p className="text-size-medium font-['Poppins'] " >
                Traditional payment systems slow down your business growth. RippleFarm tackles these major pain points:
              </p>
            </div>
          </div>

          {/* Dynamically render the cards */}
          <div className="Cardwrapper-component relative mt-[64px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
              {cardData.map((card, index) => (
                <Cardcomponent
                  key={index}
                  imageSrc={card.imageSrc}
                  heading={card.heading}
                  text={card.text}
                />
              ))}
            </div>
            <div className="glow-25"></div>
          </div>
        </div>
      </div>
      {/* fourth section - card section end*/}



      {/* fifth section -logoslider start */}
      <div className='padding-section-medium responsive-padding'>
        <div className='hedingTitletxt'>
          <h6 className='mb-[3rem] text-center  fnt-wt-500 text-[1.25rem] font-[Poppins] '  data-aos="slide-up" data-aos-delay="370" data-aos-duration="800" data-aos-easing="ease-in-out">Used by the world’s leading companies</h6>
        </div>
        <Logoslider />
      </div>
      {/* fifth section -logoslider end*/}


      {/* sixth section --section start */}

      <div className='py-[48px]'>

        <div className="component-lockup text-center  custom-margin max-w-[613px] ">
          <div className="lockup-content mb-[16px]">
            <h2 className="font-[Poppins]  fnt-wt-500 line-ht-99 text-[1.875rem] md:text-[3.052rem]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
              Adaptable Solutions <span className="text-color-gradient">for Every Industry</span>
            </h2>
          </div>
          <div className="max-width-large custom-margin text-center">
            <p className="text-size-medium mb-[32px] font-[Poppins] " data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
              RippFarm adapts to the specific needs of each industry, delivering optimal solutions for sales teams across sectors
            </p>
          </div>
        </div>

        <div className='flex justify-center' data-aos="slide-up" data-aos-delay="350" data-aos-duration="700" data-aos-easing="ease-in-out">
          <Button
            text="Book a Discovery Call"
            link="#"
            className='btnPrimary'
          />
        </div>
      </div>

      {/* sixth section --section end */}

      {/* seventh-section - tab section start */}
      <div className='responsive-padding '>
        <div className='max-w-[1280px] custom-margin'>
          <Tabsection />
        </div>
      </div>
      {/* tab section end*/}


      {/* */}
      {/* <div className='py-[112px] responsive-padding'>

        <div className="component-lockup text-center  custom-margin max-w-[800px] ">
          <div className="lockup-content mb-[16px]">
            <h2 className="fnt-wt-500 line-ht-99" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
              Why Sales Teams Choose <span className="text-color-gradient">RippFarm</span>
            </h2>
          </div>
          <div className="max-width-large custom-margin text-center">
            <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
              Fully automatic texting is vital for today’s fast-paced sales landscape
            </p>
          </div>
        </div>

        <div className='flex justify-center' data-aos="slide-up" data-aos-delay="350" data-aos-duration="700" data-aos-easing="ease-in-out">
          <Button
            text="Book Let’s discuss"
            link="#"
            className='btnSecondary'
          />
        </div>

        <div>
          <div className="TestimonialCardSection mt-[80px]">
            <TestimonialCard
              image={Mike}
              name="Brian Swain"
              position="President"
              company="Healthier4U Vending"
              paragraphs={[
                "“Our competitors in this industry hire people to dial for dollars, and hammer prospects with phone calls and emails. People have stopped answering.",
                "Partnering with RippFarm has allowed us to automate our lead qualification process in a way that is materially changing our business.”"
              ]}
            />
          </div>
        </div>
      </div> */}
      {/*  */}


      {/* people testimonial */}

      <div className='pt-[112px]'>
        <div className='responsive-padding pb-[112px] '>
          <div className='max-w-[1280px] custom-margin'>
            <h2 className="text-center text-[1.875rem] md:text-[3.052rem] font-[Poppins] ">What people are saying</h2>

            <div className='blog_recent-blogs'>

              <div className='h-full'>
                <div className="TestimonialCardSection mt-[64px] h-full">
                  <TestimonialCard
                    image={Mike}
                    name="Ankit M"
                    position="Crypto Enthusiast"
                    company="NEXT Door & Window"
                    paragraphs={[
                      "“RippFarm changed the way I think about investing.",
                      "I’ve been in the crypto space for a while, but RippFarm is on another level. The daily XRP rewards are consistent, and the platform is incredibly easy to use. I love how transparent and fast everything is—finally, a place that puts users first.”"
                    ]}
                  />
                </div>
              </div>



              <div className='h-full'>
                <div className="TestimonialCardSection mt-[64px] h-full">
                  <TestimonialCard
                    image={Mike}
                    name=" Riya S"
                    position="Digital Marketer"
                    company="Southern Homes of Polk County, Inc."
                    paragraphs={[
                      "Smooth, secure, and seriously powerful. What really impressed me is the speed of transactions and the zero stress of waiting days for settlements. As someone who works across borders, RippFarm makes sending money feel like sending a message—instant and reliable."
                    ]}
                  />
                </div>
              </div>

              <div className='h-full'>
                <div className="TestimonialCardSection mt-[64px] h-full">
                  <TestimonialCard
                    image={Mike}
                    name=" Sahil T"
                    position="Tech Entrepreneur"
                    company="Floor Coverings International"
                    paragraphs={[
                      "““This is the future of finance. RippFarm isn't just another blockchain project—it's a movement. The community is strong, the platform is solid, and I genuinely feel like my money is working for me every single day. Plus, the referral system is a great bonus!”"
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>




      {/* casestudycard section start */}

      <div className='responsive-padding py-[112px]'>
        <div className='max-w-[1280px] custom-margin'>

          <div className='blog_recent-blogs'>

            <Casestudycard
              image={casestudy1}
              title="Elon Musk Explores RippFarm to Understand "
              spantxt="Real-Time Crypto Rewards "
              description="While exploring innovative blockchain ecosystems, Elon Musk reportedly took interest in RippFarm’s validator model and reward system built on the XRP Ledger. Known for pushing the boundaries of finance and tech, he was intrigued by RippFarm’s ability to offer real-time XRP rewards and instant cross-border liquidity. Though not an official endorsement, Elon’s team highlighted it as “one of the most advanced use cases of XRP's infrastructure to date."
              date="January 18, 2025"
              category="Case Studies"
              link="/case-study/case-study-batteries-plus"
            />

            <Casestudycard
              image={casestudy2}
              title="RippFarm Powers Global Transaction Speed—Businessman in NYC Shares "
              spantxt="in NYC Shares"

              description="John, a business owner in New York, switched to RippFarm for international supplier payments. Previously bogged down by delays and high fees, he now transfers funds globally in seconds thanks to RippFarm’s ODL-powered liquidity. The platform’s transparency and real-time settlement have streamlined his entire payment system. He calls it “a game-changer for global businesses."

              date="February 3, 2025"
              category="Case Studies"
              link="/case-study/case-study-batteries-plus"
            />

            <Casestudycard
              image={casestudy3}
              title=" Trump Team Comments on Decentralization:  "
              spantxt="Platforms Like RippFarm Are the Future."
              description="In a televised discussion about emerging financial technologies, a Trump campaign spokesperson referenced RippFarm while addressing decentralized finance. The team praised platforms that provide financial freedom, real-time global access, and daily passive rewards—describing them as vital tools for a modern economy. While not an official partnership, the mention boosted RippFarm's credibility as a future-forward platform aligned with strong financial independence."
              date="March 10, 2025"
              category="Case Studies"
              link="/case-study/case-study-batteries-plus"
            />
          </div>
        </div>


      </div>
      {/* casestudycard section end */}

      <Footer />
    </div>
  );
};

export default Home;
