import "./board.css"; // 스타일 파일 import
import logosearch from "../images/search.png";

const Board = () => {
  return (
    <div className="boardMain">
      <div className="board">
        <h1>게시판</h1>
      </div>
      <div className="boardhead">
        <input type="text" placeholder="검색 제목 입력" />
        <img src={logosearch} alt="Search Icon" className="search-icon" />
        <div className="write">글 쓰기</div>
        <div className="mywrite">내가 쓴 글</div>
      </div>
      <table>
        <tr>
          <th>NO.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
        <tr>
          <td>1</td>
          <td>게시글 1 입니다.</td>
          <td>김준석</td>
          <td>2022-05-18</td>
        </tr>
        <tr>
          <td>2</td>
          <td>게시글 2 입니다.</td>
          <td>김준석</td>
          <td>2022-05-18</td>
        </tr>
        <tr>
          <td>3</td>
          <td>게시글 3 입니다.</td>
          <td>김준석</td>
          <td>2022-05-18</td>
        </tr>
      </table>
    </div>
  );
};

export default Board;
