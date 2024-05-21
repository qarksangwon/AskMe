package com.team.mini.dao;

import com.team.mini.vo.BoardVO;

import com.team.mini.utils.Common;
import com.team.mini.vo.MemberVO;

import java.sql.Connection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BoardDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public List<BoardVO> Boardselect() {
        List<BoardVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection(); // 데이터베이스 연결
            stmt = conn.createStatement(); // Statement 객체 생성
            String sql = "SELECT * FROM BOARDTB ORDER BY CLASSNO DESC";
            rs = stmt.executeQuery(sql); // 쿼리 실행

            // 결과 집합을 반복하며 BoardVo 객체로 변환 후 리스트에 추가
            while (rs.next()) {
                int classno = rs.getInt("CLASSNO");
                String title = rs.getString("TITLE");
                String content = rs.getString("CONTENT");
                String nickname = rs.getString("NICKNAME");
                String profile = rs.getString("PROFILE");
                String userid = rs.getString("ID");
                Date join = rs.getDate("WRITEDATE");

                BoardVO vo = new BoardVO();
                vo.setClassNo(classno);
                vo.setTitle(title);
                vo.setContent(content);
                vo.setNickname(nickname);
                vo.setJoin(join);
                list.add(vo);

            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);

        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }

    public boolean boardRegister(BoardVO board) {
        int result = 0;
        String sqlInsert = "INSERT INTO BOARDTB(CLASSNO, TITLE, CONTENT, NICKNAME, WRITEDATE,ID) VALUES(?, ?, ?, ?, SYSDATE,?)";
        String sqlSelectMax = "SELECT MAX(CLASSNO) AS MAX_CLASSNO FROM BOARDTB"; // 최대 CLASSNO 조회 쿼리

        try {
            conn = Common.getConnection();

            // 최대 CLASSNO 조회
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sqlSelectMax);
            int maxClassNo = 0;
            if (rs.next()) {
                maxClassNo = rs.getInt("MAX_CLASSNO");
            }
            Common.close(rs);
            Common.close(stmt);

            // CLASSNO 설정
            board.setClassNo(maxClassNo + 1);

            // INSERT 쿼리 실행
            pStmt = conn.prepareStatement(sqlInsert);
            pStmt.setInt(1, board.getClassNo());
            pStmt.setString(2, board.getTitle());
            pStmt.setString(3, board.getContent());
            pStmt.setString(4, board.getNickname());
            pStmt.setString(5, board.getID());


            result = pStmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(rs);
            Common.close(stmt);
            Common.close(pStmt);
            Common.close(conn);
        }

        return result == 1;
    }
}