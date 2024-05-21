package com.team.mini.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
public class BoardVO {
    private int classNo;
    private String title;
    private String content;
    private String nickname;
    private Date join;
    private String ID;
}