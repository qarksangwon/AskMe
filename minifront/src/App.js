import Board from "./boardPage/boardMain";
import Home from "./mainPage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./signupPage/SignUp";
import ChatMain from "./chatPage/ChatMain";
import GlobalStyle from "./GlobalStyle";
import BoardM from "./boardPage/boardMainM";
import Login from "./loginPage/Login";
import Chat from "./chatPage/Chat";
import { useState } from "react";

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
          <Route path="/askme" element={<Home />} />
          <Route
            path="/askme/board"
            element={isMobile ? <BoardM /> : <Board />}
          />
          <Route path="/askme/signup" element={<SignUp />} />
          <Route
            path="/askme/chatmain"
            element={<ChatMain roomId={roomId} setRoomId={setRoomId} />}
          />
          <Route path="/askme/chat" element={<Chat roomId={roomId} />} />
          <Route path="/askme/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
