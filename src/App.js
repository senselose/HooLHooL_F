import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "styles/index.css";


// 로그인페이지 관련
import InitScreen from 'pages/login/InitScreen'; //안코코 추가
import NewRegister from 'pages/login/NewRegister';
 // import Login from 'pages/login/Login';
 import LoginPage from 'pages/login/LoginPage';
 import LoadingScreen from 'pages/login/LoadingScreen';
 import LoadingToMain from 'pages/login/LoadingToMain';


 // 메뉴페이지
import Menu from 'pages/menu/menu'
// import Board from './components/board/Board';
import BoardForm from 'pages/board/BoardFormCoPy';
import BoardList from 'pages/board/BoardList';
import BoardDetail from 'pages/board/BoardDetail';
import Register from 'components/login/Register';
// import Main from './components/main/main';
// import SevenHell from './components/hellmap/SevenHell';
// import HellPages from './components/main/pages/HellPages'; // 경로에 맞게 수정
// import VillainUploader from "./components/hellmap/VillainUploader.js";


import AuthCheck from 'utils/AuthCheck';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux"; 
import store, { persistor } from "./reducers/store"; // store.js 경로에 맞게 수정 지은 추가
import FloatingButton from 'components/floatingButton/FloatingButton';

import Header from 'layouts/header';

//마이페이지 관련
import MyPage from 'pages/MyPage/MyPage';
import ProfileInfo from 'pages/MyPage/ProfileInfo';
import EditProfile from 'pages/MyPage/EditProfile';
// import MyPosts from './components/profile/MyPosts.js'; // 지은 추가
// import MyComments from './components/profile/MyComments.js'; // 지은 추가

// import YoutubeLive from './components/menu/YoutubeLive.js';



function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={<div>로딩 중...</div>} persistor={persistor}>
        <AuthCheck/>
        <Router>
          <Routes>
            <Route path="/" element={<InitScreen />} />
            <Route path="/NewRegister" element={<NewRegister />} />

            <Route path="/Login" element={<Login />} />
            <Route path="/create" element={<BoardForm />} />
            {/* <Route path="/main" element={<Main />} /> */}
            {/* <Route path="/YoutubeLive" element={<YoutubeLive />} /> */}
            <Route path="/MyPage" element={<MyPage />} />
            {/* <Route path="/my-posts" element={<MyPosts/>}/> */}
            {/* <Route path="/my-comments" element={<MyComments/>}/> */}

            {/* 기본 경로 */}
              {/* <Route path="/sevenHell" element={<SevenHell />} /> */}
              {/* <Route path="/VillainUploader" element={<VillainUploader />} /> */}


            <Route path="/BoardList" element={<BoardList />} /> 오타 수정
            <Route path="/board/:id" element={<BoardDetail />} /> 게시글 상세 페이지 경로 추가
            <Route path="/register" element={<Register />} />    
            {/* <Route path="/test" element={<Test/>} />     */}
            {/* <Route path="/feed" element={<Feed/>} /> */}
          </Routes>

          {/* 전역 FloatingButton */}
          {/* <FloatingButton /> */}
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
