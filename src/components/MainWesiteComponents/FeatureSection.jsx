import React from "react";
import Button from "./Button";

const FeatureSection = ({
  eyebrow = "",
  heading = "",
  content = "",
  subContent = "",
  buttonText = "",
  buttonLink = "#",
  imageSrc = "",
  imageAlt = "",
  isReversed = false,
}) => {
  const contentBlock = (
    <div>
      <div className="text-[#277fff] font-semibold inline-block text-[18px] mb-[30px]">{eyebrow}</div>
      <h3 className="fnt-wt-500 line-ht-100 mb-[30px] text-[2.441rem]">
        {heading.split("<span>").map((part, index) =>
          part.includes("</span>") ? (
            <span key={index} className="text-color-gradient">
              {part.replace("</span>", "")}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </h3>
      <div className="text-lg mb-4">{content}</div>
      <div className="text-lg mb-8">{subContent}</div>
      <Button
        text={buttonText}
        link={buttonLink}
        withArrow={true}
        className="btnPrimary"
      />
    </div>
  );

  const imageBlock = (
    <div className="flex justify-center">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="rounded-3xl shadow-xl max-w-full"
      />
    </div>
  );

  return (
    <section className="relative overflow-visible py-[80px] py-16 px-4 md:px-20 bg-[#0a1d45] text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {isReversed ? (
          <>
            {imageBlock}
            {contentBlock}
          </>
        ) : (
          <>
            {contentBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  );
};

export default FeatureSection;
