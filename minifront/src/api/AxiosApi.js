import axios from "axios";

const Askme_Domain = "http://localhost:8111";
// "http://192.168.10.17:8111";

const AxiosApi = {
  LoginMain: async (id, pwd) => {
    const loginData = { id: id, password: pwd };

    return await axios.post(Askme_Domain + "/askme/login", loginData);
  },

  userDel: async (id) => {
    return await axios.post(Askme_Domain + "/askme/userdel/del", { id });
  },

  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
  },

  findRoomId: async (val) => {
    return await axios.get(Askme_Domain + "/askme/board/chat", {
      params: {
        id: val,
      },
    });
  },

  boardWrite: async (data) => {
    const userInfo = {
      id: localStorage.getItem("userId"), // 여기에 사용자의 id를 넣어주세요. 예를 들면 localStorage.getItem("userId")를 사용하여 사용자의 id를 가져올 수 있습니다.
      nickname: localStorage.getItem("userNickname"), // 여기에 사용자의 닉네임을 넣어주세요.
      boardname: localStorage.getItem("userid"),
      // id: "00bsj",
      ...data,
    };
    return await axios.post(Askme_Domain + "/askme/board/write", userInfo);
  },

  boardDelete: async (classNo) => {
    console.log(classNo);
    // const id = localStorage.getItem("userId");
    return await axios.get(Askme_Domain + "/askme/board/delete", {
      params: {
        classNo: classNo,
      },
    });
  },

  checkExist: async (arrayRoomId) => {
    const roomId = arrayRoomId.join("");
    return await axios.get(Askme_Domain + "/askme/chatmain", {
      params: {
        roomId: roomId,
      },
    });
  },

  insertChatRoom: async (arrayRoomId) => {
    const roomInfo = {
      roomId: arrayRoomId.join(""),
      id: localStorage.getItem("userId"),
    };
    return await axios.post(Askme_Domain + "/askme/chatmain", roomInfo);
  },

  deleteChatRoom: async () => {
    const id = localStorage.getItem("userId");
    // const id = localStorage.getItem("userId");
    return await axios.get(Askme_Domain + "/askme/chatdelete", {
      params: {
        id: id,
      },
    });
  },

  chatList: async (roomId) => {
    return await axios.get(Askme_Domain + `/askme/rooms/${roomId}`);
  },

  checkNickname: async (nickname) => {
    return await axios.get(Askme_Domain + "/askme/signup", {
      params: { check: "nickname", value: nickname },
    });
  },

  checkId: async (id) => {
    return await axios.get(Askme_Domain + "/askme/signup", {
      params: { check: "id", value: id },
    });
  },

  checkEmail: async (email) => {
    return await axios.get(Askme_Domain + "/askme/checkEmail", {
      params: { email },
    });
  },

  sendVerificationEmail: async (email) => {
    return await axios.post(Askme_Domain + "/askme/email", null, {
      params: { email },
    });
  },

  verifyEmailCode: async (email, code) => {
    return await axios.post(Askme_Domain + "/askme/verifyId", null, {
      params: { email, code },
    });
  },
  signup: async (userData) => {
    return await axios.post(Askme_Domain + "/askme/signup", userData);
  },
  EmailfindId: async ({ name, email, code }) => {
    const value = {
      name: name,
      email: email,
      code: code,
    };
    return await axios.post(Askme_Domain + "/askme/getId", value);
  },
  checkNameAndEmail: async (name, email) => {
    return await axios.post(`${Askme_Domain}/askme/check-name-email`, null, {
      params: { name, email },
    });
  },

  checkPwEmail: async (email) => {
    return await axios.get(Askme_Domain + "/askme/check-pw-email", {
      params: { email },
    });
  },

  sendPwVerificationEmail: async (id, email) => {
    return await axios.post(Askme_Domain + "/askme/requestPw", null, {
      params: { id, email },
    });
  },

  verifyPwEmailCode: async (email, code) => {
    return await axios.post(Askme_Domain + "/askme/verifyPw", null, {
      params: { email, code },
    });
  },
  resetPassword: async (id, email, code, newPassword) => {
    return await axios.post(Askme_Domain + "/askme/resetPw", null, {
      params: { id, email, code, newPassword },
    });
  },

  // 정보수정할때 비밀번호 확인
  verifyPassword: async (userId, password) => {
    return await axios.post(`${Askme_Domain}/askme/verify-password`, {
      userId,
      password,
    });
  },
  updateUserInfo: async (userInfo) => {
    return await axios.post(`${Askme_Domain}/askme/update-user-info`, userInfo);
  },

  getRoomId: async (id) => {
    return await axios.get(Askme_Domain + "/askme/mypage/getRoomid", {
      params: { id: id },
    });
  },

  // 정보수정 사용자 정보 가져오기
  getUserInfo: async (id) => {
    return await axios.get(Askme_Domain + "/askme/user", {
      params: { id },
    });
  },
  updateUserInformation: async (userInfo) => {
    return await axios.post(`${Askme_Domain}/update-user-info`, userInfo);
  },

  getAllUsers: async () => {
    return await axios.get(`${Askme_Domain}/askme/admin/users`);
  },

  // 관리자 채팅방 목록
  getAllChat: async () => {
    return await axios.get(`${Askme_Domain}/askme/admin/chatroom`);
  },
  // 관리자 채팅방 삭제
  deleteChat: async (id) => {
    console.log(id);
    return await axios.get(Askme_Domain + "/askme/admin/roomdelete", {
      params: {
        id: id,
      },
    });
  },
  // 관리자 유저 삭제
  deleteUser: async (id) => {
    console.log(id);
    return await axios.get(Askme_Domain + "/askme/admin/userAlldel", {
      params: {
        id: id,
      },
    });
  },
};

export default AxiosApi;
