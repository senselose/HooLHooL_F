import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Page from "components/styles/Page";
import "styles/login/loginPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import hoolhool_logo from "assets/logo/hoolhool_logo.png";
import axios from "axios";
import BackButton from "components/Buttons/BackButton.jsx";
import Background from "context/Background.jsx";

const LoginPage = () => {
  const [inProp, setInProp] = useState(false);
  const [userId, setUserIdInput] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setInProp(true); // 페이지 마운트 시 애니메이션 시작
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setInProp(false); // 로그인 시 애니메이션 종료

    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          { userId, password },
          { withCredentials: true }
        );
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          dispatch({ type: "SET_USER_ID", payload: response.data.userId });
          navigate("/Menu");
        } else {
          alert("로그인 실패");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }, 500); // 애니메이션 후 이동
  };

  return (
    <Background type="default_blur">
      <Page className="login-page" scrollable={false} >
        <BackButton />
        <div id="login-page">
          <div className="fade-in">
            <div className="login-container">
              <div className="login-header"><h1>안녕하세요 :)</h1>
                <p>HOOL HOOL 입니다.</p>
              </div>
              <div className="login-logo"><img src={hoolhool_logo} alt="Hool Hool Logo" /></div>
              <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="userId">ID</label>
                  <input
                    type="text"
                    id="userId"
                    placeholder="아이디를 입력하세요"
                    value={userId}
                    onChange={(e) => setUserIdInput(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">PW</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="login-button">로그인</button>
              </form>
              <div className="loginPage-buttons">
                <div className="login-find">
                  <a href="/find-account">아이디/비밀번호 찾기</a></div>
              </div>
              <div className="footer_InitScreen">
                <p>© 2024-{new Date().getFullYear()} CodeQuest. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Background>
  );
};

export default LoginPage;
