import React from "react";
import FeatureSection from "../../components/MainWesiteComponents/FeatureSection";
import Testimonialcard from "../../components/MainWesiteComponents/Testimonialcard";
import joe from "../../images/joe.png"
// import TeamCard from "../components/TeamCard";
import Button from "../../components/MainWesiteComponents/Button";
import TabMessageSection from "../../components/MainWesiteComponents/TabMessageSection"
import firstsectionimg from "../../images/tabsection-logo/thirdtabimg.jpg"
import telescope from "../../images/telescope.png";
import Footer from "../../components/MainWesiteComponents/Footer";
import Header from "../../components/MainWesiteComponents/Header";
import "../../../src/mainwebsitestyles.css"



const Product = () => {
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
                                At RippFarm, we believe in a financial future that is fast, fair, and decentralized. We’re committed to building a world where money moves instantly across borders, access to opportunity is equal, and every transaction is secure and transparent. Our foundation is built on trust, innovation, and community-driven growth. By harnessing the power of the XRP Ledger, we aim to bridge the gap between traditional finance and the blockchain revolution—empowering individuals to take control of their wealth and shape the future of finance.
                                </p>


                                <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                                We believe in rewarding participation, not just transactions. At RippFarm, every user becomes a part of a global movement redefining what finance means.
                                </p>
{/* 
                                <p className="text-size-medium mb-[32px]" data-aos="slide-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-in-out">
                                    We’re actively choosing a different future. Read on!
                                </p> */}

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

            <div className="mt-[80px] bg-[#ffffff] relative">
                <div className="responsive-padding custom-margin ">

                    <div className="max-w-[1280px] custom-margin py-[0px] px-[0px] bg-[#ffffff] border rounded-2xl">
                        <div className="flex flex-col gap-[50px] md:flex-row py-[30px] px-[30px] ">

                            <div className="flex flex-col gap-[20px] md:flex-row">
                                <div className="">
                                    <p className="text-[#132649] text-[100px] font-semibold line-ht-100 ">1</p>
                                </div>

                                <div>
                                    <p className="text-[#132649] text-[30px] font-semibold mb-[30px] line-ht-120 md:text-[40px] ">
                                        Liquidity Provider & Validator
                                    </p>
                                    <p className="text-[#226ad1] text-[20px] line-ht-120 md:text-[25px] font-light	 ">RippFarm acts as a validator on XRPL, ensuring secure, transparent, and efficient transactions. By providing liquidity for real-time payments, it strengthens the XRP ecosystem and facilitates cross-border payments at minimal costs.</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[20px] md:flex-row">
                                <div>
                                    <p className="text-[#132649] text-[100px] font-semibold line-ht-100">2</p>
                                </div>

                                <div>
                                    <p className="text-[#132649] text-[30px] font-semibold mb-[30px] line-ht-120 md:text-[40px] ">
                                        Community Building & Incentives
                                    </p>
                                    <p className="text-[#226ad1] text-[20px] line-ht-120 md:text-[25px]  font-light	">RippFarm focuses on creating a global XRP community where users earn bonuses and rewards by actively contributing to the XRPL network. The goal is to strengthen RippleNet through campaigns, active participation, and growing the XRP ecosystem.</p>
                                </div>
                            </div>

                        </div>

                        <div className="imgwrapper flex justify-center mt-[50px]">
                            <img src={telescope} alt="camera" className="cameraimg max-w-[80%] md:max-w-[30%]" />
                        </div>

                        <div className="diagonal-scroll-container pointer-events-none">
                            <p className="diagonal-scroll-text">RippFarm</p>
                        </div>

                        <div className="diagonal-scroll--bottom pointer-events-none">
                            <p className="diagonal-scroll-text-bottom">RippFarm</p>
                        </div>


                        {/* <div>
                            <p className="text-[#132649] text-[100px] font-semibold mb-[30px] line-ht-120 top-[80%] left-[4%]
                            md:text-[200px] absolute  top-[60%] left-[40%] z-[1] [transform:rotate(336deg)] mt-[14px] pt-[-124px] normal-case tracking-[-15px] font-extrabold opacity-20">RippFarm</p>
                        </div> */}
                    </div>
                </div>
            </div>


            <div className="our-why bg-[#0a1d45] text-white">
                <FeatureSection
                    eyebrow="Ripp Validator Node"
                    heading="Decentralized. Transparent.    <span>Secure.</span>"
                    content="As a future validator on the XRP Ledger, Ripp Farm is dedicated to upholding the integrity and performance of the XRPL. Our validator node helps process transactions and reinforces a decentralized financial future."
                    subContent="Highlights:

                    Independent XRP validation
                    
                    XRPL governance participation,
                    
                    24/7 uptime and high-performance architecture
                    ,
                    Transparent performance reporting (Coming Soon)
                    "
                    buttonText="Let's discuss your strategy"
                    buttonLink="#"
                    imageSrc="https://cdn.prod.website-files.com/674e0447ee45403edfe071f9/676eccb3f18c0ab6dae7d54e_Busy-Father-Looking-After-Son-Whilst-Doing-Household-Chores-510019102_727x484.jpeg"
                    imageAlt="Father with child"
                    isReversed={true}
                />
            </div>


            <div className="our-why bg-[#0a1d45] text-white">
                <FeatureSection
                    eyebrow="Daily XRP Rewards"
                    heading="Passive Income <span>—Made Simple</span>"
                    content="With Ripp Farm, users earn daily XRP rewards just by being part of the ecosystem. Whether you’re staking or actively participating, our system ensures fair, consistent payouts straight to your wallet."
                    subContent="Benefits:

                    Reliable daily earnings,
                    
                    Hassle-free withdrawals,
                    
                    Designed for both beginners and seasoned crypto users,
                    
                    Automated and secure distribution"
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
                    eyebrow="On-Demand Liquidity (ODL) Center"
                    heading="Fast, Borderless, and <span>Cost-Efficient Payments</span>"
                    content="Ripp Farm leverages Ripple’s On-Demand Liquidity solution to power lightning-fast international payments with no pre-funding required. Move money globally—instantly."
                    subContent="Perfect for:

                    Freelancers & digital entrepreneurs,
                    
                    Global SMEs,
                    
                    Remittance providers,
                    
                    Blockchain-based businesses"
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

                {/* <div className="responsive-padding ">

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

                </div> */}

            </div>


            

            {/* last section end */}

<Footer />
        </div>
    );
};

export default Product;
