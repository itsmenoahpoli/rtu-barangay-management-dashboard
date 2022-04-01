import axios from "axios";

export default class AxiosService {
  constructor() {
    this.apiEndpoint = "/";
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
