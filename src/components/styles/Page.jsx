// components/Page.js
import React from "react";
import "styles/page.css"; // 공통 스타일

const Page = ({ children, scrollable = true, className = "" }) => {
  console.log("Page 컴포넌트 로드됨");

  
  return (
    <div className={`page ${scrollable ? "scrollable" : "no-scroll"} ${className}`}>
      {children}
    </div>
  );
};

export default Page;
