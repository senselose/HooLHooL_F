import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/board/boardList.css";

const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentType, setCurrentType] = useState("POSITIVE"); // 기본 타입: 긍정
  const [sortOption, setSortOption] = useState("latest"); // 기본 정렬: 최신순
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  useEffect(() => {
    // 필터 또는 정렬이 변경될 때 게시글 초기화
    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts(0); // 첫 페이지 로드
  }, [currentType, sortOption]);

  const fetchPosts = async (pageNumber) => {
    if (isLoading) return; // 로딩 중이면 중복 호출 방지
    setIsLoading(true);

    try {
      // filterDate만 보내고, sort는 latest만 유지
      const filterDate = sortOption === "likesLast7Days" ? 7 : 
                         sortOption === "likesLast30Days" ? 30 : null;

      const params = {
        type: currentType,
        page: pageNumber,
      };

      // 최신순일 경우에만 정렬을 추가
      if (sortOption === "latest") {
        params.sort = "cDate,desc";
      }

      if (filterDate) {
        params.filterDate = filterDate;
      }

      const response = await axios.get("http://localhost:8080/api/v1/boards", { params });

      console.log("Sort Option:", sortOption);
      const newPosts = response.data.content || [];

      setPosts((prevPosts) => (pageNumber === 0 ? newPosts : [...prevPosts, ...newPosts])); // 첫 페이지면 덮어쓰기, 아니면 추가
      setPage(pageNumber + 1);
      setHasMore(newPosts.length > 0); // 더 이상 데이터가 없으면 false로 설정
    } catch (error) {
      console.error("게시글 가져오기 실패:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (type) => {
    setCurrentType(type); // 필터 변경
  };

  const handleSortChange = (sort) => {
    setSortOption(sort); // 정렬 변경
  };

  const handleWriteButtonClick = () => {
    navigate("/create"); // 글쓰기 페이지로 이동
  };

  return (
    <div className="board-list-container">
      {/* 상단 필터 */}
      <div className="board-list-filters">
        <div className="board-type-buttons">
          <button
            className={`type-button ${currentType === "POSITIVE" ? "active" : ""}`}
            onClick={() => handleTypeChange("POSITIVE")}
          >
            긍정
          </button>
          <button
            className={`type-button ${currentType === "NEGATIVE" ? "active" : ""}`}
            onClick={() => handleTypeChange("NEGATIVE")}
          >
            부정
          </button>
        </div>
        <div className="board-sort-options">
          <button
            className={`sort-button ${sortOption === "latest" ? "active" : ""}`}
            onClick={() => handleSortChange("latest")}
          >
            최신순
          </button>
          <button
            className={`sort-button ${sortOption === "likesLast7Days" ? "active" : ""}`}
            onClick={() => handleSortChange("likesLast7Days")}
          >
            1주일 좋아요순
          </button>
          <button
            className={`sort-button ${sortOption === "likesLast30Days" ? "active" : ""}`}
            onClick={() => handleSortChange("likesLast30Days")}
          >
            1달 좋아요순
          </button>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="board-posts">
        {posts.map((post) => (
          <div key={post.boardId} className="board-post" onClick={() => navigate(`/board/${post.boardId}`)}>
            <div className="post-type-icon">{currentType === "POSITIVE" ? "😊" : "😡"}</div>
            <div className="post-content">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <span>{post.likes || 0} 좋아요</span>
            </div>
          </div>
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && !isLoading && (
        <button className="load-more-button" onClick={() => fetchPosts(page)}>
          더 보기
        </button>
      )}

      {/* 글쓰기 버튼 */}
      <button className="write-button" onClick={handleWriteButtonClick}>
        글쓰기
      </button>
    </div>
  );
};

export default BoardList;

