import React, { useState, useEffect } from "react";
import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./findPw.css";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

function FindPw() {
  let findPwNavigate = useNavigate();

  const findPwExitClick = () => {
    findPwNavigate("/askme");
  };

  const [findid, setFindId] = useState("");
  const [pwemail, setPwEmail] = useState("");
  const [pwVerifyCode, setPwVerifyCode] = useState("");
  const [pwTimer, setPwTimer] = useState(180);
  const [pwEmailVerify, setPwEmailVerify] = useState(false);
  const [pwIsVerified, setPwIsVerified] = useState(false);
  const [pwEmailMessage, setPwEmailMessage] = useState("");

  useEffect(() => {
    let interval;
    if (pwEmailVerify && pwTimer > 0) {
      interval = setInterval(() => {
        setPwTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pwEmailVerify, pwTimer]);

  const formatPwTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    return `${minutes}:${
      remainSeconds < 10 ? `0${remainSeconds}` : remainSeconds
    }`;
  };

  const findHandleId = (e) => {
    setFindId(e.target.value);
  };

  const handlePwVerifyCode = (e) => {
    setPwVerifyCode(e.target.value);
  };

  const handlePwVerifyCodeSubmit = async () => {
    try {
      const response = await AxiosApi.verifyEmailCode(pwemail, pwVerifyCode);
      if (response.data) {
        alert("이메일 인증이 완료되었습니다.");
        setPwEmailVerify(true);
        setPwIsVerified(true);
      } else {
        alert("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("인증 코드 확인에 실패했습니다.");
    }
  };

  const pwhandleEmailVerify = async () => {
    try {
      const emailCheckResponse = await AxiosApi.checkEmail(pwemail);
      if (emailCheckResponse.data) {
        setPwEmailMessage("이미 사용중인 이메일 입니다.");
        return;
      }

      const response = await AxiosApi.sendVerificationEmail(pwemail);
      if (response.status === 200) {
        setPwEmailVerify(true);
        alert("인증 이메일이 전송되었습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("이메일 전송에 실패했습니다.");
    }
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
      <div className="pwemailbox">
        <div className="findpwInputWrap">
          <input
            className="input"
            type="text"
            placeholder="아이디"
            value={findid}
            onChange={findHandleId}
          />
        </div>
        <br />

        <div className="findpwInputTitle">이메일 주소</div>
        <div className="pwemailBox">
          <div className="findpwInputWrap">
            <input
              className="input"
              type="text"
              placeholder="test@gmail.com"
              value={pwemail}
              onChange={(e) => setPwEmail(e.target.value)}
            />
          </div>
          {!pwEmailVerify && (
            <button onClick={pwhandleEmailVerify} className="emailButton">
              이메일 인증
            </button>
          )}
        </div>
        {pwEmailVerify && !pwIsVerified && (
          <div className="emailBox">
            <div className="inputWrap">
              <input
                className="input"
                type="text"
                placeholder="인증번호 입력"
                value={pwVerifyCode}
                onChange={handlePwVerifyCode}
              />
            </div>
            <div className="timerWrap">{formatPwTime(pwTimer)}</div>
            <button onClick={handlePwVerifyCodeSubmit} className="verifyButton">
              인증 코드 확인
            </button>
          </div>
        )}

        <div className="errorMessageWrap">
          {pwEmailMessage && <div>{pwEmailMessage}</div>}
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
