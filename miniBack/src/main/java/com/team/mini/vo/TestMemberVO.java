package com.team.mini.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class TestMemberVO {
    private String id;
    private String pwd;
    private String name;
    private String email;
    private Date join;

}
