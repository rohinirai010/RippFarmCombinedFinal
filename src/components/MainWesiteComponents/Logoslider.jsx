import React from 'react';
import Slider from "react-slick"; // Import the slick slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo1 from "../../images/sliderlogoimg/logo1.png";
import logo2 from "../../images/sliderlogoimg/logo2.png";
import logo3 from "../../images/sliderlogoimg/logo3.png";
import logo4 from "../../images/sliderlogoimg/logo4.png";
import logo5 from "../../images/sliderlogoimg/logo5.png";

const Logoslider = () => {
  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 3, // Show 3 logos
        },
      },
      {
        breakpoint: 600, // For mobile devices
        settings: {
          slidesToShow: 2, // Show 2 logos
        },
      },
    ],
  };

  return (
    <div className="logoslider-container" data-aos="slide-up" data-aos-delay="400" data-aos-duration="800" data-aos-easing="ease-in-out">
      <Slider {...settings}>
        <div>
          <img src={logo1} alt="Logo 1" className=" max-w-[100px] h-[70px] logo-slide" />
        </div>
        <div>
          <img src={logo2} alt="Logo 2" className=" max-w-[100px] h-[70px] logo-slide" />
        </div>
        <div>
          <img src={logo3} alt="Logo 3" className=" max-w-[100px] h-[70px] logo-slide" />
        </div>
       
        <div>
          <img src={logo4} alt="Logo 4" className=" max-w-[100px] h-[70px] logo-slide" />
        </div>
       

        <div>
          <img src={logo5} alt="Logo 5" className=" max-w-[100px] h-[70px] logo-slide" />
        </div>

        

        
      </Slider>
    </div>
  );
};

export default Logoslider;
