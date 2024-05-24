import React, { useEffect, useState } from "react";
import Logoimg from "../images/Logo.png";
import AxiosApi from "../api/AxiosApi"; // 서버와 통신을 위한 API 모듈 임포트
import { Link, useNavigate } from "react-router-dom";
import exit from "../images/exit.png";
import "./editInfo.css";

const EditInfo = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [notAllow, setNotAllow] = useState(true);
  const [nameValid, setNameValid] = useState(false);
  const [nicknameValid, setNickNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [pwValid, setPwValid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const [timer, setTimer] = useState(180);
  const [nicknameMessage, setNickNameMessage] = useState("");
  const [nicknameCheck, setNickNameCheck] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    return `${minutes}:${
      remainSeconds < 10 ? `0${remainSeconds}` : remainSeconds
    }`;
  };

  const ExitClick = () => {
    navigate("/askme/mypage");
  };

  useEffect(() => {
    if (
      nameValid &&
      nicknameValid &&
      emailValid &&
      pwValid &&
      isEmailVerified
    ) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, nicknameValid, emailValid, pwValid, isEmailVerified]);

  useEffect(() => {
    let interval;
    if (emailVerify && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailVerify, timer]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    const regex = /^[가-힣]+$/;
    if (regex.test(e.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleNickNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[가-힣A-Za-z0-9]{0,8}$/;
    if (regex.test(value)) {
      setNickName(value);
      setNickNameMessage("");
      if (value.length >= 2) {
        setNickNameValid(true);
      } else {
        setNickNameValid(false);
      }
    } else {
      setNickNameMessage("한글, 영어, 숫자로만 입력 가능합니다.");
    }
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleNickNameCheck = async () => {
    if (!nickname) {
      setNickNameMessage("닉네임을 입력해주세요.");
      return;
    }
    try {
      const response = await AxiosApi.checkNickname(nickname);
      if (response.data) {
        setNickNameMessage("이미 사용중인 닉네임 입니다.");
      } else {
        setNickNameMessage("사용 가능한 닉네임 입니다.");
        setNickNameCheck(true);
      }
    } catch (error) {
      console.error(error);
      setNickNameMessage("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  const handleEmailVerify = async () => {
    try {
      const emailCheckResponse = await AxiosApi.checkEmail(email);
      if (emailCheckResponse.data) {
        setEmailMessage("이미 사용중인 이메일 입니다.");
        return;
      }

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

  const handleSubmit = async () => {
    if (notAllow) return;
    try {
      const response = await AxiosApi.updateUserInfo({
        name,
        nickname,
        email,
      });
      if (response.data) {
        setSuccessMessage("정보가 성공적으로 수정되었습니다.");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="Container">
      <div className="Logo">
        <img src={Logoimg} className="findidLogoimg" alt="로고" />
      </div>
      <div className="Title">정보 수정</div>
      <div className="cotentWrap">
        {/* ------------이름 */}
        <div className="nameBox">
          <div className="inputTitle">이름</div>
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="errorMessageWrap">
            {!nameValid && name.length > 0 && (
              <div>올바른 이름을 입력해주세요.</div>
            )}
          </div>
        </div>
        {/* -----------닉네임 */}
        <div className="nicknameBox">
          <div className="contentWrap">
            <div className="inputTitle">닉네임</div>
            <div className="inputWrap">
              <input
                className="input"
                type="text"
                placeholder="한글, 영어, 숫자 입력가능"
                value={nickname}
                onChange={handleNickNameChange}
              />
            </div>
            <div className="errorMessageWrap">
              {!nicknameValid && nickname.length > 0 && (
                <div>올바른 닉네임을 입력해주세요.</div>
              )}
              {nicknameMessage && <div>{nicknameMessage}</div>}
            </div>
          </div>
          {!nicknameCheck && (
            <button
              onClick={handleNickNameCheck}
              className="nickNameCheckButton"
            >
              중복 확인
            </button>
          )}
        </div>
        <br />
        {/* --------------- 이메일 */}
        <div></div>
        <div className="inputTitle">이메일</div>
        <div className="emailBox">
          <div className="inputWrap">
            <input
              className="input"
              type="eamil"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {!emailVerify && (
            <button onClick={handleEmailVerify} className="emailButton">
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
            <button onClick={handleVerifyCodeSubmit} className="verifyButton">
              인증 코드 확인
            </button>
          </div>
        )}
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
          {emailMessage && <div>{emailMessage}</div>}
        </div>

        {/* ---------- 비밀번호 */}
        <div className="pwBox">
          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={pw}
              onChange={handlePwChange}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>
      </div>
      {/* {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>} */}

      <div className="findId">
        <button className="findIdButton" onClick={handleSubmit}>
          회원정보 수정
        </button>
        <button className="findExit" onClick={ExitClick}>
          <img
            src={exit}
            alt="findExit"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default EditInfo;
