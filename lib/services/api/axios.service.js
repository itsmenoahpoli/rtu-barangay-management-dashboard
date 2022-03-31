import axios from "axios";

export default class AxiosService {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  axiosInstance = () => {
    return axios.create({
      baseURL: process.env.API_BASEURL,
      headers: {
        Accept: "application/json",
      },
    });
  };

  httpRequest = async (method, payload, query) => {
    let requestURL = query ? this.apiURL + `?q=${query}` : this.apiURL;

    try {
      let response = await this.axiosInstance()[method](requestURL, payload);

      return response;
    } catch (err) {
      throw new Error(err);
    }
  };
}
