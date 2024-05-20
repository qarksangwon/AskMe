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
};

export default AxiosApi;
