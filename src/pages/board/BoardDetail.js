import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function BoardDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState({});

  // Redux에서 닉네임과 프로필 이미지 가져오기
  const nickname = useSelector((state) => state.auth.nickname);
  const profileImage = useSelector((state) => state.auth.profileImage);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/v1/boards/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/v1/comments/by-board/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`/api/v1/comments`, {
        boardId: id,
        nickname: nickname || "익명",
        profileImage: profileImage || null,
        content: newComment,
      });

      setComments((prev) => [...prev, response.data]);
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleAddReply = async (commentId) => {
    if (!newReply[commentId]?.trim()) {
      alert("대댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`/api/v1/re-comments`, {
        commentId: commentId,
        nickname: nickname || "익명",
        profileImage: profileImage || null,
        content: newReply[commentId],
      });

      // 대댓글 추가 후 상태 업데이트
      setComments((prev) =>
        prev.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, childComments: [...comment.childComments, response.data] }
            : comment
        )
      );

      setNewReply((prev) => ({ ...prev, [commentId]: "" })); // 입력 필드 초기화
    } catch (error) {
      console.error("Error adding reply:", error);
      alert("대댓글 작성에 실패했습니다.");
    }
  };

  return (
    <div className="board-detail">
      {/* 게시글 상세 */}
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>

      {/* 댓글 작성 */}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleAddComment}>댓글 작성</button>
      </div>

      {/* 댓글 목록 */}
      <div>
        {comments.map((comment) => (
          <div key={comment.commentId}>
            <div>
              <img
                src={comment.profileImage || "https://via.placeholder.com/150"}
                alt={comment.nickname}
                width={30}
                height={30}
              />
              <span>{comment.nickname}</span>
            </div>
            <p>{comment.content}</p>

            {/* 대댓글 입력 */}
            <div>
              <textarea
                value={newReply[comment.commentId] || ""}
                onChange={(e) =>
                  setNewReply((prev) => ({ ...prev, [comment.commentId]: e.target.value }))
                }
                placeholder="대댓글을 입력하세요"
              />
              <button onClick={() => handleAddReply(comment.commentId)}>대댓글 작성</button>
            </div>

            {/* 대댓글 목록 */}
            {comment.childComments?.map((reply) => (
              <div key={reply.commentId}>
                <div>
                  <img
                    src={reply.profileImage || "https://via.placeholder.com/150"}
                    alt={reply.nickname}
                    width={30}
                    height={30}
                  />
                  <span>{reply.nickname}</span>
                </div>
                <p>{reply.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardDetail;
