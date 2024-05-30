import React, { useState, useEffect } from "react";
import Logoimg from "../images/hi.gif";
import Exitimg from "../images/exit.png";
import "./findPw.css";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";

const Img = styled.div`
  margin-left: 20px;

  &&:hover {
    cursor: pointer;
    opacity: 0.3;
  }
`;

function FindPw() {
  const findPwNavigate = useNavigate();

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
  const [newPassword, setNewPassword] = useState("");
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

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
      const response = await AxiosApi.verifyPwEmailCode(pwemail, pwVerifyCode);
      if (response.data) {
        alert("이메일 인증이 완료되었습니다.");
        setPwEmailVerify(true);
        setPwIsVerified(true);
        setIsEmailDisabled(true);
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
      const emailCheckResponse = await AxiosApi.checkPwEmail(pwemail);
      if (!emailCheckResponse.data) {
        setPwEmailMessage("등록되지 않은 이메일입니다.");
        return;
      }

      const response = await AxiosApi.sendPwVerificationEmail(findid, pwemail);
      if (response.status === 200) {
        setPwEmailVerify(true);
        alert("인증 이메일이 전송되었습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("이메일 전송에 실패했습니다.");
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPasswordSubmit = async () => {
    try {
      const response = await AxiosApi.resetPassword(
        findid,
        pwemail,
        pwVerifyCode,
        newPassword
      );
      if (response.status === 200) {
        alert("비밀번호 변경이 완료되었습니다.");
        setResetPasswordVisible(false);
        setFindId("");
        setPwEmail("");
        setPwVerifyCode("");
        setPwEmailVerify(false);
        setPwIsVerified(false);
        setNewPassword("");
        findPwNavigate("/askme/login");
      }
    } catch (error) {
      console.error(error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <div className="findpwpage">
      <div className="findpwimg">
        <img src={Logoimg} className="findpwLogoimg" alt="로고" />
      </div>
      <div className="findpwTitleWrap">비밀번호 찾기</div>
      <br />
      <div className="findpwidBox">
        <div className="findpwInputTitle">아이디 입력</div>
        <div className="findpwIdBox">
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="아이디"
              value={findid}
              onChange={findHandleId}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="findpwInputTitle">이메일 주소</div>
      <div className="findpwEmailBox">
        <div className="pwemailBox">
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="test@gmail.com"
              value={pwemail}
              onChange={(e) => setPwEmail(e.target.value)}
              disabled={isEmailDisabled}
            />
          </div>
          {!pwEmailVerify && (
            <button onClick={pwhandleEmailVerify} className="findpwEmailButton">
              이메일 인증
            </button>
          )}
        </div>
        {pwEmailVerify && !pwIsVerified && (
          <div className="pwemailBox">
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
            <button
              onClick={handlePwVerifyCodeSubmit}
              className="findpwEmailButton"
            >
              인증 코드 확인
            </button>
          </div>
        )}
      </div>

      <div className="pwerrorMessageWrap">
        {pwEmailMessage && <div>{pwEmailMessage}</div>}
      </div>

      <div className="findPw">
        <button
          className="findPwButton"
          disabled={!findid || !pwIsVerified}
          onClick={() => setResetPasswordVisible(true)}
        >
          비밀번호 변경
        </button>
        <Img>
          <img
            src={Exitimg}
            alt="findExit"
            onClick={findPwExitClick}
            style={{ width: "50px", height: "50px" }}
          />
        </Img>
      </div>
      <br />
      {resetPasswordVisible && (
        <div className="resetPasswordContainer">
          <div className="findpwInputTitle">새로운 비밀번호 입력</div>
          <div className="findpwInputWrap">
            <input
              className="findpwInput"
              type="password"
              placeholder="새로운 비밀번호"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <button className="findPwButton" onClick={handleResetPasswordSubmit}>
            비밀번호 재설정
          </button>
        </div>
      )}
    </div>
  );
}

export default FindPw;
