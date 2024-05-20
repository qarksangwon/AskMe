import axios from "axios";
const Askme_Domain = "http://localhost:8111";

const AxiosApi = {
  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
  },

  //채팅방 번호에 맞는 방이 있는지 여부 확인
  chatContent: async (roomId) => {
    return await axios.get(Askme_Domain + "/askme/chat", { roomId });
  },
};

export default AxiosApi;
