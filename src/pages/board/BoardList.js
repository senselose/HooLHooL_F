import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/board/boardList.css";
import BottomNav from "layouts/BottomNav";
import IconHeart from "assets/icon/IconHeart.png"; // 좋아요 아이콘
import IconComment from "assets/icon/IconCommentWhite.png"; // 댓글 아이콘
const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentType, setCurrentType] = useState("POSITIVE");
  const [sortOption, setSortOption] = useState("latest");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const buttonRefs = useRef([]);
  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts(0);
  }, [currentType, sortOption]);
  const fetchPosts = async (pageNumber) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const filterDate =
        sortOption === "likesLast7Days"
          ? 7
          : sortOption === "likesLast30Days"
          ? 30
          : null;
      const params = {
        type: currentType,
        page: pageNumber,
        sort: sortOption === "latest" ? "cDate,desc" : null,
        filterDate: filterDate || undefined,
      };
      const response = await axios.get(
        "http://localhost:8080/api/v1/boards",
        { params }
      );
      // API 응답 데이터를 콘솔에 출력하여 디버깅
      console.log("API 응답 데이터:", response.data.content);
      const newPosts = response.data.content || [];
      setPosts((prevPosts) =>
        pageNumber === 0 ? newPosts : [...prevPosts, ...newPosts]
      );
      setPage(pageNumber + 1);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error("게시글 가져오기 실패:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (now.toDateString() === date.toDateString()) {
      if (minutes < 60) return `${minutes}분 전`;
      return `${hours}시간 전`;
    } else {
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(date.getDate()).padStart(2, "0")}`;
    }
  };
  const handleSortChange = (sort, index) => {
    setSortOption(sort);
    const activeButton = buttonRefs.current[index];
    const indicator = document.querySelector(".active-indicator");
    if (activeButton && indicator) {
      const parentRect = activeButton.parentElement.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const offsetLeft = buttonRect.left - parentRect.left;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      indicator.style.width = `${buttonRect.width}px`;
    }
  };
  useEffect(() => {
    const activeButton = buttonRefs.current[0];
    const indicator = document.querySelector(".active-indicator");
    if (activeButton && indicator) {
      const parentRect = activeButton.parentElement.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const offsetLeft = buttonRect.left - parentRect.left;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      indicator.style.width = `${buttonRect.width}px`;
    }
  }, []);
  return (
    <div className={`board-list-container ${currentType.toLowerCase()}`}>
      <h1 className="logo-text-wrapper">
        <span className="logo-text static">HooL</span>
        <span className={`logo-text dynamic ${currentType.toLowerCase()}`}>
          HooL
        </span>
      </h1>
      {/* 정렬 옵션 버튼 */}
      <div className="board-sort-options">
        {["latest", "likesLast7Days", "likesLast30Days"].map((sort, index) => (
          <button
            key={sort}
            className={`sort-button ${sortOption === sort ? "active" : ""}`}
            onClick={() => handleSortChange(sort, index)}
            ref={(el) => (buttonRefs.current[index] = el)}
          >
            {sort === "latest"
              ? "오늘의 훌훌"
              : sort === "likesLast7Days"
              ? "주간 베스트"
              : "월간 베스트"}
          </button>
        ))}
        <div className="sort-button-wrapper">
          <div className="active-indicator"></div>
        </div>
      </div>
      <div className="board-posts">
        {posts.map((post) => (
          <div
            key={post.boardId}
            className="board-post"
            onClick={() => navigate(`/board/${post.boardId}`)}
          >
            {/* 왼쪽 컨텐츠 */}
            <div className="post-left">
              <div className="post-tags">
              {post.hashTag &&
                post.hashTag.split(" ").map((tag, index) => (
                    <span key={index} className="post-tag">
                        <span
                            className="hashtag-symbol"
                            style={{
                                color:
                                    currentType === "POSITIVE"
                                        ? "#1133F6"
                                        : "#FD1919",
                            }}
                        >
                            #&nbsp;
                        </span>
                        {tag.substring(1)}
                    </span>
              ))}
              </div>
              <h4 className="post-title">{post.title}</h4>
              <div className="post-meta">
                <span>{formatDate(post.cDate)}</span>
                <span> | 조회 {post.views || 0}</span>
              </div>
            </div>
            {/* 오른쪽 컨텐츠 */}
            <div className="post-right">
              {post.images && post.images.length > 0 ? (
                      <img
                          src={`http://localhost:8080/uploads/${post.images[0].fileName}`}
                          alt="썸네일"
                          className="post-thumbnail"
                      />
                  ) : (
                      <div className="post-thumbnail transparent"></div>
                  )}
              <div className="post-stats">
                <span className="post-likes">
                  <img src={IconHeart} alt="좋아요" className="icon" />
                  {post.likes || 0}
                </span>
                <span className="post-comments">
                  <img src={IconComment} alt="댓글" className="icon" />
                  {post.comments || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav onLogoClick={(type) => setCurrentType(type)} />
      </div>
  );
};
export default BoardList;