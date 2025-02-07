import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Page from "components/styles/Page";
import Background from "context/Background.jsx";
import "styles/MyPage/mypage.css";

/* 이미지 import */
import coin from "assets/image/coin.png";
import smile from "assets/image/smile.png";
import pig from "assets/image/pig.png"

const cardData = [
  {
    image: coin,
    title: "포인트",
  },
  {
    image: smile,
    title: "개인정보\n수정",  // \n을 사용하여 줄바꿈

  },
  {
    image: pig,
    title: "대시보드\n훌훌",

  },
];

const MyPage = () => {
  const [userData, setUserData] = useState({
    nickname: "",
    email: "",
    info: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
    profileImage: "https://via.placeholder.com/150",
  });
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false); // 비밀번호 확인 모달 상ㅌ
  const [editDialogOpen, setEditDialogOpen] = useState(false); // 수정 모달 상태
  const [editData, setEditData] = useState({}); // 수정 데이터
  const [isEditingInfo, setIsEditingInfo] = useState(false); // 수정 모드 여부 (자기소개)
  const [editedInfo, setEditedInfo] = useState(userData.info || ""); // 수정된 자기소개 내용
  const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 상태
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.userId || null); // Redux에서 userId 가져오기
  const dispatch = useDispatch(); // Redux의 dispatch 함수 가져오기 

   useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token"); // JWT 가져오기
          if (!token) {
            console.error("토큰이 없습니다. 다시 로그인해주세요.");
            return;
          }
    
          const response = await fetch("http://localhost:8080/api/v1/auth/check", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // JWT 전달
            },
          });
    
          if (!response.ok) {
            throw new Error("사용자 인증 실패");
          }
    

          
  
          const { userId } = await response.json(); // 서버에서 userId 추출
          dispatch({ type: "SET_USER_ID", payload: userId }); // Redux 상태 업데이트
    
          // 사용자 정보를 가져오기
          const userResponse = await fetch(`http://localhost:8080/api/v1/user/${userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // JWT 전달
            },
          });
    
          if (!userResponse.ok) {                           
            throw new Error("사용자 정보를 가져올 수 없습니다.");
          }
    
          const userData = await userResponse.json();
          setUserData({
            nickname: userData.nickname || "닉네임 없음",
            email: userData.email || "이메일 없음",
            info: userData.info || "자기소개가 없습니다.",
            profileImage: userData.profileImage || "https://via.placeholder.com/150",
            tell: userData.tell || "",
            marketing: userData.marketing === 1,
            point : userData.point,
            password: "", 
          });
          
          setLoading(false); // 로딩 상태 해제
        } catch (error) {
          console.error("Error:", error.message);
        }
      };
    
      fetchUserData();
    }, [dispatch]);
  
    useEffect(() => {
      setEditedInfo(userData.info || "");
    }, [userData]);
  
    // 비밀번호 확인 모달 열기
    const handleEditProfileClick = () => {
      setPasswordDialogOpen(true);
    };
  
    // 비밀번호 확인
    const handlePasswordCheck = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/user/${userId}/checkPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: inputPassword }),
        });
  
        if(!response.ok) {
          throw new Error("비밀번호를 다시 확인해주세요");
        }
  
        const result = await response.json();
        if(result.success) {
          setPasswordDialogOpen(false);
          setEditData(userData);
          setEditDialogOpen(true);
        } else {
          setPasswordError(true); // 비밀번호 오류 상태 설정
        }
      } catch (error) {
          console.error("Error checking password:", error.message);
          setPasswordError(true);
      }
    };
  
    const handleCardClick = (title) => {
      if (title === "개인정보\n수정") {
        navigate("/ProfileInfo", { replace: false }); // 히스토리 추가됨 → 뒤로가기 가능
      }
    };


    const userDataRedux = useSelector((state) => state.auth); 
    // console.log("Redux에 저장된 사용자 정보:", userDataRedux);
    console.log("현재 userData 상태:", userData);

    // 수정 모드 활성화 (자기소개)
    const handleEditInfo = () => {
      setEditedInfo(userData.info); // 현재 값 임시 저장
      setIsEditingInfo(true);
    }
  
    // 자기소개 변경 핸들러
    const handleInfoChange = (e) => {
      setEditedInfo(e.target.value);
    }
  
    // 자기소개 수정 완료 (확인버튼)
    const handleSaveInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/user/${userId}/updateInfo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({info: editedInfo}),
        });
  
        if(!response.ok) {
          throw new Error("자기소개 수정 실패");
        }
  
        alert("자기소개 수정 성공");
        setUserData((prev) => ({...prev, info: editedInfo}));
        setIsEditingInfo(false);
        
      } catch (error) {
        alert("Error:", error.massage);
      }
    }
  
    // 자기소개 수정 취소 (취소버튼)
    const handleCancelInfo = () => {
      setEditedInfo(userData.info); // 변경 전 값으로 복원
      setIsEditingInfo(false);
    }
  
    // 자기소개 X 버튼 (삭제)
    const handleClearInfo = () => {
      setEditedInfo("");
    }
    
    // 수정 모달 닫기
    const handleEditClose = () => {
      setEditDialogOpen(false);
    };
  
    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
      const {name, value, type, checked } = e.target;
      setEditData({
        ...editData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
  
    // 비밀번호 확인 모달 닫기
    const handlePasswordDialogClose = () => {
      setPasswordDialogOpen(false);
      setInputPassword("");
      setPasswordError(false);
    }
  
    // 프로필 수정 저장
    const handleSaveChanges = async () => {
      try {
        const payload = {
          ...editData,
          marketing: editData.marketing ? 1 : 0,
        };
    
        // 비밀번호가 입력되지 않았다면 payload에서 제외
        if (!editData.password) {
          delete payload.password;
        }
    
        const response = await fetch(`http://localhost:8080/api/v1/user/${userId}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error("사용자 정보를 업데이트할 수 없습니다.");
        }
    
        const updatedData = await response.json();
        setUserData(updatedData);
        alert("프로필 수정 완료.")
        setEditDialogOpen(false);
      } catch (error) {
        console.error("Error updating user data:", error.message);
      }
    };
  
    // 파일 업로드 핸들러
    const handleAvatarClick = () => {
      document.getElementById("avatar-upload").click();
    };
  
    const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
    
        fetch(`http://localhost:8080/api/v1/user/${userId}/uploadProfileImage`, {
          method: "POST",
          body: formData,
          
        })  
          .then((response) => {
            if (!response.ok) {
              throw new Error("이미지 업로드 실패");
            }
            return response.json();
          })
          .then((data) => {
            console.log("업로드된 이미지 경로:", data.profilePicturePath);
            setUserData((prevState) => ({
              ...prevState,
              profilePicturePath: `http://localhost:8080${data.profilePicturePath}`,
            }));
          })
          .catch((error) => {
            console.error("Error uploading profile picture:", error);
          });
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem("token"); // 토큰 삭제
      dispatch({type: "LOGOUT"}); // Redux 상태 초기화
      alert("로그아웃되었습니다!");
      navigate("/") // 로그인 페이지로 이동
      // 로그아웃 처리 로직
    };
  
    if (!userId) {
      return <div>로그인이 필요합니다.</div>;
    }
  
    if (loading) {
      return <div>로딩 중...</div>;
    }
  


  return (
    <Background type="mypage">
      <Page scrollable={false} className="mypage">
        {/* Header */}
        <header className="mypage-header">
          <h1 className="mypage-title">MyPage</h1>
          <p className="mypage-subtitle">관심과 공감이 가치가 되는 곳</p>
        </header>

        {/* 카드 섹션 */}
        <section className="mypage-card-section">
          {cardData.map((card, index) => (
            <div className="mypage-card-item" 
              key={index}
              onClick={() => handleCardClick(card.title)} // 클릭 시 이동
              style={{ cursor: "pointer" }} // 클릭 가능하도록 스타일 추가
            >
              {card.title === "포인트" && <p className="point">{userData.point} </p>}
              {card.title === "개인정보\n수정" && <p className="content"></p>}
              {card.title === "대시보드\n훌훌" && <p className="content"></p>}

              {/* <p className="point">{card.description}</p> */}
              <h3>{card.title}</h3>
              <img src={card.image} alt={card.title} />
            </div>
          ))}
        </section>

        {/* 프로필 섹션 */}
        <section className="profile-section">
          <div className="profile-top-row">
          <div className="profile-avatar-wrapper" onClick={handleAvatarClick}>
            <img
              src={userData.profileImage}
              alt={`${userData.nickname}'s profile`}
              className="profile-avatar"
            />
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
              <button className="edit-icon-button" onClick={handleAvatarClick}>
              </button>
          </div>
            <div className="profile-info-wrapper">
              <p className="profile-nickname">{userData.nickname}</p>
              <p className="profile-email">{userData.email}</p>
            </div>
          </div>
          <div className="profile-bottom-row">
            <p>자기소개글</p>

            {isEditingInfo ? (
              <>
                <input
                  type="text"
                  value={editedInfo}
                  onChange={handleInfoChange}
                  className="edit-info-input"
                  placeholder="자기소개를 입력하세요"
                />
                <div className="edit-save-buttons">
                  <button className="save-button" onClick={handleSaveInfo}>저장</button>
                  <button className="cancel-button" onClick={handleCancelInfo}>취소</button>
                </div>
              </>
            ) : (
              <>
                <p className="profile-info">{userData.info}</p>
                <button className="edit-button" 
                  onClick={handleEditInfo}
                  > 수정
                </button>
              </>
            )}
          </div>
        </section>

        {/* 활동 내역 섹션 */}
        <section className="activity-section">
          <h2 className="activity-title">활동 내역</h2>
          <div
            className="activity-item"
            onClick={() => console.log("Navigate to my posts")}
          >
            <span>✍️ 내가 쓴 글</span>
            <span className="activity-arrow">›</span>
          </div>
          <div
            className="activity-item"
            onClick={() => console.log("Navigate to my comments")}
          >
            <span>💬 내가 쓴 댓글</span>
            <span className="activity-arrow">›</span>
          </div>
          <div
            className="activity-item"
            onClick={() => console.log("Navigate to scraped comments")}
          >
            <span>📌 스크랩한 댓글</span>
            <span className="activity-arrow">›</span>
          </div>
        </section>
      </Page>
    </Background>
  );
};

export default MyPage;
