import React, { useState } from "react";
import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./findPw.css";
import { useNavigate } from "react-router-dom";

function FindPw() {
  let findPwNavigate = useNavigate();

  const findPwExitClick = () => {
    findPwNavigate("/askme");
  };
  const [findid, setFindId] = useState("");

  const findHandleId = (e) => {
    setFindId(e.target.value);
  };

  return (
    <div className="findpwpage">
      <div className="findpwimg">
        <img src={Logoimg} className="findpwLogoimg" alt="로고" />
      </div>
      <div className="findpwTitleWrap">비밀번호 찾기</div>
      <br />
      {/* --------------- 비번찾기 */}
      <div className="findpwInputTitle">아이디 입력</div>
      <div className="findpwEmailBox">
        <div className="findpwInputWrap">
          <input
            className="findpwInput"
            type="text"
            placeholder="아이디"
            value={findid}
            onChange={findHandleId}
          />
        </div>
      </div>
      <div className="findPw">
        <button className="findPwButton">비밀번호 찾기</button>
        <button className="findExit" onClick={findPwExitClick}>
          <img
            src={Exitimg}
            alt="findExit"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      </div>
    </div>
  );
}

export default FindPw;
