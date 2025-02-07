import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Background from "context/Background.jsx";
import Page from "components/styles/Page.jsx";
import "styles/MyPage/editProfile.css";

const fieldNames = {
  name: "이름",
  nickname: "닉네임",
  tell: "휴대폰 번호",
  email: "이메일 주소",
  birth: "생년월일",
  company: "회사",
};

const EditProfile = () => {
  const { field } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  useEffect(() => {
    const userData = {
      name: "홍길동",
      nickname: "길동이",
      tell: "010-1234-5678",
      email: "test@example.com",
      birth: "1990-01-01",
      company: "네이버",
    };
    setValue(userData[field] || "");
  }, [field]);

  const handleSave = () => {
    console.log(`${field} 변경값:`, value);
    alert(`${fieldNames[field]}이(가) 변경되었습니다!`);
    navigate("/mypage");
  };

  return (
    <Background type="default">
      <Page id="editProfile">
        <div className="edit-profile-container">
          <h1 className="title">이름을 입력해주세요</h1>

          <div className="input-wrapper">
            <label className="input-label">{fieldNames[field]}</label>
            <input
              type="text"
              className="input-field"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`${fieldNames[field]}을(를) 입력하세요`}
            />
          </div>

          <button className="save-button" onClick={handleSave}>
            다음
          </button>
        </div>
      </Page>
    </Background>
  );
};

export default EditProfile;
