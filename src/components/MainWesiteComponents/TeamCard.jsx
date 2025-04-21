import React from "react";
import LinkedInIcon from "../../images/linkedin.svg"; 

const TeamCard = ({ profileUrl, imageSrc, name, title, linkedinUrl }) => {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 items-center font-normal">
      <div className="relative overflow-visible rounded-none max-w-full inline-block">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="inline-block ">
          <img
            src={imageSrc}
            alt={name}
            className="z-20 aspect-square object-cover rounded-xl  relative w-[150px] h-[150px]"
            loading="lazy"
          />
          <div className="glow small"></div>
        </a>
      </div>

      <div className="flex-1">
        <div className="mb-2">
          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
            <div>
              <div className="text-lg font-semibold">{name}</div>
              <div className="text-base text-blue-500">{title}</div>
            </div>
          </a>
        </div>

        <div className="mt-3 ">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white p-[10px] bg-[#ffffff]"
            
          >
            <img src={LinkedInIcon} alt="LinkedIn" width={10} height={10} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
