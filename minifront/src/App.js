import Board from "./boardPage/boardMain";
import Home from "./mainPage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./signupPage/SignUp";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/askme" element={<Home />} />
          <Route path="/askme/board" element={<Board />} />
          <Route path="/askme/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
