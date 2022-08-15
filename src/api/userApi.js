import axiosClient from "./axiosClient";

class userApi {
  getById(params) {
    axiosClient.get(`/user/`)
  }
}

export default new userApi();