import { AxiosService } from "lib/services";
import { httpErrorHandler } from "lib/handlers";
import { redirectWithDelay } from "lib/helpers";

import Swal from "sweetalert2";

export default class ResidentRecordsService {
  constructor() {
    this.axiosService = new AxiosService("/resident-records");
    this.apiEndpoint = "/resident-records";
  }
  async getAll(query) {
    console.log(query);
    try {
      let response = await this.axiosService
        .axiosInstance()
        .get(this.apiEndpoint + `?q=${query}`);

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async registerResident(payload) {
    try {
      payload.region = "NCR";
      payload.city = "Makati City";
      payload.barangay = "Pitogo";

      let response = await this.axiosService
        .axiosInstance()
        .post(this.apiEndpoint, payload);

      Swal.fire({
        icon: "success",
        title: "Resident Registered",
        text: "Resident record data successfully added to database",
        confirmButtonText: "Okay",
      });

      redirectWithDelay(2, "/resident-records");

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }
}
