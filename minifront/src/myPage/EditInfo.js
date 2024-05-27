import React, { useEffect, useState } from "react";
import Logoimg from "../images/Logo.png";
import AxiosApi from "../api/AxiosApi"; // 서버와 통신을 위한 API 모듈 임포트
import { useNavigate } from "react-router-dom";
import exit from "../images/exit.png";
import "./editInfo.css";

const EditInfo = () => {
  let editNavigate = useNavigate();
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

  const [isNicknameDisabled, setIsNicknameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isPwDisabled, setIsPwDisabled] = useState(true);

  const [timer, setTimer] = useState(180);
  const [nicknameMessage, setNickNameMessage] = useState("");
  const [nicknameCheck, setNickNameCheck] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPw, setIsEditingPw] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserInfo(userId);
    } else {
      navigate("/askme/login");
    }
  }, [navigate]);

  const handleEditClick = (field) => {
    if (field === "nickname") {
      setIsNicknameDisabled(false);
      setIsEditingNickname(true);
    } else if (field === "email") {
      setIsEmailDisabled(false);
      setIsEditingEmail(true);
    } else if (field === "pw") {
      setIsPwDisabled(false);
      setIsEditingPw(true);
    } else if (field === "name") {
      alert("이름 변경은 고객센터로 문의해주세요.");
    }
  };

  const getUserInfo = async (userId) => {
    try {
      const response = await AxiosApi.getUserInfo(userId);
      const { name, nickname, email, password } = response.data;
      setName(name);
      setNickName(nickname);
      setEmail(email);
      setPw(password);
      setNameValid(true);
      setNickNameValid(true);
      setEmailValid(true);
      setPwValid(true);
    } catch (error) {
      console.error(error);
      alert("사용자 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (
      nameValid &&
      nicknameValid &&
      emailValid &&
      pwValid &&
      (isEmailVerified || !isEditingEmail) &&
      (nicknameCheck || !isEditingNickname)
    ) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [
    nameValid,
    nicknameValid,
    emailValid,
    pwValid,
    isEmailVerified,
    isEditingEmail,
    nicknameCheck,
    isEditingNickname,
  ]);

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
    setNickName(value);
    if (regex.test(value)) {
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
        setIsNicknameDisabled(true);
        setIsEditingNickname(false);
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
        setIsEmailDisabled(true);
        setIsEditingEmail(false);
      } else {
        alert("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("인증 코드 확인에 실패했습니다.");
    }
  };

  const editHandleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("수정된 정보를 서버로 보냅니다: ", {
        userId,
        name,
        nickname,
        email,
        password: pw,
      }); // 디버깅 메시지
      const response = await AxiosApi.updateUserInfo({
        id: userId,
        name,
        nickname,
        email,
        password: pw, // 추가된 부분: 비밀번호도 서버로 전송
      });
      console.log("서버 응답: ", response.data); // 디버깅 메시지
      if (response.data) {
        setSuccessMessage("정보가 성공적으로 수정되었습니다.");
        setErrorMessage("");
        alert("정보가 성공적으로 수정되었습니다.");

        // 로컬스토리지 값을 모두 없애고 로그인 페이지로 리디렉션
        localStorage.clear();
        navigate("/askme/login");
      } else {
        setSuccessMessage("");
        setErrorMessage("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("정보 수정 중 오류 발생: ", error); // 디버깅 메시지
      setSuccessMessage("");
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const exitClick = () => {
    navigate("/askme/mypage");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    return `${minutes}:${
      remainSeconds < 10 ? `0${remainSeconds}` : remainSeconds
    }`;
  };

  return (
    <div className="Container">
      <div className="Logo">
        <img src={Logoimg} className="findidLogoimg" alt="로고" />
      </div>
      <div className="Title">정보 수정</div>
      <div className="contentWrap">
        {/* ------------이름 */}
        <div className="nameBox">
          <div className="contentWrap">
            <div className="inputTitle">이름</div>
            <div className="inputWrap">
              <input
                className="input"
                type="text"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={handleNameChange}
                disabled
              />
            </div>
          </div>
          <button
            onClick={() => handleEditClick("name")}
            className="editButton"
          >
            수정하기
          </button>
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
                disabled={isNicknameDisabled}
              />
            </div>
            <div className="errorMessageWrap">
              {!nicknameValid && nickname.length > 0 && (
                <div>올바른 닉네임을 입력해주세요.</div>
              )}
              {nicknameMessage && <div>{nicknameMessage}</div>}
            </div>
          </div>
          {isEditingNickname ? (
            <button onClick={handleNickNameCheck} className="editButton">
              중복 확인
            </button>
          ) : (
            <button
              onClick={() => handleEditClick("nickname")}
              className="editButton"
            >
              수정하기
            </button>
          )}
        </div>

        {/* --------------- 이메일 */}
        <div className="emailBox">
          <div className="contentWrap">
            <div className="inputTitle">이메일</div>
            <div className="inputWrap">
              <input
                className="input"
                type="email"
                placeholder="test@gmail.com"
                value={email}
                onChange={handleEmailChange}
                disabled={isEmailDisabled}
              />
            </div>
            <div className="errorMessageWrap">
              {!emailValid && email.length > 0 && (
                <div>올바른 이메일을 입력해주세요.</div>
              )}
              {emailMessage && <div>{emailMessage}</div>}
            </div>
          </div>
          {isEditingEmail ? (
            <button onClick={handleEmailVerify} className="emailButton">
              이메일 인증
            </button>
          ) : (
            <button
              onClick={() => handleEditClick("email")}
              className="editButton"
            >
              수정하기
            </button>
          )}
        </div>
        {emailVerify && !isVerified && isEditingEmail && (
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

        {/* ---------- 비밀번호 */}
        <div className="editPwBox">
          <div className="contentWrap">
            <div className="inputTitle">비밀번호</div>
            <div className="inputWrap">
              <input
                className="input"
                type="password"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                value={pw}
                onChange={handlePwChange}
                disabled={isPwDisabled}
              />
            </div>
            <div className="errorMessageWrap">
              {!pwValid && pw.length > 0 && (
                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
              )}
            </div>
          </div>
          {isEditingPw ? (
            <button
              onClick={() => {
                setIsPwDisabled(true);
                setIsEditingPw(false); // 비활성화 후 수정 모드도 종료
              }}
              className="editButton"
            >
              확인
            </button>
          ) : (
            <button
              onClick={() => handleEditClick("pw")}
              className="editButton"
            >
              수정하기
            </button>
          )}
        </div>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
        <div className="editInfo">
          <button
            className="editInfoButton"
            onClick={editHandleSubmit}
            disabled={notAllow}
          >
            회원정보 수정
          </button>
          <button className="findExit" onClick={exitClick}>
            <img
              src={exit}
              alt="findExit"
              style={{ width: "40px", height: "40px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
