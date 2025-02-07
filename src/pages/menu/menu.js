import React from "react";
import Page from "components/styles/Page";
import Background from "context/Background.jsx";
import "styles/menu/menu.css"; // Menu 전용 스타일
import "styles/page.css"; // 공통 스타일

/* 이미지 import */
import money from "assets/image/money.png";
import cart from "assets/image/cart.png";
import note from "assets/image/note.png";
import trophy from "assets/image/trophy.png";
import people from "assets/image/people.png"; // 하단 이미지

const cardData = [
  {
    image: money,
    title: "퀘스트",
    description: "오늘의 퀘스트 목록을\n확인해 주세요!",
  },
  {
    image: note,
    title: "심리테스트",
    description: "자신에 대해서\n알아봅시다.",
  },
  {
    image: cart,
    title: "쇼핑",
    description: "포인트를 쿠폰으로\n교환하세요~",
  },
  {
    image: trophy,
    title: "리워드",
    description: "포인트 리워드를\n확인하세요~!",
  },
];

const Menu = () => {
  return (
    <Background type="default">
      <Page className="menuPage">
        {/* 카드 섹션 */}
        <section className="menu-card-section">
          {cardData.map((card, index) => (
            <div className="menu-card-grid" key={index}>
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p style={{ whiteSpace: "pre-line" }}>{card.description}</p>
            </div>
          ))}
        </section>

        {/* 하단 이미지 섹션 */}
        <section className="menu-image-section">
          <img src={people} alt="people" />
        </section>
      </Page>
    </Background>
  );
};

export default Menu;
