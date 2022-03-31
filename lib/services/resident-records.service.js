import { AxiosService } from "lib/services/api";
import { httpErrorHandler } from "lib/handlers";
import { redirectWithDelay } from "lib/helpers";

import { toast } from "react-hot-toast";

export default class ResidentRecordsService {
  constructor() {
    this.axiosService = new AxiosService("/resident-records");
  }

  async getAll(query) {
    try {
      let response = await this.axiosService.httpRequest("get", "", query);

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

      let response = await this.axiosService.httpRequest("post", payload, "");
      toast.success("Successfully added new resident record");
      redirectWithDelay(1.5, "/resident-records");

      return response;
    } catch (err) {
      console.log(err.response.status);
    }
  }
}
