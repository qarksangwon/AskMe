import Toggle from "../customComponent/Toggle";
import { motion } from "framer-motion";
import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: auto;
  width: 90vw;
  margin: 20vh auto auto auto;
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Comment = styled.div`
  margin-top: 100px;
  font-size: 45px;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: 430px) {
    font-size: 30px;
  }
`;

const Logo = styled.img`
  width: 250px;
  height: 250px;
  @media (max-width: 430px) {
    width: 150px;
    height: 150px;
  }
`;
const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 300px;
  height: 60px;
  background-color: black;
  color: white;
  border-radius: 30px;
  margin-top: 50px;
  border: 2px solid black;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: 300;
    transition: all 0.2s ease-in-out;
    border: 2px solid black;
  }

  @media (max-width: 430px) {
    width: 150px;
    height: 40px;
    font-size: 15px;
  }
`;

const BtnKing = styled.div``;

const Writesucces = () => {
  return (
    <>
      <Toggle></Toggle>
      <motion.div
        /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Container>
          <Logo src={imgLogo} />

          <Comment>
            <h1>등록이 완료되었습니다.</h1>
          </Comment>

          <BtnKing>
            <Link to="/askme/board">
              <Btn>돌아가기</Btn>
            </Link>
          </BtnKing>
        </Container>
      </motion.div>
    </>
  );
};

export default Writesucces;
