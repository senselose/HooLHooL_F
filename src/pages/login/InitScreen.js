import React from "react";
import Background from "context/Background.jsx";
import "styles/login/initScreen.css"; // InitScreen 전용 스타일
import cuteBoyImage from "assets/image/cuteboy_hoolhool.png";

const InitScreen = () => {
  return (
    <Background type="login"> {/* 배경 타입을 login으로 설정 */}
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
              <img src={cuteBoyImage} alt="귀여운 소년 이미지" />
            </div>
            <button className="start-button">
              <a href="/NewRegister">시작하기</a>
            </button>
            <p className="login-link">
              이미 회원가입을 하셨나요? <a href="/LoginPage">로그인</a>
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default InitScreen;
