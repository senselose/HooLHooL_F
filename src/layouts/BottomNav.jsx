import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "styles/layouts/bottomNav.css";
import IconHome from "assets/icon/IconHome.png";
import IconMenu from "assets/icon/IconMenu.png";
import IconUser from "assets/icon/IconUser.png";
import IconShopping from "assets/icon/IconShopping.png";
import Logo_positive from "assets/logo/logo_positive.png";
import Logo_negative from "assets/logo/logo_negative.png";
// const BottomNav = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   // :흰색_확인_표시: 로고 상태를 관리 (true: Positive, false: Negative)
//   const [isPositiveLogo, setIsPositiveLogo] = useState(true);
//   const navItems = [
//     { name: "홈", path: "/home", icon: IconHome },
//     { name: "쇼핑", path: "/pointMarket", icon: IconShopping },
//     { name: "", path: "/menu", icon: isPositiveLogo ? Logo_positive : Logo_negative }, // :흰색_확인_표시: 로고 변경
//     { name: "메뉴", path: "/menu", icon: IconMenu },
//     { name: "마이페이지", path: "/mypage", icon: IconUser },
//   ];
//   // :흰색_확인_표시: 로고 클릭 시 상태 변경 (Positive :양방향_화살표: Negative)
//   const toggleLogo = () => {
//     setIsPositiveLogo((prev) => !prev);
//   };
//   return (
//     <nav className="bottom-nav">
//       {navItems.map((item, index) => (
//         <button
//           key={index}
//           className={`nav-item
//             ${item.icon === Logo_positive || item.icon === Logo_negative ? "logo-button" : ""}
//             ${location.pathname === item.path ? "active" : ""}`}
//           onClick={() => {
//             if (item.name === "") {
//               toggleLogo(); // :흰색_확인_표시: 로고 클릭 시 색 변경
//             } else {
//               navigate(item.path);
//             }
//           }}
//         >
//           <img
//             src={item.icon}
//             alt={item.name}
//             className={`nav-icon ${item.icon === Logo_positive || item.icon === Logo_negative ? "logo-icon" : ""}`}
//           />
//         </button>
//       ))}
//     </nav>
//   );
// };
// export default BottomNav;

const BottomNav = ({ onLogoClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPositiveLogo, setIsPositiveLogo] = useState(true);
  
  const navItems = [
    { name: "홈", path: "/main", icon: IconHome },
    { name: "쇼핑", path: "/pointMarket", icon: IconShopping },
    { name: "", path: "/menu", icon: isPositiveLogo ? Logo_positive : Logo_negative },
    { name: "메뉴", path: "/menu", icon: IconMenu },
    { name: "마이페이지", path: "/mypage", icon: IconUser },
  ];

  const toggleLogo = () => {
    setIsPositiveLogo((prev) => !prev);
    onLogoClick(isPositiveLogo ? "NEGATIVE" : "POSITIVE"); // BoardList에 타입 전달
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => (
        <button
          key={index}
          className={`nav-item
            ${item.icon === Logo_positive || item.icon === Logo_negative ? "logo-button" : ""}
            ${location.pathname === item.path ? "active" : ""}`}
          onClick={() => {
            if (item.name === "") {
              toggleLogo();
            } else {
              navigate(item.path);
            }
          }}
        >
          <img
            src={item.icon}
            alt={item.name}
            className={`nav-icon ${item.icon === Logo_positive || item.icon === Logo_negative ? "logo-icon" : ""}`}
          />
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;