import React, { useState } from "react";
import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./findId.css";
import { useNavigate } from "react-router-dom";

function FindId() {
  let findIdNavigate = useNavigate();

  const findIdExitClick = () => {
    findIdNavigate("/askme");
  };
  const [findemail, setFindEmail] = useState("");

  const findHandleEmail = (e) => {
    setFindEmail(e.target.value);
  };

  return (
    <div className="findidpage">
      <div className="findidimg">
        <img src={Logoimg} className="findidLogoimg" alt="로고" />
      </div>
      <div className="findidTitleWrap">아이디 찾기</div>
      <br />
      {/* --------------- 아이디찾기 */}
      <div className="findidInputTitle">이메일 주소</div>
      <div className="findidEmailBox">
        <div className="findidInputWrap">
          <input
            className="findidInput"
            type="text"
            placeholder="test@gmail.com"
            value={findemail}
            onChange={findHandleEmail}
          />
        </div>
        <button
          onClick={() => console.log("이메일 인증")}
          className="findidEmailButton"
        >
          이메일 인증
        </button>
      </div>
      <div className="findId">
        <button className="findIdButton">아이디 찾기</button>
        <button className="findExit" onClick={findIdExitClick}>
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

export default FindId;
