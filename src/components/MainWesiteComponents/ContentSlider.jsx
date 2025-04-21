import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import slider1 from '../../images/slider1.jpeg';
import slider2 from '../../images/slider2.png';
import slider3 from '../../images/slider3.png';
import slider4 from '../../images/slider4.png';

const ContentSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 8000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1781,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1357,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 725,
        settings: {
          slidesToShow: 0.7,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 625,
        settings: {
          slidesToShow: 0.5,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 500,
        settings: {
          slidesToShow: 0.4,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 350,
        settings: {
          slidesToShow: 0.3,
          slidesToScroll: 1,
        },
      },

      
    ],
  };

  return (
    <Slider {...settings}>
      {/* Slide 1 */}
      <div>
        <div className='hero_image-container gap-0 justify-start items-center flex'>
          <div className='hero_message-wrapper flex items-center z-2 gap-[0.75rem] w-[30rem] min-w-[30rem] mr-[-4rem] px-2 py-0 relative'>
            <div className='message-wrapper_component relative z-[3] flex flex-col gap-3'>
              <div className='white-msg_wrapper gap-[0.125rem] text-size-medium flex-col justify-start items-end min-w-[20rem] flex relative'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:37 PM</div>
                <div className='rounded-[1rem] msg white bg-[#f2f6fa] text-[#11203d] inline-block max-w-[70%] p-4 lg:text-size-small'>
                Can I invest in XRP like I do with Bitcoin?
                </div>
              </div>

              <div className='msg-bubble_wrapper'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:45</div>
                <div className='msg blue lg:text-size-small inline-block bg-[#277fff] rounded-[1rem] max-w-[70%] p-4'>
                Yes, XRP is available on most crypto exchanges and is often used for fast, low-cost transfers.   </div>
              </div>

              <div className='white-msg_wrapper gap-[0.125rem] text-size-medium flex-col justify-start items-end min-w-[20rem] flex relative'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:46</div>
                <div className='rounded-[1rem] msg white bg-[#f2f6fa] text-[#11203d] inline-block max-w-[70%] p-4 lg:text-size-small'>
                Is it safe to invest now after all the legal issues?
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={slider2}
              alt=''
              className='sliderimg aspect-[16/9] object-cover rounded-[1rem] w-[30rem] min-w-[20rem] max-w-none h-auto overflow-hidden'
            />
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div>
        <div className='hero_image-container gap-0 justify-start items-center flex'>
          <div className='hero_message-wrapper flex items-center z-2 gap-[0.75rem] w-[30rem] min-w-[30rem] mr-[-4rem] px-2 py-0 relative'>
            <div className='message-wrapper_component relative z-[3] flex flex-col gap-3'>
              <div className='msg-bubble_wrapper'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:45</div>
                <div className='msg blue lg:text-size-small inline-block bg-[#277fff] rounded-[1rem] max-w-[70%] p-4'>
                Ripple is a real-time payment system designed to move money across borders instantly.
                </div>
              </div>

              <div className='white-msg_wrapper gap-[0.125rem] text-size-medium flex-col justify-start items-end min-w-[20rem] flex relative'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:37 PM</div>
                <div className='rounded-[1rem] msg white bg-[#f2f6fa] text-[#11203d] inline-block max-w-[70%] p-4 lg:text-size-small'>
                Interesting! So, what’s XRP then?
                </div>
              </div>

              <div className='msg-bubble_wrapper'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:45</div>
                <div className='msg blue lg:text-size-small inline-block bg-[#277fff] rounded-[1rem] max-w-[70%] p-4'>
                XRP is the digital asset Ripple uses to facilitate those transactions—it acts as a bridge currency.
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={slider3}
              alt=''
              className='sliderimg aspect-[16/9] object-cover rounded-[1rem] w-[30rem] min-w-[20rem] max-w-none h-auto overflow-hidden'
            />
          </div>
        </div>
      </div>

      {/* Slide 3 (You can add more slides here as needed) */}
      <div>
        <div className='hero_image-container gap-0 justify-start items-center flex'>
          <div className='hero_message-wrapper flex items-center z-2 gap-[0.75rem] w-[30rem] min-w-[30rem] mr-[-4rem] px-2 py-0 relative'>
            <div className='message-wrapper_component relative z-[3] flex flex-col gap-3'>
              <div className='msg-bubble_wrapper'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:45</div>
                <div className='msg blue lg:text-size-small inline-block bg-[#277fff] rounded-[1rem] max-w-[70%] p-4'>
                Ripple is focused on building a decentralized, global payment system.
                </div>
              </div>

              <div className='white-msg_wrapper gap-[0.125rem] text-size-medium flex-col justify-start items-end min-w-[20rem] flex relative'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:37 PM</div>
                <div className='rounded-[1rem] msg white bg-[#f2f6fa] text-[#11203d] inline-block max-w-[70%] p-4 lg:text-size-small'>
                But isn’t Ripple a private company?
                </div>
              </div>

              <div className='msg-bubble_wrapper'>
                <div className='time-stamp opacity-50 text-white text-[16px] ml-[0.5rem]'>10:45</div>
                <div className='msg blue lg:text-size-small inline-block bg-[#277fff] rounded-[1rem] max-w-[70%] p-4'>
                Yes, but the XRP Ledger is open-source and decentralized—anyone can participate.
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={slider4}
              alt=''
              className='sliderimg aspect-[16/9] object-cover rounded-[1rem] w-[30rem] min-w-[20rem] max-w-none h-auto overflow-hidden'
            />
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default ContentSlider;