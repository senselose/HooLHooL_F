import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IconFrontButton from "assets/icon/IconFrontButton.png"; // 이미지 파일을 가져오기
import "styles/MyPage/profileInfo.css";
import Page from "components/styles/Page.jsx";
import Background from "context/Background.jsx";
import BackButton from "components/Buttons/BackButton";

const ProfileInfo = () => {
  const [userData, setUserData] = useState({
    nickname: "",
    email: "",
    name : "",
    tell : "",
    birth : "",
    info: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
    profileImage: "https://via.placeholder.com/150",
  });

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userData.info || "");
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.userId || null);
  const dispatch = useDispatch();

  
  const handleEditClick = (field) => {
    console.log(`${field} 수정 페이지로 이동`);
    navigate(`/edit-profile/${field}`); // ✅ 동적 라우트 적용
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("토큰이 없습니다. 다시 로그인해주세요.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/v1/auth/check", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("사용자 인증 실패");

        const { userId } = await response.json();
        dispatch({ type: "SET_USER_ID", payload: userId });

        const userResponse = await fetch(`http://localhost:8080/api/v1/user/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) throw new Error("사용자 정보를 가져올 수 없습니다.");

        const userData = await userResponse.json();
        setUserData({
          nickname: userData.nickname || "닉네임 없음",
          email: userData.email || "이메일 없음",
          info: userData.info || "자기소개가 없습니다.",
          name : userData.name  || "이름이 없음",
          tell : userData.tell || "번호가 없음",
          birth : userData.birth || "생년월일이 없음",
          profileImage: userData.profileImage || "https://via.placeholder.com/150",
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    setEditedInfo(userData.info || "");
  }, [userData]);

  return (
    <Background type="mypage">
      <Page id="profileInfo">
        <BackButton/>
        {/* 헤더 */}
        <header className="profileInfo-header">
          <h1 className="profileInfo-title">프로필 정보</h1>
          <p className="profileInfo-subtitle">
          {userData.name}님의 개인정보를 확인하세요.</p>
        </header>

        {/* 프로필 사진 섹션 */}
        <section className="profileInfo-section-avatar">
            <div className="profileInfo-avatar-wrapper">
                <img
                    src={userData.profileImage}
                    alt={`${userData.name}의 프로필`}
                    className="profileInfo-avatar-image"  // ✅ 클래스명 수정
                />
            </div>
        </section>

        {/* 기본 정보 섹션 */}
          <h2 className="section-title">기본 정보</h2>
          
          <div className="detail-item">
            <span className="label">이름</span>
            <span className="value">{userData.name || "이름 없음"}</span>
            <button className="edit-btn" onClick={() => handleEditClick("name")}>
              <img src={IconFrontButton} alt="수정" />
            </button>
          </div>
          <div className="detail-item">
            <span className="label">닉네임</span>
            <span className="value">{userData.nickname || "없음"}</span>
            <button className="edit-btn" onClick={() => handleEditClick("nickname")}>
              <img src={IconFrontButton} alt="수정" />
            </button>
          </div>

        {/* 연락처 섹션 */}
        <div className="contact-section">
          <h2 className="section-title">연락처</h2>

          <div className="detail-item">
            <span className="label">휴대폰 번호</span>
            <span className="value">{userData.tell || "번호 없음"}</span>
            <button className="edit-btn" onClick={() => handleEditClick("tell")}>
              <img src={IconFrontButton} alt="수정" />
            </button>
          </div>

          <div className="detail-item">
            <span className="label">이메일 주소</span>
            <span className="value">{userData.email || "이메일 없음"}</span>
            <button className="edit-btn" onClick={() => handleEditClick("email")}>
              <img src={IconFrontButton} alt="수정" />
            </button>
          </div>
        </div>

        {/* 기타 정보 섹션 */}
        <div className="etc-section">
          <h2 className="section-title">기타 정보</h2>

          <div className="detail-item">
            <span className="label">생년월일</span>
            <span className="value">{userData.birth || "생년월일 없음"}</span>
            <button className="edit-btn" onClick={() => handleEditClick("birth")}>
              <img src={IconFrontButton} alt="수정" />
            </button>
          </div>

          <div className="detail-item">
            <span className="label">회사</span>
            <span className="value">{userData.company || "없음"}</span>
            <button className="edit-btn" onClick={() => handleEditClick("company")}>
              <img src={IconFrontButton} alt="수정" />
            </button>
          </div>
        </div>
      </Page>
    </Background>
  );
};

export default ProfileInfo;
