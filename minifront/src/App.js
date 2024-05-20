import React, { useEffect, useState } from "react";
import axios from "axios";
import Board from "./boardPage/boardMain";
import Home from "./mainPage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./signupPage/SignUp";
import ChatMain from "./chatPage/ChatMain";
import GlobalStyle from "./GlobalStyle";
import BoardM from "./boardPage/boardMainM";
import Login from "./loginPage/Login";
import Chat from "./chatPage/Chat";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 데이터베이스에서 데이터를 가져오는 API 호출
    axios
      .get("http://localhost:3001/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/askme" element={<Home />} />
          <Route path="/askme/board" element={<Board />} />
          <Route path="/askme/boardmobile" element={<BoardM />} />
          <Route path="/askme/signup" element={<SignUp />} />
          <Route path="/askme/chatmain" element={<ChatMain />} />
          <Route path="/askme/chat" element={<Chat />} />
          <Route path="/askme/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
