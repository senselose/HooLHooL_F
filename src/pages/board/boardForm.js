import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  TextField,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
  Autocomplete,
  Card,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1d1d1d" },
    text: { primary: "#ffffff", secondary: "#aaaaaa" },
  },
});

const BoardForm = () => {
  const { id } = useParams(); // URL 파라미터에서 게시글 ID 가져오기
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth?.userId);
  const nickname = useSelector((state) => state.auth?.nickname);
  const profileImage = useSelector((state) => state.auth?.profileImage);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState("");

  // 예제 태그 데이터
  const sampleTags = ["학교", "직장", "친구", "연애", "엔터테인먼트"];

  // 수정 모드라면 기존 데이터 가져오기
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/boards/${id}`);
          const { title, content, hashtags, images, type } = response.data;
          setTitle(title);
          setContent(content);
          setTags(hashtags.split(","));
          setImagePreviews(images.map((img) => `http://localhost:8080/${img.filePath}`));
          setType(type);
        } catch (error) {
          console.error("게시글 불러오기 실패:", error.response?.data || error.message);
        }
      };
      fetchPost();
    }
  }, [id]);

  // 이미지 업로드 핸들러 
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        newImages.push(file);

        if (newPreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 게시글 작성/수정 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("hashtags", tags.join(","));
    formData.append("type", type);
    images.forEach((image) => formData.append("images", image));

    try {
      if (isEdit) {
        // 수정 요청
        await axios.put(`http://localhost:8080/api/v1/boards/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("게시글 수정 성공");
      } else {
        // 생성 요청
        await axios.post("http://localhost:8080/api/v1/boards", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("게시글 생성 성공");
      }
      navigate("/main");
    } catch (error) {
      console.error("게시글 저장 실패:", error.response?.data || error.message);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#282828",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center">
          {isEdit ? "게시글 수정" : "게시글 작성"}
        </Typography>

        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ style: { color: "#ffffff" } }}
          sx={{ "& .MuiInputBase-root": { color: "#ffffff" } }}
        />

        <TextField
        select
        label="게시글 유형"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        margin="normal"
        required
        SelectProps={{
            native: true,
        }}
        InputLabelProps={{ style: { color: "#ffffff" } }}
        sx={{ "& .MuiInputBase-root": { color: "#ffffff" } }}
        >
        <option value="">유형 선택</option>
        <option value="POSITIVE">긍정</option>
        <option value="NEGATIVE">부정</option>
        </TextField>

        <Autocomplete
          multiple
          freeSolo
          options={sampleTags}
          value={tags}
          onChange={(e, newValue) => setTags(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="태그" placeholder="태그를 추가하세요" margin="normal" />
          )}
        />

        <TextareaAutosize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={5}
          placeholder="내용을 입력하세요"
          style={{
            width: "100%",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: 4,
            padding: 8,
            marginTop: 16,
          }}
        />

        <Box>
          <Typography variant="body1">이미지 업로드</Typography>
          <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
            이미지 선택
            <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", padding: 2 }}>
          {imagePreviews.map((preview, index) => (
            <Card key={index}>
              <CardMedia component="img" image={preview} alt={`Image ${index}`} />
              <CardActions>
                <IconButton onClick={() => handleDeleteImage(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isEdit ? "수정하기" : "작성하기"}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default BoardForm;
