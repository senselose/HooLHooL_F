import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/login/newRegister.css";

const NavigationButtons = ({ onPrev, onNext, nextDisabled }) => {
  return (
    <div className="step-buttons">
      {onPrev && <button onClick={onPrev}>이전</button>}
      {onNext && (
        <button onClick={onNext} disabled={nextDisabled}>
          다음
        </button>
      )}
    </div>
  );
};


//--------------------------------------------------------

const NewRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    tell: "",
    email: "",
    nickname: "",
  });
  const [validationMessages, setValidationMessages] = useState({});
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault(); // 기본 제출 동작 방지
      nextStep(); // 다음 단계로 이동
    }
  };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    
      if (["userId", "email", "nickname", "tell"].includes(name)) {
        validateField(name, value); // 아이디, 이메일, 닉네임 중복 확인
      }
    
      if (name === "password") {
        validatePassword(value);
      }
    
      if (name === "confirmPassword") {
        validatePasswordMatch(value, formData.password);
      }
    };
  


  // const validateField = async (field, value) => {
  //   if (!value.trim()) {
  //     setValidationMessages((prev) => ({
  //       ...prev,
  //       [field]: `${field}을(를) 입력해 주세요.`,
  //     }));
  //     return;
  //   }
  
  //   let isAvailable = false;
  
  //   try {
  //     if (field === "userId") {
  //       isAvailable = await checkId(value);
  //     } else if (field === "email") {
  //       isAvailable = await checkEmail(value);
  //     } else if (field === "nickname") {
  //       isAvailable = await checkNickname(value);
  //     } else if (field === "tell") { // 핸드폰 번호 중복 확인 추가
  //       isAvailable = await checkTell(value);
  //     }
  
  //     setValidationMessages((prev) => ({
  //       ...prev,
  //       [field]: isAvailable
  //         ? `사용할 수 있는 ${field}입니다.`
  //         : `중복된 ${field}입니다. 다른 값을 입력해 주세요.`,
  //     }));
  //   } catch (error) {
  //     setValidationMessages((prev) => ({
  //       ...prev,
  //       [field]: `${field} 확인 중 오류가 발생했습니다.`,
  //     }));
  //   }
  // };
  
  const validateField = async (field, value) => {
    if (!value.trim()) {
      setValidationMessages((prev) => ({
        ...prev,
        [field]: `${field}을(를) 입력해 주세요.`,
      }));
      return;
    }
  
    if (field === "tell") {
      const phoneRegex = /^010\d{4}\d{4}$/; // "01012345678" 형식만 허용
      if (!phoneRegex.test(value)) {
        setValidationMessages((prev) => ({
          ...prev,
          tell: "올바른 핸드폰 번호 형식을 입력해 주세요.",
        }));
        return; // 형식이 맞지 않으면 중단
      }
    }
  
    let isAvailable = false;
  
    try {
      if (field === "userId") {
        isAvailable = await checkId(value);
      } else if (field === "email") {
        isAvailable = await checkEmail(value);
      } else if (field === "nickname") {
        isAvailable = await checkNickname(value);
      } else if (field === "tell") { // 핸드폰 번호 중복 확인 추가
        isAvailable = await checkTell(value);
      }
  
      setValidationMessages((prev) => ({
        ...prev,
        [field]: isAvailable
          ? `사용할 수 있는 ${field}입니다.`
          : `중복된 ${field}입니다. 다른 값을 입력해 주세요.`,
      }));
    } catch (error) {
      setValidationMessages((prev) => ({
        ...prev,
        [field]: `${field} 확인 중 오류가 발생했습니다.`,
      }));
    }
  };
  
  const checkId = async (userId) => {
    try {
      const response = await fetch(`/api/v1/auth/checkId?userId=${userId}`);
      if (response.ok) {
        return await response.json(); // true: 사용 가능, false: 중복
      }
      return false;
    } catch (error) {
      console.error("아이디 중복 확인 요청 실패:", error);
      return false;
    }
  };
  

  const checkEmail = async (email) => {
    try {
      const response = await fetch(`/api/v1/auth/checkMail?email=${email}`);
      if (response.ok) {
        return await response.json(); // true: 사용 가능, false: 중복
      }
      return false;
    } catch (error) {
      console.error("이메일 중복 확인 요청 실패:", error);
      return false;
    }
  };
  
  const checkNickname = async (nickname) => {
    try {
      const response = await fetch(`/api/v1/auth/checkNickName?nickname=${nickname}`);
      if (response.ok) {
        return await response.json(); // true: 사용 가능, false: 중복
      }
      return false;
    } catch (error) {
      console.error("닉네임 중복 확인 요청 실패:", error);
      return false;
    }
  };


  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\W).{8,}$/;
    setValidationMessages((prev) => ({
      ...prev,
      password: passwordRegex.test(password)
        ? "사용할 수 있는 비밀번호입니다."
        : "비밀번호는 8자 이상, 소문자 및 특수문자를 포함해야 합니다.",
    }));

    if (formData.confirmPassword) {
      validatePasswordMatch(formData.confirmPassword, password);
    }
  };

  const validatePasswordMatch = (confirmPassword, password) => {
    setValidationMessages((prev) => ({
      ...prev,
      confirmPassword:
        confirmPassword === password
          ? "비밀번호가 일치합니다."
          : "비밀번호가 일치하지 않습니다.",
    }));
  };


  const checkTell = async (tell) => {
    try {
      const response = await fetch(`/api/v1/auth/checkTell?tell=${tell}`);
      if (response.ok) {
        return await response.json(); // true: 사용 가능, false: 중복
      }
      return false;
    } catch (error) {
      console.error("핸드폰 번호 중복 확인 요청 실패:", error);
      return false;
    }
  };

  
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  //-------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
          name: formData.name,
          tell: formData.tell,
          email: formData.email,
          nickname: formData.nickname,
        }),
      });
  
      if (response.ok) {
        alert("회원가입이 완료되었습니다!");
        navigate("/mypage");
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>회원가입</h1>
      </div>
      <form className="register-form">
        {step === 1 && (
          <div className="step">
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // 엔터키 감지
              placeholder="아이디를 입력하세요"
              required
            />
            <p className={`validation-message ${validationMessages.userId?.includes("사용할 수 있는") ? "success" : "error"}`}>
              {validationMessages.userId}
            </p>
            <NavigationButtons
              onNext={nextStep}
              nextDisabled={!validationMessages.userId?.includes("사용할 수 있는")}
            />
          </div>
        )}
        {step === 2 && (
          <div className="step">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // 엔터키 감지
              placeholder="비밀번호를 입력하세요"
              required
            />
            <p className={`validation-message ${validationMessages.password?.includes("사용할 수 있는") ? "success" : "error"}`}>
              {validationMessages.password}
            </p>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // 엔터키 감지
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
              <p className={`validation-message ${validationMessages.confirmPassword?.includes("비밀번호가 일치합니다.") ? "success" : "error"}`}>
              {validationMessages.confirmPassword}
            </p>
            <NavigationButtons
              onPrev={prevStep}
              onNext={nextStep}
              nextDisabled={validationMessages.confirmPassword !== "비밀번호가 일치합니다."}
            />
          </div>
        )}
        {step === 3 && (
          <div className="step">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // 엔터키 감지
              placeholder="이름을 입력하세요"
              required
            />
            <NavigationButtons onPrev={prevStep} onNext={nextStep} />
          </div>
        )}
        {step === 4 && (
          <div className="step">
            <label htmlFor="tell">핸드폰 번호</label>
            <input
              type="text"
              id="tell"
              name="tell"
              value={formData.tell}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // 엔터키 감지
              placeholder="01012345678"
              required
            />
            <p className={`validation-message ${validationMessages.tell?.includes("사용할 수 있는") ? "success" : "error"}`}>
              {validationMessages.tell}
            </p>
            <NavigationButtons 
              onPrev={prevStep} 
              onNext={nextStep} 
              nextDisabled={!validationMessages.tell?.includes("사용할 수 있는")}
            />
          </div>
        )}
        {step === 5 && (
          <div className="step">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // 엔터키 감지
              placeholder="이메일을 입력하세요"
              required
            />
            <p className={`validation-message ${validationMessages.email?.includes("사용할 수 있는") ? "success" : "error"}`}>
              {validationMessages.email}
            </p>
            <NavigationButtons onPrev={prevStep} onNext={nextStep} />
          </div>
        )}
        {step === 6 && (
          <div className="step">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // 엔터키 감지
              placeholder="닉네임을 입력하세요"
            />
            <p className={`validation-message ${validationMessages.nickname?.includes("사용할 수 있는") ? "success" : "error"}`}>
              {validationMessages.nickname}
            </p>
            <NavigationButtons
                onPrev={prevStep}
                onNext={handleSubmit}
                nextDisabled={!validationMessages.nickname?.includes("사용할 수 있는")}
              />
          </div>
        )}
      </form>
    </div>
  );
};

export default NewRegister;
