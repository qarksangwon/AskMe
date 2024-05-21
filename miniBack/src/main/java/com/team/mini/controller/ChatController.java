package com.team.mini.controller;


import com.team.mini.dao.ChatDAO;
import com.team.mini.vo.ChatRoomVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="http://localhost:3000" )
@RestController
@RequestMapping("/askme")
public class ChatController {
    ChatDAO cDao = new ChatDAO();

    //GET 채팅방 여부 조회, true - 있음, false 없음
    @GetMapping("/chatmain")
    public ResponseEntity<Boolean> existRoom(@RequestParam String roomId) {
        System.out.println(roomId+"--------");
        boolean isTrue = cDao.checkRoom("roomId",roomId);
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/chatmain")
    public ResponseEntity<Integer> makeRoom(@RequestBody ChatRoomVO vo){
        System.out.println(vo.getRoomId() + vo.getId()+"--------");
        int isTrue = cDao.makeRoom(vo.getRoomId(),vo.getId());
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
        // 리턴값 1 이상이면 잘 들어감, 0이면 안들어감
    }

    @GetMapping("/chatdelete")
    public ResponseEntity<Integer> delRoom(@RequestParam String id){
        System.out.println("del id : " + id);
        int isTrue = cDao.delRoom(id);
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
    }
}
