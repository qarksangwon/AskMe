import styled from "styled-components";

const FooterContainer = styled.div`
  color: #acb3fd;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100vw;
  height: 300px;
  @media (max-width: 431px) {
  }
`;
const FooterContent = styled.p`
  margin: 20px auto auto 200px;
  @media (max-width: 431px) {
    margin: 10px 0 0 0;
    text-align: center;
  }
`;

const Footer = (props) => {
  return (
    <FooterContainer>
      <FooterContent>이용 약관 | 개인정보 취급 방침</FooterContent>
      <FooterContent>(주) 곰돌이사먹자</FooterContent>
      <FooterContent>찾아오는 길 : 알아서 잘 오소</FooterContent>
      <FooterContent>tel : 112</FooterContent>
    </FooterContainer>
  );
};

export default Footer;
