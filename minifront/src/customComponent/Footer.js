import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100vw;
  height: 200px;
  position: absolute;
  top: ${(p) => p.top}px;
  @media (max-width: 431px) {
    top: ${(p) => p.mtop}px;
  }
`;
const FooterContent = styled.p`
  margin: 20px auto auto 200px;
  @media (max-width: 431px) {
    margin: 20px auto auto auto;
    text-align: center;
  }
`;

const Footer = (props) => {
  return (
    <FooterContainer top={props.top} mtop={props.mtop}>
      <FooterContent>이용 약관 | 개인정보 취급 방침</FooterContent>
      <FooterContent>(주) 곰돌이사먹자</FooterContent>
      <FooterContent>찾아오는 길 : 알아서 잘 오소</FooterContent>
      <FooterContent>tel : 112</FooterContent>
    </FooterContainer>
  );
};

export default Footer;
