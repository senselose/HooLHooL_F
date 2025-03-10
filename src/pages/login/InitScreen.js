import React from "react";
import Background from "context/Background.jsx";
import Page from "components/styles/Page";
import cuteBoyImage from "assets/image/cuteboy_hoolhool.png";
import "styles/login/initScreen.css"; // InitScreen 전용 스타일

const InitScreen = () => {
  return (
    <Background type="default_blur">
      <Page scrollable={false}>
        <div className="fade-in">
          <section className="initScreen-container">
            <div className="initScreen-header"><h1>다른 사람의<br /> 고민과 걱정을 <br /> 훌훌 날려주면 돈이 된다! 😎</h1></div>
            <div className="main-content"><h1>관심이 돈이 되는 꿀팁!<br /> 함께 시작해 볼까요?</h1>
            </div>
            <div className="image-logo">
              <img src={cuteBoyImage} alt="귀여운 소년 이미지" />
              <button className="start-button">
                <a href="/NewRegister">시작하기</a>
              </button>
              <p className="login-link">이미 회원가입을 하셨나요? <a href="/LoginPage">로그인</a></p>
            </div>
          </section>
          
          <footer className="footer_InitScreen">
            <p>© 2024-{new Date().getFullYear()} CodeQuest. All rights reserved.</p>
          </footer>
        </div>
      </Page>
    </Background>
  );
};

export default InitScreen;
