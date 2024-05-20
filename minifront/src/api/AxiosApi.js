import axios from "axios";
const Askme_Domain = "http://localhost:8111";

const AxiosApi = {
  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
  },

  boardWrite: async (data) => {
    return await axios.post(Askme_Domain + "/askme/board/write", data);
  },

  //채팅방 번호에 따라서 내용을 가져올 수 있도록 요청을 보냄
  chatContent: async (roomId) => {
    return await axios.get(Askme_Domain + "/askme/chat", { roomId });
  },
};

export default AxiosApi;
