import logo from '../../images/rippfarm-white-logo.png';
// import linkedinIcon from '/src/assets/images/linkedin.svg';
import discord from '../../images/discord.svg';
import twitter from '../../images/twitter.svg';


const Footer = () => {
  return (  

    <div className='responsive-padding bg-[#11203d]'>
      <div className='max-w-[1280px] custom-margin py-[50px]'>

        <div className="grid gap-y-4 gap-x-[8vw] grid-cols-[.75fr_1.25fr] items-start max-[991px]:grid-cols-1 max-[991px]:gap-y-16 footer_top-wrapper border-b border-[#dfd5d5] pb-[20px]">
          {/* Left Section */}
          <div className="flex flex-col footer_left-wrapper">
            <div className="mb-4">
              <a href="/" aria-current="page" className="block w-nav-brand mb-[30px]">
                <img
                  src={logo}
                  alt="RippFarm Logo"
                  loading="lazy"
                  className="footer_logo w-[200px]"
                />
              </a>
            </div>
            <div className="mb-4">
              <div className="text-sm">Where innovation meets opportunity. We’re part of a global movement transforming how money moves, grows, and empowers people.</div>
            </div>
           
          </div>

          {/* Menu Section */}
          <div className="grid gap-x-8 gap-y-4 grid-cols-4 items-start max-[479px]:grid-cols-1 max-[479px]:gap-y-8 footer_menu-wrapper">
            {/* Column 1 - Solutions */}
            <div className="footer_link-column">
              <div className="mb-4 text-[1rem] font-medium">Solutions</div>
              <div className="flex flex-col items-start footer_link-list">
                <a href="#" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">Franchise Development</a>
                <a href="#" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">New-Home Builders</a>
                <a href="#" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">Home Improvement & Home Services</a>
              </div>
            </div>

            {/* Column 2 - Resources */}
            <div className="footer_link-column">
              <div className="mb-4 text-[1rem] font-medium">Resources</div>
              <div className="flex flex-col items-start footer_link-list">
                <a href="#" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">Case Studies</a>
                <a href="#" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">Webinars & Events</a>
              </div>
            </div>

            {/* Column 3 - Company */}
            <div className="footer_link-column">
              <div className="mb-4 text-[1rem] font-medium">Company</div>
              <div className="flex flex-col items-start footer_link-list">
                <a href="/Ourwhy" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">About Us</a>
                <a href="#" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">Product</a>
                <a href="/Support" className="py-2 text-sm font-normal footer_link hover:text-[#bddcff] transition-colors">Support</a>
              </div>
            </div>

            {/* Column 4 - Follow us */}
            <div className="footer_link-column">
              <div className="mb-4 font-semibold">Follow us</div>
              <div className="flex flex-col items-start footer_link-list">
                <a
                  href="https://www.linkedin.com/company/lumin-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-sm font-normal footer_social-link hover:text-[#bddcff] transition-colors"
                >
                  <img src={discord} alt="LinkedIn" className="w-4 h-4 p-[3px] bg-[#ffffff]" />
                  <div>Discord</div>
                </a>


                <a
                  href="https://www.linkedin.com/company/lumin-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-sm font-normal footer_social-link hover:text-[#bddcff] transition-colors"
                >
                  <img src={twitter} alt="LinkedIn" className="w-4 h-4 p-[3px] bg-[#ffffff]" />
                  <div>Twitter x</div>
                </a>
              </div>
            </div>
          </div>
        </div>



        <div className='pt-[50px]'>
        <div className="flex flex-col gap-[16px] md:flex-row justify-start md:justify-between items-start md:items-center footer_bottom-wrapper">
            {/* Credit Text */}
            <div className="text-sm footer_credit-text">
              © <span className="year">2025</span> RippFarm All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex gap-x-6 whitespace-normal justify-center footer_legal-list">

            <a href="/Terms-and-conditions" className="text-sm font-normal no-underline footer_legal-link">
                Terms & Conditions
              </a>
              <a href="/Privacy-Policy" className="text-sm font-normal no-underline footer_legal-link">
                Privacy Policy
              </a>
              <a href="/Terms-of-use" className="text-sm font-normal no-underline footer_legal-link">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
