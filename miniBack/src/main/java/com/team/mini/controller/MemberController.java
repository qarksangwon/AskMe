package com.team.mini.controller;

import com.team.mini.dao.MemberDAO;
import com.team.mini.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/askme")
public class MemberController {
    MemberDAO dao = new MemberDAO();

    @Autowired
    // JavaMailSender 타입으로 변수 생성
    private JavaMailSender mailSender;
    private Map<String, String> verificationCodes = new HashMap<>();

    private String currentEmail = "";

    @GetMapping("/main")
    public String mainPage() {
        return "hi";
    }

    // GET 회원 가입 이메일 전송
    @PostMapping("/email")
    public ResponseEntity<String> sendMail(@RequestParam String email) {
        System.out.println("인증 번호 받을 email : " + email);

        Random random = new Random();
        int min = 111111;
        int max = 999999;
        String tempPw = String.valueOf(random.nextInt(max - min + 1) + min);
        System.out.println("인증 번호 : " + tempPw);
        currentEmail = tempPw.toString();

        String htmlContent = "<div style=\"text-align: center; display:flex; flex-direction:column; justify-content:center; text-align:center;\">"
                + "<p style=\"font-size:30px; display: block;\">AskMe 인증번호 입니다.</p>"
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
            helper.setSubject("AskMe 이메일 인증 번호");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
        return new ResponseEntity<>(tempPw, HttpStatus.OK);
    }

    // GET 회원 조회
    @GetMapping("/member")
    public ResponseEntity<List<MemberVO>> memberList(@RequestParam String name) {
        System.out.println("입력Name : " + name);
        List<MemberVO> list = dao.memberSelect(name);
        return ResponseEntity.ok(list);
    }

    // POST 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> memberLogin(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("id");
        String password = loginData.get("password");
        System.out.println(id + " " + password);

        boolean result = dao.loginCheck(id, password);
        System.out.println(result);

        Map<String, Object> response = new HashMap<>();
        if (result) {
            MemberVO member = dao.getMemberById(id); // 로그인 성공 시 사용자 정보 가져오기
            response.put("success", true);
            response.put("userId", member.getId());
            response.put("nickname", member.getNickname()); // 닉네임 포함
        } else {
            response.put("success", false);
        }

