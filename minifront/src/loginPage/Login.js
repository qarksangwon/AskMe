import Logoimg from "../images/Logo.png";
import Exitimg from "../images/exit.png";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const ExitClick = () => {
    navigate("/askme");
  };

  const onClickLoginButton = () => {
    alert("로그인에 성공했습니다");
    // 이후 필요한 로그인 로직 추가
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
            <input className="login-input" type="text" placeholder="아이디" />
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
            />
          </div>
        </div>

        {/* 아이디 비번찾기 */}
        <div className="findBox">
          <button className="Find">아이디 찾기</button>
          <button className="Find">비밀번호 찾기</button>
          <button className="Find">회원가입</button>
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
