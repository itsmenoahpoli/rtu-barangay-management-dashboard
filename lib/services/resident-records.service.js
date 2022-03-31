import { AxiosService } from "lib/services/api";

export default class ResidentRecordsService {
  constructor() {
    this.axiosService = new AxiosService("/resident-records");
  }

  async getAll(query) {
    try {
      let response = await this.axiosService.httpRequest("get", "", "");

      return response;
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
}
