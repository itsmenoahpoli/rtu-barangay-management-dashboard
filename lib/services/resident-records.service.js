import AxiosService from "lib/services/api/axios.service";
import { httpErrorHandler } from "lib/handlers";
import { redirectWithDelay } from "lib/helpers";

import Swal from "sweetalert2";

export default class ResidentRecordsService {
  constructor() {
    this.axiosService = new AxiosService();
    this.apiEndpoint = "/resident-records";
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
        title: "Registered",
        text: "Resident record data successfully added to database",
        confirmButtonText: "Okay",
      });

      redirectWithDelay(2, "/resident-records");

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async getResidentRecordById(residentRecordById) {
    //
  }

  async updateResidentRecordById(residentRecordId, payload) {
    //
  }

  async deleteResidentRecordById(redidentRecordId) {
    try {
      let response = await this.axiosService
        .axiosInstance()
        .delete(this.apiEndpoint + `/${redidentRecordId}`, null, null);

      Swal.fire({
        icon: "info",
        title: "Deleted",
        text: "Resident record data successfully deleted from database",
        confirmButtonText: "Okay",
      });

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }
}
