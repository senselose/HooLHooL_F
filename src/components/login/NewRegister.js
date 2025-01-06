import React, { useState } from "react";
import "../../styles/newRegister.css";

const NewRegister = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, password, confirmPassword, phone } = formData;

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert("유효하지 않은 핸드폰 번호입니다.");
      return;
    }

    alert("회원가입이 완료되었습니다!");
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^010\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validatePhone = () => {
    if (validatePhoneNumber(formData.phone)) {
      alert("본인인증이 완료되었습니다!");
    } else {
      alert("올바른 핸드폰 번호를 입력해주세요.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>HooL HooL 회원가입</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder="아이디를 입력하세요"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <p className="info">
          정확한 아이디를 입력해 주세요.
          <br />
          아이디 변경은 불가하며 서비스 이용에 불가합니다.
        </p>

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <p className="info">
          비밀번호는 8글자 이상
          <br />
          영문/숫자/특수문자를 포함해야 합니다.
        </p>

        <label htmlFor="phone">핸드폰</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="01012345678"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="validation-button"
          onClick={validatePhone}
        >
          본인인증
        </button>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default NewRegister;
