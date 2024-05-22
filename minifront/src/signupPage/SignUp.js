import React, { useEffect, useState } from "react";
import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../firebase/ImageUploader";
import AxiosApi from "../api/AxiosApi";

function SignUp() {
  let navigate = useNavigate();

  const ExitClick = () => {
    navigate("/askme");
  };

  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [url, setUrl] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [nicknameValid, setNickNameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [nicknameMessage, setNickNameMessage] = useState("");
  const [nicknameCheck, setNickNameCheck] = useState(false);

  const [idMessage, setIdMessage] = useState("");
  const [idCheck, setIdCheck] = useState(false);

  const [emailVerify, setEmailVerify] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [timer, setTimer] = useState(180);
  const [isVerified, setIsVerified] = useState(false);

  const Clear = () => {
    setName("");
    setNickName("");
    setId("");
    setEmail("");
    setPw("");
    setNotAllow(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    return `${minutes}:${
      remainSeconds < 10 ? `0${remainSeconds}` : remainSeconds
    }`;
  };

  useEffect(() => {
    if (nameValid && nicknameValid && idValid && emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, nicknameValid, idValid, emailValid, pwValid]);

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

  const handleNickName = (e) => {
    setNickName(e.target.value);
    const regex = /^[가-힣]{2,5}$/;
    if (regex.test(e.target.value)) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
      setNickNameMessage("");
    }
  };

  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[A-Za-z0-9]{4,8}$/;
    if (regex.test(e.target.value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
      setIdMessage("");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleNicknameCheck = async () => {
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

  const handleIdCheck = async () => {
    try {
      const response = await AxiosApi.checkId(id);
      if (response.data) {
        setIdMessage("이미 사용중인 아이디 입니다.");
      } else {
        setIdMessage("사용 가능한 아이디 입니다.");
        setIdCheck(true);
      }
    } catch (error) {
      console.error(error);
      setIdMessage("아이디 확인 중 오류가 발생했습니다.");
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
      } else {
        alert("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("인증 코드 확인에 실패했습니다.");
    }
  };

  // 확인버튼
  const onClickConfirmButton = async () => {
    if (notAllow) return;
    const userData = { id, password: pw, name, nickname, email };
    try {
      const response = await AxiosApi.signup(userData);
      if (response.data) {
        alert("회원가입에 성공했습니다");
        navigate("/askme/login");
      } else {
        alert("회원가입에 실패했습니다");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="page">
      <div className="imgContainer">
        <img src={Logoimg} className="Logoimg" alt="로고" />
      </div>

      <div className="titleWrap">정보를 입력해주세요</div>
      <br />

      {/* ----------- 사진등록 */}
      <div>
        <ImageUploader setUrl={setUrl} />
        {url && <img src={url} alt="uploaded" />}
      </div>

      {/* ------------이름 */}
      <div className="contentWrap">
        <div className="inputTitle">이름</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="이름"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="errorMessageWrap">
          {!nameValid && name.length > 0 && (
            <div>올바른 이름을 입력해주세요.</div>
          )}
        </div>

        {/* -----------닉네임 */}
        <div className="nicknameBox">
          <div className="contentWrap">
            <div className="inputTitle">닉네임</div>
            <div className="inputWrap">
              <input
                className="input"
                type="text"
                placeholder="한글 2~5자"
                value={nickname}
                onChange={handleNickName}
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
              onClick={handleNicknameCheck}
              className="nickNameCheckButton"
            >
              중복 확인
            </button>
          )}
        </div>

        {/* ------------------아이디 */}
        <div className="idBox">
          <div className="contentWrap">
            <div className="inputTitle">아이디</div>
            <div className="inputWrap">
              <input
                className="input"
                type="text"
                placeholder="아이디"
                value={id}
                onChange={handleId}
              />
            </div>
            <div className="errorMessageWrap">
              {!idValid && id.length > 0 && (
                <div>올바른 아이디를 입력해주세요.</div>
              )}
              {idMessage && <div>{idMessage}</div>}
            </div>
          </div>
          {!idCheck && (
            <button onClick={handleIdCheck} className="idCheckButton">
              중복 확인
            </button>
          )}
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
              onChange={handlePw}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>
        <br />
        {/* --------------- 이메일 */}
        <div className="inputTitle">이메일 주소</div>
        <div className="emailBox">
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmail}
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
        </div>
        <div className="clearExit">
          <button onClick={Clear} className="clearButton">
            초기화
          </button>
          <button className="exit" onClick={ExitClick}>
            <img
              src={Exitimg}
              alt="Exit"
              style={{ width: "40px", height: "40px" }}
            />
          </button>
        </div>
      </div>

      <div className="bottomContainer">
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          className="bottomButton"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUp;
