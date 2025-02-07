import React from "react";
import { useNavigate } from "react-router-dom";
import IconBackButton from "assets/icon/IconBackButton.png"; // 이미지 파일을 가져오기
import "styles/components/BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 전 페이지로 이동
  };

  return (
    <button className="back-button" onClick={handleBack}>
      <img src={IconBackButton} alt="뒤로 가기" />
    </button>
  );
};

export default BackButton;
