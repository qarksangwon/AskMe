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
  const [roomId, setRoomId] = useState(["", "", "", "", ""]);
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/askme" element={<Home />} />
          <Route path="/askme/board" element={<Board />} />
          <Route path="/askme/boardmobile" element={<BoardM />} />
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
