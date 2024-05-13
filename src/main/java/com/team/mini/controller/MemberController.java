package com.team.mini.controller;

import com.team.mini.dao.MemberDAO;
import com.team.mini.vo.MemberVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000" )
@RestController
@RequestMapping("/users")
public class MemberController {
    MemberDAO dao = new MemberDAO();

    //GET 회원 조회
    @GetMapping("/member")
    public ResponseEntity<List<MemberVO>> memberList(@RequestParam String name){
        System.out.println("입력Name : " + name);
        List<MemberVO> list = dao.memberSelect(name);
        return ResponseEntity.ok(list);
    }

    //POST 로그인
    @PostMapping("/login")
    public ResponseEntity<Boolean> memberLogin(@RequestParam Map<String, String> loginData){
        String user = loginData.get("id");
        String pwd = loginData.get("pwd");
        boolean result = dao.loginCheck(user,pwd);
        return ResponseEntity.ok(result);
    }

    //GET 가입 여부 확인
    @GetMapping("/check")
    public ResponseEntity<Boolean> memberCheck(@RequestParam String id){
        boolean isTrue = dao.regMemberCheck(id);
        return ResponseEntity.ok(isTrue);
    }

    //POST 회원 가입
    // JSON 으로 POST 요청해도 변수명과 key value의 key 이름만 맞춰주면
    // 잘 입력이 들어간다.
    @PostMapping("/new")
    public ResponseEntity<Boolean> memberRegister(@RequestBody MemberVO member){
        boolean isTrue = dao.memberRegister(member);
        return ResponseEntity.ok(isTrue);
    }

    // POST 회원 탈퇴
    @PostMapping("/del")
    public ResponseEntity<Boolean> memberDelete(@RequestBody Map<String, String> delData){
        String getId = delData.get("id");
        boolean isTrue = dao.memberDelete(getId);
        return ResponseEntity.ok(isTrue);
    }

}
