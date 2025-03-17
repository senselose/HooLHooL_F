// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../../styles/board/boardDetail.css";

// const BoardDetail = () => {
//     const { boardId } = useParams();
//     const [board, setBoard] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [likeCount, setLikeCount] = useState(0);
//     const [isLiked, setIsLiked] = useState(false);

//     useEffect(() => {
//         fetchBoardDetail();
//         fetchComments();
//         fetchLikeStatus();
//         fetchLikeCount();
//     }, [boardId]);

//     // 게시글 상세 정보 가져오기
//     const fetchBoardDetail = async () => {
//         try {
//             const response = await axios.get(`/api/v1/boards/${boardId}`);
//             setBoard(response.data);
//         } catch (error) {
//             console.error("게시글 상세 정보 가져오기 실패", error);
//         }
//     };

//     // 댓글 목록 가져오기
//     const fetchComments = async () => {
//         try {
//             const response = await axios.get(`/api/v1/comments/by-board/${boardId}`);
//             setComments(response.data);
//         } catch (error) {
//             console.error("댓글 목록 가져오기 실패", error);
//         }
//     };

//     // 좋아요 상태 확인
//     const fetchLikeStatus = async () => {
//         try {
//             const response = await axios.get(`/api/v1/likes/BOARD/${boardId}/status`, {
//                 params: { userId: "현재_사용자_ID" },
//             });
//             setIsLiked(response.data);
//         } catch (error) {
//             console.error("좋아요 상태 확인 실패", error);
//         }
//     };

//     // 좋아요 개수 확인
//     const fetchLikeCount = async () => {
//         try {
//             const response = await axios.get(`/api/v1/likes/BOARD/${boardId}/count`);
//             setLikeCount(response.data);
//         } catch (error) {
//             console.error("좋아요 개수 가져오기 실패", error);
//         }
//     };

//     if (!board) return <div>Loading...</div>;

//     // 타입에 따라 클래스 이름 설정
//     const containerClass = `board-detail-container ${board.type.toLowerCase()}`;

//     return (
//         <div className={containerClass}>
//             <h2 className="board-title">{board.title}</h2>
//             <div className="board-meta">
//                 <span className="board-author">{board.userId}</span>
//                 <span className="board-date">{new Date(board.cDate).toLocaleString()}</span>
//             </div>
//             <div className="board-content">{board.content}</div>
            
//             <div className="board-images">
//                 {board.images.map((image, index) => (
//                     <img
//                         key={index}
//                         src={`http://localhost:3000/uploads/${encodeURIComponent(image.fileName)}`}
//                         alt={`Board Image ${index + 1}`}
//                         className="board-image"
//                     />
//                 ))}
//             </div>
            
//             <div className="board-hashtags">
//                 {board.hashTag && board.hashTag.split(" ").map((tag, index) => (
//                     <span key={index} className="board-tag">{tag}</span>
//                 ))}
//             </div>
            
//             <div className="board-likes">
//                 <button className={`like-button ${isLiked ? "liked" : ""}`}>
//                     ♥ {likeCount}
//                 </button>
//             </div>
            
//             <div className="board-comments">
//                 <h3>댓글</h3>
//                 {comments.map(comment => (
//                     <div key={comment.commentId} className="comment">
//                         <p>{comment.content}</p>
//                         <span>{comment.userId}</span>
//                         <span>{new Date(comment.coCDate).toLocaleString()}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BoardDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/board/boardDetail.css";

