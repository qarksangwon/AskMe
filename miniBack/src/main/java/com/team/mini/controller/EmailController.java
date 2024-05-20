package com.team.mini.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import com.team.mini.dao.MemberDAO;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Random;
import static com.team.mini.utils.Common.CORS_ORIGIN;


@CrossOrigin(origins = CORS_ORIGIN)
@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    // JavaMailSender 타입으로 변수 생성
    private JavaMailSender mailSender;


    // 회원 가입 이메일 전송
    @GetMapping("/mail")
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

    // 아이디 찾기 인증번호 전송
    @GetMapping("/idmail")
    public ResponseEntity<String> sendIdMail(@RequestParam String email) {
        System.out.println("인증 번호 받을 email : " + email);

        Random random = new Random();
        int min = 111111;
        int max = 999999;
        String tempPw = String.valueOf(random.nextInt(max - min + 1) + min);
        System.out.println("인증 번호 : " + tempPw);

        String htmlContent = "<div style=\"text-align: center; display:flex; flex-direction:column; justify-content:center; text-align:center;\">"
                + "<p style=\"font-size:30px; display: block;\">AskMe 아이디 찾기 인증번호 입니다.</p>"
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
            helper.setSubject("AskMe 아이디 찾기 인증 번호");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
        return new ResponseEntity<>(tempPw,HttpStatus.OK);
    }

    // 비밀번호 찾기 임시 비밀번호 이메일 전송
    @PostMapping("/pwmail")
    public ResponseEntity<Boolean> sendPwMail(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.regMemberCheck(email);
        boolean isSent = false;

        if (!isTrue) { // 임시 비밀번호 생성
            Random random = new Random();
            int min = 10000000;
            int max = 99999999;
            String tempPw = String.valueOf(random.nextInt(max - min + 1) + min);
            System.out.println(tempPw);
            dao.changeTempPw(email, tempPw);

            // 이메일에 들어갈 내용
            String htmlContent = "<div style=\"text-align: center; display:flex; flex-direction:column; justify-content:center; text-align:center;\">"
                    + "<p style=\"font-size:30px; display: block;\">AskMe 임시 비밀번호 설정 입니다.</p>"
                    + "<p></p>"
                    + "<p style=\"font-size:16px; display: block;\">아래의 임시 비밀번호로 로그인 후 안전을 위해 비밀번호를 재설정 해주세요.</p>"
                    + "<p></p>"
                    + "<div style=\"font-size:20px; font-style:bold; width: 100%; height:50px; border: 1px solid #c6c6c6; display: block;\">" + tempPw + "</div>"
                    + "</div>";

            // 임시 비밀번호 이메일로 전송
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            try {
                helper.setFrom("1103bsj@naver.com");
                helper.setTo(email);
                helper.setSubject("AskMe 비밀번호 재설정");
                helper.setText(htmlContent, true);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
            mailSender.send(mimeMessage);
            isSent = true;
        }
        return new ResponseEntity<>(isSent, HttpStatus.OK);
    }
}