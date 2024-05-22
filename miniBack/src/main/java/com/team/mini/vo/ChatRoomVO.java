package com.team.mini.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Setter
public class ChatRoomVO {
    private String roomId;
    private String id; //소유주 -> 채팅방 이름

    @JsonIgnore
    private Set<WebSocketSession> sessions;
    private boolean isSessionEmpty() {
        return (this.sessions.size() == 0);
    }

    @Builder
    public ChatRoomVO(String roomId, String id){
        this.roomId = roomId;
        this.id = id;
        this.sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());
    }

}
