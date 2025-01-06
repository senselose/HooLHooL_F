// import React from "react";
// import "../../styles/loading.css";
// import whiteLogo from "../../assets/image/white_hand_logo.png";


// function Loding() {
//   return (
//     <div className="loading">
//       <div className="header">
//         <h1>사랑과 관심이 <br/>가치가 되는 곳 <br/> 훌훌 😎</h1>
//       </div>
//         <div className="image">
//             <img src={whiteLogo} alt="blackLogo" />
//         </div>
//     </div>
//   );
// }

// export default Loding;

import React, { useState, useEffect } from "react";
import "../../styles/initScreen.css"; // 로딩,메인 화면 스타일
import { Link } from "react-router-dom";

import cuteBoyImage from "../../assets/image/cuteboy_hoolhool.png";
import whiteLogo from "../../assets/image/white_hand_logo.png";

function InitScreen() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [isFading, setIsFading] = useState(false); // 페이드 아웃상태

  useEffect(() => {
    // 3초 후 로딩 상태를 false로 전환
    const timer = setTimeout(() => {
      setIsFading(true);// 페이드 아웃 시작
      setTimeout(() => setIsLoading(false), 500); // 페이드 아웃 완료 후 로딩상태 종료
    }, 3000);

    // 컴포넌트 언마운트 시 타이머 초기화
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // 로딩 화면
        <div className={`loading ${isFading ? "fade-out" : "fade-in"}`}>          <div className="header">
            <h1>
              사랑과 관심이 <br /> 가치가 되는 곳 <br /> 훌훌 😎
            </h1>
          </div>
          <div className="image-logo">
            <img src={whiteLogo} alt="whiteLogo" />
          </div>
        </div>
      ) : (
        // 메인 화면
        <div className="fade-in">
          <div className="container">
          <div className="header">
            <h1>
              다른 사람의<br /> 고민과 걱정을 <br /> 훌훌 날려주면 돈이 된다! 😎
            </h1>
          </div>
          <div className="main-content">
            <h6>
              관심이 돈이 되는 꿀팁!<br /> 함께 시작해 볼까요?
            </h6>
            <div className="image-logo">
              <img src={cuteBoyImage} alt="cuteBoyImage" />
            </div>
            <button className="start-button">
              <Link to="/NewRegister">시작하기</Link>
            </button>
            <p className="login-link">
              이미 회원가입을 하셨나요? <a href="/Login">로그인</a>
            </p>
          </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InitScreen;
