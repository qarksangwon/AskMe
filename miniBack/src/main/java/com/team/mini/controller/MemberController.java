package com.team.mini.controller;

import com.team.mini.dao.MemberDAO;
import com.team.mini.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Map;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/askme")
public class MemberController {
    MemberDAO dao = new MemberDAO();
    @Autowired
    // JavaMailSender 타입으로 변수 생성
    private JavaMailSender mailSender;

    @GetMapping("/main")
    public String mainPage() {
        return "hi";
    }

    // 회원 가입 이메일 전송
    @GetMapping("/email")
    public ResponseEntity<String> sendMail(@RequestParam String email) {
        System.out.println("인증 번호 받을 email : " + email);

        Random random = new Random();
        int min = 111111;
        int max = 999999;
        String tempPw = String.valueOf(random.nextInt(max - min + 1) + min);
        System.out.println("인증 번호 : " + tempPw);

        String htmlContent = "<div style=\"text-align: center; display:flex; flex-direction:column; justify-content:center; text-align:center;\">"
                + "<p style=\"font-size:30px; display: block;\">AskMe 회원가입 인증번호 입니다.</p>"
                + "<p></p>"
                + "<p style=\"font-size:16px; display: block;\">아래의 인증 번호를 입력해주세요.</p>"
                + "<p></p>"
                + "<div style=\"font-size:20px; font-style:bold; width: 100%; height:50px; border: 1px solid #c6c6c6; display: block;\">" + tempPw + "</div>"
                + "</div>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setFrom("1103bsj@naver.com");
            helper.setTo(email);
            helper.setSubject("AskMe 회원가입 이메일 인증 번호");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
        return new ResponseEntity<>(tempPw,HttpStatus.OK);
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
