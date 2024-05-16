import Board from "./boardPage/boardMain";
import Home from "./mainPage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./signupPage/SignUp";
import ChatMain from "./chatPage/ChatMain";
import GlobalStyle from "./GlobalStyle";
import BoardM from "./boardPage/boardMainM";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/askme" element={<Home />} />
          <Route path="/askme/board" element={<Board />} />
          <Route path="/askme/boardmobile" element={<BoardM />} />
          <Route path="/askme/signup" element={<SignUp />} />
          <Route path="/askme/chat" element={<ChatMain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
