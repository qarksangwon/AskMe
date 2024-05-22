import { setUserId } from "firebase/analytics";
import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AxiosApi from "../api/AxiosApi";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  let navigate = useNavigate();
  let signUpNav = useNavigate();
  let findIdNav = useNavigate();
  let findPwNav = useNavigate();

  const findIdClick = () => {
    findIdNav("/askme/findid");
  };

  const findPwClick = () => {
    findPwNav("/askme/findpw");
  };

  const idRef = useRef(null);
  const SignupClick = () => {
    signUpNav("/askme/signup");
  };
  const ExitClick = () => {
    navigate("/askme");
  };

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("userId", id);
      localStorage.setItem("userNickname", nickname);
      alert("로그인에 성공했습니다");
      console.log(id);
      console.log(nickname);
      navigate("/askme");
    }
  }, [isLogin]);

  const onClickLoginButton = async () => {
    try {
      const rsp = await AxiosApi.LoginMain(id, pw);
      if (rsp.data.success) {
        setNickname(rsp.data.nickname);
        setIsLogin(true);
      } else {
        alert("로그인에 실패했습니다");
        setIsLogin(false);
        setId("");
        setPw("");
      }
    } catch (e) {
      console.log(e);
      alert("로그인 중 오류가 발생했습니다");
      setId("");
      setPw("");
    }
  };

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
              ref={idRef}
              onChange={handleIdChange}
              value={id} // 레퍼런스 연결
            />
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
              onChange={handlePwChange}
              value={pw}
            />
          </div>
        </div>

        {/* 아이디 비번찾기 */}
        <div className="findBox">
          <button className="Find" onClick={findIdClick}>
            아이디 찾기
          </button>
          <button className="Find" onClick={findPwClick}>
            비밀번호 찾기
          </button>
          <button className="Find" onClick={SignupClick}>
            회원가입
          </button>
        </div>

        <div className="clearExit">
          <button className="exit" onClick={ExitClick}>
            <img
              src={Exitimg}
              alt="Exit"
              style={{
                width: "60px",
                height: "60px",
              }}
            />
          </button>
        </div>
      </div>

      <div className="login-bottomContainer">
        <button onClick={onClickLoginButton} className="login-bottomButton">
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
