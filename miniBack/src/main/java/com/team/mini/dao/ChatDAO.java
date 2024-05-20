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

    public boolean checkRoom(String roomId) {
        boolean isTrue = false;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM CHATROOM WHERE ROOMID = " + "'" + roomId + "'";
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
}
