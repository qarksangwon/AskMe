import Board from "./boardPage/boardMain";
import Home from "./mainPage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./signupPage/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
