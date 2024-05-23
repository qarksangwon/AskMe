package com.team.mini.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ChatMessageVO {
    public enum MessageType{
        ENTER, TALK, CLOSE, CANVAS
    }
    //메세지 방 번호, 보낸사람 , 메세지
    private MessageType type;
    private String roomId;
    private String nickName;
    private String message;
    private String drawing;
}
