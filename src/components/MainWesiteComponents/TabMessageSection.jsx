import React from "react";
// import shapeAlone from "../assets/images/tabsection-logo/shape-alone.svg"; 
import rippfarmlogo from "../../images/ripplogo.png"

const TabMessageSection = ({
  blueMessage,
  whiteMessage,
  starIconSrc,
  tabImageSrc,
}) => {
  return (
    <div className="feature-grid_image-wrapper">
      <div className="message-wrapper">
        <div className="hero_message-wrapper tab">
          <div className="msg-bubble_wrapper">
            <div className="msg blue">{blueMessage}</div>
          </div>
          <div className="white-msg_wrapper">
            <div className="msg white">{whiteMessage}</div>
            <img
              src={starIconSrc}
              loading="lazy"
              alt=""
              className="icon-1x1-small stars"
            />
          </div>
        </div>
        <div className="glow-25"></div>
      </div>
      <div className="tab_image-wrap tab-mb">
        <img
          loading="lazy"
          src={tabImageSrc}
          alt=""
          className="tab_image"
        />
        <div className="glow middle"></div>
      </div>
      <img
        loading="lazy"
        src={rippfarmlogo}
        alt=""
        className="tab_image-background"
      />
    </div>
  );
};

export default TabMessageSection;
