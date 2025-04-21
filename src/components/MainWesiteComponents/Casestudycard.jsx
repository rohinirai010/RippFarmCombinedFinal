import React from 'react';

const Casestudycard = ({
  image,
  title,
  spantxt,
  description,
  date,
  category,
  link
}) => {
  return (
    <div role="listitem" className="blog_collection-item w-dyn-item h-full">
      <div className="card_blog card border border-[#bde1ff1f] rounded-lg flex flex-col items-start transition-all duration-200 relative overflow-hidden gap-0 w-full h-full"  data-aos="slide-up" data-aos-delay="300" data-aos-duration="700" data-aos-easing="ease-in-out">
        <a href={link} className="card-blog_image-wrapper card w-inline-block flex-none flex flex-col justify-center items-center w-full">
          <img
            src={image}
            alt={title}
            
            className="image z-2 aspect-auto object-cover rounded-none w-full h-56 relative"
          />
        </a>

        <div className="card-blog_card-content card gap-x-4 gap-y-4 flex flex-col justify-start items-start h-full p-6">
          <div className="meta-wrapper gap-x-4 gap-y-4 text-base flex justify-start items-center">
            <a href={link} target="_blank" rel="noopener noreferrer" className="tag w-inline-block gap-x-2 gap-y-2 border border-[#bde1ff1f] bg-[#277fff] text-white rounded-md justify-center items-center p-1 px-2 text-sm font-medium no-underline inline-flex max-w-full">
              <div>{category}</div>
            </a>
            <div className='text-base'>{date}</div>
          </div>

          <div className="lockup_wrapper card-4 gap-x-[2.1rem] gap-y-[2.1rem] flex flex-col justify-start items-start">
            <a href={link} className="lockup_content small w-inline-block gap-x-[.5rem] gap-y-[.5rem] flex flex-col font-normal">
              <h6 className="tracking-normal mb-[30px] font-medium leading-[1.4] text-[1.25rem]">
                {title}
                <span className="text-color-gradient">{spantxt}</span>
              </h6>
              <p className="text-size-small card-6">
                {description}
              </p>
            </a>
          </div>
        </div>

        <div className="glow card-7"></div>
      </div>
    </div>
  );
};

export default Casestudycard;
