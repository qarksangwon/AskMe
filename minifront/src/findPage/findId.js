import React, { useEffect, useState } from "react";
import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./findId.css";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";

function FindId() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const code = "";
  const [verifyCode, setVerifyCode] = useState("");
  const [timer, setTimer] = useState(180);

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  // 추가된 상태
  const [foundId, setFoundId] = useState("");
  const [isIdFound, setIsIdFound] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    return `${minutes}:${
      remainSeconds < 10 ? `0${remainSeconds}` : remainSeconds
    }`;
  };

  const ExitClick = () => {
    navigate("/askme");
  };
  const LoginClick = () => {
    navigate("/askme/login");
  };

  useEffect(() => {
    if (nameValid && emailValid && isEmailVerified) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, emailValid, isEmailVerified]);

  useEffect(() => {
    let interval;
    if (emailVerify && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailVerify, timer]);

  const handleName = (e) => {
    setName(e.target.value);
    const regex = /^[가-힣]+$/;
    if (regex.test(e.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const findHandleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleEmailVerify = async () => {
    try {
      const response = await AxiosApi.sendVerificationEmail(email);
      if (response.status === 200) {
        setEmailVerify(true);
        alert("인증 이메일이 전송되었습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("이메일 전송에 실패했습니다.");
    }
  };

  const handleVerifyCode = (e) => {
    setVerifyCode(e.target.value);
  };

  const handleVerifyCodeSubmit = async () => {
    try {
      const response = await AxiosApi.verifyEmailCode(email, verifyCode);
      if (response.data) {
        alert("이메일 인증이 완료되었습니다.");
        setEmailVerify(true);
        setIsVerified(true);
        setIsEmailVerified(true);
      } else {
        alert("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("인증 코드 확인에 실패했습니다.");
    }
  };

  const findIdClick = async () => {
    if (notAllow) return;
    const userData = { name, email, code };
    try {
      const response = await AxiosApi.EmailfindId(userData);
      setFoundId(response.data); // 성공적으로 찾은 아이디 설정
      setIsIdFound(true); // 아이디 찾기 성공 여부 설정
    } catch (error) {
      console.error(error);
      alert("아이디 찾기 중 오류가 발생했습니다");
    }
  };

  useEffect(() => {
    if (isIdFound) {
      alert("아이디 찾기를 성공적으로 완료하였습니다.");
    }
  }, [isIdFound]);

  return (
    <div className="findidpage">
      <div className="findidimg">
        <img src={Logoimg} className="findidLogoimg" alt="로고" />
      </div>
      <div className="findidTitleWrap">아이디 찾기</div>
      <br />
      <div className="contentWrap">
        {isIdFound ? (
          <>
            <div className="foundIdMessage">
              사용자의 아이디는 {foundId} 입니다.
            </div>
            <div className="findId">
              <button className="findIdButton" onClick={LoginClick}>
                로그인
              </button>
              <button className="findExit" onClick={ExitClick}>
                <img
                  src={Exitimg}
                  alt="findExit"
                  style={{ width: "40px", height: "40px" }}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* --------------- 이름 */}
            <div className="findidInputTitle">이름</div>
            <div className="findidNameBox">
              <div className="findidInputWrap">
                <input
                  className="findidInput"
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={handleName}
                />
              </div>
            </div>
            {/* --------------- 이메일 인증 */}
            <div className="findidInputTitle">이메일 주소</div>
            <div className="findidEmailBox">
              <div className="findidInputWrap">
                <input
                  className="findidInput"
                  type="text"
                  placeholder="test@gmail.com"
                  value={email}
                  onChange={findHandleEmail}
                />
              </div>
              {!emailVerify && (
                <button
                  onClick={handleEmailVerify}
                  className="findidEmailButton"
                >
                  이메일 인증
                </button>
              )}
            </div>
            {emailVerify && !isVerified && (
              <div className="emailBox">
                <div className="inputWrap">
                  <input
                    className="input"
                    type="text"
                    placeholder="인증번호 입력"
                    value={verifyCode}
                    onChange={handleVerifyCode}
                  />
                </div>
                <div className="timerWrap">{formatTime(timer)}</div>
                <button
                  onClick={handleVerifyCodeSubmit}
                  className="verifyButton"
                >
                  인증 코드 확인
                </button>
              </div>
            )}
            <div className="errorMessageWrap">
              {!emailValid && email.length > 0 && (
                <div>올바른 이메일을 입력해주세요.</div>
              )}
            </div>

            <div className="findId">
              <button className="findIdButton" onClick={findIdClick}>
                아이디 찾기
              </button>
              <button className="findExit" onClick={ExitClick}>
                <img
                  src={Exitimg}
                  alt="findExit"
                  style={{ width: "40px", height: "40px" }}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FindId;
