package com.team.mini.dao;

import com.team.mini.utils.Common;
import com.team.mini.vo.MemberVO;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.team.mini.utils.Common.close;
import static com.team.mini.utils.Common.getConnection;

@Repository
public class AdminDAO {
    private Connection conn = null;
    private PreparedStatement pStmt = null;
    private Statement stmt = null;
    private ResultSet rs = null;

    // 비밀번호 검증
    public boolean verifyPassword(String id, String password) {
        String sql = "SELECT COUNT(*) FROM USERTB WHERE ID = ? AND PASSWORD = ?";
        try {
            conn = getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            pStmt.setString(2, password);
            rs = pStmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(rs);
            close(pStmt);
            close(conn);
        }
        return false;
    }

    // 모든 사용자 조회
    public List<MemberVO> getAllUsers() {
        List<MemberVO> users = new ArrayList<>();
        String sql = "SELECT * FROM USERTB";
        try {
            conn = getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                MemberVO user = new MemberVO();
                user.setId(rs.getString("ID"));
                user.setPassword(rs.getString("PASSWORD"));
                user.setName(rs.getString("NAME"));
                user.setNickname(rs.getString("NICKNAME"));
                user.setEmail(rs.getString("EMAIL"));
                users.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(rs);
            close(stmt);
            close(conn);
        }
        return users;
    }

    // ID로 사용자 조회
    public MemberVO getUserById(String id) {
        MemberVO user = null;
        String sql = "SELECT * FROM USERTB WHERE ID = ?";
        try {
            conn = getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            rs = pStmt.executeQuery();
            if (rs.next()) {
                user = new MemberVO();
                user.setId(rs.getString("ID"));
                user.setPassword(rs.getString("PASSWORD"));
                user.setName(rs.getString("NAME"));
                user.setNickname(rs.getString("NICKNAME"));
                user.setEmail(rs.getString("EMAIL"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(rs);
            close(pStmt);
            close(conn);
        }
        return user;
    }

    // 새로운 사용자 생성
    public boolean createUser(MemberVO user) {
        String sql = "INSERT INTO USERTB(ID, PASSWORD, NAME, NICKNAME, EMAIL) VALUES(?, ?, ?, ?, ?)";
        try {
            conn = getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, user.getId());
            pStmt.setString(2, user.getPassword());
            pStmt.setString(3, user.getName());
            pStmt.setString(4, user.getNickname());
            pStmt.setString(5, user.getEmail());
            int result = pStmt.executeUpdate();
            return result > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(pStmt);
            close(conn);
        }
        return false;
    }

    // 사용자 정보 수정
    public boolean updateUser(MemberVO user) {
        String sql = "UPDATE USERTB SET PASSWORD = ?, NAME = ?, NICKNAME = ?, EMAIL = ? WHERE ID = ?";
        try {
            conn = getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, user.getPassword());
            pStmt.setString(2, user.getName());
            pStmt.setString(3, user.getNickname());
            pStmt.setString(4, user.getEmail());
            pStmt.setString(5, user.getId());
            int result = pStmt.executeUpdate();
            return result > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(pStmt);
            close(conn);
        }
        return false;
    }

    // 사용자 삭제
    public boolean deleteUser(String id) {
        String sql = "DELETE FROM USERTB WHERE ID = ?";
        try {
            conn = getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            int result = pStmt.executeUpdate();
            return result > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(pStmt);
            close(conn);
        }
        return false;
    }

    // 역할로 사용자 조회
    public List<MemberVO> getUsersByRole(String role) {
        List<MemberVO> users = new ArrayList<>();
        String sql = "SELECT * FROM USERTB WHERE ROLE = ?";
        try {
            conn = getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, role);
            rs = pStmt.executeQuery();
            while (rs.next()) {
                MemberVO user = new MemberVO();
                user.setId(rs.getString("ID"));
                user.setPassword(rs.getString("PASSWORD"));
                user.setName(rs.getString("NAME"));
                user.setNickname(rs.getString("NICKNAME"));
                user.setEmail(rs.getString("EMAIL"));
                users.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(rs);
            close(pStmt);
            close(conn);
        }
        return users;
    }
    // 글 삭제 메서드
    public boolean deleteBoard(int classNo) {
        Connection conn = null;
        PreparedStatement pStmt = null;
        boolean result = false;

        try {
            conn = getConnection();

            // 1. 글 삭제
            String deleteSql = "DELETE FROM BOARDTB WHERE CLASSNO = ?";
            pStmt = conn.prepareStatement(deleteSql);
            pStmt.setInt(1, classNo);
            int rows = pStmt.executeUpdate();

            if (rows > 0) {
                result = true;

                // 2. 글번호 재조정
                String updateSql = "UPDATE BOARDTB SET CLASSNO = CLASSNO - 1 WHERE CLASSNO > ?";
                pStmt = conn.prepareStatement(updateSql);
                pStmt.setInt(1, classNo);
                pStmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(pStmt);
            close(conn);
        }
        return result;
    }

    // 관리자 채팅방 불러오기
    public List<MemberVO> getAllChatroom() {
        List<MemberVO> room = new ArrayList<>();
        String sql = "SELECT * FROM CHATROOM";
        try {
            conn = getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                MemberVO user = new MemberVO();
                user.setId(rs.getString("ID"));
                user.setRoomid(rs.getString("ROOMID"));
                room.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(rs);
            close(stmt);
            close(conn);
        }
        return room;
    }
    // 관리자 채팅방 삭제하기
    public boolean deleteChat(String id){
        int result = 0;
        String q = "DELETE FROM CHATROOM WHERE ID = ?";
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(q);
            pStmt.setString(1,id);
            result = pStmt.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return result==1;
    }
    //관리자 유저 삭제하기
    public boolean deleteUserAll(String id) {
        int result = 0;
        Connection conn = null;
        PreparedStatement pStmt = null;
        try {
            conn = getConnection();
            // 보드 테이블에서 해당 사용자의 ID와 관련된 레코드를 삭제
            String deleteBoardSql = "DELETE FROM BOARDTB WHERE ID = ?";
            pStmt = conn.prepareStatement(deleteBoardSql);
            pStmt.setString(1, id);
            pStmt.executeUpdate();

            // 채팅방에서 해당 사용자와 관련된 데이터 삭제
            String deleteChatSql = "DELETE FROM CHATROOM WHERE id = ?";
            pStmt = conn.prepareStatement(deleteChatSql);
            pStmt.setString(1, id);
            pStmt.executeUpdate();

            // 유저 테이블에서 해당 사용자 삭제
            String deleteUserSql = "DELETE FROM USERTB WHERE ID = ?";
            pStmt = conn.prepareStatement(deleteUserSql);
            pStmt.setString(1, id);
            result = pStmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(pStmt);
            Common.close(conn);
        }
        return result > 0;
    }
}
