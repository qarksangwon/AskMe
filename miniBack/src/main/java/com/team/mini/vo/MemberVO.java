package com.team.mini.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class MemberVO {
    private String id;
    private String password;
    private String name;
    private String nickname;
    private String email;
    private String roomid;
}
