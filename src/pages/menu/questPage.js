import React from "react";
import "./QuestPage.css"; // 스타일 파일 import
import { FaBell } from "react-icons/fa"; // 아이콘 예시 (적절한 이미지로 교체 가능)

// 더미 데이터 (나중에 백엔드 연동하면 여기서 API로 대체 가능)
const quests = [
  {
    id: 1,
    icon: "/assets/icons/quest1.png",
    title: "미션 알림 받기",
    description: "영웅 친구",
    progress: null, // 진행도가 없는 경우
    button: "알림 받기",
  },
  {
    id: 2,
    icon: "/assets/icons/quest2.png",
    title: "주말에 방문하기",
    description: "눈 결정",
    progress: { current: 0, total: 4 }, // 진행도 있는 경우
  },
  {
    id: 3,
    icon: "/assets/icons/quest3.png",
    title: "공동구매 1번 구매하기",
    description: "크리스마스 트리",
    progress: { current: 0, total: 1 },
  },
  {
    id: 4,
    icon: "/assets/icons/quest4.png",
    title: "도시에서 5번 결제하기",
    description: "고양이 사냥",
    progress: { current: 0, total: 5 },
  },
];

const QuestPage = () => {
  return (
    <div className="quest-page">
      <h2 className="quest-title">퀘스트</h2>

      <ul className="quest-list">
        {quests.map((quest) => (
          <li key={quest.id} className="quest-item">
            <img src={quest.icon} alt={quest.title} className="quest-icon" />
            <div className="quest-info">
              <h3 className="quest-name">{quest.title}</h3>
              <p className="quest-description">{quest.description}</p>

              {/* 진행도 바 표시 */}
              {quest.progress && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(quest.progress.current / quest.progress.total) * 100}%`,
                    }}
                  ></div>
                  <span className="progress-text">
                    {quest.progress.current}/{quest.progress.total}
                  </span>
                </div>
              )}
            </div>

            {/* 버튼이 있는 경우 */}
            {quest.button && <button className="quest-button">{quest.button}</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestPage;
