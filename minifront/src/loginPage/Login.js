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
  const [isAdmin, setIsAdmin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const navigate = useNavigate();
  const signUpNav = useNavigate();
  const findIdNav = useNavigate();
  const findPwNav = useNavigate();

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
    if (isAdmin) {
      localStorage.setItem("userId", id);
      localStorage.setItem("userNickname", nickname);
      alert("관리자로 로그인했습니다");
      navigate("/askme/admin"); // 관리자 페이지로 이동
    } else if (isLogin) {
      localStorage.setItem("userId", id);
      localStorage.setItem("userNickname", nickname);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      alert("로그인에 성공했습니다");
      navigate("/askme"); // 일반 사용자 페이지로 이동
    }
  }, [isLogin, isAdmin, navigate, id, nickname, name, email]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        onClickLoginButton();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [id, pw]);

  const onClickLoginButton = async () => {
    try {
      if (id === "master" && pw === "master123!!") {
        // 관리자 로그인
        setIsAdmin(true);
      } else {
        const rsp = await AxiosApi.LoginMain(id, pw);
        if (rsp.data.success) {
          setNickname(rsp.data.nickname);
          setName(rsp.data.name);
          setEmail(rsp.data.email);
          setIsLogin(true);
        } else {
          alert("로그인에 실패했습니다");
          setIsLogin(false);
          setId("");
          setPw("");
        }
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
              value={id}
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

      <div className="login-bottomonClickLoginButtonContainer">
        <button onClick={onClickLoginButton} className="login-bottomButton">
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
