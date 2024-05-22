import axios from "axios";

const Askme_Domain = "http://localhost:8111";

const AxiosApi = {
  LoginMain: async (id, pwd) => {
    const loginData = { id: id, password: pwd };

    return await axios.post(Askme_Domain + "/askme/login", loginData);
  },

  userDel: async (id) => {
    const delId = {
      id: id,
    };
    console.log(delId);
    return await axios.post(Askme_Domain + "/askme/userdel/del", delId);
  },

  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
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
      // Id: localStorage.getItem("userId"),
      id: "00bsj",
    };
    return await axios.post(Askme_Domain + "/askme/chatmain", roomInfo);
  },

  deleteChatRoom: async () => {
    const id = "00bsj";
    // const id = localStorage.getItem("userId");
    return await axios.get(Askme_Domain + "/askme/chatdelete", {
      params: {
        id: id,
      },
    });
  },
};

export default AxiosApi;
