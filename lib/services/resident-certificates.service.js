import { AxiosService } from "lib/services";
import { httpErrorHandler } from "lib/handlers";
import { redirectWithDelay } from "lib/helpers";

import Swal from "sweetalert2";

export default class ResidentCertificatesService {
  constructor() {
    this.axiosService = new AxiosService();
    this.apiEndpoint = "/resident-certificates";
  }

  async getAll(query) {
    try {
      let response = await this.axiosService
        .axiosInstance()
        .get(this.apiEndpoint + `?q=${query}`);

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async createCertificate(payload) {
    try {
      //
    } catch (err) {
      httpErrorHandler(err);
    }
  }
}
