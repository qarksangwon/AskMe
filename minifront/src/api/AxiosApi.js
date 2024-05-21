import axios from "axios";
const Askme_Domain = "http://localhost:8111";

const AxiosApi = {
  LoginMain: async () => {
    return await axios.get(Askme_Domain + "/users/login");
  },

  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
  },

  boardWrite: async (data) => {
    return await axios.post(Askme_Domain + "/askme/board/write", data);
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
