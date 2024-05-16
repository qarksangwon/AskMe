import axios from "axios";
const Askme_Domain = "http://localhost:8111";

const AxiosApi = {
  boardMain: async () => {
    return await axios.get(Askme_Domain + "/askme/board");
  },
};

export default AxiosApi;