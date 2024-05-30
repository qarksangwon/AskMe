import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import imgLogo from "../images/boardlogo.png";
import exit from "../images/exit.png";
import logosearch from "../images/search.png";
import { ScaleLoader } from "react-spinners";

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
  overflow-x: auto;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  padding: 15px 15px;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  padding: 15px 15px;
  text-align: left;
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

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
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

const Loading = styled.div`
  display: flex;
  width: 150px;
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const editExit = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [originalRooms, setOriginalRooms] = useState([]);
  const [activeRooms, setActiveRooms] = useState([]); // 현재 활성화된 데이터셋을 추적하는 상태 추가
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filteredrooms, setFilteredrooms] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    RoomList();
  }, []);

  const exitClick = () => {
    editExit("/askme/admin");
  };

  const RoomList = async () => {
    try {
      const rsp = await AxiosApi.getAllUsers();
      setOriginalRooms(rsp.data);
      setActiveRooms(rsp.data); // 초기에는 originalRooms를 activeRooms로 설정
      setUsers(rsp.data.slice(0, itemsPerPage)); // 처음 로드 시 첫 페이지 데이터로 설정
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("해당 유저를 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await AxiosApi.deleteUser(id);
        alert("삭제가 완료되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("유저 삭제 중 오류 발생:", error);
        alert("유저 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const Lodingwait = () => {
    setLoading(true); // 로딩 상태를 true로 설정
    setTimeout(() => {
      setLoading(false); // 700ms 후에 로딩 상태를 false로 설정
    }, 700);
  };

  const handleSearch = () => {
    setLoading(true); // 검색이 시작될 때 로딩 상태 활성화

    setTimeout(() => {
      if (searchTerm === "") {
        setFilteredrooms(originalRooms);
        setActiveRooms(originalRooms);
      } else {
        const searchResults = originalRooms.filter(
          (user) =>
            user.id && user.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredrooms(searchResults);
        setActiveRooms(searchResults);
      }
      setLoading(false); // 검색이 완료되면 로딩 상태 비활성화
      setPage(1); // 페이지 상태를 첫 페이지로 초기화
    }, 700);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentrooms = activeRooms.slice(startIndex, endIndex);
    setUsers(currentrooms);
  }, [page, activeRooms]);

  return (
    <Wrapper>
      <Container>
        <Logo src={imgLogo} />
        <Title>회원 목록</Title>
        <ListHead>
          <SearchInput
            placeholder="사용자 ID 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Searchlogo
            src={logosearch}
            onClick={() => {
              handleSearch();
            }}
          />
        </ListHead>
        <Loading>{loading && <ScaleLoader width={5} color="black" />}</Loading>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>비밀번호</TableHeaderCell>
                <TableHeaderCell>이름</TableHeaderCell>
                <TableHeaderCell>닉네임</TableHeaderCell>
                <TableHeaderCell>이메일</TableHeaderCell>
                <TableHeaderCell>삭제</TableHeaderCell>
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
                  <TableCell>
                    <DeleteButton onClick={() => handleDelete(user.id)}>
                      삭제
                    </DeleteButton>
                  </TableCell>
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
