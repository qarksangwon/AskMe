import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import imgLogo from "../images/boardlogo.png";
import exit from "../images/exit.png";
import logosearch from "../images/search.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ebecff;
`;

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #acb3fd;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  font-family: "DoHyeon-Regular", sans-serif;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  color: #acb3fd;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
    2px 2px 0 #fff;
`;

const TableContainer = styled.div`
  width: 90%;
  border-radius: 10px; /* 테이블의 모서리를 둥글게 만듦 */
  overflow: hidden; /* 컨테이너가 테이블의 내용을 가리지 않도록 설정 */
  overflow-x: auto; /* 테이블이 가로로 잘리지 않도록 스크롤 가능하게 함 */
  overflow-y: auto;
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 430px) {
    font-size: 0.6em; /* 모바일 화면에서 폰트 크기 조절 */
    width: 90%;
  }
`;

const TableHead = styled.thead`
  font-size: 1.5em;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
    2px 2px 0 #fff;
  background-color: #e8e8e8;
`;

const TableBody = styled.tbody`
  background-color: #f8f8f8;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd; /* 가로줄 스타일 */
`;

const TableRow2 = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 15px 8px;
  text-align: left;
  @media (max-width: 430px) {
    padding: 10px 8px;
  }
`;

const TableHeaderCell = styled.th`
  padding: 15px 8px;
  text-align: left;
  @media (max-width: 430px) {
    padding: 10px 8px;
  }
`;

const ListHead = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  @media (max-width: 430px) {
    width: 240px;
  }
`;

const Searchlogo = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 10px;
  @media (max-width: 430px) {
    width: 20px;
    height: 20px;
  }
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin-top: 20px;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
  @media (max-width: 430px) {
    margin-top: 10px;
  }
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const editExit = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AxiosApi.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const exitClick = () => {
    editExit("/askme/admin");
  };

  return (
    <Wrapper>
      <Container>
        <Logo src={imgLogo} />
        <Title>회원 목록</Title>
        <ListHead>
          <SearchInput placeholder="검색 제목 입력" />
          <Searchlogo src={logosearch} />
        </ListHead>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>비밀번호</TableHeaderCell>
                <TableHeaderCell>이름</TableHeaderCell>
                <TableHeaderCell>닉네임</TableHeaderCell>
                <TableHeaderCell>이메일</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow2 key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.nickname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow2>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Exit onClick={exitClick} src={exit} />
      </Container>
    </Wrapper>
  );
};

export default UserList;
