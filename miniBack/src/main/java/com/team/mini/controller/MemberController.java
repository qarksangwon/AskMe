package com.team.mini.controller;

import com.team.mini.dao.MemberDAO;
import com.team.mini.vo.MemberVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/askme")
public class MemberController {
    MemberDAO dao = new MemberDAO();

    @GetMapping("/main")
    public String mainPage() {
        return "hi";
    }

    //GET 회원 조회
    @GetMapping("/member")
    public ResponseEntity<List<MemberVO>> memberList(@RequestParam String name) {
        System.out.println("입력Name : " + name);
        List<MemberVO> list = dao.memberSelect(name);
        return ResponseEntity.ok(list);
    }

    //POST 로그인
    @PostMapping("/login")
    public ResponseEntity<Boolean> memberLogin(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("id");
        String password = loginData.get("password");
        boolean result = dao.loginCheck(id, password);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //GET 아이디 및 닉네임 중복 체크
    @GetMapping("/signup")
    public ResponseEntity<Boolean> memberCheck(@RequestParam String check, String value) {
//        String testCheck = "nickname";
//        String testValue = "bsj";
        boolean isTrue = dao.checkIdAndNickname(check, value);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

    //POST 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Boolean> memberRegister(@RequestBody MemberVO member) {
        boolean isTrue = dao.memberRegister(member);
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> editInfo(@RequestBody Map<String, String> regData) {
        String getId = regData.get("id");
        String getPwd = regData.get("password");
        String getNickname = regData.get("nickname");
        boolean isUpdated = dao.memberUpdate(getId, getPwd, getNickname);
        return new ResponseEntity<>(isUpdated, HttpStatus.OK);
    }

    // POST 회원 탈퇴
    @PostMapping("/del")
    public ResponseEntity<Boolean> memberDelete(@RequestBody Map<String, String> delData) {
        String getId = delData.get("id");
        boolean isTrue = dao.memberDelete(getId);
        return ResponseEntity.ok(isTrue);
    }

    // 아이디 찾기
    @PostMapping("/findId")
    public ResponseEntity<String> memberId(@RequestBody Map<String, String> regData) {
        String getName = regData.get("name");
        String getEmail = regData.get("email");
        System.out.println("이름 : " + getName + ", 메일 : " + getEmail);
        String getId = dao.memberId(getName, getEmail);
        return new ResponseEntity<>(getId, HttpStatus.OK);
    }
}
