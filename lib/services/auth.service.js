import { AxiosService } from "lib/services";
import { httpErrorHandler } from "lib/handlers";
import { redirectWithDelay } from "lib/helpers";

import Swal from "sweetalert2";

export default class AuthService {
  constructor() {
    this.axiosService = new AxiosService();
    this.apiEndpoint = "/auth";
  }

  async userLogin(credentials) {
    try {
      console.log("login");
      let response = await this.axiosService
        .axiosInstance()
        .post(this.apiEndpoint + "/login", credentials);

      const { authToken, user } = response.data;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", user);

      redirectWithDelay(2, "/");

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async userLogout() {
    try {
      //
    } catch (err) {
      httpErrorHandler(err);
    }
  }
}
