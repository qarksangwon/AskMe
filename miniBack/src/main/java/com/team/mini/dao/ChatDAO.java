package com.team.mini.dao;

import com.team.mini.utils.Common;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class ChatDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public boolean checkRoom(String param, String value) {
        boolean isTrue = false;
        String sql;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            if(param.equals("roomId"))  sql = "SELECT * FROM CHATROOM WHERE ROOMID = " + "'" + value + "'";
            else sql = "SELECT * FROM CHATROOM WHERE ID = " + "'" + value + "'" ;
            rs = stmt.executeQuery(sql);
            if(rs.next()) {
                isTrue = true;
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        }
        return isTrue; // 해당 RoomID가 있다면 true, 없다면 false
    }

    public int makeRoom(String roomId, String userId){
        boolean isMyChat = false;
        int isTrue = 0;
        String fq = "SELECT * FROM CHATROOM WHERE id = ?";
        String q = "INSERT INTO CHATROOM VALUES(?,?)";
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(fq);
            pStmt.setString(1,userId);
            rs = pStmt.executeQuery();
            if(rs.next()){
                isMyChat = true;
            }
            if(!isMyChat){
                pStmt= conn.prepareStatement(q);
                pStmt.setString(1,roomId);
                pStmt.setString(2, userId);
                isTrue = pStmt.executeUpdate();
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return isTrue;
    }

    public int delRoom(String userId){
        int isTrue = 0;
        String q = "DELETE FROM CHATROOM WHERE ID = ?";
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(q);
            pStmt.setString(1,userId);
            isTrue = pStmt.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return isTrue;
    }
}
