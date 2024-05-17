import React, { useEffect, useState } from "react";
import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const ExitClick = () => {
    navigate("/askme");
  };

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [loginIdValid, setLoginIdValid] = useState(false);
  const [loginPwValid, setLoginPwValid] = useState(false);
  const [loginNotAllow, setLoginNotAllow] = useState(true);

  const handleLoginId = (e) => {
    setLoginId(e.target.value);
    const regex = /^[A-Za-z0-9]{4,8}$/;
    if (regex.test(e.target.value)) {
      setLoginIdValid(true);
    } else {
      setLoginIdValid(false);
    }
  };

  const handleLoginPw = (e) => {
    setLoginPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setLoginPwValid(true);
    } else {
      setLoginPwValid(false);
    }
  };

  const onClickLoginButton = () => {
    alert("로그인에 성공했습니다");
    // 이후 필요한 로그인 로직 추가
  };

  const idPwClear = () => {
    setLoginId("");
    setLoginPw("");
    setLoginNotAllow(true);
  };

  useEffect(() => {
    if (loginIdValid && loginPwValid) {
      setLoginNotAllow(false);
    } else {
      setLoginNotAllow(true);
    }
  }, [loginIdValid, loginPwValid]);

  return (
    <div className="login-page">
      <div className="login-imgContainer">
        <img src={Logoimg} className="login-Logoimg" alt="로고" />
      </div>

      <div className="login-titleWrap">로그인</div>
      <br />

      <div className="login-contentWrap">
        {/* 아이디 */}
        <div className="login-idBox">
          <div className="login-inputTitle">아이디</div>
          <div className="login-inputWrap">
            <input
              className="login-input"
              type="text"
              placeholder="아이디"
              value={loginId}
              onChange={handleLoginId}
            />
          </div>
          <div className="login-errorMessageWrap">
            {!loginIdValid && loginId.length > 0 && (
              <div>올바른 아이디를 입력해주세요.</div>
            )}
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="login-pwBox">
          <div className="login-inputTitle">비밀번호</div>
          <div className="login-inputWrap">
            <input
              className="login-input"
              type="password"
              placeholder="비밀번호"
              value={loginPw}
              onChange={handleLoginPw}
            />
          </div>
          <div className="login-errorMessageWrap">
            {!loginPwValid && loginPw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>

        {/* 아이디 비번찾기 */}
        <div className="findBox">
          <button className="idFind">아이디 찾기</button>
          <button className="pwFind">비밀번호 찾기</button>
        </div>

        <div className="clearExit">
          <button onClick={idPwClear} className="idPwClearButton">
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

      <div className="login-bottomContainer">
        <button
          onClick={onClickLoginButton}
          disabled={loginNotAllow}
          className="login-bottomButton"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