const BoardDetail = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [comments, setComments] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        fetchBoardDetail();
        fetchComments();
        fetchLikeStatus();
        fetchLikeCount();
    }, [boardId]);

    // 게시글 상세 정보 가져오기
    const fetchBoardDetail = async () => {
        try {
            const response = await axios.get(`/api/v1/boards/${boardId}`);
            setBoard(response.data);
        } catch (error) {
            console.error("게시글 상세 정보 가져오기 실패", error);
        }
    };

    // 댓글 목록 가져오기
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/v1/comments/by-board/${boardId}`);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 목록 가져오기 실패", error);
        }
    };

    // 좋아요 상태 확인
    const fetchLikeStatus = async () => {
        try {
            const response = await axios.get(`/api/v1/likes/BOARD/${boardId}/status`, {
                params: { userId: "현재_사용자_ID" },
            });
            setIsLiked(response.data);
        } catch (error) {
            console.error("좋아요 상태 확인 실패", error);
        }
    };

    // 좋아요 개수 확인
    const fetchLikeCount = async () => {
        try {
            const response = await axios.get(`/api/v1/likes/BOARD/${boardId}/count`);
            setLikeCount(response.data);
        } catch (error) {
            console.error("좋아요 개수 가져오기 실패", error);
        }
    };

    if (!board) return <div>Loading...</div>;

    // 타입에 따라 클래스 이름 설정
    const containerClass = `board-detail-container ${board.type.toLowerCase()} ${board.images.length > 0 ? "with-image" : "no-image"}`;

    const formatDate = (date) => {
        const now = new Date();
        const postDate = new Date(date);
        const diff = (now - postDate) / 1000;
        if (diff < 60) return `${Math.floor(diff)}분 전`;
        if (diff < 3600) return `${Math.floor(diff / 60)}시간 전`;
        return postDate.toLocaleDateString();
    };

    return (
      <div className={containerClass}>
        <div className="board-header">
            <div className="header-left-icons">
                <img src="assets/icon/ArrowBack.png" alt="Back" className="back-icon" />
                <img src="assets/icon/IconHome.png" alt="Home" className="home-icon" />
            </div>
            <img src="assets/icon/IconMenuDotsVertical.png" alt="More" className="menu-icon" />
        </div>
        {board.images.length > 0 && (
                <div className="board-image-carousel">
                    {board.images.map((image, index) => (
                        <img
                            key={index}
                            src={`http://localhost:3000/uploads/${encodeURIComponent(image.fileName)}`}
                            alt={`Board Image ${index + 1}`}
                            className="board-carousel-image"
                        />
                    ))}
                </div>
            )}
            <h1 className="Detail-logo-text-wrapper">
              <span className="logo-text static">HooL</span>    
              <span className={`logo-text dynamic ${board.type.toLowerCase()}`}>
                HooL
              </span>
            </h1>
            <div className="board-info">
                <div className="author-info">
                    <div className="profile-image" style={{ backgroundImage: `url(${board.userProfileImage})` }} />
                    <div className="author-details">
                        <p className="author-name">{board.userId}</p>
                        <p className="post-date">
                            <span className="icon clock-icon" />
                            {formatDate(board.cDate)}
                            <span className="icon commentCount-icon" />
                            {comments.length}
                        </p>
                    </div>
                </div>
                <div className="like-button-wrapper">
                    <button className={`like-button ${isLiked ? "liked" : ""}`}>
                        <span className="icon heart-icon" /> {likeCount}
                    </button>
                </div>
            </div>

            <div className="board-content-wrapper">
                <h2 className="board-content-title">{board.title}</h2>
                <div className="board-hashtags">
                    {board.hashTag && board.hashTag.split(" ").map((tag, index) => (
                        <span key={index} className="board-tag">{tag}</span>
                    ))}
                </div>
                <div className="board-content">{board.content}</div>
                <p className="board-stats">
                    좋아요 {likeCount} · 조회 {board.view}
                </p>
            </div>

            <div className="board-comments">
                <h3>댓글</h3>
                {comments.map(comment => (
                    <div key={comment.commentId} className="comment">
                        <p>{comment.content}</p>
                        <span>{comment.userId}</span>
                        <span>{formatDate(comment.coCDate)}</span>
                        <button className="icon comment-like-icon" />
                        <button className="icon reCommentCount-icon" />
                        <button className="icon menu-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardDetail;