        return ResponseEntity.ok(response);
    }

    // GET 아이디 및 닉네임 중복 체크
    @GetMapping("/signup")
    public ResponseEntity<Boolean> memberCheck(@RequestParam String check, @RequestParam String value) {
//        String testCheck = "nickname";
//        String testValue = "bsj";
        boolean isTrue = dao.checkIdAndNickname(check, value);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

    // POST 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Boolean> memberRegister(@RequestBody MemberVO member) {
        boolean isTrue = dao.memberRegister(member);
        return ResponseEntity.ok(isTrue);
    }

    // POST 회원정보 수정
    @PostMapping("/update")
    public ResponseEntity<Boolean> editInfo(@RequestBody Map<String, String> regData) {
        String getId = regData.get("id");
        String getPwd = regData.get("password");
        String getNickname = regData.get("nickname");
        boolean isUpdated = dao.memberUpdate(getId, getPwd, getNickname);
        return new ResponseEntity<>(isUpdated, HttpStatus.OK);
    }


    // POST 회원 탈퇴
    @PostMapping("/userdel/del")
    public ResponseEntity<Boolean> memberDelete(@RequestBody Map<String, String> delData) {
        String id = delData.get("id");
        boolean isTrue = dao.memberDelete(id);
        return ResponseEntity.ok(isTrue);
    }

    // POST 아이디 찾기
    // 이름과 이메일이 일치하면 이메일 전송
    @PostMapping("/requestId")
    public ResponseEntity<String> requestId(@RequestParam String name, @RequestParam String email) {
        if (dao.isNameAndEmailMatch(name, email)) {
            String verificationCode = sendVerificationEmail(email);
            verificationCodes.put(email, verificationCode);
            return new ResponseEntity<>("Verification email sent", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid name or email", HttpStatus.BAD_REQUEST);
        }
    }

    // 이메일 인증 번호와 사용자가 입력한 코드 일치하는지 확인
    @PostMapping("/verifyId")
    public ResponseEntity<Boolean> VerifyCodeId(@RequestParam String email, @RequestParam String code) {
        System.out.println("email : " + email + " / code : " + code);
        System.out.println(currentEmail);
        if (currentEmail.equals(code)) {
            currentEmail = "";
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    // 코드가 일치하면 사용자의 아이디 출력
    @PostMapping("/getId")
    public ResponseEntity<String> getId(@RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String email = payload.get("email");
        String code = payload.get("code");

        System.out.println(name);
        System.out.println(email);
        System.out.println(code);

        // Assuming currentEmail is defined and accessible here
        if (currentEmail != null && currentEmail.equals(code)) {
            String userId = dao.getUserIdByNameAndEmail(name, email);
            if (userId != null) {
                currentEmail = "";
                return new ResponseEntity<>(userId, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>("Invalid verification code", HttpStatus.BAD_REQUEST);
        }
    }

    // POST 비밀번호 찾기
    // 아이디와 이메일이 일치하면 이메일을 전송

    @PostMapping("/requestPw")
    public ResponseEntity<String> requestPwdReset(@RequestParam String id, @RequestParam String email) {
        System.out.println("ID received: " + id);
        System.out.println("Email received: " + email);
        if (dao.isEmailExist(email)) {
            String verificationCode = sendVerificationEmail(email);
            verificationCodes.put(email, verificationCode);
            // 인증 코드를 터미널에 출력
            System.out.println("Generated verification code: " + verificationCode);
            return new ResponseEntity<>("Verification email sent", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("아이디와 이메일을 확인해주세요.", HttpStatus.BAD_REQUEST);
        }
    }


    //기존 코드
//    @PostMapping("/requestPw")
//    public ResponseEntity<String> requestPwdReset(@RequestParam String id, @RequestParam String email) {
//        if (dao.isIdAndEmailMatch(id, email)) {
//            String verificationCode = sendVerificationEmail(email);
//            verificationCodes.put(email, verificationCode);
//            return new ResponseEntity<>("Verification email sent", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Invalid ID or email", HttpStatus.BAD_REQUEST);
//        }
//    }

    // 이메일 인증 번호와 사용자가 입력한 코드 일치하는지 확인
    @PostMapping("/verifyPw")
    public ResponseEntity<String> verifyCodePw(@RequestParam String email, @RequestParam String code) {
        String savedCode = verificationCodes.get(email);
        if (savedCode != null && savedCode.equals(code)) {
            return new ResponseEntity<>("Verification successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid verification code", HttpStatus.BAD_REQUEST);
        }
    }

    // 코드가 일치 하면 비밀번호 재설정
    @PostMapping("/resetPw")
    public ResponseEntity<String> resetPassword(@RequestParam String id, @RequestParam String email, @RequestParam String code, @RequestParam String newPassword) {
        String savedCode = verificationCodes.get(email);
        if (savedCode != null && savedCode.equals(code)) {
            if (dao.updatePassword(id, newPassword)) {
                verificationCodes.remove(email);
                return new ResponseEntity<>("Password reset successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Password reset failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>("Invalid verification code", HttpStatus.BAD_REQUEST);
        }
    }

    // 아이디, 비밀번호 찾기 이메일 인증번호 전송
    private String sendVerificationEmail(String email) {
        Random random = new Random();
        int min = 111111;
        int max = 999999;
        String verificationCode = String.valueOf(random.nextInt(max - min + 1) + min);

        String htmlContent = "<div style=\"text-align: center; display:flex; flex-direction:column; justify-content:center; text-align:center;\">"
                + "<p style=\"font-size:30px; display: block;\">AskMe 이메일 인증번호 입니다.</p>"
                + "<p></p>"
                + "<p style=\"font-size:16px; display: block;\">아래의 인증 번호를 입력해주세요.</p>"
                + "<p></p>"
                + "<div style=\"font-size:20px; font-style:bold; width: 100%; height:50px; border: 1px solid #c6c6c6; display: block;\">" + verificationCode + "</div>"
                + "</div>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setFrom("1103bsj@naver.com");
            helper.setTo(email);
            helper.setSubject("AskMe 이메일 인증 번호");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
        return verificationCode;
    }

    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
                    .allowCredentials(true);
        }
    }
    // 이메일 중복 체크
    @GetMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean isEmailUsed = dao.checkEmail(email);
        return new ResponseEntity<>(isEmailUsed, HttpStatus.OK);
    }
    // 비밀번호 찾기용 이메일 존재 여부 확인
    @GetMapping("/check-pw-email")
    public ResponseEntity<Boolean> checkPwEmail(@RequestParam String email) {
        boolean exist = dao.isEmailExist(email);
        return new ResponseEntity<>(exist, HttpStatus.OK);
    }
    @GetMapping("/check-name-email")
    public ResponseEntity<Boolean> checkNameAndEmail(@RequestParam String name, @RequestParam String email) {
        boolean isExist = dao.isNameAndEmailMatch(name, email);
        return new ResponseEntity<>(isExist, HttpStatus.OK);
    }

    // 정보수정 진입시 비밀번호 확인
    @PostMapping("/verify-password")
    public ResponseEntity<Boolean> verifyPassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String password = request.get("password");
        System.out.println("Verifying password for userId: " + userId); // userId를 확인합니다.
        boolean isMatch = dao.verifyPassword(userId, password); // 비밀번호 확인 로직
        return new ResponseEntity<>(isMatch, HttpStatus.OK);
    }
    @PostMapping("/update-user-info")
    public ResponseEntity<Boolean> updateUserInfo(@RequestBody MemberVO member) {
        boolean isUpdated = dao.updateMemberInfo(member);
        return new ResponseEntity<>(isUpdated, HttpStatus.OK);
    }

    // 마이페이지 내 채팅방 번호
//    @PostMapping("/getRoomid")
//    public ResponseEntity<String> getRoomId(@RequestParam String userId) {
//        if (dao.getUserChatroomNum(userId)) {
//            return new ResponseEntity<>("Verification email sent", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Invalid name or email", HttpStatus.BAD_REQUEST);
//        }
//    }
    @GetMapping("/getRoomid")
    public ResponseEntity<String> getRoomId(@RequestParam String userid) {
        String roomid = dao.getUserChatroomNum(userid);
        System.out.println(roomid);
        return ResponseEntity.ok(roomid);
    }

}


