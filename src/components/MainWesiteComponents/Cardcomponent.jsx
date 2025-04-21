import React from 'react';

const Cardcomponent = ({ imageSrc, heading, text }) => {
  return (
    <div className="CardWrapper border border-[#bde1ff1f] text-[#bddcff] text-base rounded-[1.5rem] flex flex-col grid grid-rows-auto gap-0 items-stretch w-full h-full p-[2.5rem_2rem] relative overflow-hidden text-center" data-aos="slide-up" data-aos-delay="400" data-aos-duration="800" data-aos-easing="ease-in-out">
      <div className="card-icon_card-content relative z-20">
        <div className="icoonWrapper relative mb-[36px] flex justify-center">
          {/* Image dynamically passed via props */}
          <img src={imageSrc} alt={heading} />
          <div className="icon_blur"></div>
        </div>

        <div className="lockup_content">
          {/* Heading dynamically passed via props */}
          <h6 className='text-white text-[1.25rem]'>{heading}</h6>
          <div className="text-rich-text w-richtext">
            {/* Text dynamically passed via props */}
            <p className='text-[18px]'>{text}</p>
          </div>
        </div>
      </div>
      <div className="glow card"></div>
    </div>
  );
}

export default Cardcomponent;
