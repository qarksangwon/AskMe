import axios from "axios";
const Askme_Domain = "http://localhost:8111";

const AxiosApi = {
  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
  },

  boardWrite: async (data) => {
    return await axios.post(Askme_Domain + "/askme/board/write", data);
  },

  chatContent: async (roomId) => {
    return await axios.get(Askme_Domain + "/askme/chat", { roomId });
  },
};

export default AxiosApi;
