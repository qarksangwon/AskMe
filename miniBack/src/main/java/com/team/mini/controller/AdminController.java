package com.team.mini.controller;

import com.team.mini.dao.AdminDAO;
import com.team.mini.dao.ChatDAO;
import com.team.mini.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/askme/admin")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://192.168.10.17:3000")
public class AdminController {

    @Autowired
    private AdminDAO adminDAO;

    // 관리자 로그인 확인
    @PostMapping("/login")
    public ResponseEntity<Boolean> adminLogin(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("id");
        String password = loginData.get("password");

        boolean isAdmin = "master".equals(id) && adminDAO.verifyPassword(id, password);
        return ResponseEntity.ok(isAdmin);
    }

    // 모든 사용자 조회
    @GetMapping("/users")
    public ResponseEntity<List<MemberVO>> getAllUsers() {
        List<MemberVO> users = adminDAO.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // ID로 사용자 조회
    @GetMapping("/user/{id}")
    public ResponseEntity<MemberVO> getUserById(@PathVariable String id) {
        MemberVO user = adminDAO.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 새로운 사용자 생성
    @PostMapping("/user")
    public ResponseEntity<Boolean> createUser(@RequestBody MemberVO user) {
        boolean isCreated = adminDAO.createUser(user);
        return ResponseEntity.ok(isCreated);
    }

    // 사용자 정보 수정
    @PutMapping("/user")
    public ResponseEntity<Boolean> updateUser(@RequestBody MemberVO user) {
        boolean isUpdated = adminDAO.updateUser(user);
        return ResponseEntity.ok(isUpdated);
    }

    // ID로 사용자 삭제
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable String id) {
        boolean isDeleted = adminDAO.deleteUser(id);
        return ResponseEntity.ok(isDeleted);
    }

    // 역할로 사용자 조회
    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<MemberVO>> getUsersByRole(@PathVariable String role) {
        List<MemberVO> users = adminDAO.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }

    //관리자 채팅방 목록 조회
    @GetMapping("/chatroom")
    public ResponseEntity<List<MemberVO>> getAllChat() {
        List<MemberVO> room = adminDAO.getAllChatroom();
        return ResponseEntity.ok(room);
    }
    //관리자 채팅방 삭제
    @GetMapping("/roomdelete")
    public ResponseEntity<Boolean> delChat(@RequestParam String id){
        System.out.println("del id : " + id);
        boolean isTrue = adminDAO.deleteChat(id);
        return ResponseEntity.ok(isTrue);
    }
    //관리자 유저 삭제
    @GetMapping("/userAlldel")
    public ResponseEntity<Boolean> delUser(@RequestParam String id){
        System.out.println("del id : " + id);
        boolean isTrue = adminDAO.deleteUserAll(id);
        return ResponseEntity.ok(isTrue);
    }

}
