import axios from "axios";

export default class AxiosService {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  axiosInstance = () => {
    let instance = axios.create({
      baseURL: process.env.API_BASEURL,
      headers: {
        Accept: "application/json",
      },
    });

    return instance;
  };
}
