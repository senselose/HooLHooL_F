import React from "react";
import "styles/Background.css"; // 기본 스타일만 관리


import Default from "assets/image/blur_ver9.png"
import Init from "assets/image/loading_background.gif"

const Background = ({ type = "default", children }) => {
  const inlineStyles = {
    default: {
      backgroundImage: `url(${Default})`,
    },
    mypage: {
      backgroundColor: "rgb(250, 250, 250)",
      backgroundImage: "none",
    },
    init: {
      backgroundImage: `url(${Init})`,
      backgroundSize: "cover",
    },
  };

  return (
    <div className="background" style={inlineStyles[type]}>
      {children}
    </div>
  );
};

export default Background;
