import Board from "./boardPage/boardMain";
import Home from "./mainPage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./signupPage/SignUp";
import ChatMain from "./chatPage/ChatMain";
import GlobalStyle from "./GlobalStyle";
import BoardM from "./boardPage/boardMainM";
import Login from "./loginPage/Login";
import Chat from "./chatPage/Chat";
import { useEffect, useState } from "react";
import BoardWrite from "./boardPage/boardWrite";
import Writesucces from "./boardPage/writeSuccess";
import FindId from "./findPage/findId";
import FindPw from "./findPage/findPw";
import MyPage from "./myPage/MyPage";
import UserDel from "./myPage/UserDel";
import PasswordConfirm from "./myPage/PasswordConfirm";
import EditInfo from "./myPage/EditInfo";
import ChatM from "./chatPage/ChatM";
import HomeM from "./mainPage/HomeM";
import Admin from "./admin/Admin";
import UserList from "./admin/UserList";

function App() {
  const isMobile = window.innerWidth <= 430;
  // ChatMain에서 roomId를 set한뒤에
  // roomId에 맞는 chat 내역을 보여주기 위해 부모 컴포넌트에서 설정
  const [roomId, setRoomId] = useState(["", "", "", "", ""]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/askme" element={isMobile ? <HomeM /> : <Home />} />
          <Route
            path="/askme/board"
            element={
              isMobile ? (
                <BoardM roomId={roomId} setRoomId={setRoomId} />
              ) : (
                <Board roomId={roomId} setRoomId={setRoomId} />
              )
            }
          />
          <Route path="/askme/board/write" element={<BoardWrite />} />
          <Route path="/askme/board/success" element={<Writesucces />} />
          <Route path="/askme/signup" element={<SignUp />} />
          <Route
            path="/askme/chatmain"
            element={<ChatMain roomId={roomId} setRoomId={setRoomId} />}
          />
          <Route
            path="/askme/chat"
            element={
              isMobile ? <ChatM roomId={roomId} /> : <Chat roomId={roomId} />
            }
          />
          <Route path="/askme/login" element={<Login />} />
          <Route path="/askme/findid" element={<FindId />} />
          <Route path="/askme/findpw" element={<FindPw />} />
          <Route path="/askme/mypage" element={<MyPage />} />
          <Route path="/askme/userdel" element={<UserDel />} />
          <Route path="/askme/mypage/confirm" element={<PasswordConfirm />} />
          <Route path="/askme/mypage/edit-info" element={<EditInfo />} />
          <Route path="/askme/admin" element={<Admin />} />
          <Route path="/askme/admin/userlist" element={<UserList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
