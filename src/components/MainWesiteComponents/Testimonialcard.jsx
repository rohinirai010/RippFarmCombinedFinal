import React from 'react';

const TestimonialCard = ({ image, name, position, company, paragraphs }) => {
  return (
    <div className='TestimonialCardWrapper h-full max-w-[40rem] custom-margin' data-aos="slide-up" data-aos-delay="200" data-aos-duration="750" data-aos-easing="ease-in-out">
      <div className='testimonial_list h-full  hero w-dyn-items grid grid-cols-1 gap-x-4 gap-y-4 grid-rows-auto auto-cols-fr'>
        <div className='w-dyn-item'>
          <div className='testimonial_item-wrapper sprinkle flex flex-col justify-between gap-0 border border-gray-300 bg-[#11203dbf] rounded-lg h-full p-2'>
            
            {/* Quote Section */}
            <div className='testimonial_quote-wrapper flex justify-center items-center text-base text-center bg-[#bde1ff05] rounded-lg h-full p-8 relative overflow-hidden'>
              <div className='z-index-2 w-richtext'>
                {paragraphs.map((para, idx) => (
                  <p key={idx} className='mb-4'>“{para}”</p>
                ))}
              </div>
              <div className="glow small low z-0 top-[125%] opacity-25 filter blur-[32px] w-full h-full absolute z-1 bg-[#277fff] opacity-50 filter blur-[85px] rounded-full w-[400px] h-[400px] absolute inset-[125%_0%_0%_50%] transform translate-[-50%_-50%]"></div>
            </div>

            {/* Author Details */}
            <div className='testimonial_detail-wrapper flex justify-center items-center gap-x-4 gap-y-4 p-6'>
              <img src={image} alt={name} className='aspect-[1] object-cover w-16 h-16 rounded-full' />
              <div className='testimonial_detail-text text-base flex-col justify-start items-start flex'>
                <div>{name}</div>
                <div className='text-style-muted'>{position}</div>
                <div className='text-style-muted'>{company}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
