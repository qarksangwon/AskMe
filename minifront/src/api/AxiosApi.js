import axios from "axios";
const Askme_Domain = "http://localhost:8111";

const AxiosApi = {
  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
  },

<<<<<<< HEAD
  boardWrite: async (data) => {
    return await axios.post(Askme_Domain + "/askme/board/write", data);
  },

  //채팅방 번호에 따라서 내용을 가져올 수 있도록 요청을 보냄
=======
  //채팅방 번호에 맞는 방이 있는지 여부 확인
>>>>>>> 8b55bb80447532f2909daa794949e8b05bcb2120
  chatContent: async (roomId) => {
    return await axios.get(Askme_Domain + "/askme/chat", { roomId });
  },
};

export default AxiosApi;
